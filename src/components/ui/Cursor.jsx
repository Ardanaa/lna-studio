import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const Cursor = () => {
  const dotSize = 10;
  const ringSize = 40;
  const hoverDotSize = 6;
  const hoverRingSize = 60;

  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  // Dot: snappy, near-instant
  const dotSpring = { damping: 30, stiffness: 500, mass: 0.2 };
  const dotX = useSpring(mouse.x, dotSpring);
  const dotY = useSpring(mouse.y, dotSpring);

  // Ring: lazy, trailing behind
  const ringSpring = { damping: 25, stiffness: 120, mass: 0.8 };
  const ringX = useSpring(mouse.x, ringSpring);
  const ringY = useSpring(mouse.y, ringSpring);

  const [isHovered, setIsHovered] = useState(false);
  const [cursorLabel, setCursorLabel] = useState('');

  useEffect(() => {
    const onMouseMove = (e) => {
      mouse.x.set(e.clientX);
      mouse.y.set(e.clientY);
    };

    const onMouseOver = (e) => {
      const target = e.target.closest('a, button, input, textarea, [data-cursor-hover]');
      if (target) {
        setIsHovered(true);

        // Context-aware labels
        const link = target.closest('a');
        if (link && link.href && link.href.includes('/project/')) {
          setCursorLabel('VIEW');
        } else if (link && link.href && link.href.includes('/archive')) {
          setCursorLabel('EXPLORE');
        } else if (target.closest('input, textarea')) {
          setCursorLabel('');
        } else if (target.closest('button[type="submit"]')) {
          setCursorLabel('SEND');
        } else {
          setCursorLabel('');
        }
      } else {
        setIsHovered(false);
        setCursorLabel('');
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  return (
    <>
      {/* Inner Dot */}
      <motion.div
        style={{
          position: 'fixed',
          left: dotX,
          top: dotY,
          pointerEvents: 'none',
          zIndex: 999999,
          borderRadius: '50%',
          backgroundColor: '#fff',
          mixBlendMode: 'difference',
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovered ? hoverDotSize : dotSize,
          height: isHovered ? hoverDotSize : dotSize,
          opacity: isHovered ? 0.8 : 1,
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.2 }}
      />

      {/* Outer Ring */}
      <motion.div
        style={{
          position: 'fixed',
          left: ringX,
          top: ringY,
          pointerEvents: 'none',
          zIndex: 999998,
          borderRadius: '50%',
          border: '1px solid #fff',
          backgroundColor: 'transparent',
          mixBlendMode: 'difference',
          translateX: '-50%',
          translateY: '-50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        animate={{
          width: isHovered ? hoverRingSize : ringSize,
          height: isHovered ? hoverRingSize : ringSize,
          borderColor: isHovered ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.3)',
          backgroundColor: isHovered ? 'rgba(255,255,255,0.08)' : 'transparent',
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.3 }}
      >
        {/* Context Label */}
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: cursorLabel ? 1 : 0,
            scale: cursorLabel ? 1 : 0.5,
          }}
          transition={{ duration: 0.15 }}
          style={{
            color: '#fff',
            fontFamily: 'Inter, sans-serif',
            fontSize: '8px',
            fontWeight: 700,
            letterSpacing: '2px',
            mixBlendMode: 'difference',
            userSelect: 'none',
          }}
        >
          {cursorLabel}
        </motion.span>
      </motion.div>
    </>
  );
};

export default Cursor;
