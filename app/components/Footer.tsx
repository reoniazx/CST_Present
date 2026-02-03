'use client';

export default function Footer() {
    const footerLinks = {
        Programs: ['Bachelor\'s Degree', 'AI Track', 'Cybersecurity Track', 'Cloud Track'],
        'About Us': ['History', 'Faculty', 'Research', 'News'],
        Students: ['Apply', 'Scholarships', 'Activities', 'Alumni'],
        Contact: ['Map', 'Email', 'Phone', 'FAQ'],
    };

    const socialLinks = [
        { icon: '📘', name: 'Facebook', url: '#' },
        { icon: '📸', name: 'Instagram', url: '#' },
        { icon: '🐦', name: 'Twitter', url: '#' },
        { icon: '💼', name: 'LinkedIn', url: '#' },
        { icon: '📺', name: 'YouTube', url: '#' },
    ];

    return (
        <footer
            id="footer"
            style={{
                background: 'linear-gradient(180deg, var(--white-pure) 0%, var(--rose-light) 50%, var(--rose-soft) 100%)',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Decorative top wave */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '100px',
                    background: 'var(--white-pure)',
                    clipPath: 'ellipse(60% 100% at 50% 0%)',
                }}
            />

            <div
                className="container"
                style={{
                    paddingTop: '120px',
                    paddingBottom: '40px',
                    position: 'relative',
                    zIndex: 1,
                }}
            >
                {/* Main Footer Content */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '48px',
                        marginBottom: '60px',
                    }}
                >
                    {/* Brand Column */}
                    <div data-aos="fade-up">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
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
                                CS
                            </div>
                            <div>
                                <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1.1rem', color: 'var(--gray-darker)' }}>
                                    CS International
                                </div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--gray-medium)' }}>MSU</div>
                            </div>
                        </div>
                        <p
                            style={{
                                color: 'var(--gray-medium)',
                                fontSize: '0.95rem',
                                lineHeight: 1.7,
                                marginBottom: '24px',
                            }}
                        >
                            Computer Science International Program
                            <br />
                            Mahasarakham University
                        </p>

                        {/* Social Links */}
                        <div style={{ display: 'flex', gap: '12px' }}>
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.url}
                                    title={social.name}
                                    style={{
                                        width: '44px',
                                        height: '44px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        background: 'var(--white-pure)',
                                        borderRadius: '12px',
                                        fontSize: '1.25rem',
                                        transition: 'var(--transition-medium)',
                                        boxShadow: 'var(--shadow-soft)',
                                        textDecoration: 'none',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-5px) scale(1.1)';
                                        e.currentTarget.style.background = 'var(--rose-light)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                        e.currentTarget.style.background = 'var(--white-pure)';
                                    }}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link Columns */}
                    {Object.entries(footerLinks).map(([title, links], index) => (
                        <div key={title} data-aos="fade-up" data-aos-delay={100 + index * 50}>
                            <h4
                                style={{
                                    fontSize: '1rem',
                                    fontFamily: 'Outfit, sans-serif',
                                    fontWeight: 700,
                                    color: 'var(--gray-darker)',
                                    marginBottom: '20px',
                                }}
                            >
                                {title}
                            </h4>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {links.map((link, linkIndex) => (
                                    <li key={linkIndex} style={{ marginBottom: '12px' }}>
                                        <a
                                            href="#"
                                            style={{
                                                color: 'var(--gray-medium)',
                                                textDecoration: 'none',
                                                fontSize: '0.95rem',
                                                transition: 'var(--transition-fast)',
                                                display: 'inline-block',
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.color = 'var(--rose-deep)';
                                                e.currentTarget.style.transform = 'translateX(5px)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.color = 'var(--gray-medium)';
                                                e.currentTarget.style.transform = 'translateX(0)';
                                            }}
                                        >
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Newsletter */}
                <div
                    data-aos="fade-up"
                    data-aos-delay="300"
                    style={{
                        padding: '40px',
                        background: 'var(--white-pure)',
                        borderRadius: '24px',
                        boxShadow: 'var(--shadow-soft)',
                        marginBottom: '60px',
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '24px',
                    }}
                >
                    <div>
                        <h4
                            style={{
                                fontSize: '1.3rem',
                                fontFamily: 'Outfit, sans-serif',
                                fontWeight: 700,
                                color: 'var(--gray-darker)',
                                marginBottom: '8px',
                            }}
                        >
                            📬 Get the Latest Updates
                        </h4>
                        <p style={{ color: 'var(--gray-medium)', fontSize: '0.95rem' }}>
                            Subscribe for program news and events
                        </p>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            gap: '12px',
                            flexWrap: 'wrap',
                        }}
                    >
                        <input
                            type="email"
                            placeholder="Your email"
                            style={{
                                padding: '14px 24px',
                                border: '2px solid var(--gray-light)',
                                borderRadius: '50px',
                                fontSize: '0.95rem',
                                minWidth: '250px',
                                outline: 'none',
                                transition: 'var(--transition-medium)',
                            }}
                            onFocus={(e) => {
                                e.currentTarget.style.borderColor = 'var(--rose-medium)';
                            }}
                            onBlur={(e) => {
                                e.currentTarget.style.borderColor = 'var(--gray-light)';
                            }}
                        />
                        <button className="btn-primary">
                            <span>Subscribe</span>
                        </button>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div
                    style={{
                        paddingTop: '24px',
                        borderTop: '1px solid rgba(196, 160, 165, 0.3)',
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '16px',
                    }}
                >
                    <p style={{ color: 'var(--gray-medium)', fontSize: '0.9rem' }}>
                        © 2024 CS International, MSU. All rights reserved.
                    </p>
                    <div style={{ display: 'flex', gap: '24px' }}>
                        <a
                            href="#"
                            style={{
                                color: 'var(--gray-medium)',
                                fontSize: '0.9rem',
                                textDecoration: 'none',
                                transition: 'var(--transition-fast)',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--rose-deep)')}
                            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--gray-medium)')}
                        >
                            Privacy Policy
                        </a>
                        <a
                            href="#"
                            style={{
                                color: 'var(--gray-medium)',
                                fontSize: '0.9rem',
                                textDecoration: 'none',
                                transition: 'var(--transition-fast)',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--rose-deep)')}
                            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--gray-medium)')}
                        >
                            Terms of Use
                        </a>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @media (max-width: 768px) {
                    /* Smaller social icons */
                    a[title] {
                        width: 38px !important;
                        height: 38px !important;
                        border-radius: 10px !important;
                        font-size: 1.1rem !important;
                    }
                    
                    /* Smaller brand logo */
                    div[style*="width: 48px"][style*="height: 48px"] {
                        width: 40px !important;
                        height: 40px !important;
                        border-radius: 12px !important;
                        font-size: 1.1rem !important;
                    }
                    
                    /* Newsletter section */
                    div[style*="padding: 40px"] {
                        padding: 24px !important;
                        border-radius: 18px !important;
                    }
                    
                    /* Email input */
                    input[type="email"] {
                        min-width: 200px !important;
                        padding: 12px 18px !important;
                        font-size: 0.85rem !important;
                    }
                }
                
                @media (max-width: 480px) {
                    /* Even smaller social icons */
                    a[title] {
                        width: 34px !important;
                        height: 34px !important;
                        border-radius: 8px !important;
                        font-size: 1rem !important;
                    }
                    
                    /* Even smaller brand logo */
                    div[style*="width: 48px"][style*="height: 48px"] {
                        width: 36px !important;
                        height: 36px !important;
                        border-radius: 10px !important;
                        font-size: 1rem !important;
                    }
                    
                    /* Newsletter section */
                    div[style*="padding: 40px"] {
                        padding: 18px !important;
                        border-radius: 14px !important;
                    }
                    
                    /* Email input */
                    input[type="email"] {
                        min-width: 150px !important;
                        padding: 10px 14px !important;
                        font-size: 0.8rem !important;
                    }
                    
                    /* Bottom bar text */
                    p[style*="font-size: 0.9rem"] {
                        font-size: 0.75rem !important;
                    }
                    
                    a[style*="font-size: 0.9rem"] {
                        font-size: 0.75rem !important;
                    }
                }
            `}</style>
        </footer>
    );
}
