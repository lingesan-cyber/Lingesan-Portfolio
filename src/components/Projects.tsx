import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  accentColor: string;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    id: '01',
    emoji: '🛡️',
    title: 'HydraSenseWall Guard',
    subtitle: 'IoT Security System',
    description:
      'Smart wall-mounted security device using ultrasonic & PIR sensors with real-time intruder detection, water-flow monitoring, and instant alert notifications via ESP32 + Firebase.',
    tech: ['ESP32', 'Arduino', 'Firebase', 'IoT', 'C++', 'Sensors'],
    accentColor: '#00f0ff',
    githubUrl: 'https://github.com/lingesan-cyber',
    featured: true,
  },
  {
    id: '02',
    emoji: '🔐',
    title: 'Trustora',
    subtitle: 'Secure Auth Platform',
    description:
      'Full-stack authentication system with multi-factor verification, JWT token management, role-based access control, and encrypted user sessions for enterprise-grade security.',
    tech: ['React', 'Node.js', 'MongoDB', 'JWT', 'TypeScript', 'Tailwind'],
    accentColor: '#9d4edd',
    githubUrl: 'https://github.com/lingesan-cyber/Trustora.git',
    featured: true,
  },
  {
    id: '03',
    emoji: '🌐',
    title: 'Portfolio Website',
    subtitle: '3D Interactive Portfolio',
    description:
      'Premium personal portfolio with WebGL animations, GSAP scroll effects, 3D Three.js canvas, custom cursor, magnetic buttons, and a preloader built with React + TypeScript.',
    tech: ['React', 'Three.js', 'GSAP', 'TypeScript', 'Vite', 'WebGL'],
    accentColor: '#ff007f',
    liveUrl: 'https://portfoliodemo-6ran.vercel.app/',
  },
  {
    id: '04',
    emoji: '⚡',
    title: 'Arduino Smart Home',
    subtitle: 'Embedded Automation',
    description:
      'Home automation system using Arduino controlling lights, fans, and appliances via IR remote and voice commands, with an LCD display dashboard and relay module control.',
    tech: ['Arduino', 'C++', 'IR Sensor', 'LCD', 'Relay', 'PCB'],
    accentColor: '#88ce02',
    githubUrl: 'https://github.com/lingesan-cyber',
  },
  {
    id: '05',
    emoji: '🤖',
    title: 'AI Chat Assistant',
    subtitle: 'NLP Web Application',
    description:
      'Conversational AI chatbot built with Python and integrated into a React web interface, supporting context-aware responses, session memory, and a glassmorphic UI.',
    tech: ['Python', 'React', 'Flask', 'NLP', 'CSS3', 'REST API'],
    accentColor: '#f7df1e',
    githubUrl: 'https://github.com/lingesan-cyber',
  },
  {
    id: '06',
    emoji: '📡',
    title: 'PCB Signal Tracer',
    subtitle: 'Electronics Design Tool',
    description:
      'Custom PCB-based signal tracing tool designed in KiCad for debugging electronic circuits, featuring LED indicators, a buzzer alert system, and probe input circuitry.',
    tech: ['KiCad', 'PCB Design', 'Electronics', 'C++', 'Arduino', 'Eagle'],
    accentColor: '#fb923c',
    githubUrl: 'https://github.com/lingesan-cyber',
  },
  {
    id: '07',
    emoji: '🤖',
    title: 'Line-Following Robot',
    subtitle: 'Autonomous Robotics',
    description:
      'Autonomous robot built with IR sensors and L298N motor driver that follows a black line path, detects intersections, and avoids obstacles using PID control logic on Arduino Uno.',
    tech: ['Arduino', 'C++', 'IR Sensor', 'L298N', 'PID', 'Robotics'],
    accentColor: '#34d399',
    githubUrl: 'https://github.com/lingesan-cyber',
  },
  {
    id: '08',
    emoji: '🎓',
    title: 'Student Result Manager',
    subtitle: 'Full-Stack Web App',
    description:
      'Web-based student result management system with admin dashboard, mark entry forms, automated grade calculation, PDF report generation, and role-based login for staff and students.',
    tech: ['React', 'Node.js', 'MongoDB', 'Express', 'PDF.js', 'CSS3'],
    accentColor: '#a78bfa',
    githubUrl: 'https://github.com/lingesan-cyber',
    liveUrl: '#',
  },
];

