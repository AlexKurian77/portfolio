'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollPhase } from '@/types';

interface SectionLabelProps {
  currentPhase: ScrollPhase;
}

const labels: Record<ScrollPhase, string> = {
  hero: '<section.hero />',
  about: '<section.about />',
  skills: '<section.skills />',
  experience: '<section.experience />',
  projects: '<section.projects />',
  contact: '<section.contact />',
};

export default function SectionLabel({ currentPhase }: SectionLabelProps) {
  return (
    <div
      style={{
        position: 'fixed',
        left: '2rem',
        bottom: '2rem',
        zIndex: 50,
        pointerEvents: 'none',
      }}
      className="hidden md:block"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPhase}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '11px',
            color: 'rgba(200, 169, 126, 0.5)',
            letterSpacing: '0.05em',
          }}
        >
          {labels[currentPhase]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
