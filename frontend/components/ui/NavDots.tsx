'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ScrollPhase } from '@/types';
import { SCROLL_BREAKPOINTS, SCROLL_HEIGHT_VH } from '@/lib/constants';
import { scrollTo } from '@/lib/smoothScroll';

interface NavDotsProps {
  currentPhase: ScrollPhase;
}

const phases: ScrollPhase[] = ['hero', 'about', 'skills', 'experience', 'projects', 'contact'];

const phaseLabels: Record<ScrollPhase, string> = {
  hero: 'Home',
  about: 'About',
  skills: 'Skills',
  experience: 'Experience',
  projects: 'Projects',
  contact: 'Contact',
};

export default function NavDots({ currentPhase }: NavDotsProps) {
  const [hoveredPhase, setHoveredPhase] = useState<ScrollPhase | null>(null);

  const handleClick = (phase: ScrollPhase) => {
    const bp = SCROLL_BREAKPOINTS[phase];
    const scrollTarget = bp.start * SCROLL_HEIGHT_VH * window.innerHeight / 100;
    scrollTo(scrollTarget);
  };

  return (
    <div
      className="hidden md:flex"
      style={{
        position: 'fixed',
        right: '2rem',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 50,
        flexDirection: 'column',
        gap: '16px',
        alignItems: 'flex-end',
      }}
    >
      {phases.map((phase) => {
        const isActive = currentPhase === phase;
        const isHovered = hoveredPhase === phase;

        return (
          <div
            key={phase}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
            }}
            data-cursor="pointer"
            onMouseEnter={() => setHoveredPhase(phase)}
            onMouseLeave={() => setHoveredPhase(null)}
            onClick={() => handleClick(phase)}
          >
            {/* Label (appears on hover) */}
            <motion.span
              initial={{ opacity: 0, x: 5 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                x: isHovered ? 0 : 5,
              }}
              transition={{ duration: 0.2 }}
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: '10px',
                color: '#C8A97E',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}
            >
              {phaseLabels[phase]}
            </motion.span>

            {/* Dot */}
            <motion.div
              animate={{
                scale: isActive ? 1.3 : isHovered ? 1.1 : 1,
                background: isActive
                  ? '#C8A97E'
                  : isHovered
                  ? 'rgba(200, 169, 126, 0.6)'
                  : 'rgba(200, 169, 126, 0.2)',
              }}
              transition={{ duration: 0.3 }}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                flexShrink: 0,
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
