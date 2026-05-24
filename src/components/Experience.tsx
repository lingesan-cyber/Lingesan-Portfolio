import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from '../utils/textSplitter';

// Register scroll plugin
gsap.registerPlugin(ScrollTrigger);

interface TimelineItem {
  year: string;
  role: string;
  company: string;
  description: string;
}

const experienceList: TimelineItem[] = [
  {
    year: '2024 — 2025',
    role: 'ENGINEERING STUDENT & TECH ENTHUSIAST',
    company: 'College Clubs & Projects',
    description: 'Started my engineering journey in 2024 with a strong interest in electronics and technology. Participated in college club events and worked as an event organizer, improving teamwork, leadership, and communication skills. Built beginner electronics projects such as a Clap ON/OFF Switch and an Automatic Day/Night Detection System using LDR sensors, gaining practical experience in circuits and embedded systems.'
  },
  {
    year: '2025 — 2026',
    role: 'WEB DEVELOPMENT & HACKATHON EXPLORER',
    company: 'Hackathons & Web Projects',
    description: 'Expanded skills into modern web development and AI-powered tools. Learned frontend concepts, responsive website creation, and interactive UI design. Participated in multiple hackathons and explored combining software and hardware solutions through creative projects, animations, and emerging AI tools.'
  },
  {
    year: '2026 — 2027',
    role: 'PLACEMENT TRAINING & SOFTWARE DEVELOPMENT',
    company: 'Career Preparation',
    description: 'Focusing on placement preparation and strengthening programming fundamentals through C and problem-solving practice. Planning advanced placement training to improve aptitude, coding, communication, and interview skills. Aspiring to become a versatile engineer able to build impactful real-world technology solutions across software and electronics domains.'
  }
];