export const Projects: React.FC = () => {
  useEffect(() => {
    // Heading reveal
    gsap.fromTo('.projects-title',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.projects-title', start: 'top 88%' }
      }
    );
    gsap.fromTo('.projects-subtitle-text',
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 0.9, delay: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.projects-title', start: 'top 88%' }
      }
    );

    // Card staggered entrance
    gsap.fromTo('.proj-card',
      { opacity: 0, y: 50, scale: 0.95 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.85,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.projects-grid', start: 'top 82%' }
      }
    );
  }, []);

  return (
    <section
      id="projects"
      style={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: 'transparent',
        padding: '8rem 6vw',
        boxSizing: 'border-box',
        position: 'relative',
        zIndex: 4,
      }}
    >
      {/* Heading */}
      <div style={{ marginBottom: '4rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.6rem' }}>
          <span style={{ fontSize: '1.8rem' }}>🚀</span>
          <h2
            className="projects-title"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              opacity: 0,
              margin: 0,
            }}
          >
            <span style={{ color: 'var(--text-primary)' }}>My </span>
            <span style={{ color: 'var(--accent-color)' }}>Projects</span>
          </h2>
        </div>
        <div style={{ width: '60px', height: '2px', background: 'var(--accent-color)', marginBottom: '1rem' }} />
        <p
          className="projects-subtitle-text"
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '1rem',
            color: 'var(--text-secondary)',
            opacity: 0,
            maxWidth: '520px',
            lineHeight: 1.6,
          }}
        >
          A collection of my major works —{' '}
          <span style={{ color: 'var(--accent-color)', fontWeight: 500 }}>blending</span>{' '}
          hardware innovation &{' '}
          <span style={{ color: '#9d4edd', fontWeight: 500 }}>modern web tech.</span>
        </p>
      </div>

      {/* Projects Grid */}
      <div
        className="projects-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))',
          gap: '1.6rem',
        }}
      >
        {projects.map((proj, idx) => (
          <div
            key={idx}
            className={`proj-card ${proj.featured ? 'proj-featured' : ''}`}
            style={{
              backgroundColor: 'rgba(13,6,26,0.7)',
              border: `1px solid rgba(255,255,255,0.07)`,
              borderRadius: '16px',
              padding: '1.8rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              position: 'relative',
              overflow: 'hidden',
              transition: 'border-color 0.35s ease, box-shadow 0.35s ease, transform 0.3s ease',
              cursor: 'pointer',
              backdropFilter: 'blur(8px)',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget;
              el.style.borderColor = proj.accentColor;
              el.style.boxShadow = `0 0 30px ${proj.accentColor}33, 0 8px 32px rgba(0,0,0,0.5)`;
              el.style.transform = 'translateY(-6px)';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget;
              el.style.borderColor = 'rgba(255,255,255,0.07)';
              el.style.boxShadow = 'none';
              el.style.transform = 'translateY(0)';
            }}
          >
            {/* Featured badge */}
            {proj.featured && (
              <div style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: proj.accentColor,
                border: `1px solid ${proj.accentColor}55`,
                padding: '0.25rem 0.6rem',
                borderRadius: '20px',
                backgroundColor: `${proj.accentColor}11`,
              }}>
                Featured
              </div>
            )}

            {/* Corner accent glow */}
            <div style={{
              position: 'absolute',
              top: 0, left: 0,
              width: '100px', height: '100px',
              background: `radial-gradient(circle at top left, ${proj.accentColor}18 0%, transparent 70%)`,
              pointerEvents: 'none',
              borderRadius: '16px 0 0 0',
            }} />

            {/* Emoji + ID row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{
                width: '52px', height: '52px',
                borderRadius: '12px',
                backgroundColor: `${proj.accentColor}15`,
                border: `1px solid ${proj.accentColor}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.6rem',
              }}>
                {proj.emoji}
              </div>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: 'rgba(255,255,255,0.2)',
                letterSpacing: '0.05em',
              }}>
                {proj.id}
              </span>
            </div>

            {/* Title & subtitle */}
            <div>
              <h3 style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(1.1rem, 2.2vw, 1.3rem)',
                fontWeight: 700,
                color: 'var(--text-primary)',
                margin: '0 0 0.3rem',
                letterSpacing: '-0.01em',
              }}>
                {proj.title}
              </h3>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: proj.accentColor,
              }}>
                {proj.subtitle}
              </span>
            </div>

            {/* Description */}
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.9rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.65,
              flexGrow: 1,
              margin: 0,
            }}>
              {proj.description}
            </p>

            {/* Tech tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {proj.tech.map((tag, tIdx) => (
                <span key={tIdx} style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.63rem',
                  color: 'var(--text-secondary)',
                  backgroundColor: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.09)',
                  padding: '0.28rem 0.65rem',
                  borderRadius: '20px',
                  letterSpacing: '0.03em',
                }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: '0.7rem', marginTop: '0.3rem' }}>
              {proj.githubUrl && (
                <a
                  href={proj.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                    fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
                    color: 'var(--text-secondary)',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    padding: '0.45rem 1rem', borderRadius: '8px',
                    textDecoration: 'none',
                    transition: 'color 0.2s, border-color 0.2s, background 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = '#fff';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = 'var(--text-secondary)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                  }}
                >
                  {/* GitHub icon */}
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  Code
                </a>
              )}
              {proj.liveUrl && (
                <a
                  href={proj.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                    fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
                    color: proj.accentColor,
                    backgroundColor: `${proj.accentColor}18`,
                    border: `1px solid ${proj.accentColor}50`,
                    padding: '0.45rem 1rem', borderRadius: '8px',
                    textDecoration: 'none',
                    transition: 'background 0.2s, box-shadow 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.backgroundColor = `${proj.accentColor}30`;
                    e.currentTarget.style.boxShadow = `0 0 14px ${proj.accentColor}40`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.backgroundColor = `${proj.accentColor}18`;
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                  Live
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .projects-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 1024px) and (min-width: 769px) {
          .projects-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Projects;
