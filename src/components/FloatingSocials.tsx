import React, { useEffect } from 'react';
import { FaGithub, FaLinkedinIn, FaUniversity, FaEnvelope } from 'react-icons/fa';
import useMagneticEffect from '../hooks/useMagneticEffect';
import gsap from 'gsap';

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, icon, label }) => {
  const ref = useMagneticEffect<HTMLAnchorElement>(0.3);

  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="hover-target"
      aria-label={label}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '34px',
        height: '34px',
        borderRadius: '50%',
        color: 'var(--text-secondary)',
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        fontSize: '1rem',
        transition: 'color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
        willChange: 'transform'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = 'var(--accent-color)';
        e.currentTarget.style.backgroundColor = 'rgba(0, 240, 255, 0.08)';
        e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.3)';
        e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 240, 255, 0.25)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = 'var(--text-secondary)';
        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {icon}
    </a>
  );
};

export const FloatingSocials: React.FC = () => {
  useEffect(() => {
    // Fade in the floating social bar on load
    gsap.fromTo('.floating-social-bar', 
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 1.2, ease: 'power4.out', delay: 1.0 }
    );
  }, []);

  const socials = [
    {
      href: 'https://github.com/lingesan-cyber',
      icon: <FaGithub />,
      label: 'GitHub'
    },
    {
      href: 'https://www.linkedin.com/in/lingesan18/',
      icon: <FaLinkedinIn />,
      label: 'LinkedIn'
    },
    {
      href: 'https://www.codechef.com/users/sona_24114030',
      icon: <FaUniversity />,
      label: 'CodeChef Sona'
    },
    {
      href: 'mailto:lingesanravikumar@gmail.com',
      icon: <FaEnvelope />,
      label: 'Email'
    }
  ];

  return (
    <div
      className="floating-social-bar"
      style={{
        position: 'fixed',
        right: '1.4rem',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.9rem',
        backgroundColor: 'rgba(13, 6, 26, 0.65)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(157, 78, 221, 0.15)',
        borderRadius: '32px',
        padding: '1.1rem 0.55rem',
        boxShadow: '0 0 35px rgba(157, 78, 221, 0.08), inset 0 0 15px rgba(255, 255, 255, 0.02)',
        opacity: 0,
        pointerEvents: 'auto'
      }}
    >
      {socials.map((social, index) => (
        <SocialLink
          key={index}
          href={social.href}
          icon={social.icon}
          label={social.label}
        />
      ))}
      
      {/* Decorative vertical stardust indicators matching right edge of Image 1 */}
      <div 
        style={{
          position: 'absolute',
          right: '-3px',
          top: '18%',
          height: '64%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          pointerEvents: 'none'
        }}
      >
        {[...Array(6)].map((_, i) => (
          <div 
            key={i} 
            style={{
              width: '2px',
              height: '2px',
              backgroundColor: 'rgba(157, 78, 221, 0.35)',
              borderRadius: '50%',
              boxShadow: '0 0 4px rgba(157, 78, 221, 0.5)'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default FloatingSocials;
