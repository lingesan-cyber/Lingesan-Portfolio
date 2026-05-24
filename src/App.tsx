import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { setGlobalLenis } from './hooks/useLenis';

// Import custom sub-sections
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Certificates from './components/Certificates';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingSocials from './components/FloatingSocials';

// Inject our design system stylesheet
import './styles/globals.css';

// Register global GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isPreloaderComplete, setIsPreloaderComplete] = useState(false);

  useEffect(() => {
    if (!isPreloaderComplete) return;

    // 1. Initialize buttery smooth scrolling (Lenis)
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.05,
      infinite: false,
    });

    // Provide the scroll instance globally
    setGlobalLenis(lenis);

    // 2. Synchronize Lenis callbacks with GSAP ScrollTrigger updates
    lenis.on('scroll', ScrollTrigger.update);

    // 3. Bind GSAP tickers to process Lenis frames
    const tickHandler = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickHandler);

    // 4. Force refresh coordinates on load
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickHandler);
    };
  }, [isPreloaderComplete]);

  return (
    <>
      {/* 1. Global Custom Dot/Circle Cursor */}
      <CustomCursor />

      {/* 2. Loading Preloader Overlay (disappears after count is 100) */}
      {!isPreloaderComplete && (
        <Preloader onComplete={() => setIsPreloaderComplete(true)} />
      )}
      
      {/* 3. Main Single Page Portfolio Content */}
      {isPreloaderComplete && (
        <div 
          className="portfolio-content"
          style={{
            opacity: 0,
            animation: 'fadeIn 1.2s cubic-bezier(0.25, 1, 0.5, 1) forwards'
          }}
        >
          <Navbar />
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Certificates />
          <Education />
          <Contact />
          <Footer />
        </div>
      )}

      {/* Fixed social links bar — persists across all sections */}
      {isPreloaderComplete && <FloatingSocials />}

      {/* Basic page entry animation */}
      <style>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: scale(0.98);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
}

export default App;
