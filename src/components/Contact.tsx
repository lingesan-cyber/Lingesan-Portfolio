import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from '../utils/textSplitter';
import useMagneticEffect from '../hooks/useMagneticEffect';

// Register scroll plugin
gsap.registerPlugin(ScrollTrigger);

export const Contact: React.FC = () => {
  const submitBtn = useMagneticEffect<HTMLButtonElement>(0.2);
  const formRef = useRef<HTMLFormElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    // 1. Heading Scroll Trigger reveal
    gsap.to('.contact-title-1 .split-char', {
      y: '0%',
      duration: 1.2,
      stagger: 0.03,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: '.contact-title-1',
        start: 'top 80%',
      }
    });

    gsap.to('.contact-title-2 .split-char', {
      y: '0%',
      duration: 1.2,
      stagger: 0.03,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: '.contact-title-2',
        start: 'top 80%',
      }
    });

    // 2. Fade in links and form blocks on scroll
    gsap.fromTo('.contact-fade-in',
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact-grid',
          start: 'top 85%'
        }
      }
    );
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you, ${formData.name}! Your request has been sent successfully.`);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section
      id="contact"
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
      {/* Giant Headers */}
      <div style={{ marginBottom: '5.5rem' }}>
        <h2
          className="contact-title-1"
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(3.5rem, 11vw, 10rem)',
            fontWeight: 900,
            lineHeight: 0.85,
            color: 'var(--text-primary)',
            letterSpacing: '-0.04em',
            textTransform: 'uppercase'
          }}
        >
          <SplitText text="LET'S WORK" type="chars" />
        </h2>
        
        <h2
          className="contact-title-2"
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(3.5rem, 11vw, 10rem)',
            fontWeight: 900,
            lineHeight: 0.85,
            color: 'var(--text-primary)',
            letterSpacing: '-0.04em',
            textTransform: 'uppercase'
          }}
        >
          <SplitText text="TOGETHER" type="chars" />
        </h2>
      </div>

      {/* Grid: Details on Left, Form on Right */}
      <div
        className="contact-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '0.9fr 1.1fr',
          gap: '5rem',
          alignItems: 'flex-start'
        }}
      >
        {/* Left Column: Social anchors and direct mail link */}
        <div 
          className="contact-fade-in"
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '3rem',
            willChange: 'transform, opacity' 
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                marginBottom: '1rem'
              }}
            >
              DIRECT CONTACT
            </div>
            
            <a
              href="mailto:lingesanravikumar@gmail.com"
              className="hover-target contact-draw-link"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)',
                fontWeight: 500,
                color: 'var(--text-primary)',
                position: 'relative',
                display: 'inline-block',
                paddingBottom: '4px'
              }}
            >
              lingesanravikumar@gmail.com
              <span className="link-under-draw" />
            </a>
          </div>

          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                marginBottom: '1rem'
              }}
            >
              SOCIAL NETWORKS
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                alignItems: 'flex-start'
              }}
            >
              {[
                { label: 'LINKEDIN', href: 'https://www.linkedin.com/in/lingesan18/' },
                { label: 'GITHUB', href: 'https://github.com/lingesan-cyber' },
                { label: 'TWITTER / X', href: 'https://twitter.com/' },
                { label: 'DRIBBBLE', href: 'https://dribbble.com/' },
              ].map((s, idx) => (
                <a
                  key={idx}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="hover-target contact-draw-link"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.95rem',
                    color: 'var(--text-secondary)',
                    letterSpacing: '0.05em',
                    position: 'relative',
                    paddingBottom: '2px'
                  }}
                >
                  {s.label}
                  <span className="link-under-draw" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Project Inquiry Form */}
        <div 
          className="contact-fade-in"
          style={{ willChange: 'transform, opacity' }}
        >
          <form
            ref={formRef}
            onSubmit={handleFormSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
            className="contact-form"
          >
            <label style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-primary)' }}>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="Your Name"
              style={{ padding: '1rem', borderRadius: '12px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.03)', color: 'var(--text-primary)' }}
            />

            <label style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-primary)' }}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="Your Email"
              style={{ padding: '1rem', borderRadius: '12px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.03)', color: 'var(--text-primary)' }}
            />

            <label style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-primary)' }}>Subject</label>
            <input
              type="text"
              name="subject"
              value={(formData as any).subject || ''}
              onChange={(e) => setFormData((prev) => ({ ...prev, subject: (e.target as HTMLInputElement).value }))}
              placeholder="Project Discussion"
              style={{ padding: '1rem', borderRadius: '12px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.03)', color: 'var(--text-primary)' }}
            />

            <label style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-primary)' }}>Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows={6}
              placeholder="Tell me about your project..."
              style={{ padding: '1rem', borderRadius: '12px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.03)', color: 'var(--text-primary)', resize: 'vertical' }}
            />

            <div>
              <button
                ref={submitBtn}
                type="submit"
                style={{ width: '100%', padding: '1.05rem', borderRadius: '40px', background: 'linear-gradient(90deg, #00d4ff, #8a00ff)', color: '#fff', fontWeight: 700, border: 'none' }}
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Global CSS style tags for contact drawings and overlays */}
      <style>{`
        .contact-draw-link .link-under-draw {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background-color: var(--text-secondary);
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .contact-draw-link:hover .link-under-draw {
          transform: scaleX(1);
          transform-origin: left;
          background-color: var(--accent-color);
        }
        .contact-draw-link:hover {
          color: var(--accent-color) !important;
          transition: color 0.3s ease;
        }

        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 4rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;
