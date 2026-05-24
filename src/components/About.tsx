import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useMagneticEffect from '../hooks/useMagneticEffect';
import aboutBoy from '../assets/about_boy.png';

// Register scroll plugin
gsap.registerPlugin(ScrollTrigger);



export const About: React.FC = () => {
  const downloadBtn = useMagneticEffect<HTMLButtonElement>(0.25);
  const triggerRef = useRef<HTMLDivElement>(null);
  
  // States for counting numbers
  const [years, setYears] = useState(0);
  const [projects, setProjects] = useState(0);
  const [clients, setClients] = useState(0);

  useEffect(() => {
    // Failsafe ScrollTrigger refresh to recalibrate coordinates after layout settlement
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    // 1. Heading Scroll Trigger reveal (trigger as soon as it enters viewport bottom)
    gsap.to('.about-title', {
      opacity: 1,
      y: 0,
      duration: 1.0,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.about-title',
        start: 'top 95%',
        once: true // Play animation once for smooth user experience
      }
    });

    // Initialize left-column items and right-side 3D column to their starting states
    gsap.set('.about-fade-item', { opacity: 0, y: 25 });
    gsap.set('.about-3d-col', { opacity: 0, scale: 0.9, rotateY: -15, transformPerspective: 1000 });
    // 2. Cascade Staggered Entrance Reveal for left-column items
    gsap.to('.about-fade-item', {
      opacity: 1,
      y: 0,
      duration: 1.0,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.about-grid',
        start: 'top 85%',
        once: true
      }
    });

    // 3. Staggered 3D Card Reveal for right column
    gsap.to('.about-3d-col', {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      duration: 1.3,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.about-grid',
        start: 'top 80%',
        once: true
      }
    });

    // 4. Stats numerical count up scroll triggers
    const statsTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '.stats-row',
        start: 'top 85%',
      }
    });

    const yearsObj = { val: 0 };
    const projectsObj = { val: 0 };
    const clientsObj = { val: 0 };

    statsTimeline.to(yearsObj, {
      val: 2,
      duration: 1.8,
      ease: 'power2.out',
      onUpdate: () => setYears(Math.ceil(yearsObj.val))
    });

    statsTimeline.to(projectsObj, {
      val: 5,
      duration: 2,
      ease: 'power2.out',
      onUpdate: () => setProjects(Math.ceil(projectsObj.val))
    }, '-=1.4');

    statsTimeline.to(clientsObj, {
      val: 10,
      duration: 1.8,
      ease: 'power2.out',
      onUpdate: () => setClients(Math.ceil(clientsObj.val))
    }, '-=1.6');

    // 5. Download Underline Draw Reveal
    gsap.fromTo('.btn-underline',
      { scaleX: 0, transformOrigin: 'left' },
      {
        scaleX: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.btn-underline',
          start: 'top 90%'
        }
      }
    );

    return () => {
      clearTimeout(refreshTimer);
    };
  }, []);

  return (
    <section
      id="about"
      ref={triggerRef}
      style={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: 'transparent',
        padding: '8rem 6vw',
        boxSizing: 'border-box',
        position: 'relative',
        zIndex: 4,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      {/* Heading */}
      <div style={{ marginBottom: '4.5rem' }}>
        <h2
          className="section-title about-title"
          style={{
            fontFamily: 'var(--font-sans)',
            color: 'var(--text-primary)',
            opacity: 0,
            transform: 'translateY(20px)',
            willChange: 'transform, opacity'
          }}
        >
          ABOUT ME
        </h2>
        <div style={{ width: '60px', height: '2px', backgroundColor: 'var(--accent-color)', marginTop: '1rem' }} />
      </div>

      {/* Two Column Section */}
      <div
        className="about-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          gap: '4rem',
          alignItems: 'center'
        }}
      >
        {/* Left Column Description */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          <div
            className="about-body-text"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem'
            }}
          >
            <h3
              className="about-fade-item"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(1.35rem, 3vw, 1.85rem)',
                fontWeight: 600,
                lineHeight: 1.4,
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
                marginBottom: '0.4rem'
              }}
            >
              I’m Lingesan, an engineering student passionate about building innovative technology solutions that combine both hardware and software.
            </h3>
            
            <p
              className="about-fade-item"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                fontWeight: 400
              }}
            >
              I enjoy exploring electronics, embedded systems, web development, and 3D interactive experiences to create projects that are both functional and visually engaging.
            </p>

            <p
              className="about-fade-item"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                fontWeight: 400
              }}
            >
              Currently, I focus on developing modern responsive websites, electronics-based mini projects, and creative tech solutions that solve real-world problems. I love experimenting with animations, UI/UX design, Arduino projects, sensors, and intelligent systems while continuously improving my development skills.
            </p>

            <p
              className="about-fade-item"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                fontWeight: 400
              }}
            >
              I’m always eager to learn new technologies, participate in hackathons, and collaborate on exciting projects that challenge my creativity and technical knowledge. My goal is to become a versatile engineer capable of building impactful products from concept to deployment.
            </p>
          </div>

          {/* Statistics Grid Rows */}
          <div
            className="stats-row about-fade-item"
            style={{
              display: 'flex',
              gap: '4vw',
              marginTop: '1.5rem',
              borderTop: '1px solid rgba(157,78,221,0.15)',
              paddingTop: '2.5rem'
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  lineHeight: 1
                }}
              >
                {years}+
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--text-secondary)',
                  marginTop: '0.5rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em'
                }}
              >
                Hackathons
              </div>
            </div>

            <div>
              <div
                style={{
                  fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  lineHeight: 1
                }}
              >
                {projects}+
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--text-secondary)',
                  marginTop: '0.5rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em'
                }}
              >
                Projects
              </div>
            </div>

            <div>
              <div
                style={{
                  fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  lineHeight: 1
                }}
              >
                {clients}+
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--text-secondary)',
                  marginTop: '0.5rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em'
                }}
              >
                Participation
              </div>
            </div>
          </div>

          {/* CTA Resume Button */}
          <div className="about-fade-item" style={{ marginTop: '1.5rem' }}>
            <a
              href="https://drive.google.com/uc?export=download&id=1WnYUVHDJp69l4X1-PxXR4MfSMFoFi_cW"
              download
              ref={downloadBtn as unknown as React.Ref<HTMLAnchorElement>}
              className="resume-btn hover-target"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.88rem',
                fontWeight: 600,
                color: '#ffffff',
                textTransform: 'uppercase',
                letterSpacing: '0.18em',
                padding: '0.85rem 2.2rem',
                borderRadius: '6px',
                border: '1.5px solid transparent',
                background: 'linear-gradient(#05020c, #05020c) padding-box, linear-gradient(135deg, #00f0ff, #9d4edd, #ff007f) border-box',
                boxShadow: '0 0 18px rgba(0,240,255,0.20), 0 0 35px rgba(157,78,221,0.12)',
                textDecoration: 'none',
                position: 'relative',
                transition: 'box-shadow 0.35s ease, color 0.35s ease, transform 0.25s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={e => {
                const el = e.currentTarget;
                el.style.boxShadow = '0 0 28px rgba(0,240,255,0.55), 0 0 55px rgba(157,78,221,0.35)';
                el.style.transform = 'translateY(-2px)';
                el.style.color = '#00f0ff';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget;
                el.style.boxShadow = '0 0 18px rgba(0,240,255,0.20), 0 0 35px rgba(157,78,221,0.12)';
                el.style.transform = 'translateY(0px)';
                el.style.color = '#ffffff';
              }}
            >
              {/* Download icon */}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Resume
            </a>
          </div>
        </div>

        {/* ══ RIGHT COLUMN — Animated Boy, fully blended & attractive ══ */}
        <div
          className="about-3d-col"
          style={{
            width: '100%',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'transparent',
            overflow: 'visible',
            minHeight: '520px'
          }}
        >
          {/* Outer glow ring 1 — slow spin */}
          <div className="glow-ring-1" style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '420px', height: '420px',
            borderRadius: '50%',
            border: '1.5px solid rgba(157,78,221,0.25)',
            boxShadow: '0 0 30px rgba(157,78,221,0.12), inset 0 0 30px rgba(157,78,221,0.05)',
            pointerEvents: 'none', zIndex: 1
          }} />

          {/* Inner glow ring 2 — faster spin opposite */}
          <div className="glow-ring-2" style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '310px', height: '310px',
            borderRadius: '50%',
            border: '1px solid rgba(0,240,255,0.20)',
            boxShadow: '0 0 20px rgba(0,240,255,0.08)',
            pointerEvents: 'none', zIndex: 1
          }} />

          {/* Core radial glow — purple + cyan burst */}
          <div style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '380px', height: '380px',
            background: 'radial-gradient(circle, rgba(157,78,221,0.35) 0%, rgba(0,240,255,0.18) 30%, rgba(157,78,221,0.08) 55%, transparent 72%)',
            borderRadius: '50%',
            filter: 'blur(28px)',
            pointerEvents: 'none', zIndex: 1
          }} />

          {/* Orbiting neon dot 1 */}
          <div className="orbit-dot-1" style={{
            position: 'absolute',
            top: '50%', left: '50%',
            width: '8px', height: '8px',
            marginTop: '-4px', marginLeft: '-4px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, #00f0ff, #9d4edd)',
            boxShadow: '0 0 12px rgba(0,240,255,0.9)',
            pointerEvents: 'none', zIndex: 3
          }} />

          {/* Orbiting neon dot 2 */}
          <div className="orbit-dot-2" style={{
            position: 'absolute',
            top: '50%', left: '50%',
            width: '6px', height: '6px',
            marginTop: '-3px', marginLeft: '-3px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, #9d4edd, #ff007f)',
            boxShadow: '0 0 10px rgba(157,78,221,0.9)',
            pointerEvents: 'none', zIndex: 3
          }} />

          {/* Elliptical floor glow */}
          <div style={{
            position: 'absolute',
            bottom: '6%', left: '50%',
            transform: 'translateX(-50%)',
            width: '220px', height: '28px',
            background: 'radial-gradient(ellipse, rgba(157,78,221,0.45) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(10px)',
            pointerEvents: 'none', zIndex: 1
          }} />

          {/* THE BOY — screen blend, large, centered, dramatic */}
          <img
            src={aboutBoy}
            alt="Lingesan Avatar"
            className="about-boy-img"
            style={{
              width: '92%',
              maxWidth: '400px',
              height: 'auto',
              objectFit: 'contain',
              display: 'block',
              margin: '0 auto',
              position: 'relative',
              zIndex: 2,
              mixBlendMode: 'screen',
              filter: [
                'drop-shadow(0 0 18px rgba(157,78,221,0.85))',
                'drop-shadow(0 0 40px rgba(0,240,255,0.40))',
                'drop-shadow(0 24px 40px rgba(0,0,0,0.7))',
                'brightness(1.10)',
                'saturate(1.25)',
                'contrast(1.06)'
              ].join(' '),
              animation: 'boyFloat 4s ease-in-out infinite',
              userSelect: 'none',
              pointerEvents: 'none'
            }}
          />
        </div>
      </div>

      {/* ══ Keyframes & responsive ══ */}
      <style>{`
        @keyframes boyFloat {
          0%, 100% { transform: translateY(0px) scale(1); }
          50%       { transform: translateY(-20px) scale(1.015); }
        }
        @keyframes ringSpinCW {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes ringSpinCCW {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(-360deg); }
        }
        @keyframes orbitDot1 {
          from { transform: translate(-50%, -50%) rotate(0deg) translateX(165px); }
          to   { transform: translate(-50%, -50%) rotate(360deg) translateX(165px); }
        }
        @keyframes orbitDot2 {
          from { transform: translate(-50%, -50%) rotate(180deg) translateX(122px); }
          to   { transform: translate(-50%, -50%) rotate(540deg) translateX(122px); }
        }
        .glow-ring-1 { animation: ringSpinCW 18s linear infinite; }
        .glow-ring-2 { animation: ringSpinCCW 11s linear infinite; }
        .orbit-dot-1 { animation: orbitDot1 8s linear infinite; }
        .orbit-dot-2 { animation: orbitDot2 5.5s linear infinite; }
        .about-boy-img { transform-origin: bottom center; }

        @media (max-width: 992px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
          .about-3d-col {
            min-height: 360px !important;
            order: -1 !important;
          }
          .about-boy-img {
            max-width: 280px !important;
          }
          .glow-ring-1 { width: 280px !important; height: 280px !important; }
          .glow-ring-2 { width: 210px !important; height: 210px !important; }
        }
      `}</style>
    </section>
  );
};

export default About;
