import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FaReact, FaNodeJs, FaFigma, FaCss3Alt, FaJsSquare,
  FaGitAlt, FaHtml5, FaPython, FaDocker
} from 'react-icons/fa';
import {
  SiTypescript, SiThreedotjs, SiGreensock, SiNextdotjs,
  SiArduino, SiTailwindcss, SiFirebase, SiMongodb,
  SiPostgresql, SiFramer, SiVite, SiCplusplus
} from 'react-icons/si';

gsap.registerPlugin(ScrollTrigger);

interface SkillLogo {
  name: string;
  icon: React.ReactNode;
  color: string;
}

const ALL_SKILLS: SkillLogo[] = [
  { name: 'HTML5',       icon: <FaHtml5 />,       color: '#e34f26' },
  { name: 'CSS3',        icon: <FaCss3Alt />,      color: '#264de4' },
  { name: 'JavaScript',  icon: <FaJsSquare />,     color: '#f7df1e' },
  { name: 'TypeScript',  icon: <SiTypescript />,   color: '#3178c6' },
  { name: 'React',       icon: <FaReact />,        color: '#61dafb' },
  { name: 'Next.js',     icon: <SiNextdotjs />,    color: '#ffffff' },
  { name: 'Tailwind',    icon: <SiTailwindcss />,  color: '#06b6d4' },
  { name: 'Framer',      icon: <SiFramer />,       color: '#bb4b96' },
  { name: 'GSAP',        icon: <SiGreensock />,    color: '#88ce02' },
  { name: 'Three.js',    icon: <SiThreedotjs />,   color: '#ffffff' },
  { name: 'Node.js',     icon: <FaNodeJs />,       color: '#6cc24a' },
  { name: 'Python',      icon: <FaPython />,       color: '#3572A5' },
  { name: 'C++',         icon: <SiCplusplus />,    color: '#00599c' },
  { name: 'Arduino',     icon: <SiArduino />,      color: '#00979d' },
  { name: 'MongoDB',     icon: <SiMongodb />,      color: '#47a248' },
  { name: 'PostgreSQL',  icon: <SiPostgresql />,   color: '#336791' },
  { name: 'Firebase',    icon: <SiFirebase />,     color: '#ffca28' },
  { name: 'Docker',      icon: <FaDocker />,       color: '#2496ed' },
  { name: 'Git',         icon: <FaGitAlt />,       color: '#f05032' },
  { name: 'Figma',       icon: <FaFigma />,        color: '#f24e1e' },
  { name: 'Vite',        icon: <SiVite />,         color: '#646cff' },
];

// Split skills into 3 rows
const ROW_1 = ALL_SKILLS.slice(0, 7);
const ROW_2 = ALL_SKILLS.slice(7, 14);
const ROW_3 = ALL_SKILLS.slice(14);

interface SkillLogoItemProps { skill: SkillLogo; }

const SkillLogoItem: React.FC<SkillLogoItemProps> = ({ skill }) => (
  <div
    className="skill-logo-item"
    style={{
      display: 'inline-flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.55rem',
      padding: '1.4rem 2rem',
      margin: '0 0.6rem',
      borderRadius: '14px',
      border: '1px solid rgba(255,255,255,0.07)',
      backgroundColor: 'rgba(13,6,26,0.55)',
      backdropFilter: 'blur(8px)',
      minWidth: '110px',
      transition: 'border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
      cursor: 'default',
      flexShrink: 0,
    }}
    onMouseEnter={e => {
      const el = e.currentTarget;
      el.style.borderColor = skill.color;
      el.style.boxShadow = `0 0 22px ${skill.color}55`;
      el.style.transform = 'translateY(-6px) scale(1.06)';
    }}
    onMouseLeave={e => {
      const el = e.currentTarget;
      el.style.borderColor = 'rgba(255,255,255,0.07)';
      el.style.boxShadow = 'none';
      el.style.transform = 'translateY(0) scale(1)';
    }}
  >
    <span style={{ fontSize: '2.4rem', color: skill.color, lineHeight: 1 }}>
      {skill.icon}
    </span>
    <span style={{
      fontFamily: 'var(--font-mono)',
      fontSize: '0.68rem',
      fontWeight: 500,
      color: 'var(--text-secondary)',
      textTransform: 'uppercase',
      letterSpacing: '0.06em',
      whiteSpace: 'nowrap'
    }}>
      {skill.name}
    </span>
  </div>
);

