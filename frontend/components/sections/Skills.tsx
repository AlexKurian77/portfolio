'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { skills } from '@/lib/data';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const tagContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.02,
      delayChildren: 0.08,
    },
  },
};

const tagVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 6 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const },
  },
};

interface SkillsProps {
  isActive: boolean;
  isMobile?: boolean;
}

export default function Skills({ isActive, isMobile }: SkillsProps) {
  return (
    <section
      id="skills"
      className="section"
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <motion.div
        initial={isMobile ? 'visible' : 'hidden'}
        animate={isActive || isMobile ? 'visible' : 'hidden'}
        variants={containerVariants}
        style={{
          maxWidth: '520px',
          width: '100%',
          padding: '0 1rem',
        }}
        className="w-full md:w-auto md:ml-[6%]"
      >
        {/* Section tag */}
        <motion.div variants={headerVariants}>
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '11px',
              color: 'rgba(200, 169, 126, 0.6)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            ── Skills
          </span>
        </motion.div>

        <motion.h2
          variants={headerVariants}
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: 600,
            color: '#F0EDE6',
            marginTop: '16px',
            marginBottom: '36px',
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
          }}
        >
          Tech{' '}
          <span className="gold-gradient-text" style={{ fontSize: 'inherit' }}>
            stack
          </span>
        </motion.h2>

        {/* Bento Grid */}
        <div className="bento-grid">
          {skills.map((category) => (
            <motion.div
              key={category.category}
              variants={cardVariants}
              className="bento-card"
              whileHover={{
                borderColor: 'rgba(200, 169, 126, 0.25)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.35), 0 0 0 1px rgba(200,169,126,0.12)',
                y: -3,
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Category header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '14px',
                }}
              >
                <span
                  style={{
                    color: '#C8A97E',
                    fontSize: '13px',
                    lineHeight: 1,
                  }}
                >
                  {category.icon}
                </span>
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: '11px',
                    color: '#E8D5B0',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  {category.category}
                </span>
              </div>

              {/* Skill tags */}
              <motion.div
                variants={tagContainerVariants}
                initial={isMobile ? 'visible' : 'hidden'}
                animate={isActive || isMobile ? 'visible' : 'hidden'}
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                }}
              >
                {category.items.map((skill) => (
                  <motion.span
                    key={skill.name}
                    variants={tagVariants}
                    className="skill-tag"
                    whileHover={{
                      borderColor: 'rgba(200, 169, 126, 0.5)',
                      background: 'rgba(200, 169, 126, 0.12)',
                      scale: 1.05,
                      boxShadow: '0 0 12px rgba(200, 169, 126, 0.12)',
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {skill.name}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
