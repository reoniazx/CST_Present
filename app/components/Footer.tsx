'use client';

import { useEffect } from 'react';
import { useLoading } from '../contexts/LoadingContext';

export default function Footer() {
  const { registerSection } = useLoading();

  useEffect(() => {
    registerSection('footer');
  }, [registerSection]);

  const footerLinks = {
    Programs: ["Bachelor's Degree", 'AI Track', 'Cybersecurity Track', 'Cloud Track'],
    'About Us': ['History', 'Faculty', 'Research', 'News'],
    Students: ['Apply', 'Scholarships', 'Activities', 'Alumni'],
    Contact: ['Map', 'Email', 'Phone', 'FAQ'],
  };

  const socialLinks = [
    { icon: '📘', name: 'Facebook', url: '#' },
    { icon: '📸', name: 'Instagram', url: '#' },
    { icon: '🐦', name: 'Twitter', url: '#' },
    { icon: '💼', name: 'LinkedIn', url: '#' },
    { icon: '📺', name: 'YouTube', url: '#' },
  ];

  return (
    <footer
      id="footer"
      className="footerRoot"
      style={{
        background:
          'linear-gradient(180deg, var(--white-pure) 0%, var(--rose-light) 50%, var(--rose-soft) 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="topWave" aria-hidden="true" />

      <div className="container footerContainer">
        {/* Main Footer Content */}
        <div className="footerGrid">
          {/* Brand Column */}
          <div className="brandCol" data-aos="fade-up">
            <div className="brandRow">
              <div className="brandLogo">CS</div>
              <div>
                <div className="brandName">CS International</div>
                <div className="brandSub">MSU</div>
              </div>
            </div>

            <p className="brandDesc">
              Computer Science International Program
              <br />
              Mahasarakham University
            </p>

            {/* Social Links */}
            <div className="socialRow" aria-label="Social links">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="socialLink"
                  aria-label={social.name}
                  title={social.name}
                >
                  <span aria-hidden="true">{social.icon}</span>
                  <span className="srOnly">{social.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns (Desktop) */}
          <div className="linkColsDesktop">
            {Object.entries(footerLinks).map(([title, links], index) => (
              <div key={title} className="linkCol" data-aos="fade-up" data-aos-delay={100 + index * 50}>
                <h4 className="linkTitle">{title}</h4>
                <ul className="linkList">
                  {links.map((link, linkIndex) => (
                    <li key={linkIndex} className="linkItem">
                      <a href="#" className="footerLink">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Link Columns (Mobile Accordion) */}
          <div className="linkColsMobile" aria-label="Footer navigation">
            {Object.entries(footerLinks).map(([title, links]) => (
              <details key={title} className="accordion">
                <summary className="accordionSummary">{title}</summary>
                <ul className="accordionList">
                  {links.map((link, i) => (
                    <li key={i} className="linkItem">
                      <a href="#" className="footerLink">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="newsletterCard" data-aos="fade-up" data-aos-delay="300">
          <div className="newsletterText">
            <h4 className="newsletterTitle">📬 Get the Latest Updates</h4>
            <p className="newsletterDesc">Subscribe for program news and events</p>
          </div>

          <div className="newsletterForm">
            <input type="email" placeholder="Your email" className="emailInput" />
            <button className="btn-primary newsletterBtn" type="button">
              <span>Subscribe</span>
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="bottomBar flex justify-center items-center">
          <p className="copyright">
            © 2026 CST International, Developed by Chatchawan Chanprom CST 4th Year
          </p>

          {/* <div className="bottomLinks">
            <a href="#" className="bottomLink">
              Privacy Policy
            </a>
            <a href="#" className="bottomLink">
              Terms of Use
            </a>
          </div> */}
        </div>
      </div>

      <style jsx>{`
        /* ---- Base ---- */
        .footerContainer {
          padding-top: 96px;
          padding-bottom: 40px;
          position: relative;
          z-index: 1;
        }

        .topWave {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 84px;
          background: var(--white-pure);
          clip-path: ellipse(60% 100% at 50% 0%);
        }

        .footerGrid {
          display: grid;
          grid-template-columns: 1.2fr 3.8fr;
          gap: 48px;
          margin-bottom: 52px;
          align-items: start;
        }

        .brandRow {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 18px;
        }

        .brandLogo {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, var(--rose-medium), var(--rose-accent));
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-family: Outfit, sans-serif;
          font-weight: 800;
          font-size: 1.25rem;
          box-shadow: var(--shadow-soft);
          flex: 0 0 auto;
        }

        .brandName {
          font-family: Outfit, sans-serif;
          font-weight: 700;
          font-size: 1.1rem;
          color: var(--gray-darker);
          line-height: 1.2;
        }

        .brandSub {
          font-size: 0.75rem;
          color: var(--gray-medium);
          margin-top: 2px;
        }

        .brandDesc {
          color: var(--gray-medium);
          font-size: 0.95rem;
          line-height: 1.7;
          margin-bottom: 20px;
        }

        .socialRow {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .socialLink {
          width: 44px;
          height: 44px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: var(--white-pure);
          border-radius: 12px;
          font-size: 1.25rem;
          box-shadow: var(--shadow-soft);
          text-decoration: none;
          transition: var(--transition-medium);
          outline: none;
          -webkit-tap-highlight-color: transparent;
        }

        .socialLink:focus-visible {
          box-shadow: 0 0 0 3px rgba(196, 160, 165, 0.45);
        }

        /* Hover only on devices that actually hover */
        @media (hover: hover) and (pointer: fine) {
          .socialLink:hover {
            transform: translateY(-4px) scale(1.06);
            background: var(--rose-light);
          }
          .footerLink:hover {
            color: var(--rose-deep);
            transform: translateX(4px);
          }
          .bottomLink:hover {
            color: var(--rose-deep);
          }
        }

        .socialLink:active {
          transform: scale(0.98);
        }

        /* Desktop link columns */
        .linkColsDesktop {
          display: grid;
          grid-template-columns: repeat(4, minmax(160px, 1fr));
          gap: 40px;
        }

        .linkTitle {
          font-size: 1rem;
          font-family: Outfit, sans-serif;
          font-weight: 700;
          color: var(--gray-darker);
          margin-bottom: 18px;
        }

        .linkList {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .linkItem {
          margin-bottom: 12px;
        }

        .footerLink {
          color: var(--gray-medium);
          text-decoration: none;
          font-size: 0.95rem;
          transition: var(--transition-fast);
          display: inline-block;
          outline: none;
        }

        .footerLink:focus-visible {
          box-shadow: 0 0 0 3px rgba(196, 160, 165, 0.35);
          border-radius: 10px;
        }

        /* Mobile accordion hidden on desktop */
        .linkColsMobile {
          display: none;
        }

        /* Newsletter */
        .newsletterCard {
          padding: 32px;
          background: var(--white-pure);
          border-radius: 24px;
          box-shadow: var(--shadow-soft);
          margin-bottom: 56px;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
        }

        .newsletterTitle {
          font-size: 1.25rem;
          font-family: Outfit, sans-serif;
          font-weight: 700;
          color: var(--gray-darker);
          margin: 0 0 6px 0;
        }

        .newsletterDesc {
          color: var(--gray-medium);
          font-size: 0.95rem;
          margin: 0;
        }

        .newsletterForm {
          display: flex;
          gap: 12px;
          align-items: center;
          flex-wrap: wrap;
        }

        .emailInput {
          padding: 14px 18px;
          border: 2px solid var(--gray-light);
          border-radius: 999px;
          font-size: 0.95rem;
          min-width: 260px;
          outline: none;
          transition: var(--transition-medium);
        }

        .emailInput:focus {
          border-color: var(--rose-medium);
        }

        .newsletterBtn {
          white-space: nowrap;
        }

        /* Bottom bar */
        .bottomBar {
          padding-top: 22px;
          border-top: 1px solid rgba(196, 160, 165, 0.3);
          gap: 12px;
        }

        .copyright {
          color: var(--gray-medium);
          font-size: 0.9rem;
          margin: 0;
        }

        .bottomLinks {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
        }

        .bottomLink {
          color: var(--gray-medium);
          font-size: 0.9rem;
          text-decoration: none;
          transition: var(--transition-fast);
          outline: none;
        }

        .bottomLink:focus-visible {
          box-shadow: 0 0 0 3px rgba(196, 160, 165, 0.35);
          border-radius: 10px;
        }

        /* SR-only text */
        .srOnly {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .socialLink,
          .footerLink,
          .bottomLink,
          .emailInput {
            transition: none !important;
          }
        }

        /* ---- Tablet & Mobile ---- */
        @media (max-width: 768px) {
          .footerContainer {
            padding-top: 76px;
          }

          .topWave {
            height: 70px;
          }

          .footerGrid {
            grid-template-columns: 1fr;
            gap: 28px;
          }

          .linkColsDesktop {
            display: none;
          }

          .linkColsMobile {
            display: grid;
            gap: 12px;
          }

          .accordion {
            background: var(--white-pure);
            border-radius: 16px;
            box-shadow: var(--shadow-soft);
            overflow: hidden;
          }

          .accordionSummary {
            cursor: pointer;
            padding: 14px 16px;
            font-family: Outfit, sans-serif;
            font-weight: 700;
            color: var(--gray-darker);
            list-style: none;
            outline: none;
          }

          .accordionSummary:focus-visible {
            box-shadow: inset 0 0 0 3px rgba(196, 160, 165, 0.35);
          }

          .accordionList {
            list-style: none;
            padding: 0 16px 14px 16px;
            margin: 0;
          }

          .newsletterCard {
            padding: 22px;
            border-radius: 18px;
            align-items: stretch;
          }

          .newsletterForm {
            width: 100%;
          }

          .emailInput {
            width: 100%;
            min-width: 0;
          }

          .newsletterBtn {
            width: 100%;
          }

          .socialLink {
            width: 40px;
            height: 40px;
            border-radius: 10px;
            font-size: 1.1rem;
          }

          .brandLogo {
            width: 40px;
            height: 40px;
            border-radius: 12px;
            font-size: 1.1rem;
          }
        }

        @media (max-width: 480px) {
          .footerContainer {
            padding-top: 68px;
            padding-bottom: 32px;
          }

          .newsletterTitle {
            font-size: 1.1rem;
          }

          .newsletterDesc,
          .brandDesc {
            font-size: 0.9rem;
          }

          .socialLink {
            width: 36px;
            height: 36px;
            border-radius: 9px;
            font-size: 1rem;
          }

          .brandLogo {
            width: 36px;
            height: 36px;
            border-radius: 10px;
            font-size: 1rem;
          }

          .bottomBar {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }

          .copyright,
          .bottomLink {
            font-size: 0.8rem;
          }

          .bottomLinks {
            justify-content: center;
            gap: 14px;
          }
        }
      `}</style>
    </footer>
  );
}
