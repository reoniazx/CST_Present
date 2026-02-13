import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

type RateLimitEntry = {
  count: number;
  resetAt: number;
  lastSeenAt: number;
};

type RateLimitState = {
  count: number;
  resetAt: number;
};

const rateLimitStore = new Map<string, RateLimitEntry>();
let lastCleanupAt = 0;
let redisClient: Redis | null | undefined;

const DEFAULT_WINDOW_MS = 60_000;
const DEFAULT_MAX_REQUESTS = 5;
const DEFAULT_CLEANUP_INTERVAL_MS = 60_000;
const DEFAULT_MAX_TRACKED_KEYS = 10_000;

const getPositiveInt = (value: string | undefined, fallback: number): number => {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

const isValidIpv4 = (value: string): boolean => {
  const octets = value.split(".");
  if (octets.length !== 4) {
    return false;
  }

  return octets.every((octet) => {
    if (!/^\d{1,3}$/.test(octet)) {
      return false;
    }

    const parsed = Number.parseInt(octet, 10);
    return parsed >= 0 && parsed <= 255;
  });
};

const normalizeIp = (value: string): string | null => {
  const trimmed = value.trim().replace(/^\[/, "").replace(/\]$/, "");
  if (!trimmed || trimmed.length > 64) {
    return null;
  }

  const ipv4WithPortMatch = trimmed.match(
    /^((?:\d{1,3}\.){3}\d{1,3})(?::\d{1,5})?$/
  );

  if (ipv4WithPortMatch) {
    const host = ipv4WithPortMatch[1];
    return isValidIpv4(host) ? host : null;
  }

  const withoutZone = trimmed.split("%", 1)[0];
  if (
    withoutZone.length <= 45 &&
    withoutZone.includes(":") &&
    /^[a-fA-F0-9:]+$/.test(withoutZone)
  ) {
    return withoutZone.toLowerCase();
  }

  return null;
};

const getClientIp = (request: NextRequest): string => {
  const requestWithIp = request as NextRequest & { ip?: string };
  if (requestWithIp.ip) {
    const normalized = normalizeIp(requestWithIp.ip);
    if (normalized) {
      return normalized;
    }
  }

  const candidates = [
    request.headers.get("cf-connecting-ip"),
    request.headers.get("x-real-ip"),
    request.headers.get("x-vercel-forwarded-for"),
    request.headers.get("x-forwarded-for")?.split(",")[0],
  ];

  for (const candidate of candidates) {
    if (!candidate) {
      continue;
    }

    const normalized = normalizeIp(candidate);
    if (normalized) {
      return normalized;
    }
  }

  return "unknown";
};

const runStoreCleanup = (
  now: number,
  cleanupIntervalMs: number,
  maxTrackedKeys: number
): void => {
  const shouldCleanup =
    now - lastCleanupAt >= cleanupIntervalMs ||
    rateLimitStore.size > maxTrackedKeys;

  if (!shouldCleanup) {
    return;
  }

  lastCleanupAt = now;

  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetAt <= now) {
      rateLimitStore.delete(key);
    }
  }

  if (rateLimitStore.size <= maxTrackedKeys) {
    return;
  }

  const overflow = rateLimitStore.size - maxTrackedKeys;
  const oldestEntries = Array.from(rateLimitStore.entries())
    .sort((a, b) => a[1].lastSeenAt - b[1].lastSeenAt)
    .slice(0, overflow);

  for (const [key] of oldestEntries) {
    rateLimitStore.delete(key);
  }
};

const setRateLimitHeaders = (
  response: NextResponse,
  maxRequests: number,
  remaining: number,
  resetAt: number
): void => {
  response.headers.set("x-ratelimit-limit", maxRequests.toString());
  response.headers.set("x-ratelimit-remaining", Math.max(0, remaining).toString());
  response.headers.set("x-ratelimit-reset", Math.ceil(resetAt / 1000).toString());
};

const getRedisClient = (): Redis | null => {
  if (redisClient !== undefined) {
    return redisClient;
  }

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    redisClient = null;
    return null;
  }

  redisClient = new Redis({ url, token });
  return redisClient;
};

const getRateKey = (clientIp: string, pathname: string): string =>
  `refresh-rate-limit:${pathname}:${clientIp}`;

