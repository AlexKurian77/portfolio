'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { projects } from '@/lib/data';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

interface ProjectsProps {
  isActive: boolean;
  onProjectHover: (projectId: string | null) => void;
}

export default function Projects({ isActive, onProjectHover }: ProjectsProps) {
  return (
    <section
      id="projects"
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
      {/* Left side cards on desktop (laptop is right), full width mobile */}
      <motion.div
        initial="hidden"
        animate={isActive ? 'visible' : 'hidden'}
        variants={containerVariants}
        className="w-full md:w-auto md:ml-[6%]"
        style={{
          maxWidth: '520px',
          width: '100%',
          padding: '0 1rem',
        }}
      >
        {/* Section tag */}
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
            ── Projects
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
          Selected{' '}
          <span className="gold-gradient-text" style={{ fontSize: 'inherit' }}>
            work
          </span>
        </motion.h2>

        {/* Project cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {projects.map((project) => (
            <motion.a
              key={project.id}
              href={project.url || project.github || '#'}
              target="_blank"
              rel="noopener noreferrer"
              variants={cardVariants}
              className="glass-card"
              style={{
                padding: '24px',
                cursor: 'pointer',
                textDecoration: 'none',
                display: 'block',
              }}
              data-cursor="pointer"
              onMouseEnter={() => onProjectHover(project.id)}
              onMouseLeave={() => onProjectHover(null)}
            >
              {/* Color accent bar */}
              <div
                style={{
                  width: '24px',
                  height: '3px',
                  borderRadius: '2px',
                  background: project.color,
                  marginBottom: '16px',
                }}
              />

              {/* Project name + tagline */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '8px',
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#F0EDE6',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {project.name}
                </h3>
                {(project.url || project.github) && (
                  <span
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: '16px',
                      color: '#C8A97E',
                      opacity: 0.6,
                      transition: 'opacity 0.2s',
                    }}
                  >
                    ↗
                  </span>
                )}
              </div>

              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '12px',
                  color: '#8A8A8A',
                  lineHeight: 1.5,
                  marginBottom: '14px',
                }}
              >
                {project.tagline}
              </p>

              {/* Stack pills */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '6px',
                }}
              >
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: '10px',
                      color: 'rgba(200, 169, 126, 0.7)',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      background: 'rgba(200, 169, 126, 0.06)',
                      border: '1px solid rgba(200, 169, 126, 0.1)',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
