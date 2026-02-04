'use client';

import { useEffect, useRef } from 'react';
import { useLoading } from '../contexts/LoadingContext';

export default function Faculty() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const elementsRef = useRef<HTMLDivElement[]>([]);
    const { registerSection } = useLoading();

    useEffect(() => {
        registerSection('faculty');

        const handleScroll = () => {
            if (!sectionRef.current) return;

            const rect = sectionRef.current.getBoundingClientRect();
            const scrollProgress = -rect.top / window.innerHeight;

            elementsRef.current.forEach((el) => {
                if (el) {
                    const speed = parseFloat(el.dataset.speed || '0');
                    const y = scrollProgress * speed * 60;
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

    const faculty = [
        {
            emoji: '👨‍🏫',
            name: 'Prof. Dr. Smith',
            role: 'Head of Program',
            specialty: 'AI & Machine Learning',
        },
        {
            emoji: '👩‍🔬',
            name: 'Dr. Johnson',
            role: 'Associate Professor',
            specialty: 'Cybersecurity',
        },
        {
            emoji: '👨‍💻',
            name: 'Dr. Williams',
            role: 'Assistant Professor',
            specialty: 'Cloud Computing',
        },
        {
            emoji: '👩‍🏫',
            name: 'Dr. Brown',
            role: 'Assistant Professor',
            specialty: 'Software Engineering',
        },
    ];

    return (
        <section
            id="faculty"
            ref={sectionRef}
            className="section parallax-container"
            style={{
                background: 'linear-gradient(180deg, var(--white-pure) 0%, var(--rose-light) 100%)',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Decorative Elements */}
            <div
                ref={(el) => addToRefs(el, 0)}
                data-speed="0.3"
                style={{
                    position: 'absolute',
                    top: '10%',
                    right: '5%',
                    width: '100px',
                    height: '100px',
                    background: 'linear-gradient(135deg, var(--rose-soft), var(--rose-light))',
                    borderRadius: '30px',
                    transform: 'rotate(20deg)',
                    opacity: 0.5,
                }}
            />
            <div
                ref={(el) => addToRefs(el, 1)}
                data-speed="-0.4"
                style={{
                    position: 'absolute',
                    bottom: '20%',
                    left: '8%',
                    width: '60px',
                    height: '60px',
                    border: '3px solid var(--rose-medium)',
                    borderRadius: '50%',
                    opacity: 0.4,
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
                            background: 'var(--white-pure)',
                            borderRadius: '50px',
                            fontSize: '0.85rem',
                            color: 'var(--rose-deep)',
                            fontWeight: 600,
                            marginBottom: '20px',
                            boxShadow: 'var(--shadow-soft)',
                        }}
                    >
                        Faculty
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
                        World-Class
                        <span className="gradient-text"> Expert Team</span>
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
                        Learn from faculty with international experience and research achievements
                    </p>
                </div>

                {/* Faculty Grid */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                        gap: '32px',
                    }}
                >
                    {faculty.map((member, index) => (
                        <div
                            key={index}
                            ref={(el) => addToRefs(el, index + 2)}
                            data-speed={index % 2 === 0 ? '0.12' : '-0.12'}
                            data-aos="zoom-in"
                            data-aos-delay={100 + index * 100}
                            style={{
                                textAlign: 'center',
                                padding: '40px 24px',
                                background: 'var(--white-pure)',
                                borderRadius: '24px',
                                border: '1px solid var(--gray-light)',
                                transition: 'var(--transition-medium)',
                                cursor: 'pointer',
                                position: 'relative',
                                overflow: 'hidden',
                            }}
                            onMouseEnter={(e) => {
                                const card = e.currentTarget;
                                card.style.transform = 'translateY(-10px)';
                                card.style.boxShadow = 'var(--shadow-glow)';
                                card.style.borderColor = 'var(--rose-medium)';
                            }}
                            onMouseLeave={(e) => {
                                const card = e.currentTarget;
                                card.style.transform = 'translateY(0)';
                                card.style.boxShadow = 'none';
                                card.style.borderColor = 'var(--gray-light)';
                            }}
                        >
                            {/* Avatar */}
                            <div
                                style={{
                                    width: '100px',
                                    height: '100px',
                                    margin: '0 auto 24px',
                                    background: 'linear-gradient(135deg, var(--rose-light), var(--rose-soft))',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '3rem',
                                    boxShadow: 'var(--shadow-soft)',
                                }}
                            >
                                {member.emoji}
                            </div>

                            {/* Name */}
                            <h3
                                style={{
                                    fontSize: '1.3rem',
                                    fontFamily: 'Outfit, sans-serif',
                                    fontWeight: 700,
                                    marginBottom: '4px',
                                    color: 'var(--gray-darker)',
                                }}
                            >
                                {member.name}
                            </h3>

                            {/* Role */}
                            <p
                                style={{
                                    fontSize: '0.9rem',
                                    color: 'var(--rose-deep)',
                                    fontWeight: 500,
                                    marginBottom: '12px',
                                }}
                            >
                                {member.role}
                            </p>

                            {/* Specialty */}
                            <span
                                style={{
                                    display: 'inline-block',
                                    padding: '8px 16px',
                                    background: 'var(--rose-light)',
                                    borderRadius: '50px',
                                    fontSize: '0.85rem',
                                    color: 'var(--rose-dark)',
                                    fontWeight: 500,
                                }}
                            >
                                {member.specialty}
                            </span>

                            {/* Hover overlay */}
                            <div
                                className="faculty-overlay"
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'linear-gradient(135deg, rgba(232, 180, 184, 0.1), rgba(196, 160, 165, 0.1))',
                                    opacity: 0,
                                    transition: 'var(--transition-medium)',
                                    borderRadius: '24px',
                                    pointerEvents: 'none',
                                }}
                            />
                        </div>
                    ))}
                </div>

                {/* Additional Info */}
                <div
                    data-aos="fade-up"
                    data-aos-delay="500"
                    style={{
                        marginTop: '60px',
                        textAlign: 'center',
                    }}
                >
                    <div
                        className="glass"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '16px',
                            padding: '20px 32px',
                            borderRadius: '100px',
                        }}
                    >
                        <span style={{ fontSize: '2rem' }}>🏆</span>
                        <div style={{ textAlign: 'left' }}>
                            <div style={{ fontWeight: 600, color: 'var(--gray-darker)' }}>
                                50+ Research Publications Yearly
                            </div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--gray-medium)' }}>
                                Published in International Journals
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
