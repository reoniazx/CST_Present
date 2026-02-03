'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function PhotoGallery() {
    // Generate array of image paths (using first 20 images for performance)
    const images = Array.from({ length: 20 }, (_, i) => `/CQUPT/${i + 1}.jpg`);

    // Duplicate images to create seamless loop
    const displayImages = [...images, ...images];

    return (
        <section
            id="gallery"
            className="section"
            style={{
                background: 'var(--white-pure)',
                padding: '80px 0',
                overflow: 'hidden',
                position: 'relative',
            }}
        >
            <div className="container" style={{ marginBottom: '40px', textAlign: 'center' }}>
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
                    Gallery
                </div>
                <h2
                    data-aos="fade-up"
                    data-aos-delay="100"
                    style={{
                        fontSize: 'clamp(2rem, 4vw, 3rem)',
                        color: 'var(--gray-darker)',
                    }}
                >
                    Life at <span className="gradient-text">CQUPT</span>
                </h2>
            </div>

            <div className="marquee-container" style={{ position: 'relative', width: '100%', display: 'flex' }}>
                <div
                    className="marquee-content"
                    style={{
                        display: 'flex',
                        gap: '24px',
                        // Width will be handled by CSS animation
                    }}
                >
                    {displayImages.map((src, index) => (
                        <div
                            key={index}
                            style={{
                                flex: '0 0 auto',
                                width: '350px',
                                height: '240px',
                                position: 'relative',
                                borderRadius: '20px',
                                overflow: 'hidden',
                                boxShadow: 'var(--shadow-medium)',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'scale(1.05)';
                                e.currentTarget.style.zIndex = '10';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.zIndex = '1';
                            }}
                        >
                            <Image
                                src={src}
                                alt={`CST Album ${index + 1}`}
                                fill
                                style={{ objectFit: 'cover' }}
                                sizes="(max-width: 768px) 300px, 350px"
                            />
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .marquee-container {
                    mask-image: linear-gradient(
                        to right,
                        transparent,
                        black 10%,
                        black 90%,
                        transparent
                    );
                    -webkit-mask-image: linear-gradient(
                        to right,
                        transparent,
                        black 10%,
                        black 90%,
                        transparent
                    );
                }

                .marquee-content {
                    animation: scroll 40s linear infinite;
                }

                @media (max-width: 768px) {
                    .marquee-content {
                         animation: scroll 20s linear infinite;
                    }
                }

                 /* Pause on hover */
                .marquee-container:hover .marquee-content {
                    animation-play-state: paused;
                }

                @keyframes scroll {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(calc(-350px * 20 - 24px * 20)); /* width + gap * count */
                    }
                }
            `}</style>
        </section>
    );
}
