import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if the device has a pointer (mouse)
    const touchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(touchDevice);

    if (touchDevice) {
      return;
    }

    const mouse = { x: 0, y: 0 };
    const dotPos = { x: 0, y: 0 };
    const circlePos = { x: 0, y: 0 };
    const interactiveSelector = 'a, button, input, textarea, select, [role="button"], .hover-target, .magnetic-item, .project-row';
    const setDotX = gsap.quickSetter(dotRef.current, 'x', 'px');
    const setDotY = gsap.quickSetter(dotRef.current, 'y', 'px');
    const setCircleX = gsap.quickSetter(circleRef.current, 'x', 'px');
    const setCircleY = gsap.quickSetter(circleRef.current, 'y', 'px');

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      setIsHidden(false);
    };

    const onMouseLeaveWindow = () => {
      setIsHidden(true);
    };

    const onMouseEnterWindow = () => {
      setIsHidden(false);
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeaveWindow);
    document.addEventListener('mouseenter', onMouseEnterWindow);

    const onPointerOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest(interactiveSelector)) {
        setIsHovered(true);
      }
    };

    const onPointerOut = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target?.closest(interactiveSelector)) return;
      const related = e.relatedTarget as HTMLElement | null;
      if (related?.closest(interactiveSelector)) return;
      setIsHovered(false);
    };

    // Dynamic RAF loop for lag interpolation on outer circle
    let animFrameId: number;
    const tick = () => {
      // Dot is instantly under the mouse
      dotPos.x = mouse.x;
      dotPos.y = mouse.y;

      // Circle follows mouse with a smooth lerp delay
      circlePos.x += (mouse.x - circlePos.x) * 0.15;
      circlePos.y += (mouse.y - circlePos.y) * 0.15;

      setDotX(dotPos.x);
      setDotY(dotPos.y);
      setCircleX(circlePos.x);
      setCircleY(circlePos.y);

      animFrameId = requestAnimationFrame(tick);
    };

    animFrameId = requestAnimationFrame(tick);

    document.addEventListener('pointerover', onPointerOver, true);
    document.addEventListener('pointerout', onPointerOut, true);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeaveWindow);
      document.removeEventListener('mouseenter', onMouseEnterWindow);
      document.removeEventListener('pointerover', onPointerOver, true);
      document.removeEventListener('pointerout', onPointerOut, true);
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      <div 
        ref={dotRef} 
        className={`custom-cursor ${isHovered ? 'hovered' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 99999,
          willChange: 'transform, opacity',
          opacity: isHidden ? 0 : 1,
          transition: 'opacity 0.18s ease'
        }}
      />
      <div 
        ref={circleRef} 
        className={`custom-cursor-outer ${isHovered ? 'hovered' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 99998,
          willChange: 'transform, opacity',
          opacity: isHidden ? 0 : 1,
          transition: 'opacity 0.18s ease'
        }}
      />
    </>
  );
};

export default CustomCursor;