const getStateFromRedis = async (
  key: string,
  now: number,
  windowMs: number
): Promise<RateLimitState | null> => {
  const redis = getRedisClient();
  if (!redis) {
    return null;
  }

  try {
    const count = await redis.incr(key);

    if (count === 1) {
      await redis.pexpire(key, windowMs);
    }

    const ttlRaw = await redis.pttl(key);
    let ttlMs = typeof ttlRaw === "number" ? ttlRaw : Number(ttlRaw);

    if (!Number.isFinite(ttlMs) || ttlMs <= 0) {
      await redis.pexpire(key, windowMs);
      ttlMs = windowMs;
    }

    return {
      count,
      resetAt: now + ttlMs,
    };
  } catch {
    return null;
  }
};

export async function proxy(request: NextRequest) {
  if (request.method !== "POST") {
    return NextResponse.next();
  }

  const windowMs = getPositiveInt(
    process.env.REFRESH_RATE_LIMIT_WINDOW_MS,
    DEFAULT_WINDOW_MS
  );
  const maxRequests = getPositiveInt(
    process.env.REFRESH_RATE_LIMIT_MAX,
    DEFAULT_MAX_REQUESTS
  );
  const cleanupIntervalMs = getPositiveInt(
    process.env.REFRESH_RATE_LIMIT_CLEANUP_INTERVAL_MS,
    DEFAULT_CLEANUP_INTERVAL_MS
  );
  const maxTrackedKeys = getPositiveInt(
    process.env.REFRESH_RATE_LIMIT_MAX_TRACKED_KEYS,
    DEFAULT_MAX_TRACKED_KEYS
  );

  const now = Date.now();
  const clientIp = getClientIp(request);
  const path = request.nextUrl.pathname;

  const redisState = await getStateFromRedis(getRateKey(clientIp, path), now, windowMs);
  if (redisState) {
    if (redisState.count > maxRequests) {
      const retryAfterSeconds = Math.max(
        1,
        Math.ceil((redisState.resetAt - now) / 1000)
      );

      return NextResponse.json(
        { error: "Too many refresh requests" },
        {
          status: 429,
          headers: {
            "retry-after": retryAfterSeconds.toString(),
            "cache-control": "no-store",
            "x-ratelimit-limit": maxRequests.toString(),
            "x-ratelimit-remaining": "0",
            "x-ratelimit-reset": Math.ceil(redisState.resetAt / 1000).toString(),
          },
        }
      );
    }

    const response = NextResponse.next();
    setRateLimitHeaders(
      response,
      maxRequests,
      maxRequests - redisState.count,
      redisState.resetAt
    );
    return response;
  }

  runStoreCleanup(now, cleanupIntervalMs, maxTrackedKeys);

  const rateKey = `${clientIp}:${path}`;
  const entry = rateLimitStore.get(rateKey);

  if (!entry || now >= entry.resetAt) {
    const nextEntry: RateLimitEntry = {
      count: 1,
      resetAt: now + windowMs,
      lastSeenAt: now,
    };
    rateLimitStore.set(rateKey, nextEntry);

    const response = NextResponse.next();
    setRateLimitHeaders(
      response,
      maxRequests,
      maxRequests - nextEntry.count,
      nextEntry.resetAt
    );
    return response;
  }

  if (entry.count >= maxRequests) {
    const retryAfterSeconds = Math.max(1, Math.ceil((entry.resetAt - now) / 1000));

    return NextResponse.json(
      { error: "Too many refresh requests" },
      {
        status: 429,
        headers: {
          "retry-after": retryAfterSeconds.toString(),
          "cache-control": "no-store",
          "x-ratelimit-limit": maxRequests.toString(),
          "x-ratelimit-remaining": "0",
          "x-ratelimit-reset": Math.ceil(entry.resetAt / 1000).toString(),
        },
      }
    );
  }

  entry.count += 1;
  entry.lastSeenAt = now;
  rateLimitStore.set(rateKey, entry);

  const response = NextResponse.next();
  setRateLimitHeaders(response, maxRequests, maxRequests - entry.count, entry.resetAt);
  return response;
}

export const config = {
  matcher: ["/api/auth/refresh", "/api/refresh"],
};
