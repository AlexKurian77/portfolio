import React from 'react';
import { motion } from 'framer-motion';
import { bioText, personalTags, milestones } from '@/lib/data';
import { GraduationCap, Globe, Trophy, Flag } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  GraduationCap: <GraduationCap size={20} strokeWidth={1.5} />,
  Globe: <Globe size={20} strokeWidth={1.5} />,
  Trophy: <Trophy size={20} strokeWidth={1.5} />,
  Flag: <Flag size={20} strokeWidth={1.5} />,
};

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

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const },
  },
};

interface AboutProps {
  isActive: boolean;
  isMobile?: boolean;
}

export default function About({ isActive, isMobile }: AboutProps) {
  return (
    <section
      id="about"
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
      {/* Content goes right on desktop (laptop is left), full width on mobile */}
      <motion.div
        initial={isMobile ? 'visible' : 'hidden'}
        animate={isActive || isMobile ? 'visible' : 'hidden'}
        variants={containerVariants}
        className="w-full md:w-auto md:mr-[6%]"
        style={{
          maxWidth: '520px',
          width: '100%',
          padding: '0 1rem',
        }}
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
            ── About
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          variants={itemVariants}
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: 600,
            color: '#F0EDE6',
            marginTop: '16px',
            marginBottom: '20px',
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
          }}
        >
          Building things
          <br />
          that{' '}
          <span className="gold-gradient-text" style={{ fontSize: 'inherit' }}>
            matter
          </span>
        </motion.h2>

        {/* Bio */}
        <motion.p
          variants={itemVariants}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '14px',
            lineHeight: 1.7,
            color: '#8A8A8A',
            marginBottom: '28px',
          }}
        >
          {bioText}
        </motion.p>

        {/* Milestone cards */}
        <motion.div
          variants={itemVariants}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '12px',
            marginBottom: '28px',
          }}
        >
          {milestones.map((m) => (
            <div
              key={m.id}
              className="glass-card"
              style={{
                padding: '16px',
              }}
            >
              <span style={{ display: 'block', marginBottom: '8px', color: '#C8A97E' }}>
                {iconMap[m.icon]}
              </span>
              <div
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#E8D5B0',
                  marginBottom: '2px',
                }}
              >
                {m.title}
              </div>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '10px',
                  color: '#8A8A8A',
                  lineHeight: 1.4,
                }}
              >
                {m.subtitle}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Personal tags */}
        <motion.div
          variants={itemVariants}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          {personalTags.map((tag) => (
            <span key={tag} className="tag-pill">
              {tag}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
