'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function PhotoGallery() {
    const images = Array.from({ length: 20 }, (_, i) => `/CQUPT/${i + 1}.jpg`);

    // --- สร้าง Array 4 ชุด ที่จุดเริ่มต้นรูปภาพต่างกัน (Shifting) ---

    // Row 1: เริ่มรูปที่ 1
    const row1Images = [...images, ...images];

    // Row 2: เริ่มรูปที่ 6 (ตัด 5 รูปแรกไปต่อท้าย)
    const shift2 = 5;
    const row2Images = [...images.slice(shift2), ...images.slice(0, shift2), ...images.slice(shift2), ...images.slice(0, shift2)];

    // Row 3: เริ่มรูปที่ 11
    const shift3 = 10;
    const row3Images = [...images.slice(shift3), ...images.slice(0, shift3), ...images.slice(shift3), ...images.slice(0, shift3)];

    // Row 4: เริ่มรูปที่ 16
    const shift4 = 15;
    const row4Images = [...images.slice(shift4), ...images.slice(0, shift4), ...images.slice(shift4), ...images.slice(0, shift4)];

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
            <div className="container" style={{ marginBottom: '50px', textAlign: 'center' }}>
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

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                {/* --- Row 1: ซ้ายไปขวา (Normal Speed) --- */}
                <div className="marquee-container">
                    <div className="marquee-content anim-row-1">
                        {row1Images.map((src, index) => (
                            <GalleryItem key={`row1-${index}`} src={src} index={index} />
                        ))}
                    </div>
                </div>

                {/* --- Row 2: ขวาไปซ้าย (Slow) --- */}
                <div className="marquee-container">
                    <div className="marquee-content anim-row-2">
                        {row2Images.map((src, index) => (
                            <GalleryItem key={`row2-${index}`} src={src} index={index} />
                        ))}
                    </div>
                </div>

                {/* --- Row 3: ซ้ายไปขวา (Fast) --- */}
                <div className="marquee-container">
                    <div className="marquee-content anim-row-3">
                        {row3Images.map((src, index) => (
                            <GalleryItem key={`row3-${index}`} src={src} index={index} />
                        ))}
                    </div>
                </div>

                {/* --- Row 4: ขวาไปซ้าย (Medium Speed) --- */}
                <div className="marquee-container">
                    <div className="marquee-content anim-row-4">
                        {row4Images.map((src, index) => (
                            <GalleryItem key={`row4-${index}`} src={src} index={index} />
                        ))}
                    </div>
                </div>

            </div>

            <style jsx>{`
                .marquee-container {
                    position: relative;
                    width: 100%;
                    display: flex;
                    overflow: hidden;
                    mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
                    -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
                }

                .marquee-content {
                    display: flex;
                    gap: 24px;
                    width: max-content;
                    will-change: transform;
                }

                .marquee-container:hover .marquee-content {
                    animation-play-state: paused;
                }

                /* --- Animation Config for Each Row (Desktop) --- */
                /* Row 1: Left, 60s */
                .anim-row-1 { animation: scroll-left 60s linear infinite; }
                
                /* Row 2: Right, 80s (ช้ากว่า) */
                .anim-row-2 { animation: scroll-right 80s linear infinite; }
                
                /* Row 3: Left, 50s (เร็วกว่า) */
                .anim-row-3 { animation: scroll-left 50s linear infinite; }
                
                /* Row 4: Right, 65s (กลางๆ) */
                .anim-row-4 { animation: scroll-right 65s linear infinite; }


                /* --- Keyframes Definitions --- */
                @keyframes scroll-left {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(calc(-350px * 20 - 24px * 20)); }
                }

                @keyframes scroll-right {
                    0% { transform: translateX(calc(-350px * 20 - 24px * 20)); }
                    100% { transform: translateX(0); }
                }

                /* --- Tablet --- */
                @media (max-width: 768px) {
                    .marquee-content { gap: 16px !important; }
                    
                    /* ลดเวลาลงตามสัดส่วนจอ */
                    .anim-row-1 { animation: scroll-left-mobile 40s linear infinite; }
                    .anim-row-2 { animation: scroll-right-mobile 55s linear infinite; }
                    .anim-row-3 { animation: scroll-left-mobile 35s linear infinite; }
                    .anim-row-4 { animation: scroll-right-mobile 45s linear infinite; }

                    @keyframes scroll-left-mobile {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(calc(-280px * 20 - 16px * 20)); }
                    }
                    @keyframes scroll-right-mobile {
                        0% { transform: translateX(calc(-280px * 20 - 16px * 20)); }
                        100% { transform: translateX(0); }
                    }
                }
                
                /* --- Mobile --- */
                @media (max-width: 480px) {
                    .marquee-content { gap: 12px !important; }

                    .anim-row-1 { animation: scroll-left-xs 30s linear infinite; }
                    .anim-row-2 { animation: scroll-right-xs 40s linear infinite; }
                    .anim-row-3 { animation: scroll-left-xs 25s linear infinite; }
                    .anim-row-4 { animation: scroll-right-xs 35s linear infinite; }

                    @keyframes scroll-left-xs {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(calc(-220px * 20 - 12px * 20)); }
                    }
                    @keyframes scroll-right-xs {
                        0% { transform: translateX(calc(-220px * 20 - 12px * 20)); }
                        100% { transform: translateX(0); }
                    }
                }
            `}</style>
        </section>
    );
}

// Component ย่อย (เหมือนเดิม)
function GalleryItem({ src, index }: { src: string; index: number }) {
    return (
        <div
            className="gallery-image"
            style={{
                flex: '0 0 auto',
                width: '350px',
                height: '240px',
                position: 'relative',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-medium)',
                transition: 'transform 0.3s ease',
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
                alt={`Gallery Image ${index + 1}`}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 480px) 220px, (max-width: 768px) 280px, 350px"
            />
            <style jsx>{`
                @media (max-width: 768px) {
                    .gallery-image {
                        width: 280px !important;
                        height: 190px !important;
                        border-radius: 16px !important;
                    }
                }
                @media (max-width: 480px) {
                    .gallery-image {
                        width: 220px !important;
                        height: 150px !important;
                        border-radius: 12px !important;
                    }
                }
            `}</style>
        </div>
    );
}