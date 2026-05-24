'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  useEffect(() => {
    // Only show on devices with fine pointers
    const hasPointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!hasPointer) return;

    setIsVisible(true);

    const handleMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleHoverStart = () => setIsHovering(true);
    const handleHoverEnd = () => setIsHovering(false);

    window.addEventListener('mousemove', handleMove);

    // Observe interactive elements
    const observer = new MutationObserver(() => {
      const interactives = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, [data-cursor="pointer"]'
      );
      interactives.forEach((el) => {
        el.addEventListener('mouseenter', handleHoverStart);
        el.addEventListener('mouseleave', handleHoverEnd);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Initial bind
    const interactives = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, select, [data-cursor="pointer"]'
    );
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', handleHoverStart);
      el.addEventListener('mouseleave', handleHoverEnd);
    });

    return () => {
      window.removeEventListener('mousemove', handleMove);
      observer.disconnect();
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Dot */}
      <motion.div
        style={{
          position: 'fixed',
          left: cursorX,
          top: cursorY,
          width: isHovering ? 8 : 6,
          height: isHovering ? 8 : 6,
          borderRadius: '50%',
          background: '#C8A97E',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.2s, height 0.2s',
        }}
      />
      {/* Ring */}
      <motion.div
        style={{
          position: 'fixed',
          left: cursorX,
          top: cursorY,
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
          borderRadius: '50%',
          border: `1px solid rgba(200, 169, 126, ${isHovering ? 0.5 : 0.25})`,
          pointerEvents: 'none',
          zIndex: 9998,
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.3s cubic-bezier(0.16,1,0.3,1), height 0.3s cubic-bezier(0.16,1,0.3,1), border-color 0.3s',
        }}
      />
    </>
  );
}
