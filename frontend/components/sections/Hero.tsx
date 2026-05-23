'use client';

import React from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3 + i * 0.15,
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="section"
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 10,
      }}
    >
      {/* Mobile-only hero content (desktop sees the laptop) */}
      <div className="md:hidden" style={{ textAlign: 'center' }}>
        <motion.h1
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 'clamp(2rem, 8vw, 3rem)',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #C8A97E, #E8D5B0)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            marginBottom: '16px',
          }}
        >
          Alexander Kurian
        </motion.h1>

        <motion.p
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '10px',
            color: '#8A8A8A',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}
        >
          Software Engineer · Founder · Builder
        </motion.p>

        <motion.div
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          style={{ marginTop: '32px' }}
        >
          <a
            href="/Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card"
            style={{
              padding: '12px 24px',
              color: '#C8A97E',
              fontSize: '12px',
              fontFamily: "'DM Mono', monospace",
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              textDecoration: 'none',
              display: 'inline-block',
              border: '1px solid rgba(200,169,126,0.3)',
              borderRadius: '4px',
              background: 'rgba(200,169,126,0.05)',
            }}
          >
            Download Resume
          </a>
        </motion.div>
      </div>

      {/* Scroll prompt */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        style={{
          position: 'absolute',
          bottom: '3rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '10px',
            color: 'rgba(200, 169, 126, 0.4)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: '1px',
            height: '24px',
            background: 'linear-gradient(180deg, rgba(200,169,126,0.4), transparent)',
          }}
        />
      </motion.div>
    </section>
  );
}
