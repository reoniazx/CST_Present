import { NextRequest, NextResponse } from "next/server";

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const rateLimitStore = new Map<string, RateLimitEntry>();

const DEFAULT_WINDOW_MS = 60_000;
const DEFAULT_MAX_REQUESTS = 5;

const getPositiveInt = (value: string | undefined, fallback: number): number => {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

const getClientIp = (request: NextRequest): string => {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const first = forwardedFor.split(",")[0]?.trim();
    if (first) {
      return first;
    }
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp;
  }

  return "unknown";
};

export function middleware(request: NextRequest) {
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

  const now = Date.now();
  const clientIp = getClientIp(request);
  const rateKey = `${clientIp}:${request.nextUrl.pathname}`;

  const entry = rateLimitStore.get(rateKey);
  if (!entry || now >= entry.resetAt) {
    rateLimitStore.set(rateKey, { count: 1, resetAt: now + windowMs });
    return NextResponse.next();
  }

  if (entry.count >= maxRequests) {
    const retryAfterSeconds = Math.max(
      1,
      Math.ceil((entry.resetAt - now) / 1000)
    );

    return NextResponse.json(
      { error: "Too many refresh requests" },
      {
        status: 429,
        headers: {
          "retry-after": retryAfterSeconds.toString(),
        },
      }
    );
  }

  entry.count += 1;
  rateLimitStore.set(rateKey, entry);

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/auth/refresh", "/api/refresh"],
};
