'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { experiences } from '@/lib/data';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const },
  },
};

interface ExperienceProps {
  isActive: boolean;
}

export default function Experience({ isActive }: ExperienceProps) {
  return (
    <section
      id="experience"
      className="section"
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <motion.div
        initial="hidden"
        animate={isActive ? 'visible' : 'hidden'}
        variants={containerVariants}
        className="w-full md:w-auto md:mr-[6%]"
        style={{
          maxWidth: '520px',
          width: '100%',
          padding: '0 1rem',
        }}
      >
        <motion.div variants={cardVariants}>
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '11px',
              color: 'rgba(200, 169, 126, 0.6)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            ── Experience
          </span>
        </motion.div>

        <motion.h2
          variants={cardVariants}
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: 600,
            color: '#F0EDE6',
            marginTop: '16px',
            marginBottom: '32px',
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
          }}
        >
          Work{' '}
          <span className="gold-gradient-text" style={{ fontSize: 'inherit' }}>
            history
          </span>
        </motion.h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {experiences.map((exp) => (
            <motion.div
              key={exp.id}
              variants={cardVariants}
              className="glass-card"
              style={{ padding: '24px' }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '8px',
                }}
              >
                <div>
                  <h3
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: '18px',
                      fontWeight: 600,
                      color: '#F0EDE6',
                      marginBottom: '4px',
                    }}
                  >
                    {exp.role}
                  </h3>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '14px',
                      color: '#C8A97E',
                      fontWeight: 500,
                    }}
                  >
                    {exp.company}
                  </div>
                </div>
                <div
                  style={{
                    textAlign: 'right',
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: '11px',
                      color: '#8A8A8A',
                      marginBottom: '4px',
                    }}
                  >
                    {exp.duration}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '11px',
                      color: '#666',
                    }}
                  >
                    {exp.location}
                  </div>
                </div>
              </div>

              <ul
                style={{
                  marginTop: '16px',
                  paddingLeft: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                {exp.description.map((desc, i) => (
                  <li
                    key={i}
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '13px',
                      color: '#A0A0A0',
                      lineHeight: 1.6,
                    }}
                  >
                    {desc}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
