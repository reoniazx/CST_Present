'use client';

import { useEffect, useRef } from 'react';
import { useLoading } from '../contexts/LoadingContext';

export default function Features() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const elementsRef = useRef<HTMLDivElement[]>([]);
    const { registerSection } = useLoading();

    useEffect(() => {
        registerSection('features');

        const handleScroll = () => {
            if (!sectionRef.current) return;

            const rect = sectionRef.current.getBoundingClientRect();
            const scrollProgress = -rect.top / window.innerHeight;

            elementsRef.current.forEach((el) => {
                if (el) {
                    const speed = parseFloat(el.dataset.speed || '0');
                    const y = scrollProgress * speed * 80;
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

    const features = [
        {
            icon: '🌐',
            title: 'English-Medium Instruction',
            description: 'Learn and communicate in English throughout the program, preparing you for international careers.',
        },
        {
            icon: '🔬',
            title: 'State-of-the-Art Labs',
            description: 'Access the latest equipment and technology, including GPU Clusters and IoT Labs.',
        },
        {
            icon: '🏢',
            title: 'Top Company Internships',
            description: 'Opportunities to intern with world-class tech companies both locally and internationally.',
        },
        {
            icon: '🎓',
            title: 'Exchange Programs',
            description: 'Exchange with partner universities abroad, broadening your global perspective.',
        },
        {
            icon: '💼',
            title: 'Industry Connections',
            description: 'Learn from industry experts through Guest Lectures and Workshops.',
        },
        {
            icon: '🚀',
            title: 'Startup Incubator',
            description: 'Support for student innovation and startup creation.',
        },
    ];

    return (
        <section
            id="features"
            ref={sectionRef}
            className="section parallax-container"
            style={{
                background: 'var(--white-pure)',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Background Decorations */}
            <div
                ref={(el) => addToRefs(el, 0)}
                data-speed="0.4"
                className="blob blob-rose"
                style={{
                    width: '600px',
                    height: '600px',
                    top: '-200px',
                    left: '-200px',
                    position: 'absolute',
                    opacity: 0.3,
                }}
            />
            <div
                ref={(el) => addToRefs(el, 1)}
                data-speed="-0.2"
                className="blob blob-rose"
                style={{
                    width: '400px',
                    height: '400px',
                    bottom: '-100px',
                    right: '-100px',
                    position: 'absolute',
                    opacity: 0.3,
                }}
            />

            <div className="container">
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '80px' }}>
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
                        Why Choose Us
                    </div>

                    <h2
                        data-aos="fade-up"
                        data-aos-delay="100"
                        style={{
                            fontSize: 'clamp(2rem, 4vw, 3rem)',
                            marginBottom: '20px',
                            color: 'var(--gray-darker)',
                        }}
                    >
                        Features That Make Us
                        <span className="gradient-text"> Different</span>
                    </h2>

                    <p
                        data-aos="fade-up"
                        data-aos-delay="200"
                        style={{
                            fontSize: '1.1rem',
                            color: 'var(--gray-medium)',
                            maxWidth: '600px',
                            margin: '0 auto',
                        }}
                    >
                        What makes our program outstanding and internationally recognized
                    </p>
                </div>

                {/* Features Grid */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                        gap: '32px',
                    }}
                >
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            ref={(el) => addToRefs(el, index + 2)}
                            data-speed={(index % 3 - 1) * 0.15}
                            data-aos="flip-up"
                            data-aos-delay={100 + (index % 3) * 100}
                            style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '20px',
                                padding: '28px',
                                background: 'var(--white-pure)',
                                borderRadius: '20px',
                                border: '1px solid var(--gray-light)',
                                transition: 'var(--transition-medium)',
                                cursor: 'pointer',
                            }}
                            onMouseEnter={(e) => {
                                const el = e.currentTarget;
                                el.style.transform = 'translateY(-5px) scale(1.02)';
                                el.style.boxShadow = 'var(--shadow-medium)';
                                el.style.borderColor = 'var(--rose-soft)';
                            }}
                            onMouseLeave={(e) => {
                                const el = e.currentTarget;
                                el.style.transform = 'translateY(0) scale(1)';
                                el.style.boxShadow = 'none';
                                el.style.borderColor = 'var(--gray-light)';
                            }}
                        >
                            {/* Icon */}
                            <div
                                style={{
                                    width: '56px',
                                    height: '56px',
                                    minWidth: '56px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: 'linear-gradient(135deg, var(--rose-light), var(--rose-soft))',
                                    borderRadius: '16px',
                                    fontSize: '1.75rem',
                                    transition: 'var(--transition-medium)',
                                }}
                            >
                                {feature.icon}
                            </div>

                            {/* Content */}
                            <div>
                                <h3
                                    style={{
                                        fontSize: '1.2rem',
                                        fontFamily: 'Outfit, sans-serif',
                                        fontWeight: 600,
                                        marginBottom: '8px',
                                        color: 'var(--gray-darker)',
                                    }}
                                >
                                    {feature.title}
                                </h3>
                                <p
                                    style={{
                                        fontSize: '0.95rem',
                                        color: 'var(--gray-medium)',
                                        lineHeight: 1.6,
                                    }}
                                >
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Call to Action Banner */}
                <div
                    data-aos="fade-up"
                    data-aos-delay="400"
                    style={{
                        marginTop: '80px',
                        padding: '48px',
                        background: 'linear-gradient(135deg, var(--rose-medium), var(--rose-accent))',
                        borderRadius: '32px',
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '32px',
                        boxShadow: 'var(--shadow-medium)',
                    }}
                >
                    <div>
                        <h3
                            style={{
                                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                                fontFamily: 'Outfit, sans-serif',
                                color: 'white',
                                marginBottom: '8px',
                            }}
                        >
                            Ready to Start Your Journey?
                        </h3>
                        <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.05rem' }}>
                            Join over 500 students who have already chosen us
                        </p>
                    </div>
                    <a
                        href="#apply"
                        style={{
                            padding: '16px 40px',
                            background: 'white',
                            color: 'var(--rose-deep)',
                            fontFamily: 'Outfit, sans-serif',
                            fontWeight: 600,
                            fontSize: '1rem',
                            borderRadius: '50px',
                            textDecoration: 'none',
                            transition: 'var(--transition-medium)',
                            boxShadow: 'var(--shadow-soft)',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                            e.currentTarget.style.boxShadow = 'var(--shadow-medium)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0) scale(1)';
                            e.currentTarget.style.boxShadow = 'var(--shadow-soft)';
                        }}
                    >
                        Apply Today 🎯
                    </a>
                </div>
            </div>
        </section>
    );
}
