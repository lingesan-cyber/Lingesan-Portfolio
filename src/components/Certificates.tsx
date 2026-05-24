import { useEffect, useMemo, useState } from 'react';
import SplitText from '../utils/textSplitter';
import cert1 from '../assets/Screenshot 2026-05-24 193837.png';
import cert2 from '../assets/Screenshot 2026-05-24 193854.png';
import cert3 from '../assets/Screenshot 2026-05-24 193909.png';
import cert4 from '../assets/Screenshot 2026-05-24 193923.png';
import cert5 from '../assets/Screenshot 2026-05-24 193950.png';
import cert6 from '../assets/Screenshot 2026-05-24 194033.png';
import cert7 from '../assets/Screenshot 2026-05-24 194216.png';
import cert8 from '../assets/Screenshot 2026-05-24 194232.png';
import cert9 from '../assets/Screenshot 2026-05-24 194249.png';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type CertificateItem = {
  title: string;
  issuer: string;
  year: string;
  imageUrl?: string;
};

const technicalCertificates: CertificateItem[] = [
  { title: 'CodSoft — Web Development', issuer: 'Internship', year: '2025', imageUrl: cert1 },
  { title: 'Forage — GenAI Data Analytics', issuer: 'Internship', year: '2025', imageUrl: cert2 },
  { title: 'MathWorks — Deep Learning Onramp', issuer: 'Technical', year: '2025', imageUrl: cert3 },
  { title: 'MathWorks — Image Processing Onramp', issuer: 'Technical', year: '2025', imageUrl: cert4 },
  { title: 'Futureskills — Digital 101 (Gold)', issuer: 'Technical', year: '2026', imageUrl: cert5 },
  { title: 'Futureskills — Data Processing & Visualisation', issuer: 'Technical', year: '2026', imageUrl: cert6 },
];

const workshopCertificates: CertificateItem[] = [
  { title: 'Hackathon — Participation 1', issuer: 'Hackathon & Workshop', year: '2026', imageUrl: cert7 },
  { title: 'Workshop — Participation 2', issuer: 'Hackathon & Workshop', year: '2026', imageUrl: cert8 },
  { title: 'Workshop — Participation 3', issuer: 'Hackathon & Workshop', year: '2026', imageUrl: cert9 },
];

const tabs = [
  { id: 'technical', label: 'Technical' },
  { id: 'other', label: 'Hackathon & Workshops' },
];

