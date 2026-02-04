'use client';

import { useLoading } from '../contexts/LoadingContext';

export default function Loading() {
    const { isLoading } = useLoading();

    return (
        <div className={`loading-screen ${!isLoading ? 'hidden' : ''}`}>
            {/* Decorative Blobs */}
            <div className="loading-blob loading-blob-1" />
            <div className="loading-blob loading-blob-2" />
            <div className="loading-blob loading-blob-3" />

            {/* Center Content */}
            <div className="loading-content">
                {/* Animated Icon */}
                <div className="loading-icon">
                    <span>🎓</span>
                </div>

                {/* Logo Text */}
                <h1 className="loading-title">
                    <span className="gradient-text">CST</span>
                </h1>

                {/* Subtitle */}
                <p className="loading-subtitle">Computer Science International</p>

                {/* Loading Dots */}
                <div className="loading-dots">
                    <span className="loading-dot" />
                    <span className="loading-dot" />
                    <span className="loading-dot" />
                </div>
            </div>
        </div>
    );
}
