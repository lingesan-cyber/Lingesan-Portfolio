import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const useTiltEffect = <T extends HTMLElement = HTMLElement>(maxRotateX = 12, maxRotateY = 12) => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      
      // Calculate mouse coordinates relative to the card's dimensions (0 to 1 range)
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const percentX = x / rect.width;
      const percentY = y / rect.height;
      
      // Map mouse coordinates to rotate parameters (-maxRotate to maxRotate range)
      const rotateX = (percentY - 0.5) * -2 * maxRotateX;
      const rotateY = (percentX - 0.5) * 2 * maxRotateY;

      // Apply GPU accelerated CSS 3D transforms via GSAP
      gsap.to(el, {
        rotateX: rotateX,
        rotateY: rotateY,
        transformPerspective: 800,
        ease: 'power3.out',
        duration: 0.4,
        overwrite: 'auto'
      });
    };

    const handleMouseLeave = () => {
      // Return smoothly to base position
      gsap.to(el, {
        rotateX: 0,
        rotateY: 0,
        ease: 'power4.out',
        duration: 0.6,
        overwrite: 'auto'
      });
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [maxRotateX, maxRotateY]);

  return ref;
};

export default useTiltEffect;
