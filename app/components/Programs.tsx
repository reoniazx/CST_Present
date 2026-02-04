'use client';

import { useEffect, useRef } from 'react';
import { useLoading } from '../contexts/LoadingContext';

export default function Programs() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const elementsRef = useRef<HTMLDivElement[]>([]);
    const { registerSection } = useLoading();

    useEffect(() => {
        registerSection('programs');

        const handleScroll = () => {
            if (!sectionRef.current) return;

            const rect = sectionRef.current.getBoundingClientRect();
            const scrollProgress = -rect.top / window.innerHeight;

            elementsRef.current.forEach((el) => {
                if (el) {
                    const speed = parseFloat(el.dataset.speed || '0');
                    const y = scrollProgress * speed * 50;
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

    const programs = [
        {
            icon: '🧠',
            title: 'Artificial Intelligence',
            description: 'Learn AI and Machine Learning development from fundamentals to advanced applications.',
            courses: ['Deep Learning', 'NLP', 'Computer Vision'],
        },
        {
            icon: '🔐',
            title: 'Cybersecurity',
            description: 'Study cyber security and system protection from digital threats.',
            courses: ['Network Security', 'Cryptography', 'Ethical Hacking'],
        },
        {
            icon: '☁️',
            title: 'Cloud Computing',
            description: 'Understand enterprise-level Cloud system design and management.',
            courses: ['AWS', 'Azure', 'Kubernetes'],
        },
        {
            icon: '📱',
            title: 'Software Engineering',
            description: 'Develop software professionally with international standards.',
            courses: ['Agile', 'DevOps', 'Full-stack Dev'],
        },
    ];

    return (
        <section
            id="programs"
            ref={sectionRef}
            className="section parallax-container"
            style={{
                background: 'linear-gradient(180deg, var(--rose-light) 0%, var(--white-pure) 100%)',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Decorative Elements */}
            <div
                ref={(el) => addToRefs(el, 0)}
                data-speed="0.5"
                style={{
                    position: 'absolute',
                    top: '10%',
                    left: '5%',
                    width: '120px',
                    height: '120px',
                    border: '4px solid var(--rose-soft)',
                    borderRadius: '50%',
                    opacity: 0.5,
                }}
            />
            <div
                ref={(el) => addToRefs(el, 1)}
                data-speed="-0.3"
                style={{
                    position: 'absolute',
                    bottom: '15%',
                    right: '10%',
                    width: '80px',
                    height: '80px',
                    background: 'linear-gradient(135deg, var(--rose-soft), var(--rose-light))',
                    borderRadius: '24px',
                    transform: 'rotate(30deg)',
                    opacity: 0.6,
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
                        Programs
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
                        Outstanding
                        <span className="gradient-text"> Specializations</span>
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
                        Choose your path from specializations that meet the demands of the digital job market
                    </p>
                </div>

                {/* Program Cards */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '32px',
                    }}
                >
                    {programs.map((program, index) => (
                        <div
                            key={index}
                            ref={(el) => addToRefs(el, index + 2)}
                            data-speed={index % 2 === 0 ? '0.15' : '-0.15'}
                            data-aos="fade-up"
                            data-aos-delay={100 + index * 100}
                            className="card"
                            style={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                cursor: 'pointer',
                            }}
                            onMouseEnter={(e) => {
                                const card = e.currentTarget;
                                card.style.borderColor = 'var(--rose-medium)';
                                card.style.boxShadow = 'var(--shadow-glow)';
                            }}
                            onMouseLeave={(e) => {
                                const card = e.currentTarget;
                                card.style.borderColor = 'var(--gray-light)';
                                card.style.boxShadow = 'none';
                            }}
                        >
                            {/* Icon */}
                            <div
                                className="icon-container pulse-glow"
                                style={{ marginBottom: '24px' }}
                            >
                                <span style={{ fontSize: '2rem' }}>{program.icon}</span>
                            </div>

                            {/* Title */}
                            <h3
                                style={{
                                    fontSize: '1.5rem',
                                    fontFamily: 'Outfit, sans-serif',
                                    marginBottom: '12px',
                                    color: 'var(--gray-darker)',
                                }}
                            >
                                {program.title}
                            </h3>

                            {/* Description */}
                            <p
                                style={{
                                    color: 'var(--gray-medium)',
                                    fontSize: '0.95rem',
                                    lineHeight: 1.7,
                                    marginBottom: '20px',
                                    flex: 1,
                                }}
                            >
                                {program.description}
                            </p>

                            {/* Courses */}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                {program.courses.map((course, i) => (
                                    <span
                                        key={i}
                                        style={{
                                            padding: '6px 14px',
                                            background: 'var(--rose-light)',
                                            borderRadius: '50px',
                                            fontSize: '0.8rem',
                                            color: 'var(--rose-deep)',
                                            fontWeight: 500,
                                        }}
                                    >
                                        {course}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div
                    data-aos="fade-up"
                    data-aos-delay="500"
                    style={{ textAlign: 'center', marginTop: '60px' }}
                >
                    <a href="#" className="btn-primary">
                        <span>View All Programs →</span>
                    </a>
                </div>
            </div>
        </section>
    );
}