interface MarqueeRowProps {
  skills: SkillLogo[];
  direction: 'left' | 'right';
  speed?: number;
}

const MarqueeRow: React.FC<MarqueeRowProps> = ({ skills, direction, speed = 35 }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<gsap.core.Tween | null>(null);
  // Duplicate for seamless loop
  const items = [...skills, ...skills, ...skills, ...skills];

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const totalW = el.scrollWidth / 2;
    const from = direction === 'left' ? 0 : -totalW;
    const to   = direction === 'left' ? -totalW : 0;

    gsap.set(el, { x: from });
    animRef.current = gsap.to(el, {
      x: to,
      duration: speed,
      ease: 'none',
      repeat: -1,
    });

    return () => { animRef.current?.kill(); };
  }, [direction, speed]);

  return (
    <div
      style={{ overflow: 'hidden', width: '100%', padding: '0.5rem 0' }}
      onMouseEnter={() => animRef.current?.pause()}
      onMouseLeave={() => animRef.current?.resume()}
    >
      <div ref={trackRef} style={{ display: 'inline-flex', willChange: 'transform' }}>
        {items.map((skill, i) => (
          <SkillLogoItem key={i} skill={skill} />
        ))}
      </div>
    </div>
  );
};

export const Skills: React.FC = () => {
  useEffect(() => {
    // Heading slide-up reveal
    gsap.fromTo('.skills-title',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.skills-title', start: 'top 88%' }
      }
    );
    gsap.fromTo('.skills-subtitle',
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0,
        duration: 0.9,
        delay: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.skills-title', start: 'top 88%' }
      }
    );

    // Rows slide-in on scroll
    gsap.fromTo('.skill-marquee-row',
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.skills-marquee-wrapper', start: 'top 85%' }
      }
    );
  }, []);

  return (
    <section
      id="skills"
      style={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: 'transparent',
        padding: '8rem 0',
        boxSizing: 'border-box',
        position: 'relative',
        zIndex: 4,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      {/* Heading */}
      <div style={{ paddingLeft: '6vw', marginBottom: '4rem' }}>
        <h2
          className="section-title skills-title"
          style={{
            fontFamily: 'var(--font-sans)',
            color: 'var(--text-primary)',
            opacity: 0,
            willChange: 'transform, opacity'
          }}
        >
          SKILLS
        </h2>
        <div style={{ width: '60px', height: '2px', backgroundColor: 'var(--accent-color)', marginTop: '1rem' }} />
        <p
          className="skills-subtitle"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            color: 'var(--text-secondary)',
            marginTop: '1rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            opacity: 0
          }}
        >
          Technologies I work with
        </p>
      </div>

      {/* Marquee Rows */}
      <div className="skills-marquee-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        <div className="skill-marquee-row">
          <MarqueeRow skills={ROW_1} direction="left"  speed={40} />
        </div>
        <div className="skill-marquee-row">
          <MarqueeRow skills={ROW_2} direction="right" speed={32} />
        </div>
        <div className="skill-marquee-row">
          <MarqueeRow skills={ROW_3} direction="left"  speed={45} />
        </div>
      </div>

      {/* Fade edge masks */}
      <style>{`
        .skills-marquee-wrapper::before,
        .skills-marquee-wrapper::after {
          content: '';
          position: absolute;
          top: 0; bottom: 0;
          width: 120px;
          z-index: 10;
          pointer-events: none;
        }
        .skills-marquee-wrapper::before {
          left: 0;
          background: linear-gradient(to right, #040108 0%, transparent 100%);
        }
        .skills-marquee-wrapper::after {
          right: 0;
          background: linear-gradient(to left, #040108 0%, transparent 100%);
        }
        .skills-marquee-wrapper {
          position: relative;
        }
      `}</style>
    </section>
  );
};

export default Skills;
