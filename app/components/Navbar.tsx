'use client';

import { useState, useEffect } from 'react';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '#hero' },
        { name: 'About', href: '#about' },
        { name: 'Programs', href: '#programs' },
        { name: 'Curriculum', href: '#curriculum' },
        { name: 'Features', href: '#features' },
        { name: 'Faculty', href: '#faculty' },
        { name: 'Contact', href: '#footer' },
    ];

    // Smooth scroll handler with custom easing for premium sliding effect
    const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const targetId = href.replace('#', '');
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            const navbarHeight = 80; // Account for fixed navbar
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;
            const startPosition = window.scrollY;
            const distance = targetPosition - startPosition;
            const duration = 1000; // Duration in milliseconds
            let startTime: number | null = null;

            // Easing function for smooth deceleration (ease-out-cubic)
            const easeOutCubic = (t: number): number => {
                return 1 - Math.pow(1 - t, 3);
            };

            const animateScroll = (currentTime: number) => {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const progress = Math.min(timeElapsed / duration, 1);
                const easedProgress = easeOutCubic(progress);

                window.scrollTo(0, startPosition + (distance * easedProgress));

                if (timeElapsed < duration) {
                    requestAnimationFrame(animateScroll);
                }
            };

            requestAnimationFrame(animateScroll);
        }

        // Close mobile menu if open
        setMobileMenuOpen(false);
    };

    return (
        <nav
            className={`navbar ${scrolled ? 'scrolled' : ''}`}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                padding: scrolled ? '12px 0' : '24px 0',
                background: scrolled
                    ? 'rgba(255, 255, 255, 0.85)'
                    : 'transparent',
                backdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'none',
                borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: scrolled ? '0 4px 30px rgba(0, 0, 0, 0.1)' : 'none',
            }}
        >
            <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                {/* Logo */}
                <a href="#hero" onClick={(e) => handleSmoothScroll(e, '#hero')} style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
                    <div
                        style={{
                            background: 'linear-gradient(135deg, var(--rose-medium), var(--rose-accent))',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontFamily: 'Outfit, sans-serif',
                            fontWeight: 800,
                            fontSize: '1.25rem',
                            boxShadow: '0 4px 12px rgba(229, 62, 62, 0.25)',
                            padding: '5px 10px',

                        }}
                    >
                        CST
                    </div>
                    <div>
                        {/* <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1.15rem', color: 'var(--gray-darker)', lineHeight: 1.2 }}>
                            CST International
                        </div> */}
                        <div style={{ fontSize: '0.75rem', color: 'var(--gray-medium)', fontWeight: 500 }}>
                            MSU
                        </div>
                    </div>
                </a>

                {/* Desktop Navigation */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '6px',
                        background: scrolled ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.8)',
                        backdropFilter: 'blur(8px)',
                        borderRadius: '100px',
                        border: '1px solid rgba(255,255,255,0.1)',
                    }}
                    className="desktop-nav"
                >
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleSmoothScroll(e, link.href)}
                            style={{
                                padding: '8px 20px',
                                color: 'var(--gray-dark)',
                                textDecoration: 'none',
                                fontSize: '0.9rem',
                                fontWeight: 500,
                                borderRadius: '100px',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                position: 'relative',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'white';
                                e.currentTarget.style.color = 'var(--rose-deep)';
                                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'transparent';
                                e.currentTarget.style.color = 'var(--gray-dark)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            {link.name}
                        </a>
                    ))}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }} className="desktop-nav-controls">
                    <a
                        href="https://it.msu.ac.th/course-2/it-admission/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                        style={{
                            padding: '10px 24px',
                            fontSize: '0.9rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            boxShadow: '0 4px 14px rgba(229, 62, 62, 0.4)',
                        }}
                    >
                        <span>Apply Now</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="7" y1="17" x2="17" y2="7"></line>
                            <polyline points="7 7 17 7 17 17"></polyline>
                        </svg>
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }} className="mobile-controls">
                    <button
                        className="mobile-menu-btn"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        style={{
                            display: 'none',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '8px',
                            flexDirection: 'column',
                            gap: '5px',
                        }}
                    >
                        <span
                            style={{
                                width: '24px',
                                height: '2px',
                                background: 'var(--gray-darker)',
                                borderRadius: '2px',
                                transition: 'all 0.3s ease',
                                transform: mobileMenuOpen ? 'rotate(45deg) translateY(7px)' : 'none',
                            }}
                        />
                        <span
                            style={{
                                width: '24px',
                                height: '2px',
                                background: 'var(--gray-darker)',
                                borderRadius: '2px',
                                transition: 'all 0.3s ease',
                                opacity: mobileMenuOpen ? 0 : 1,
                            }}
                        />
                        <span
                            style={{
                                width: '24px',
                                height: '2px',
                                background: 'var(--gray-darker)',
                                borderRadius: '2px',
                                transition: 'all 0.3s ease',
                                transform: mobileMenuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none',
                            }}
                        />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className="mobile-menu"
                style={{
                    display: mobileMenuOpen ? 'flex' : 'none',
                    flexDirection: 'column',
                    padding: '24px',
                    position: 'fixed',
                    top: '80px',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(255, 255, 255, 0.98)',
                    backdropFilter: 'blur(20px)',
                    zIndex: 999,
                    overflowY: 'auto'
                }}
            >
                {navLinks.map((link, index) => (
                    <a
                        key={link.name}
                        href={link.href}
                        onClick={(e) => handleSmoothScroll(e, link.href)}
                        style={{
                            padding: '16px 20px',
                            color: 'var(--gray-dark)',
                            textDecoration: 'none',
                            fontSize: '1.2rem',
                            fontWeight: 600,
                            borderRadius: '16px',
                            transition: 'all 0.3s ease',
                            borderBottom: '1px solid rgba(255,255,255,0.05)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            animation: `fadeInUp 0.5s ease forwards ${index * 0.05}s`,
                            opacity: 0,
                            transform: 'translateY(10px)',
                        }}
                    >
                        {link.name}
                        <span style={{ fontSize: '1.2rem', opacity: 0.5 }}>→</span>
                    </a>
                ))}
                <a
                    href="https://it.msu.ac.th/course-2/bsc-course/bsc-cst/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                    style={{
                        marginTop: '24px',
                        textAlign: 'center',
                        justifyContent: 'center',
                        padding: '16px',
                        fontSize: '1.1rem',
                        animation: `fadeInUp 0.5s ease forwards ${navLinks.length * 0.05}s`,
                        opacity: 0,
                        transform: 'translateY(10px)',
                    }}
                >
                    <span>Apply Now</span>
                </a>
            </div>

            <style jsx>{`
        @keyframes fadeInUp {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        @media (max-width: 960px) {
          .desktop-nav, .desktop-nav-controls {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
          /* Mobile Adjustments */
          .container {
             padding: 0 14px !important;
          }
          nav {
             padding: 10px 0 !important;
          }
          /* Logo adjustments */
          a[href="#hero"] > div:first-child {
             width: 32px !important;
             height: 32px !important;
             border-radius: 8px !important;
             font-size: 0.85rem !important;
             padding: 4px 8px !important;
          }
          a[href="#hero"] div[style*="font-size: 1.25rem"] {
             font-size: 0.85rem !important;
          }
           a[href="#hero"] div[style*="font-size: 0.75rem"] {
             font-size: 0.6rem !important;
          }
          
          /* Mobile Menu Button adjustments */
          .mobile-menu-btn {
              padding: 4px !important;
              gap: 3px !important;
          }
          .mobile-menu-btn span {
              width: 18px !important;
              height: 2px !important;
          }
          
          /* Mobile Menu adjustments */
          .mobile-menu {
              padding: 16px !important;
              top: 60px !important;
          }
          .mobile-menu a {
              padding: 12px 14px !important;
              font-size: 0.95rem !important;
              border-radius: 12px !important;
          }
          .mobile-menu a span {
              font-size: 0.95rem !important;
          }
        }
        
        @media (max-width: 480px) {
          .container {
             padding: 0 10px !important;
          }
          nav {
             padding: 8px 0 !important;
          }
          /* Logo even smaller */
          a[href="#hero"] > div:first-child {
             width: 28px !important;
             height: 28px !important;
             border-radius: 6px !important;
             font-size: 0.75rem !important;
             padding: 3px 6px !important;
          }
          a[href="#hero"] div[style*="font-size: 1.25rem"] {
             font-size: 0.75rem !important;
          }
           a[href="#hero"] div[style*="font-size: 0.75rem"] {
             font-size: 0.55rem !important;
          }
          
          /* Mobile Menu Button even smaller */
          .mobile-menu-btn {
              padding: 3px !important;
              gap: 3px !important;
          }
          .mobile-menu-btn span {
              width: 16px !important;
              height: 1.5px !important;
          }
          
          /* Mobile Menu even smaller */
          .mobile-menu {
              padding: 12px !important;
              top: 50px !important;
          }
          .mobile-menu a {
              padding: 10px 12px !important;
              font-size: 0.85rem !important;
              border-radius: 10px !important;
          }
          .mobile-menu a span {
              font-size: 0.85rem !important;
          }
        }
      `}</style>
        </nav >
    );
}
