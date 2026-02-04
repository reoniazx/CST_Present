'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navRef = useRef<HTMLElement | null>(null);

    const navLinks = useMemo(
        () => [
            { name: 'Home', href: '#hero' },
            { name: 'About', href: '#about' },
            { name: 'Programs', href: '#programs' },
            { name: 'Curriculum', href: '#curriculum' },
            { name: 'Features', href: '#features' },
            { name: 'Faculty', href: '#faculty' },
            { name: 'Contact', href: '#footer' },
        ],
        []
    );

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (!mobileMenuOpen) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = prev;
        };
    }, [mobileMenuOpen]);

    // Close on Escape
    useEffect(() => {
        if (!mobileMenuOpen) return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setMobileMenuOpen(false);
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [mobileMenuOpen]);

    const getNavbarHeight = () => {
        const h = navRef.current?.getBoundingClientRect().height ?? 80;
        return Math.round(h);
    };

    const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();

        const targetId = href.replace('#', '');
        const targetElement = document.getElementById(targetId);
        if (!targetElement) return;

        // Close mobile menu first
        setMobileMenuOpen(false);

        // Calculate target position
        const navbarHeight = getNavbarHeight();
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - navbarHeight - 8;

        // Smooth scroll with easing
        const startPosition = window.scrollY;
        const distance = offsetPosition - startPosition;
        const duration = 800; // ms
        let startTime: number | null = null;

        // Easing function for smooth deceleration
        const easeInOutCubic = (t: number): number => {
            return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        };

        const animation = (currentTime: number) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const ease = easeInOutCubic(progress);

            window.scrollTo(0, startPosition + distance * ease);

            if (progress < 1) {
                requestAnimationFrame(animation);
            }
        };

        requestAnimationFrame(animation);
    };

    return (
        <nav
            ref={(el) => {
                // TS-friendly ref assignment
                // ts-expect-error: fine for runtime
                navRef.current = el;
            }}
            className={`navbarRoot ${scrolled ? 'isScrolled' : ''}`}
            aria-label="Primary navigation"
        >
            <div className="container navInner navRow">
                {/* Logo */}
                <a href="#hero" onClick={(e) => handleSmoothScroll(e, '#hero')} className="brand">
                    <div className="brandBadge" aria-hidden="true">
                        CST
                    </div>
                    <div className="brandText">
                        <div className="brandSub">MSU</div>
                    </div>
                </a>

                {/* Desktop nav */}
                <div className="desktopNav">
                    <div className="pillNav" role="navigation" aria-label="Desktop navigation">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => handleSmoothScroll(e, link.href)}
                                className="pillLink"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>

                    <a
                        href="https://cststudent.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary applyBtn"
                    >
                        <span>Login Student</span>
                    </a>

                    <a
                        href="https://it.msu.ac.th/course-2/it-admission/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary applyBtn"
                    >
                        <span>Apply Now</span>
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <line x1="7" y1="17" x2="17" y2="7"></line>
                            <polyline points="7 7 17 7 17 17"></polyline>
                        </svg>
                    </a>
                </div>

                {/* Mobile controls */}
                <div className="mobileControls">
                    <button
                        type="button"
                        className={`mobile-menu-btn ${mobileMenuOpen ? 'is-open' : ''}`}
                        onClick={() => setMobileMenuOpen((v) => !v)}
                        aria-expanded={mobileMenuOpen}
                        aria-controls="mobileMenu"
                        aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                    >
                        <span />
                        <span />
                        <span />
                    </button>
                </div>
            </div>

            {/* Overlay */}
            <button
                type="button"
                className={`overlay ${mobileMenuOpen ? 'show' : ''}`}
                aria-hidden={!mobileMenuOpen}
                tabIndex={mobileMenuOpen ? 0 : -1}
                onClick={() => setMobileMenuOpen(false)}
            />

            {/* Mobile menu panel */}
            <div
                id="mobileMenu"
                className={`mobileMenu ${mobileMenuOpen ? 'open' : ''}`}
                role="dialog"
                aria-modal="true"
                aria-label="Mobile menu"
            >
                <div className="mobileMenuInner">
                    {navLinks.map((link, index) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleSmoothScroll(e, link.href)}
                            className="mobileLink"
                            style={{ animationDelay: `${index * 45}ms` }}
                        >
                            <span>{link.name}</span>
                            <span className="arrow" aria-hidden="true">
                                →
                            </span>
                        </a>
                    ))}

                    <a
                        href="https://cststudent.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary mobileApply"
                        style={{ animationDelay: `${navLinks.length * 45}ms` }}
                    >
                        <span>Login Student</span>
                    </a>

                    <a
                        href="https://it.msu.ac.th/course-2/bsc-course/bsc-cst/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary mobileApply"
                        style={{ animationDelay: `${(navLinks.length + 1) * 45}ms` }}
                    >
                        <span>Apply Now</span>
                    </a>
                </div>
            </div>

            <style jsx>{`
        /* Root */
        .navbarRoot {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: 22px 0;
          background: transparent;
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .navbarRoot.isScrolled {
          padding: 12px 0;
          background: rgba(255, 255, 255, 0.86);
          backdrop-filter: blur(16px) saturate(180%);
          border-bottom: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        }

        .navInner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        /* Brand */
        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          -webkit-tap-highlight-color: transparent;
        }

        .brandBadge {
          background: linear-gradient(135deg, var(--rose-medium), var(--rose-accent));
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-family: Outfit, sans-serif;
          font-weight: 800;
          font-size: 1.05rem;
          box-shadow: 0 4px 12px rgba(229, 62, 62, 0.25);
          padding: 6px 12px;
          line-height: 1;
          white-space: nowrap;
        }

        .brandSub {
          font-size: 0.75rem;
          color: var(--gray-medium);
          font-weight: 500;
          line-height: 1.1;
        }

        /* Desktop */
        .desktopNav {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .pillNav {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px;
          background: rgba(255, 255, 255, 0.82);
          backdrop-filter: blur(8px);
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.12);
        }

        .navbarRoot.isScrolled .pillNav {
          background: rgba(0, 0, 0, 0.03);
        }

        .pillLink {
          padding: 8px 18px;
          color: var(--gray-dark);
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          border-radius: 999px;
          transition: var(--transition-fast);
          outline: none;
        }

        .pillLink:focus-visible {
          box-shadow: 0 0 0 3px rgba(196, 160, 165, 0.35);
        }

        @media (hover: hover) and (pointer: fine) {
          .pillLink:hover {
            background: white;
            color: var(--rose-deep);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          }
        }

        .applyBtn {
          padding: 10px 22px;
          font-size: 0.9rem;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 4px 14px rgba(229, 62, 62, 0.4);
          white-space: nowrap;
        }

        /* Mobile controls */
        .mobileControls {
          display: none;
          align-items: center;
        }

        .mobile-menu-btn {
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(10px);
          border-radius: 12px;
          cursor: pointer;
          padding: 10px;
          display: inline-flex;
          flex-direction: column;
          gap: 5px;
          -webkit-tap-highlight-color: transparent;
          transition: var(--transition-fast);
        }

        .mobile-menu-btn:active {
          transform: scale(0.98);
        }

        .mobile-menu-btn:focus-visible {
          box-shadow: 0 0 0 3px rgba(196, 160, 165, 0.45);
        }

        .mobile-menu-btn span {
          width: 20px;
          height: 2px;
          background: var(--gray-darker);
          border-radius: 2px;
          transition: transform 0.25s ease, opacity 0.2s ease;
          transform-origin: center;
        }

        /* Overlay */
        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.25);
          opacity: 0;
          pointer-events: none;
          border: none;
          padding: 0;
          margin: 0;
          transition: opacity 0.25s ease;
          z-index: 998;
        }
        .overlay.show {
          opacity: 1;
          pointer-events: auto;
        }

        /* Mobile menu panel */
        .mobileMenu {
          position: fixed;
          left: 0;
          right: 0;
          top: 0;
          transform: translateY(-8px);
          opacity: 0;
          pointer-events: none;
          z-index: 999;
          padding: 84px 14px 18px 14px; /* leaves room for navbar */
          transition: opacity 0.25s ease, transform 0.25s ease;
        }

        .mobileMenu.open {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }

        .mobileMenuInner {
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 18px;
          box-shadow: 0 18px 50px rgba(0, 0, 0, 0.18);
          overflow: hidden;
          padding: 10px;
          max-height: calc(100vh - 110px);
          overflow-y: auto;
          display: flex;
          flex-direction: column;
        }

        .mobileLink {
          padding: 14px 14px;
          color: var(--gray-dark);
          text-decoration: none;
          font-size: 1rem;
          font-weight: 650;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: var(--transition-fast);
          opacity: 0;
          transform: translateY(8px);
          animation: fadeInUp 0.35s ease forwards;
          -webkit-tap-highlight-color: transparent;
        }

        .mobileLink:focus-visible {
          box-shadow: inset 0 0 0 3px rgba(196, 160, 165, 0.35);
          outline: none;
        }

        .mobileLink:active {
          transform: scale(0.99);
        }

        .arrow {
          opacity: 0.55;
        }

        .mobileApply {
          margin-top: 10px;
          width: 100%;
          justify-content: center;
          padding: 14px;
          font-size: 1rem;
          opacity: 0;
          transform: translateY(8px);
          animation: fadeInUp 0.35s ease forwards;
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .navbarRoot,
          .pillLink,
          .menuBtn,
          .overlay,
          .mobileMenu,
          .mobileLink,
          .mobileApply {
            transition: none !important;
            animation: none !important;
          }
          .mobileLink,
          .mobileApply {
            opacity: 1 !important;
            transform: none !important;
          }
        }

        /* Breakpoints */
        @media (max-width: 960px) {
          .desktopNav {
            display: none;
          }
          .mobileControls {
            display: flex;
            position: relative;
            z-index: 1003;
          }
          .navbarRoot {
            padding: 12px 0;
          }
          .navRow {
            position: relative;
            z-index: 1002;
          }
          .container {
            position: relative;
            z-index: 1002;
          }
          .mobile-menu-btn {
            display: flex !important;
            position: relative;
            width: 44px;
            height: 44px;
            padding: 0 !important;
            border: none;
            background: rgba(255, 255, 255, 0.9);
            border-radius: 14px;
            cursor: pointer;
            align-items: center;
            justify-content: center;
            -webkit-tap-highlight-color: transparent;
          }

          .mobile-menu-btn span {
            position: absolute;
          }

          /* ปิดเมนู: 3 เส้น */
          .mobile-menu-btn span:nth-child(1) {
            transform: translateY(-6px);
          }
          .mobile-menu-btn span:nth-child(2) {
            transform: translateY(0);
          }
          .mobile-menu-btn span:nth-child(3) {
            transform: translateY(6px);
          }

          /* เปิดเมนู: X */
          .mobile-menu-btn.is-open span:nth-child(1) {
            transform: rotate(45deg);
          }
          .mobile-menu-btn.is-open span:nth-child(2) {
            opacity: 0;
          }
          .mobile-menu-btn.is-open span:nth-child(3) {
            transform: rotate(-45deg);
          }

          .brandBadge {
            border-radius: 10px;
            font-size: 0.95rem;
            padding: 6px 10px;
          }
        }

        @media (max-width: 480px) {
          .brandBadge {
            border-radius: 9px;
            font-size: 0.85rem;
            padding: 5px 9px;
          }
          .brandSub {
            font-size: 0.65rem;
          }
          .mobile-menu-btn {
            width: 40px;
            height: 40px;
            border-radius: 12px;
          }
          .mobile-menu-btn span {
            width: 18px;
            height: 1.5px;
          }
          .mobile-menu-btn span:nth-child(1) {
            transform: translateY(-5px);
          }
          .mobile-menu-btn span:nth-child(3) {
            transform: translateY(5px);
          }
          .mobileMenu {
            padding-top: 76px;
          }
          .mobileLink {
            font-size: 0.95rem;
            padding: 12px 12px;
          }
        }
      `}</style>
        </nav>
    );
}
