import React, { useEffect } from 'react';
import SplitText from '../utils/textSplitter';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaGraduationCap, FaSchool, FaBook } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

type EduItem = {
  title: string;
  institution: string;
  period: string;
  meta: string;
  highlights: string[];
  icon: React.ReactNode;
};

const eduList: EduItem[] = [
  {
    title: 'B.E. in Electronics and Computer Engineering',
    institution: 'Sona College of Engineering, Salem',
    period: '2024 — 2028 • Current CGPA: 8.31 / 10',
    meta: '',
    highlights: [
      'Specialized in Frontend Development',
      'Participated in Hackathons',
      'Active in Coding Societies',
    ],
    icon: <FaGraduationCap />,
  },
  {
    title: 'Higher Secondary (12th Grade)',
    institution: 'Kongu Kalvi Nilayam Matric Hr Sec School',
    period: '2023 — 2024 • 84.7%',
    meta: 'Science Stream (PCM)',
    highlights: [
      'Strong foundation in Mathematics',
      'Active in Science exhibitions',
      'Secured strong academic results',
    ],
    icon: <FaSchool />,
  },
  {
    title: 'Secondary School Certificate (10th Grade)',
    institution: 'Kongu Kalvi Nilayam Matric Hr Sec School',
    period: '2021 — 2022 • 90%',
    meta: 'Matriculation',
    highlights: [
      'Excellent academic performance',
      'Participated in quizzes & olympiads',
      'School topper in Computer Science',
    ],
    icon: <FaBook />,
  },
];

const Education: React.FC = () => {
  useEffect(() => {
    gsap.fromTo('.edu-heading', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: '.edu-section', start: 'top 90%', once: true } });
    gsap.to('.edu-heading .split-char', { y: '0%', duration: 0.9, stagger: 0.02, ease: 'power3.out', scrollTrigger: { trigger: '.edu-heading', start: 'top 92%' } });
    gsap.fromTo('.edu-card', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: '.edu-grid', start: 'top 90%', once: true } });
  }, []);

  return (
    <section id="education" className="edu-section" style={{ width: '100%', backgroundColor: 'transparent', padding: '6rem 6vw', boxSizing: 'border-box' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div className="edu-heading" style={{ marginBottom: '2.25rem' }}>
          <h2 style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-primary)', fontSize: 'clamp(1.8rem, 4.6vw, 3rem)', fontWeight: 800, margin: 0 }}>
            <SplitText text="EDUCATION" type="chars" />
          </h2>
          <div style={{ width: '64px', height: '2px', backgroundColor: 'var(--accent-color)', margin: '0.9rem 0 0' }} />
        </div>

        <div className="edu-grid" style={{ display: 'grid', gridTemplateColumns: '220px 1fr 300px', gap: '1.25rem', alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', paddingTop: '0.5rem' }}>
            {eduList.map((it, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '54px', height: '54px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', fontSize: '1.1rem', boxShadow: '0 4px 18px rgba(0,0,0,0.6), inset 0 0 12px rgba(255,255,255,0.02)' }}>{it.icon}</div>
                <div style={{ marginTop: '0.6rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', fontSize: '0.88rem', textAlign: 'center' }}>{it.period.split('•')[0].trim()}</div>
              </div>
            ))}
          </div>

          <div>
            {eduList.map((it, idx) => (
              <article key={idx} className="edu-card" style={{ marginBottom: '1.25rem', padding: '1.05rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.04)', background: 'linear-gradient(180deg, rgba(255,255,255,0.01), rgba(255,255,255,0.00))' }}>
                <h3 style={{ margin: 0, fontFamily: 'var(--font-sans)', color: 'var(--text-primary)', fontSize: '1.05rem', fontWeight: 800 }}>{it.title}</h3>
                <div style={{ marginTop: '0.35rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)', fontSize: '0.95rem' }}>{it.institution}</div>
                {it.meta && <div style={{ marginTop: '0.3rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}>{it.meta}</div>}
                <div style={{ marginTop: '0.6rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-color)', fontSize: '0.86rem' }}>{it.period}</div>
              </article>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {eduList.map((it, idx) => (
              <div key={idx} style={{ padding: '0.9rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.04)', background: 'rgba(255,255,255,0.01)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--accent-color)' }} />
                  <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, color: 'var(--text-primary)', fontSize: '0.95rem' }}>HIGHLIGHTS</div>
                </div>
                <ul style={{ margin: 0, paddingLeft: '1.05rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)', fontSize: '0.9rem' }}>
                  {it.highlights.map((h, i) => <li key={i} style={{ marginBottom: '0.35rem' }}>{h}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom panels: What I Believe + Key Learnings */}
      <div style={{ maxWidth: '1400px', margin: '2.25rem auto 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', alignItems: 'stretch' }}>
        <div style={{ padding: '1.25rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.04)', background: 'rgba(255,255,255,0.01)' }}>
          <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '0.06em', marginBottom: '0.6rem' }}>WHAT I BELIEVE</div>
          <blockquote style={{ margin: 0, fontFamily: 'var(--font-sans)', color: 'var(--text-secondary)', fontStyle: 'italic', lineHeight: 1.6, fontSize: '1rem' }}>
            "The most dangerous form of blindness, is believing that your perspective is the only reality."
          </blockquote>
        </div>

        <div style={{ padding: '1.25rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.04)', background: 'rgba(255,255,255,0.01)' }}>
          <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '0.06em', marginBottom: '0.6rem' }}>KEY LEARNINGS</div>
          <div style={{ display: 'flex', gap: '0.9rem', flexWrap: 'wrap' }}>
            {(() => {
              const items = ['Problem Solving', 'Logical Thinking', 'Creativity & Innovation', 'Teamwork & Leadership'];
              return items.map((label, i) => {
                // dim the two (Creativity & Teamwork) which are indices 2 and 3
                const dim = i === 2 || i === 3;
                return (
                  <div key={i} style={{ flex: '1 1 140px', minWidth: 140, opacity: dim ? 0.65 : 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      <div style={{ width: '54px', height: '54px', borderRadius: '8px', background: dim ? 'rgba(255,255,255,0.007)' : 'rgba(255,255,255,0.02)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-color)', fontSize: '1.05rem' }}>
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.95rem' }}>{label}</div>
                    </div>
                  </div>
                );
              });
            })()}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1000px) {
          .edu-grid { grid-template-columns: 1fr !important; }
          .edu-grid > div:nth-child(1) { order: 2; display: flex; flex-direction: row; gap: 1rem; justify-content: flex-start; }
          .edu-grid > div:nth-child(2) { order: 1; }
          .edu-grid > div:nth-child(3) { order: 3; }
        }
      `}</style>
    </section>
  );
};

export default Education;
