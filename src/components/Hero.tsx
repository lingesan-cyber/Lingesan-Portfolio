import React, { useEffect } from 'react';
import gsap from 'gsap';
import Hero3D from './Hero3D';
import useLenis from '../hooks/useLenis';
import useMagneticEffect from '../hooks/useMagneticEffect';

export const Hero: React.FC = () => {
  const { scrollTo } = useLenis();
  const magScroll = useMagneticEffect<HTMLDivElement>(0.25);

  useEffect(() => {
    // 1. Initialize starting values using GSAP to prevent React inline transform style conflicts
    gsap.set('.hero-title-1', { opacity: 0, y: 25 });
    gsap.set('.hero-name-line', { opacity: 0, scaleX: 0 });
    gsap.set('.hero-fade-in', { opacity: 0, y: 20 });

    // GSAP Entrance Timeline
    const tl = gsap.timeline({ delay: 0.1 });

    // 2. Reveal name LINGESAN RN first (failsafe translation & fade)
    tl.to('.hero-title-1', {
      opacity: 1,
      y: 0,
      duration: 1.1,
      ease: 'power3.out',
    });

    // 3. Draw the glowing starlight accent line under the name
    tl.to('.hero-name-line', {
      scaleX: 1,
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.7');

    // 4. Fade in all metadata tags, cards, and scroll indicator
    tl.to('.hero-fade-in', {
      opacity: 1,
      y: 0,
      stagger: 0.08,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.6');

    // 5. Infinite drawing scroll line animation
    gsap.fromTo('.scroll-draw-line', 
      { scaleY: 0, transformOrigin: 'top' },
      { scaleY: 1, duration: 1.5, repeat: -1, ease: 'power2.inOut', yoyo: true }
    );
  }, []);

  const tags = [
    'Electronics Engineering',
    'Frontend Dev',
    'PCB Design',
    'Embedded Systems',
    'Tech Explorer'
  ];

  return (
    <section
      id="hero"
      style={{
        width: '100%',
        minHeight: '100vh',
        position: 'relative',
        backgroundColor: 'var(--bg-color)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '9rem 6vw 6rem 6vw',
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}
    >
      {/* 3D WebGL Cosmic Canvas Sphere Layer */}
      <Hero3D />

      {/* Hero Display Typography Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          width: '100%'
        }}
      >
        <div style={{ maxWidth: '90%' }}>
          
          {/* Welcoming Greeting */}
          <div
            className="hero-fade-in"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
              fontWeight: 400,
              color: 'var(--text-primary)',
              marginBottom: '0.8rem',
              opacity: 0
            }}
          >
            Hi! I'm
          </div>

          {/* Main Name Header with starlight gradient & highlight underbar */}
          <div style={{ display: 'inline-block', position: 'relative', marginBottom: '0.8rem' }}>
            <h1
              className="hero-title-1 hero-name-gradient"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(2.2rem, 5.2vw, 3.8rem)', // Cleaner, non-massive elegant scale
                fontWeight: 800,
                letterSpacing: '-0.03em',
                textTransform: 'uppercase',
                display: 'inline-block',
                textShadow: '0 0 45px rgba(0,240,255,0.15)',
                margin: 0,
                opacity: 0,
                willChange: 'transform, opacity'
              }}
            >
              LINGESAN RN
            </h1>
            <div 
              className="hero-name-line"
              style={{ 
                width: '100%', 
                height: '3px', 
                background: 'linear-gradient(to right, var(--accent-color), var(--accent-secondary))', 
                marginTop: '0.6rem',
                boxShadow: '0 0 12px rgba(0, 240, 255, 0.45)',
                borderRadius: '2px',
                opacity: 0,
                transformOrigin: 'left',
                willChange: 'transform, opacity'
              }} 
            />
          </div>

          {/* Quantum Roles */}
          <div
            className="hero-fade-in"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(0.95rem, 2vw, 1.3rem)',
              fontWeight: 600,
              color: 'var(--accent-color)',
              letterSpacing: '0.02em',
              marginTop: '1.2rem',
              opacity: 0,
              textShadow: '0 0 10px rgba(0, 240, 255, 0.35)'
            }}
          >
            Electronics Engineering | Frontend Developer | Tech Explorer
          </div>

          {/* Detailed Core Description */}
          <p
            className="hero-fade-in"
            style={{
              marginTop: '1.5rem',
              fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
              color: 'var(--text-secondary)',
              maxWidth: '680px',
              lineHeight: 1.6,
              opacity: 0
            }}
          >
            Creating AI-powered solutions. Building modern web experiences. Solving real-world problems with technology.
          </p>

          {/* Pill Tags */}
          <div
            className="hero-fade-in"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.6rem',
              marginTop: '2rem',
              opacity: 0
            }}
          >
            {tags.map((tag, idx) => (
              <span
                key={idx}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--text-primary)',
                  backgroundColor: 'rgba(157, 78, 221, 0.08)',
                  border: '1px solid rgba(157, 78, 221, 0.25)',
                  boxShadow: '0 0 15px rgba(157, 78, 221, 0.05)',
                  padding: '0.5rem 1.1rem',
                  borderRadius: '25px'
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Sleek Metadata Cards Grid */}
          <div
            className="hero-fade-in"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.2rem',
              marginTop: '2.8rem',
              maxWidth: '850px',
              width: '100%',
              opacity: 0
            }}
          >
            {/* Card 1: Location */}
            <div
              style={{
                backgroundColor: 'rgba(13, 6, 26, 0.45)',
                border: '1px solid rgba(157, 78, 221, 0.15)',
                borderRadius: '10px',
                padding: '1.2rem 1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.4rem',
                boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
              }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-color)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                📍 Location
              </span>
              <span style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                Salem, Tamilnadu
              </span>
            </div>

            {/* Card 2: Expertise */}
            <div
              style={{
                backgroundColor: 'rgba(13, 6, 26, 0.45)',
                border: '1px solid rgba(157, 78, 221, 0.15)',
                borderRadius: '10px',
                padding: '1.2rem 1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.4rem',
                boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
              }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                💼 Expertise
              </span>
              <span style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                PCB, Embedded, Developer
              </span>
            </div>

            {/* Card 3: Contact */}
            <div
              style={{
                backgroundColor: 'rgba(13, 6, 26, 0.45)',
                border: '1px solid rgba(157, 78, 221, 0.15)',
                borderRadius: '10px',
                padding: '1.2rem 1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.4rem',
                boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
              }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                📞 Contact
              </span>
              <a 
                href="mailto:lingesanravikumar@gmail.com" 
                className="hover-target"
                style={{ 
                  fontSize: '0.92rem', 
                  fontWeight: 500, 
                  color: 'var(--text-primary)', 
                  wordBreak: 'break-all', 
                  transition: 'color 0.3s ease' 
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-color)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
              >
                lingesanravikumar@gmail.com
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Scroll Indicator (Pushed to bottom-right out of overlay card blocks) */}
      <div
        className="hero-fade-in"
        ref={magScroll}
        onClick={() => scrollTo('#about')}
        style={{
          position: 'absolute',
          bottom: '3vh',
          right: '6vw',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
          cursor: 'pointer',
          opacity: 0,
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          color: 'var(--text-secondary)',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          padding: '10px'
        }}
      >
        <span>SCROLL</span>
        <div
          style={{
            width: '1px',
            height: '45px',
            backgroundColor: 'rgba(255,255,255,0.15)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div
            className="scroll-draw-line"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'var(--accent-color)'
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
