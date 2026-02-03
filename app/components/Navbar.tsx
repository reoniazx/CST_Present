'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { isDarkMode, toggleDarkMode } = useTheme();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '#hero' },
        { name: 'About', href: '#about' },
        { name: 'Programs', href: '#programs' },
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
                padding: scrolled ? '12px 0' : '20px 0',
                background: scrolled
                    ? (isDarkMode ? 'rgba(13, 13, 13, 0.9)' : 'rgba(255, 255, 255, 0.9)')
                    : 'transparent',
                backdropFilter: scrolled ? 'blur(20px)' : 'none',
                borderBottom: scrolled ? '1px solid rgba(232, 180, 184, 0.2)' : 'none',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
        >
            <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                {/* Logo */}
                <a href="#hero" onClick={(e) => handleSmoothScroll(e, '#hero')} style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
                    <div
                        style={{
                            width: '48px',
                            height: '48px',
                            background: 'linear-gradient(135deg, var(--rose-medium), var(--rose-accent))',
                            borderRadius: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontFamily: 'Outfit, sans-serif',
                            fontWeight: 800,
                            fontSize: '1.25rem',
                            boxShadow: 'var(--shadow-soft)',
                        }}
                    >
                        CST
                    </div>
                    <div>
                        <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1.1rem', color: 'var(--gray-darker)' }}>
                            CST International
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--gray-medium)', marginTop: '-2px' }}>MSU</div>
                    </div>
                </a>

                {/* Desktop Navigation */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                    }}
                    className="desktop-nav"
                >
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleSmoothScroll(e, link.href)}
                            style={{
                                padding: '10px 20px',
                                color: 'var(--gray-dark)',
                                textDecoration: 'none',
                                fontSize: '0.9rem',
                                fontWeight: 500,
                                borderRadius: '50px',
                                transition: 'all 0.3s ease',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'var(--rose-light)';
                                e.currentTarget.style.color = 'var(--rose-deep)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'transparent';
                                e.currentTarget.style.color = 'var(--gray-dark)';
                            }}
                        >
                            {link.name}
                        </a>
                    ))}

                    {/* Dark Mode Toggle Button */}
                    <button
                        onClick={toggleDarkMode}
                        aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '42px',
                            height: '42px',
                            background: isDarkMode ? 'var(--rose-soft)' : 'var(--rose-light)',
                            border: 'none',
                            borderRadius: '50%',
                            cursor: 'pointer',
                            color: 'var(--rose-deep)',
                            transition: 'all 0.3s ease',
                            marginLeft: '8px',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.1) rotate(15deg)';
                            e.currentTarget.style.boxShadow = 'var(--shadow-soft)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        {isDarkMode ? <SunIcon /> : <MoonIcon />}
                    </button>

                    <a href="#apply" onClick={(e) => handleSmoothScroll(e, '#apply')} className="btn-primary" style={{ marginLeft: '16px', padding: '12px 28px', fontSize: '0.9rem' }}>
                        <span>Apply Now</span>
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
                            background: isDarkMode ? 'var(--rose-soft)' : 'var(--rose-light)',
                            border: 'none',
                            borderRadius: '50%',
                            cursor: 'pointer',
                            color: 'var(--rose-deep)',
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
                    padding: '20px',
                    background: isDarkMode ? 'rgba(13, 13, 13, 0.98)' : 'rgba(255, 255, 255, 0.98)',
                    borderTop: '1px solid var(--gray-light)',
                }}
            >
                {navLinks.map((link) => (
                    <a
                        key={link.name}
                        href={link.href}
                        onClick={(e) => handleSmoothScroll(e, link.href)}
                        style={{
                            padding: '16px 20px',
                            color: 'var(--gray-dark)',
                            textDecoration: 'none',
                            fontSize: '1rem',
                            fontWeight: 500,
                            borderRadius: '12px',
                            transition: 'all 0.3s ease',
                        }}
                    >
                        {link.name}
                    </a>
                ))}
                <a
                    href="#apply"
                    className="btn-primary"
                    style={{ marginTop: '12px', textAlign: 'center' }}
                    onClick={(e) => handleSmoothScroll(e, '#apply')}
                >
                    <span>Apply Now</span>
                </a>
            </div>

            <style jsx>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
          .mobile-theme-btn {
            display: flex !important;
          }
        }
      `}</style>
        </nav >
    );
}

