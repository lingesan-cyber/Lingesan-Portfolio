import React from 'react';
import useMagneticEffect from '../hooks/useMagneticEffect';
import useLenis from '../hooks/useLenis';

export const Footer: React.FC = () => {
  const { scrollTo } = useLenis();
  const magBackToTop = useMagneticEffect<HTMLButtonElement>(0.3);

  // social links removed per request

  return (
    <footer
      style={{
        width: '100%',
        backgroundColor: 'transparent',
        padding: '3rem 6vw',
        borderTop: '1px solid rgba(157, 78, 221, 0.15)',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        position: 'relative',
        zIndex: 5
      }}
    >
      <div
        className="footer-row"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}
      >
        {/* Left Column: Copyright */}
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            color: 'var(--text-secondary)',
            letterSpacing: '0.05em'
          }}
        >
          @2026-Lingesan
        </div>

        {/* Right Column: Social Links & Back To Top */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2.5rem',
            flexWrap: 'wrap'
          }}
        >
          {/* Social links removed per user request */}

          {/* Magnetic Back to Top Trigger */}
          <button
            ref={magBackToTop}
            onClick={() => scrollTo(0)}
            className="magnetic-item hover-target"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'var(--accent-color)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '0.5rem 1rem',
              backgroundColor: 'rgba(255, 107, 53, 0.05)',
              border: '1px solid rgba(255, 107, 53, 0.15)',
              borderRadius: '20px',
              transition: 'background-color 0.3s ease, border-color 0.3s ease'
            }}
            onMouseEnter={(e) => {
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.backgroundColor = 'var(--accent-color)';
              btn.style.borderColor = 'var(--accent-color)';
              btn.style.color = 'var(--bg-color)';
            }}
            onMouseLeave={(e) => {
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.backgroundColor = 'rgba(255, 107, 53, 0.05)';
              btn.style.borderColor = 'rgba(255, 107, 53, 0.15)';
              btn.style.color = 'var(--accent-color)';
            }}
          >
            BACK TO TOP ↑
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 576px) {
          .footer-row {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