export const Experience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Heading Scroll Trigger Reveal (subtitle and main journey title)
    gsap.to('.exp-title .split-char', {
      y: '0%',
      duration: 1,
      stagger: 0.03,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.exp-title',
        start: 'top 80%',
      }
    });

    gsap.to('.journey-title .split-char', {
      y: '0%',
      duration: 1.1,
      stagger: 0.04,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.journey-title',
        start: 'top 85%',
      }
    });

    // 2. Central vertical timeline tracking line drawing
    gsap.fromTo('.timeline-vertical-line',
      { scaleY: 0, transformOrigin: 'top' },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.timeline-container',
          start: 'top 70%',
          end: 'bottom 70%',
          scrub: true // Draws continuously linked to scroll progress!
        }
      }
    );

    // 3. Staggered reveals for cards and connector lines
    experienceList.forEach((_, idx) => {
      // Connect line draw
      gsap.fromTo(`.divider-line-${idx}`,
        { scaleX: 0, transformOrigin: idx % 2 === 0 ? 'left' : 'right' },
        {
          scaleX: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: `.timeline-item-${idx}`,
            start: 'top 80%',
          }
        }
      );

      // Text stagger reveal
      gsap.fromTo(`.timeline-text-${idx}`,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: `.timeline-item-${idx}`,
            start: 'top 80%',
          }
        }
      );
    });
  }, []);

  return (
    <section
      id="experience"
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
      {/* Section Title */}
      <div style={{ marginBottom: '6rem' }}>
        <h2
          className="journey-title"
          style={{
            fontFamily: 'var(--font-sans)',
            color: 'var(--text-primary)',
            fontSize: 'clamp(2.5rem, 8vw, 6rem)',
            fontWeight: 800,
            margin: 0,
            letterSpacing: '0.02em'
          }}
        >
          <SplitText text="JOURNEY" type="chars" />
        </h2>
        <h3
          className="section-title exp-title"
          style={{
            fontFamily: 'var(--font-mono)',
            color: 'var(--accent-color)',
            fontSize: '0.95rem',
            letterSpacing: '0.18em',
            marginTop: '0.75rem',
            textTransform: 'uppercase'
          }}
        >
          <SplitText text="COSMIC TIMELINE" type="chars" />
        </h3>
        <div style={{ width: '60px', height: '2px', backgroundColor: 'var(--accent-color)', marginTop: '1rem' }} />
      </div>

      {/* Timeline Wrapper Container */}
      <div
        className="timeline-container"
        ref={containerRef}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '2rem 0'
        }}
      >
        {/* Central Vertical Line (Desktop only) */}
        <div
          className="timeline-vertical-line"
          style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            width: '1px',
            height: '100%',
            backgroundColor: 'var(--accent-color)',
            transform: 'translateX(-50%)',
            willChange: 'transform'
          }}
        />

        {/* Timeline Items List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}>
          {experienceList.map((item, idx) => {
            const isLeft = idx % 2 === 0;
            const yearColor = isLeft ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.12)';
            return (
              <div
                key={idx}
                className={`timeline-item-${idx} timeline-row`}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '6rem',
                  position: 'relative',
                  width: '100%',
                  boxSizing: 'border-box'
                }}
              >
                {/* Left Column (Content if Left, Year if Right) */}
                <div style={{ textAlign: isLeft ? 'right' : 'left', order: isLeft ? 1 : 2 }}>
                  {isLeft ? (
                    /* Left Details Box */
                    <div className={`timeline-text-${idx}`} style={{ willChange: 'transform, opacity' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent-color)', letterSpacing: '0.1em' }}>
                        {item.company}
                      </span>
                      <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.6rem', fontWeight: 700, margin: '0.5rem 0', color: 'var(--text-primary)' }}>
                        {item.role}
                      </h3>
                      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '500px', marginLeft: 'auto' }}>
                        {item.description}
                      </p>
                    </div>
                  ) : (
                    /* Left Year label */
                    <div
                      className={`timeline-text-${idx}`}
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                        fontWeight: 800,
                        color: yearColor,
                        lineHeight: 1,
                        willChange: 'transform, opacity'
                      }}
                    >
                      {item.year}
                    </div>
                  )}
                </div>

                {/* Right Column (Year if Left, Content if Right) */}
                <div style={{ textAlign: isLeft ? 'left' : 'right', order: isLeft ? 2 : 1 }}>
                  {isLeft ? (
                    /* Right Year label */
                    <div
                      className={`timeline-text-${idx}`}
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                        fontWeight: 800,
                        color: yearColor,
                        lineHeight: 1,
                        willChange: 'transform, opacity'
                      }}
                    >
                      {item.year}
                    </div>
                  ) : (
                    /* Right Details Box */
                    <div className={`timeline-text-${idx}`} style={{ willChange: 'transform, opacity' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent-color)', letterSpacing: '0.1em' }}>
                        {item.company}
                      </span>
                      <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.6rem', fontWeight: 700, margin: '0.5rem 0', color: 'var(--text-primary)' }}>
                        {item.role}
                      </h3>
                      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '500px', marginRight: 'auto' }}>
                        {item.description}
                      </p>
                    </div>
                  )}
                </div>

                {/* Horizontal dividing connector line under the item */}
                <div
                  className={`divider-line-${idx}`}
                  style={{
                    position: 'absolute',
                    bottom: '-3rem',
                    left: 0,
                    width: '100%',
                    height: '1px',
                    backgroundColor: 'rgba(255,255,255,0.06)',
                    willChange: 'transform'
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Global CSS media overrides for vertical stacking on mobile */}
      <style>{`
        @media (max-width: 768px) {
          .timeline-vertical-line {
            left: 0 !important;
            transform: none !important;
          }
          .timeline-row {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
            padding-left: 2rem !important;
          }
          .timeline-row > div {
            text-align: left !important;
            order: unset !important;
          }
          .timeline-row > div:nth-child(2) {
            margin-top: 0.5rem;
          }
          .timeline-row [class*="divider-line-"] {
            transform-origin: left !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Experience;