export default function Certificates() {
  const [activeTab, setActiveTab] = useState<'technical' | 'other'>('technical');
  const activeThemeColor = '#38bdf8';
  const activeThemeGlow = 'rgba(56,189,248,0.35)';

  const activeItems = useMemo(
    () => (activeTab === 'technical' ? technicalCertificates : workshopCertificates),
    [activeTab]
  );

  useEffect(() => {
    gsap.fromTo('.cert-heading', { opacity: 0, y: 24 }, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.cert-section',
        start: 'top 85%',
        once: true,
      },
    });

    // heading char reveal
    gsap.to('.cert-heading .split-char', {
      y: '0%',
      duration: 1,
      stagger: 0.02,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.cert-heading',
        start: 'top 90%'
      }
    });

    gsap.fromTo('.cert-card', { opacity: 0, y: 24, scale: 0.98 }, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.75,
      stagger: 0.08,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.cert-grid',
        start: 'top 86%',
        once: true,
      },
    });

    // Animate certificate images (zoom + deblur)
    gsap.fromTo('.cert-img',
      { scale: 1.06, filter: 'blur(8px)', opacity: 0 },
      {
        scale: 1, filter: 'blur(0px)', opacity: 1,
        duration: 0.9, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: '.cert-grid', start: 'top 86%', once: true }
      }
    );
  }, []);

  return (
    <section
      id="certificates"
      className="cert-section"
      style={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: 'transparent',
        padding: '12rem 6vw 8rem',
        boxSizing: 'border-box',
        position: 'relative',
        zIndex: 4,
      }}
    >
      <div style={{ marginBottom: '3.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <div
            style={{
              display: 'inline-flex',
              padding: '0.45rem',
              borderRadius: '22px',
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.03)',
                boxShadow: `0 0 30px ${activeThemeGlow}`,
              gap: '0.55rem',
            }}
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as 'technical' | 'other')}
                  style={{
                    minWidth: '150px',
                    padding: '1rem 1.9rem',
                    border: 'none',
                    borderRadius: '16px',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 700,
                    fontSize: '1rem',
                    color: isActive ? '#fff' : 'rgba(255,255,255,0.82)',
                    background: isActive
                      ? 'linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%)'
                      : 'rgba(255,255,255,0.03)',
                    boxShadow: isActive ? `0 8px 30px ${activeThemeGlow}` : 'none',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease',
                  }}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="cert-heading" style={{ textAlign: 'center' }}>
          <h2
            style={{
              fontFamily: 'var(--font-sans)',
              color: 'var(--text-primary)',
              fontSize: 'clamp(2.4rem, 6vw, 4.8rem)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              margin: 0,
            }}
          >
            <SplitText text="CERTIFICATIONS" type="chars" />
          </h2>
          <div style={{ width: '72px', height: '2px', backgroundColor: 'var(--accent-color)', margin: '1rem auto 0' }} />
        </div>
      </div>

      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        <div
          className="cert-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: '1.4rem',
          }}
        >
          {activeItems.map((item, index) => (
            <article
              key={`${activeTab}-${index}`}
              className="cert-card"
              style={{
                backgroundColor: 'rgba(18, 16, 34, 0.95)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '24px',
                padding: '1rem',
                overflow: 'hidden',
                boxShadow: '0 14px 40px rgba(0,0,0,0.35)',
              }}
            >
              <div
                style={{
                  aspectRatio: '4 / 3',
                  borderRadius: '18px',
                  overflow: 'hidden',
                  background: item.imageUrl
                    ? `url(${item.imageUrl}) center/cover no-repeat`
                    : activeTab === 'technical'
                      ? 'linear-gradient(135deg, rgba(56,189,248,0.14), rgba(14,165,233,0.08)), radial-gradient(circle at top right, rgba(56,189,248,0.12), transparent 35%), rgba(255,255,255,0.03)'
                      : 'linear-gradient(135deg, rgba(139,92,246,0.12), rgba(247,37,133,0.08)), radial-gradient(circle at top right, rgba(247,37,133,0.12), transparent 35%), rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(255,255,255,0.65)',
                  textAlign: 'center',
                  padding: '1rem',
                }}
              >
                {!item.imageUrl && (
                  <div>
                  <style>{`
                    .cert-card:hover {
                      transform: translateY(-6px) scale(1.02);
                      box-shadow: 0 20px 60px rgba(14,165,233,0.18), 0 8px 30px rgba(0,0,0,0.6);
                      transition: transform 0.25s cubic-bezier(.2,.9,.2,1), box-shadow 0.25s ease;
                    }
                    .cert-card { transition: transform 0.25s cubic-bezier(.2,.9,.2,1), box-shadow 0.25s ease; }
                  `}</style>
                    <div style={{ fontSize: '0.85rem', letterSpacing: '0.18em', fontFamily: 'var(--font-mono)', marginBottom: '0.55rem' }}>
                      ADD CERTIFICATE IMAGE
                    </div>
                    <div style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', color: 'rgba(255,255,255,0.82)' }}>
                      {activeTab === 'technical' ? 'Technical certificate slot' : 'Hackathon / workshop slot'}
                    </div>
                  </div>
                )}
              </div>

              <div style={{ padding: '1rem 0.35rem 0.25rem' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  alignItems: 'flex-start',
                  marginBottom: '0.7rem'
                }}>
                  <div>
                    <h3 style={{
                      margin: 0,
                      fontFamily: 'var(--font-sans)',
                      color: 'var(--text-primary)',
                      fontSize: '1.08rem',
                      fontWeight: 700,
                    }}>
                      {item.title}
                    </h3>
                    <p style={{
                      margin: '0.35rem 0 0',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.74rem',
                      color: 'var(--text-secondary)',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                    }}>
                      {item.issuer}
                    </p>
                  </div>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: activeThemeColor,
                    border: `1px solid ${activeThemeColor}33`,
                    padding: '0.35rem 0.65rem',
                    borderRadius: '999px',
                    whiteSpace: 'nowrap',
                  }}>
                    {item.year}
                  </span>
                </div>

                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: 'rgba(255,255,255,0.55)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em'
                }}>
                  <span style={{ width: '7px', height: '7px', borderRadius: '999px', backgroundColor: activeThemeColor }} />
                  {activeTab === 'technical' ? 'Technical Certificates' : 'Hackathon & Workshops'}
                </div>
              </div>
            </article>
          ))}
        </div>

        
      </div>

      <style>{`
        @media (max-width: 1100px) {
          .cert-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }

        @media (max-width: 720px) {
          .cert-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}