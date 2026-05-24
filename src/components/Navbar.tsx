import React, { useState, useEffect } from 'react';
import useMagneticEffect from '../hooks/useMagneticEffect';
import useLenis from '../hooks/useLenis';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollTo } = useLenis();

  // Create magnetic hooks for links
  const magLogo = useMagneticEffect<HTMLDivElement>(0.2);
  const magLink1 = useMagneticEffect<HTMLButtonElement>(0.3);
  const magLink2 = useMagneticEffect<HTMLButtonElement>(0.3);
  const magLink3 = useMagneticEffect<HTMLButtonElement>(0.3);
  const magLink4 = useMagneticEffect<HTMLButtonElement>(0.3);
  const magHamburger = useMagneticEffect<HTMLButtonElement>(0.2);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Work', target: '#projects', ref: magLink1 },
    { label: 'About', target: '#about', ref: magLink2 },
    { label: 'Skills', target: '#skills', ref: magLink3 },
    { label: 'Contact', target: '#contact', ref: magLink4 },
  ];

  const handleNavClick = (target: string) => {
    setIsMenuOpen(false);
    scrollTo(target);
  };

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 999,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: isScrolled ? '1.2rem 3rem' : '2rem 4rem',
          backgroundColor: 'transparent',
          transition: 'padding 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
          pointerEvents: 'none'
        }}
      >
        {/* Left: Logo */}
        <div
          ref={magLogo}
          onClick={() => handleNavClick('#hero')}
          className="magnetic-item"
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '1.4rem',
            fontWeight: 800,
            letterSpacing: '-0.05em',
            color: 'var(--text-primary)',
            pointerEvents: 'auto',
            mixBlendMode: 'difference',
            userSelect: 'none'
          }}
        >
          PORT<span style={{ color: 'var(--accent-color)' }}>FOLIO</span>.
        </div>

        {/* Right: Desktop Links */}
        <div
          style={{
            display: 'flex',
            gap: '2.5rem',
            alignItems: 'center',
            pointerEvents: 'auto'
          }}
          className="desktop-menu"
        >
          {navLinks.map((link, idx) => (
            <button
              key={idx}
              ref={link.ref}
              onClick={() => handleNavClick(link.target)}
              className="magnetic-item"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                fontWeight: 500,
                color: 'var(--text-secondary)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                padding: '0.5rem 1rem',
                mixBlendMode: 'difference',
                transition: 'color 0.3s ease'
              }}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Mobile: Hamburger Button */}
        <button
          ref={magHamburger}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="magnetic-item mobile-hamburger"
          style={{
            display: 'none',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '6px',
            width: '40px',
            height: '40px',
            pointerEvents: 'auto',
            mixBlendMode: 'difference',
            zIndex: 1001
          }}
        >
          <span
            style={{
              width: '24px',
              height: '2px',
              backgroundColor: 'var(--text-primary)',
              transform: isMenuOpen ? 'rotate(45deg) translate(5px, 6px)' : 'none',
              transition: 'transform 0.3s ease, background-color 0.3s ease'
            }}
          />
          <span
            style={{
              width: '24px',
              height: '2px',
              backgroundColor: 'var(--text-primary)',
              opacity: isMenuOpen ? 0 : 1,
              transition: 'opacity 0.2s ease'
            }}
          />
          <span
            style={{
              width: '24px',
              height: '2px',
              backgroundColor: 'var(--text-primary)',
              transform: isMenuOpen ? 'rotate(-45deg) translate(5px, -6px)' : 'none',
              transition: 'transform 0.3s ease, background-color 0.3s ease'
            }}
          />
        </button>
      </nav>

      {/* Full Screen Mobile Overlay */}
      {isMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#070707',
            zIndex: 998,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '10% 8%',
            boxSizing: 'border-box'
          }}
        >
          {/* Subheading */}
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              marginBottom: '2rem',
              textTransform: 'uppercase',
              letterSpacing: '0.2em'
            }}
          >
            NAVIGATION INDEX
          </div>

          {/* Links */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem'
            }}
          >
            {navLinks.map((link, idx) => (
              <div
                key={idx}
                style={{ overflow: 'hidden' }}
              >
                <button
                  onClick={() => handleNavClick(link.target)}
                  style={{
                    fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '-0.02em',
                    color: 'var(--text-primary)',
                    textAlign: 'left',
                    width: '100%',
                    transition: 'color 0.3s ease',
                    display: 'block'
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLButtonElement).style.color = 'var(--accent-color)';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLButtonElement).style.color = 'var(--text-primary)';
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', color: 'var(--accent-color)', marginRight: '1rem', verticalAlign: 'middle' }}>
                    0{idx + 1}
                  </span>
                  {link.label}
                </button>
              </div>
            ))}
          </div>

          {/* Social Links on menu bottom */}
          <div
            style={{
              marginTop: 'auto',
              display: 'flex',
              gap: '2rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              color: 'var(--text-secondary)'
            }}
          >
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover-target">GITHUB</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover-target">LINKEDIN</a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover-target">TWITTER</a>
          </div>
        </div>
      )}

      {/* Global CSS Inject for hamburger responsive toggle */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-menu {
            display: none !important;
          }
          .mobile-hamburger {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
