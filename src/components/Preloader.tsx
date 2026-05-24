import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import SplitText from '../utils/textSplitter';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const counterObj = { value: 0 };
    const timeline = gsap.timeline({
      onComplete: () => {
        // Cinematic slide up reveal
        gsap.to('.preloader-panel', {
          yPercent: -100,
          duration: 1.4,
          ease: 'power4.inOut',
          onComplete: onComplete
        });
      }
    });

    // 1. Set initial offset on letters
    gsap.set('.preloader-welcome .split-char', { y: '100%', opacity: 0 });
    
    // 2. Stagger letters of welcome text
    timeline.to('.preloader-welcome .split-char', {
      y: '0%',
      opacity: 1,
      stagger: 0.05,
      duration: 1.2,
      ease: 'power4.out'
    });

    // 3. Smooth ticking progress counter
    timeline.to(counterObj, {
      value: 100,
      duration: 2.5,
      ease: 'power2.out',
      onUpdate: () => {
        setCount(Math.floor(counterObj.value));
      }
    }, '-=0.5');

    // 4. Staggered fade-out before panels slide up
    timeline.to(['.preloader-welcome-wrapper', '.preloader-capsule-loader'], {
      y: -30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.inOut'
    });

    return () => {
      timeline.kill();
    };
  }, [onComplete]);

  return (
    <div 
      className="preloader-panel" 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#040108',
        backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(157, 78, 221, 0.1) 0%, transparent 60%)',
        zIndex: 999999,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
        boxSizing: 'border-box',
        willChange: 'transform'
      }}
    >
      {/* Centered welcoming space block */}
      <div 
        className="preloader-welcome-wrapper"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          willChange: 'transform, opacity'
        }}
      >
        <h1 
          className="preloader-welcome" 
          style={{
            fontSize: 'clamp(2.2rem, 7.5vw, 6.8rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            textTransform: 'uppercase',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-sans)',
            textShadow: '0 0 50px rgba(255, 255, 255, 0.12), 0 0 20px rgba(0, 240, 255, 0.2)'
          }}
        >
          <SplitText text="WELCOME TO MY WORLD" type="chars" />
        </h1>
      </div>

      {/* Futuristic capsule loader pill container (Inspired by Image 3) */}
      <div
        className="preloader-capsule-loader"
        style={{
          marginTop: '4rem',
          backgroundColor: '#000000',
          border: '1px solid rgba(157, 78, 221, 0.35)',
          borderRadius: '50px',
          boxShadow: '0 0 25px rgba(157, 78, 221, 0.15)',
          width: 'clamp(270px, 45vw, 360px)',
          height: '68px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 2.2rem',
          boxSizing: 'border-box',
          willChange: 'transform, opacity'
        }}
      >
        {/* Monospace "LOADING" layout label */}
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '1rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase'
          }}
        >
          LOADING
        </span>

        {/* Counter readout & dynamic solid stardust bar blocker */}
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px' 
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '1.05rem',
              fontWeight: 500,
              color: 'var(--text-primary)',
              fontVariantNumeric: 'tabular-nums'
            }}
          >
            {count}%
          </span>
          
          {/* Animated cursor box block */}
          <span 
            className="pulse-block"
            style={{
              display: 'inline-block',
              width: '12px',
              height: '20px',
              backgroundColor: '#ffffff',
              boxShadow: '0 0 10px #ffffff'
            }}
          />
        </div>
      </div>

      {/* Custom keyframes for pulsing indicators */}
      <style>{`
        @keyframes block-pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(0.95);
          }
        }
        .pulse-block {
          animation: block-pulse 0.8s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Preloader;
