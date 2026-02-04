'use client';

import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import { LoadingProvider } from './contexts/LoadingContext';
import Loading from './components/Loading';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Programs from './components/Programs';
import Features from './components/Features';
import PhotoGallery from './components/PhotoGallery';
import Faculty from './components/Faculty';
import Footer from './components/Footer';
import Curriculum from './components/Curriculum';

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50,
    });

    // Refresh AOS on scroll (for dynamic content)
    const handleScroll = () => {
      AOS.refresh();
    };

    try {
      const hasSeen = window.localStorage.getItem('cst_welcome_seen');
      if (!hasSeen) {
        setShowWelcome(true);
        window.localStorage.setItem('cst_welcome_seen', 'true');
      }
    } catch {
      setShowWelcome(true);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!showWelcome) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showWelcome]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowWelcome(false);
      setIsClosing(false);
    }, 500);
  };

  return (
    <LoadingProvider>
      <Loading />
      <main>
        {showWelcome && (
          <div
            className={`welcome-overlay ${isClosing ? 'closing' : ''}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="welcome-title"
            onClick={handleClose}
          >
            <div className={`welcome-modal glass ${isClosing ? 'closing' : ''}`} onClick={(event) => event.stopPropagation()}>
              <button
                className="welcome-close"
                type="button"
                aria-label="Close welcome popup"
                onClick={handleClose}
              >
                x
              </button>
              <h2 id="welcome-title" className="welcome-title gradient-text">
                Hello
              </h2>
              <p className="welcome-text">Welcome to Computer Science International.</p>
              <div className="welcome-actions">
                <button className="btn-primary" type="button" onClick={handleClose}>
                  <span>Continue</span>
                </button>
              </div>
            </div>
          </div>
        )}
        <Navbar />
        <Hero />
        <PhotoGallery />
        <About />
        <Programs />
        <Curriculum />
        <Features />
        <Faculty />
        <Footer />
      </main>
    </LoadingProvider>
  );
}
