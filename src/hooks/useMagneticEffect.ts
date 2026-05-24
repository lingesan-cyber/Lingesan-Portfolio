import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const useMagneticEffect = <T extends HTMLElement = HTMLElement>(strength = 0.35) => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const offsetX = e.clientX - centerX;
      const offsetY = e.clientY - centerY;

      // Magnetic pull to center of target element
      gsap.to(el, {
        x: offsetX * strength,
        y: offsetY * strength,
        duration: 0.4,
        ease: 'power3.out',
        overwrite: 'auto'
      });
    };

    const handleMouseLeave = () => {
      // Elastic spring back to home
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'elastic.out(1.1, 0.4)',
        overwrite: 'auto'
      });
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return ref;
};

export default useMagneticEffect;
