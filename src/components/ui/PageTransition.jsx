import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Lightweight route transition — just the clapperboard snap + slide.
 * No words, no progress dots. Fast and punchy.
 */
export default function PageTransition({ onComplete }) {
  const [clapOpen, setClapOpen] = useState(true);

  useEffect(() => {
    // Snap clapper shut after a brief pause
    const t1 = setTimeout(() => setClapOpen(false), 200);
    // Fire completion after snap
    const t2 = setTimeout(() => {
      if (typeof onComplete === 'function') onComplete();
    }, 600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: '-100%' }}
      transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#0a0a0a',
        zIndex: 999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Mini Clapperboard */}
      <div style={{ position: 'relative', width: '120px', height: '95px' }}>
        {/* Board body */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '65px',
            border: '2px solid rgba(255,255,255,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '8px',
              letterSpacing: '3px',
              fontWeight: 600,
              color: 'var(--text-color)',
            }}
          >
            LNA_STUDIO
          </span>
        </div>

        {/* Clapper top (hinged) */}
        <motion.div
          animate={{ rotate: clapOpen ? -30 : 0 }}
          transition={{ duration: 0.12, ease: 'easeIn' }}
          style={{
            position: 'absolute',
            bottom: '63px',
            left: 0,
            width: '100%',
            height: '16px',
            transformOrigin: 'bottom left',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              background: `repeating-linear-gradient(
                -45deg,
                var(--text-color),
                var(--text-color) 6px,
                var(--bg-color) 6px,
                var(--bg-color) 12px
              )`,
              border: '2px solid rgba(255,255,255,0.3)',
            }}
          />
        </motion.div>

        {/* Bottom stripe (static) */}
        <div
          style={{
            position: 'absolute',
            bottom: '63px',
            left: 0,
            width: '100%',
            height: '16px',
            background: `repeating-linear-gradient(
              45deg,
              var(--text-color),
              var(--text-color) 6px,
              var(--bg-color) 6px,
              var(--bg-color) 12px
            )`,
            border: '2px solid rgba(255,255,255,0.3)',
            zIndex: -1,
          }}
        />
      </div>
    </motion.div>
  );
}
