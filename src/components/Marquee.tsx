import React from 'react';

export const Marquee: React.FC = () => {
  const marqueeItems = [
    "Creative Developer",
    "Designer",
    "Three.js",
    "GSAP",
    "React",
    "TypeScript",
    "WebGL",
    "Motion Design",
  ];

  // Combine items with bullet points
  const phrase = marqueeItems.join('  •  ') + '  •  ';

  return (
    <div
      style={{
        width: '100%',
        backgroundColor: '#080808',
        padding: '4rem 0',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.04)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
        position: 'relative',
        zIndex: 5
      }}
    >
      {/* Row 1: Scrolling Left */}
      <div 
        style={{ 
          display: 'flex', 
          width: '100%',
          overflow: 'hidden'
        }}
      >
        <div className="marquee-track-left">
          {[...Array(4)].map((_, idx) => (
            <span
              key={idx}
              className="marquee-item"
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: 'clamp(2.5rem, 5vw, 5.5rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
                whiteSpace: 'nowrap'
              }}
            >
              {phrase}
            </span>
          ))}
        </div>
      </div>

      {/* Row 2: Scrolling Right */}
      <div 
        style={{ 
          display: 'flex', 
          width: '100%',
          overflow: 'hidden'
        }}
      >
        <div className="marquee-track-right">
          {[...Array(4)].map((_, idx) => (
            <span
              key={idx}
              className="marquee-item"
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: 'clamp(2.5rem, 5vw, 5.5rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                color: 'var(--accent-color)', // Highlighted accent color
                letterSpacing: '-0.02em',
                whiteSpace: 'nowrap'
              }}
            >
              {phrase}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marquee;
