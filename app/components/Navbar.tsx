'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { isDarkMode, toggleDarkMode } = useTheme();

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

    // Smooth scroll handler
    const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const targetId = href.replace('#', '');
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            const navbarHeight = 80; // Account for fixed navbar
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }

        // Close mobile menu if open
        setMobileMenuOpen(false);
    };

    // Sun icon for dark mode (click to switch to light)
    const SunIcon = () => (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
    );

    // Moon icon for light mode (click to switch to dark)
    const MoonIcon = () => (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
    );

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
                    ? (isDarkMode ? 'rgba(18, 18, 18, 0.85)' : 'rgba(255, 255, 255, 0.85)')
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
                        {/* <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1.15rem', color: isDarkMode ? 'white' : 'var(--gray-darker)', lineHeight: 1.2 }}>
                            CST International
                        </div> */}
                        <div style={{ fontSize: '0.75rem', color: isDarkMode ? 'rgba(255,255,255,0.6)' : 'var(--gray-medium)', fontWeight: 500 }}>
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
                        background: scrolled ? (isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)') : 'rgba(255,255,255,0.8)',
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
                                color: isDarkMode ? 'rgba(255,255,255,0.9)' : 'var(--gray-dark)',
                                textDecoration: 'none',
                                fontSize: '0.9rem',
                                fontWeight: 500,
                                borderRadius: '100px',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                position: 'relative',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = isDarkMode ? 'rgba(255,255,255,0.1)' : 'white';
                                e.currentTarget.style.color = isDarkMode ? 'white' : 'var(--rose-deep)';
                                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'transparent';
                                e.currentTarget.style.color = isDarkMode ? 'rgba(255,255,255,0.9)' : 'var(--gray-dark)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            {link.name}
                        </a>
                    ))}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }} className="desktop-nav-controls">
                    {/* Dark Mode Toggle Button */}
                    <button
                        onClick={toggleDarkMode}
                        aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '40px',
                            height: '40px',
                            background: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '50%',
                            cursor: 'pointer',
                            color: isDarkMode ? '#fbbf24' : 'var(--rose-deep)',
                            transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.1) rotate(15deg)';
                            e.currentTarget.style.background = isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                            e.currentTarget.style.background = isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)';
                        }}
                    >
                        {isDarkMode ? <SunIcon /> : <MoonIcon />}
                    </button>

                    <a
                        href="https://it.msu.ac.th/course-2/bsc-course/bsc-cst/"
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
                    {/* Mobile Dark Mode Toggle */}
                    <button
                        onClick={toggleDarkMode}
                        aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                        className="mobile-theme-btn"
                        style={{
                            display: 'none',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '40px',
                            height: '40px',
                            background: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                            border: 'none',
                            borderRadius: '50%',
                            cursor: 'pointer',
                            color: isDarkMode ? '#fbbf24' : 'var(--rose-deep)',
                            transition: 'all 0.3s ease',
                        }}
                    >
                        {isDarkMode ? <SunIcon /> : <MoonIcon />}
                    </button>

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
                                background: isDarkMode ? 'white' : 'var(--gray-darker)',
                                borderRadius: '2px',
                                transition: 'all 0.3s ease',
                                transform: mobileMenuOpen ? 'rotate(45deg) translateY(7px)' : 'none',
                            }}
                        />
                        <span
                            style={{
                                width: '24px',
                                height: '2px',
                                background: isDarkMode ? 'white' : 'var(--gray-darker)',
                                borderRadius: '2px',
                                transition: 'all 0.3s ease',
                                opacity: mobileMenuOpen ? 0 : 1,
                            }}
                        />
                        <span
                            style={{
                                width: '24px',
                                height: '2px',
                                background: isDarkMode ? 'white' : 'var(--gray-darker)',
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
                    background: isDarkMode ? 'rgba(18, 18, 18, 0.98)' : 'rgba(255, 255, 255, 0.98)',
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
                            color: isDarkMode ? 'rgba(255,255,255,0.9)' : 'var(--gray-dark)',
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
          .mobile-menu-btn, .mobile-theme-btn {
            display: flex !important;
          }
        }
      `}</style>
        </nav >
    );
}
