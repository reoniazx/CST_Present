'use client';

import { useEffect, useRef } from 'react';

export default function Hero() {
    const heroRef = useRef<HTMLDivElement>(null);
    const elementsRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        const handleScroll = () => {
            if (!heroRef.current) return;
            const scrollY = window.scrollY;

            elementsRef.current.forEach((el, index) => {
                if (el) {
                    const speed = el.dataset.speed || '0.5';
                    const y = scrollY * parseFloat(speed);
                    el.style.transform = `translateY(${y}px)`;
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const addToRefs = (el: HTMLDivElement | null, index: number) => {
        if (el) elementsRef.current[index] = el;
    };

    return (
        <section
            id="hero"
            ref={heroRef}
            className="parallax-container"
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                background: 'linear-gradient(180deg, var(--white-pure) 0%, var(--rose-light) 100%)',
            }}
        >
            {/* Decorative Blobs - Parallax Layer 0 (slowest) */}
            <div
                ref={(el) => addToRefs(el, 0)}
                data-speed="-0.3"
                className="blob blob-rose floating"
                style={{
                    width: '600px',
                    height: '600px',
                    top: '-100px',
                    right: '-200px',
                    position: 'absolute',
                }}
            />
            <div
                ref={(el) => addToRefs(el, 1)}
                data-speed="-0.2"
                className="blob blob-rose floating-delayed"
                style={{
                    width: '400px',
                    height: '400px',
                    bottom: '100px',
                    left: '-150px',
                    position: 'absolute',
                }}
            />

            {/* Geometric Decorations - Parallax Layer 1 */}
            <div
                ref={(el) => addToRefs(el, 2)}
                data-speed="-0.5"
                className="floating"
                style={{
                    position: 'absolute',
                    top: '15%',
                    left: '10%',
                    width: '80px',
                    height: '80px',
                    background: 'linear-gradient(135deg, var(--rose-soft), var(--rose-light))',
                    borderRadius: '24px',
                    transform: 'rotate(45deg)',
                    opacity: 0.6,
                }}
            />
            <div
                ref={(el) => addToRefs(el, 3)}
                data-speed="-0.7"
                className="floating-delayed"
                style={{
                    position: 'absolute',
                    top: '25%',
                    right: '15%',
                    width: '60px',
                    height: '60px',
                    border: '3px solid var(--rose-medium)',
                    borderRadius: '50%',
                    opacity: 0.5,
                }}
            />
            <div
                ref={(el) => addToRefs(el, 4)}
                data-speed="-0.4"
                className="floating"
                style={{
                    position: 'absolute',
                    bottom: '20%',
                    right: '20%',
                    width: '100px',
                    height: '100px',
                    background: 'linear-gradient(135deg, var(--white-cream), var(--rose-light))',
                    borderRadius: '30px',
                    opacity: 0.7,
                }}
            />
            <div
                ref={(el) => addToRefs(el, 5)}
                data-speed="-0.6"
                className="floating-delayed"
                style={{
                    position: 'absolute',
                    bottom: '30%',
                    left: '5%',
                    width: '12px',
                    height: '12px',
                    background: 'var(--rose-medium)',
                    borderRadius: '50%',
                }}
            />
            <div
                ref={(el) => addToRefs(el, 6)}
                data-speed="-0.8"
                style={{
                    position: 'absolute',
                    top: '40%',
                    left: '15%',
                    width: '8px',
                    height: '8px',
                    background: 'var(--rose-accent)',
                    borderRadius: '50%',
                }}
            />

            {/* Main Content - Parallax Layer 2 (normal) */}
            <div
                className="container"
                style={{
                    textAlign: 'center',
                    zIndex: 10,
                    position: 'relative',
                    paddingTop: '100px',
                }}
            >
                {/* Badge */}
                <div
                    data-aos="fade-down"
                    data-aos-delay="100"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 20px',
                        background: 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '50px',
                        border: '1px solid var(--rose-soft)',
                        marginBottom: '32px',
                        fontSize: '0.9rem',
                        color: 'var(--rose-deep)',
                    }}
                >
                    <span style={{ fontSize: '1.2rem' }}>🎓</span>
                    <span style={{ fontWeight: 500 }}>International Program</span>
                </div>

                {/* Main Heading */}
                <h1
                    data-aos="fade-up"
                    data-aos-delay="200"
                    style={{
                        fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                        marginBottom: '24px',
                        lineHeight: 1.1,
                    }}
                >
                    <span style={{ color: 'var(--gray-darker)' }}>Welcome to</span>
                    <br />
                    <span className="gradient-text">Computer Science</span>
                    <br />
                    <span style={{ color: 'var(--gray-darker)' }}>International</span>
                </h1>

                {/* Subtitle */}
                <p
                    data-aos="fade-up"
                    data-aos-delay="300"
                    style={{
                        fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                        color: 'var(--gray-medium)',
                        maxWidth: '600px',
                        margin: '0 auto 40px',
                        lineHeight: 1.7,
                    }}
                >
                    Open the door to the world of technology with a curriculum designed for the future
                    <br />
                    <span style={{ color: 'var(--rose-deep)' }}>Develop Skills • Create Innovation • Achieve Success</span>
                </p>

                {/* CTA Buttons */}
                <div
                    data-aos="fade-up"
                    data-aos-delay="400"
                    style={{
                        display: 'flex',
                        gap: '16px',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                    }}
                >
                    <a href="#programs" className="btn-primary">
                        <span>🚀 Explore Programs</span>
                    </a>
                    <a href="#about" className="btn-secondary">
                        Learn More
                    </a>
                </div>

                {/* Stats */}
                <div
                    data-aos="fade-up"
                    data-aos-delay="500"
                    className="stats-container"
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '48px',
                        marginTop: '20px',
                        flexWrap: 'wrap',
                    }}
                >
                    {[
                        { number: '20+', label: 'Years of Excellence' },
                        { number: '500+', label: 'Alumni Worldwide' },
                        { number: '95%', label: 'Employment Rate' },
                    ].map((stat, index) => (
                        <div key={index} style={{ textAlign: 'center' }}>
                            <div
                                className="stat-number"
                                style={{
                                    fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                                    fontFamily: 'Outfit, sans-serif',
                                    fontWeight: 800,
                                    background: 'linear-gradient(135deg, var(--rose-deep), var(--rose-accent))',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >
                                {stat.number}
                            </div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--gray-medium)', marginTop: '4px' }}>
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="scroll-indicator" data-aos="fade-up" data-aos-delay="700">
                <span></span>
            </div>

            <style jsx>{`
                @media (max-width: 768px) {
                    .container {
                        padding-top: 80px !important;
                    }
                    .stats-container {
                        gap: 24px !important;
                        margin-top: 40px !important;
                    }
                }
                
                @media (max-width: 480px) {
                    .container {
                        padding-top: 60px !important;
                    }
                    .stats-container {
                        gap: 16px !important;
                        margin-top: 30px !important;
                    }
                    .stat-number {
                        font-size: 1.5rem !important;
                    }
                }
            `}</style>
        </section>
    );
}
