'use client';

import { useEffect, useRef } from 'react';
import { useLoading } from '../contexts/LoadingContext';

export default function About() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const elementsRef = useRef<HTMLDivElement[]>([]);
    const { registerSection } = useLoading();

    useEffect(() => {
        registerSection('about');

        const handleScroll = () => {
            if (!sectionRef.current) return;

            const rect = sectionRef.current.getBoundingClientRect();
            const scrollProgress = -rect.top / window.innerHeight;

            elementsRef.current.forEach((el) => {
                if (el) {
                    const speed = parseFloat(el.dataset.speed || '0');
                    const y = scrollProgress * speed * 100;
                    el.style.transform = `translateY(${y}px)`;
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [registerSection]);

    const addToRefs = (el: HTMLDivElement | null, index: number) => {
        if (el) elementsRef.current[index] = el;
    };

    return (
        <section
            id="about"
            ref={sectionRef}
            className="section parallax-container"
            style={{
                background: 'var(--white-pure)',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Decorative Elements */}
            <div
                ref={(el) => addToRefs(el, 0)}
                data-speed="0.3"
                className="blob blob-rose"
                style={{
                    width: '500px',
                    height: '500px',
                    top: '50%',
                    right: '-200px',
                    transform: 'translateY(-50%)',
                    position: 'absolute',
                    opacity: 0.4,
                }}
            />

            <div className="container">
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '60px',
                        alignItems: 'center',
                    }}
                >
                    {/* Left: Image with parallax */}
                    <div
                        style={{ position: 'relative' }}
                        data-aos="fade-right"
                        data-aos-duration="800"
                    >
                        <div
                            ref={(el) => addToRefs(el, 1)}
                            data-speed="0.2"
                            style={{
                                position: 'relative',
                                zIndex: 2,
                            }}
                        >
                            <div
                                style={{
                                    width: '100%',
                                    aspectRatio: '4/3',
                                    background: 'linear-gradient(135deg, var(--rose-light), var(--rose-soft))',
                                    borderRadius: '32px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '6rem',
                                    boxShadow: 'var(--shadow-medium)',
                                }}
                            >
                                💻
                            </div>
                        </div>

                        {/* Floating card */}
                        <div
                            ref={(el) => addToRefs(el, 2)}
                            data-speed="-0.3"
                            className="card-glass floating"
                            style={{
                                position: 'absolute',
                                bottom: '-30px',
                                right: '-30px',
                                padding: '20px 28px',
                                zIndex: 3,
                            }}
                            data-aos="zoom-in"
                            data-aos-delay="400"
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div
                                    style={{
                                        width: '48px',
                                        height: '48px',
                                        background: 'linear-gradient(135deg, var(--rose-medium), var(--rose-accent))',
                                        borderRadius: '12px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '1.5rem',
                                    }}
                                >
                                    🌍
                                </div>
                                <div>
                                    <div style={{ fontWeight: 700, fontFamily: 'Outfit, sans-serif' }}>International</div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--gray-medium)' }}>Standard</div>
                                </div>
                            </div>
                        </div>

                        {/* Background decoration */}
                        <div
                            ref={(el) => addToRefs(el, 3)}
                            data-speed="0.4"
                            style={{
                                position: 'absolute',
                                top: '-20px',
                                left: '-20px',
                                width: '100%',
                                height: '100%',
                                border: '3px solid var(--rose-soft)',
                                borderRadius: '32px',
                                zIndex: 1,
                            }}
                        />
                    </div>

                    {/* Right: Content */}
                    <div>
                        <div
                            data-aos="fade-up"
                            style={{
                                display: 'inline-block',
                                padding: '6px 16px',
                                background: 'var(--rose-light)',
                                borderRadius: '50px',
                                fontSize: '0.85rem',
                                color: 'var(--rose-deep)',
                                fontWeight: 600,
                                marginBottom: '20px',
                            }}
                        >
                            About Us
                        </div>

                        <h2
                            data-aos="fade-up"
                            data-aos-delay="100"
                            style={{
                                fontSize: 'clamp(2rem, 4vw, 3rem)',
                                marginBottom: '24px',
                                color: 'var(--gray-darker)',
                            }}
                        >
                            A Program Ready to Take
                            <br />
                            <span className="gradient-text">You to the Future</span>
                        </h2>

                        <p
                            data-aos="fade-up"
                            data-aos-delay="200"
                            style={{
                                fontSize: '1.1rem',
                                color: 'var(--gray-medium)',
                                lineHeight: 1.8,
                                marginBottom: '32px',
                            }}
                        >
                            The Computer Science (International Program) at MSU
                            is designed to produce graduates who are ready to work at a global level.
                            With a modern curriculum, expert faculty,
                            and a learning environment conducive to development.
                        </p>

                        {/* Feature list */}
                        <div
                            data-aos="fade-up"
                            data-aos-delay="300"
                            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
                        >
                            {[
                                { icon: '📚', text: '4-Year Program Taught in English' },
                                { icon: '🤝', text: 'Partnerships with Leading Companies' },
                                { icon: '🎯', text: 'Focus on Industry-Demanded Skills' },
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '16px',
                                        padding: '16px 20px',
                                        background: 'var(--white-soft)',
                                        borderRadius: '16px',
                                        transition: 'var(--transition-medium)',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'var(--rose-light)';
                                        e.currentTarget.style.transform = 'translateX(10px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'var(--white-soft)';
                                        e.currentTarget.style.transform = 'translateX(0)';
                                    }}
                                >
                                    <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
                                    <span style={{ fontWeight: 500, color: 'var(--gray-dark)' }}>{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
