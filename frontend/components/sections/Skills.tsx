'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { skills } from '@/lib/data';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

interface SkillsProps {
  isActive: boolean;
}

export default function Skills({ isActive }: SkillsProps) {
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
        initial="hidden"
        animate={isActive ? 'visible' : 'hidden'}
        variants={containerVariants}
        style={{
          maxWidth: '520px',
          width: '100%',
          padding: '0 1rem',
        }}
        className="w-full md:w-auto md:ml-[6%]"
      >
        {/* Section tag */}
        <motion.div variants={itemVariants}>
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
          variants={itemVariants}
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
          Tech{' '}
          <span className="gold-gradient-text" style={{ fontSize: 'inherit' }}>
            stack
          </span>
        </motion.h2>

        {/* Skill categories */}
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '32px 48px' 
          }}
        >
          {skills.map((category) => (
            <motion.div key={category.category} variants={itemVariants}>
              {/* Category header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '16px',
                }}
              >
                <span style={{ color: '#C8A97E', fontSize: '12px' }}>
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

              {/* Skills list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {category.items.map((skill) => (
                  <div key={skill.name}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '6px',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: '12px',
                          color: '#F0EDE6',
                        }}
                      >
                        {skill.name}
                      </span>
                      <span
                        style={{
                          fontFamily: "'DM Mono', monospace",
                          fontSize: '10px',
                          color: '#8A8A8A',
                        }}
                      >
                        {skill.level}%
                      </span>
                    </div>
                    <div className="skill-bar">
                      <motion.div
                        className="skill-bar-fill"
                        initial={{ width: 0 }}
                        animate={isActive ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{
                          duration: 1.2,
                          ease: [0.16, 1, 0.3, 1] as const,
                          delay: 0.3,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
