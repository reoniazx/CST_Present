'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Programs from './components/Programs';
import Features from './components/Features';
import Faculty from './components/Faculty';
import Footer from './components/Footer';

export default function Home() {
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

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Programs />
      <Features />
      <Faculty />
      <Footer />
    </main>
  );
}
