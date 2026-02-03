'use client';

import { useEffect, useRef } from 'react';

export default function Curriculum() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const elementsRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
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
    }, []);

    const addToRefs = (el: HTMLDivElement | null, index: number) => {
        if (el) elementsRef.current[index] = el;
    };

    return (
        <section
            id="curriculum"
            ref={sectionRef}
            className="section"
            style={{
                background: 'var(--white-pure)',
                position: 'relative',
                overflow: 'hidden',
                paddingTop: '100px',
                paddingBottom: '100px',
            }}
        >
            {/* Background Decorations */}
            <div
                ref={(el) => addToRefs(el, 0)}
                data-speed="0.2"
                style={{
                    position: 'absolute',
                    top: '5%',
                    right: '5%',
                    width: '300px',
                    height: '300px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, var(--rose-light) 0%, transparent 70%)',
                    opacity: 0.5,
                    zIndex: 0,
                }}
            />

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
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
                        Academics
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
                        Curriculum <span className="gradient-text">Overview</span>
                    </h2>
                </div>

                {/* Degree Name */}
                <div
                    data-aos="fade-up"
                    className="card"
                    style={{ marginBottom: '40px', borderLeft: '4px solid var(--rose-medium)' }}
                >
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '16px', color: 'var(--rose-deep)' }}>
                        Bachelor of Science Program in Computer Science and Technology
                    </h3>
                    <div style={{ display: 'grid', gap: '8px' }}>
                        <div>
                            <strong style={{ color: 'var(--gray-dark)' }}>Full Name:</strong> Bachelor of Science Program in Computer Science and Technology
                        </div>
                        <div>
                            <strong style={{ color: 'var(--gray-dark)' }}>Abbreviation:</strong> B.Sc. (Computer Science and Technology)
                        </div>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>

                    {/* Tuition Fees */}
                    <div data-aos="fade-up" data-aos-delay="100" className="card">
                        <h4 style={{ fontSize: '1.2rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '1.5rem' }}>💰</span> Tuition Fees (Flat Rate)
                        </h4>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            <li style={{ padding: '8px 0', borderBottom: '1px solid var(--gray-light)', display: 'flex', justifyContent: 'space-between' }}>
                                <span>Thai Student</span>
                                <span style={{ fontWeight: 600 }}>35,000 THB / Semester</span>
                            </li>
                            <li style={{ padding: '8px 0', display: 'flex', justifyContent: 'space-between' }}>
                                <span>International Student</span>
                                <span style={{ fontWeight: 600 }}>50,000 THB / Semester</span>
                            </li>
                        </ul>
                        <div style={{ marginTop: '12px', fontSize: '0.9rem', color: 'var(--rose-deep)', textAlign: 'right' }}>
                            * 4-Year Program
                        </div>
                    </div>

                    {/* Qualifications */}
                    <div data-aos="fade-up" data-aos-delay="200" className="card">
                        <h4 style={{ fontSize: '1.2rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '1.5rem' }}>📝</span> Qualifications
                        </h4>
                        <ul style={{ listStyle: 'none', padding: 0, color: 'var(--gray-dark)' }}>
                            <li style={{ marginBottom: '8px' }}>✅ High School Core Curriculum Graduates</li>
                            <li style={{ marginBottom: '8px' }}>✅ Vocational Certificate Graduates</li>
                            <li style={{ marginBottom: '8px' }}>✅ Non-Formal Education Graduates (Gor Sor Nor)</li>
                            <li style={{ marginBottom: '8px' }}>✅ Graduates from International Schools (in Thailand)</li>
                            <li style={{ marginBottom: '8px', color: 'var(--rose-deep)' }}>❌ GED NOT Accepted</li>
                        </ul>
                        <p style={{ fontSize: '0.85rem', color: 'var(--gray-medium)', marginTop: '8px' }}>
                            * Must have good English proficiency.
                        </p>
                    </div>
                </div>

                {/* Structure */}
                <div style={{ marginTop: '40px' }} data-aos="fade-up">
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', color: 'var(--gray-darker)' }}>
                        Curriculum Structure
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                        <div className="card" style={{ background: 'var(--rose-light)' }}>
                            <h4 style={{ color: 'var(--rose-deep)', marginBottom: '12px' }}>Plan 1 (2+2)</h4>
                            <p style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                                Study <strong>Years 1 & 2</strong> at Mahasarakham University, Thailand.<br />
                                Study <strong>Years 3 & 4</strong> at School of Computer Science and Technology, Chongqing University of Posts and Telecommunications (CQUPT), China.
                            </p>
                            <div style={{ marginTop: '16px', fontWeight: 600 }}>Total Credits: ≥ 134</div>
                        </div>
                        <div className="card" style={{ background: 'var(--white-soft)', border: '1px solid var(--gray-light)' }}>
                            <h4 style={{ color: 'var(--gray-darker)', marginBottom: '12px' }}>Plan 2 (4 Years at MSU)</h4>
                            <p style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                                Study at Mahasarakham University throughout the entire program.
                            </p>
                            <div style={{ marginTop: '38px', fontWeight: 600 }}>Total Credits: ≥ 131</div>
                        </div>
                    </div>
                </div>

                {/* Career Opportunities */}
                <div style={{ marginTop: '60px' }} data-aos="fade-up">
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '30px', textAlign: 'center' }}>
                        Career <span className="gradient-text">Opportunities</span>
                    </h3>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: '20px'
                    }}>
                        {[
                            {
                                title: "Software Development",
                                roles: ["Programmer", "Mobile Developer", "Web Developer", "IoT Developer", "Machine Learning Expert", "Algorithm Developer"]
                            },
                            {
                                title: "System Design & Testing",
                                roles: ["System Analyst", "Software Tester", "UX/UI Designer", "Data Analyst"]
                            },
                            {
                                title: "Network & Security",
                                roles: ["Network Administrator", "Cybersecurity Specialist", "Database Administrator", "System Engineer"]
                            },
                            {
                                title: "Management & Support",
                                roles: ["Project Manager", "Software Engineer", "Researcher", "IT Officer", "Lecturer"]
                            }
                        ].map((group, idx) => (
                            <div key={idx} className="card" style={{ height: '100%' }}>
                                <h5 style={{ fontSize: '1.1rem', color: 'var(--rose-deep)', marginBottom: '12px' }}>{group.title}</h5>
                                <ul style={{ paddingLeft: '20px', margin: 0, fontSize: '0.9rem', color: 'var(--gray-dark)' }}>
                                    {group.roles.map((role, rIdx) => (
                                        <li key={rIdx} style={{ marginBottom: '4px' }}>{role}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
