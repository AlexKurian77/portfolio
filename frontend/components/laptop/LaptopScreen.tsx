'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { Html } from '@react-three/drei';
import { terminalSkills, projects } from '@/lib/data';
import { TIMING } from '@/lib/constants';
import { Code, Leaf, BarChart, Brain } from 'lucide-react';
import { motion } from 'framer-motion';

interface LaptopScreenProps {
  activeProject?: string | null;
  currentPhase: string;
}

// ── Hero Screen ────────────────────────────────────────────────
function HeroScreenContent() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0a1628',
        fontFamily: "'Outfit', sans-serif",
        padding: '20px',
      }}
    >
      <div
        style={{
          fontSize: '24px',
          fontWeight: 700,
          background: 'linear-gradient(135deg, #C8A97E, #E8D5B0)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '8px',
          letterSpacing: '-0.02em',
        }}
      >
        Alexander Kurian
      </div>
      <div
        style={{
          fontSize: '10px',
          color: '#8A8A8A',
          fontFamily: "'DM Mono', monospace",
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
        }}
      >
        Software Engineer · Founder · Builder
      </div>
      <div
        style={{
          width: '30px',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, #C8A97E, transparent)',
          marginTop: '16px',
          marginBottom: '24px',
        }}
      />
      <a
        href="/Resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          padding: '8px 16px',
          borderRadius: '4px',
          border: '1px solid rgba(200,169,126,0.3)',
          color: '#C8A97E',
          fontSize: '10px',
          fontFamily: "'DM Mono', monospace",
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          textDecoration: 'none',
          cursor: 'pointer',
          transition: 'all 0.2s',
          background: 'rgba(200,169,126,0.05)',
          pointerEvents: 'auto',
        }}
        onMouseEnter={(e) => {
          (e.target as HTMLElement).style.background = 'rgba(200,169,126,0.15)';
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLElement).style.background = 'rgba(200,169,126,0.05)';
        }}
      >
        Download Resume
      </a>
    </div>
  );
}

// ── About Screen ───────────────────────────────────────────────
function AboutScreenContent() {
  const items = [
    { label: '9.0 CGPA', sub: 'Computer Science' },
    { label: 'Warsaw', sub: 'International Internship' },
    { label: 'SIH Finalist', sub: 'Smart India Hackathon' },
  ];

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        background: '#0a1628',
        fontFamily: "'DM Mono', monospace",
        padding: '16px 20px',
        gap: '10px',
      }}
    >
      {items.map((item) => (
        <div
          key={item.label}
          style={{
            padding: '8px 12px',
            borderLeft: '2px solid #C8A97E',
            background: 'rgba(200,169,126,0.05)',
          }}
        >
          <div style={{ fontSize: '12px', color: '#E8D5B0', fontWeight: 500 }}>
            {item.label}
          </div>
          <div style={{ fontSize: '9px', color: '#8A8A8A', marginTop: '2px' }}>
            {item.sub}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Skills Screen (Terminal) ───────────────────────────────────
function SkillsScreenContent() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: '#0a0a0a',
        fontFamily: "'DM Mono', monospace",
        padding: '12px 16px',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '6px',
          marginBottom: '10px',
        }}
      >
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#FF5F57' }} />
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#FEBC2E' }} />
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#28C840' }} />
      </div>
      <div style={{ fontSize: '9px', color: '#666', marginBottom: '6px' }}>
        alex@dev ~ % stack --list
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '4px',
        }}
      >
        {terminalSkills.map((skill) => (
          <span
            key={skill}
            style={{
              fontSize: '9px',
              color: '#C8A97E',
              padding: '2px 6px',
              background: 'rgba(200,169,126,0.08)',
              borderRadius: '3px',
              border: '1px solid rgba(200,169,126,0.15)',
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Project Screen ─────────────────────────────────────────────
function ProjectScreenContent({ projectId }: { projectId?: string | null }) {
  const project = projects.find((p) => p.id === projectId);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0a1628',
        fontFamily: "'Outfit', sans-serif",
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {project && project.image ? (
        <motion.img
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          src={project.image}
          alt={project.name}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'fill',
          }}
        />
      ) : (
        <>
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '12px',
              background: 'rgba(200,169,126,0.1)',
              border: '1px solid rgba(200,169,126,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              marginBottom: '12px',
            }}
          >
            <Code size={32} strokeWidth={1.5} color="#C8A97E" />
          </div>
          <div style={{ fontSize: '10px', color: '#8A8A8A', fontFamily: "'DM Mono', monospace" }}>
            hover a project
          </div>
        </>
      )}
    </div>
  );
}

// ── Contact Screen ─────────────────────────────────────────────
function ContactScreenContent() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#080808',
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      <div
        style={{
          fontSize: '14px',
          fontWeight: 300,
          color: '#C8A97E',
          opacity: 0.6,
        }}
      >
        ✦
      </div>
    </div>
  );
}

// ── Main Screen Component ──────────────────────────────────────
export default function LaptopScreen({ activeProject, currentPhase }: LaptopScreenProps) {
  const [bootState, setBootState] = useState<'off' | 'booting' | 'on' | 'turning_off'>('off');
  const [hasBooted, setHasBooted] = useState(false);

  useEffect(() => {
    // Wait for the lid to fully open (using the same timings from LaptopScene)
    const lidTotalTime = (TIMING.lidOpenDelay + TIMING.lidOpenDuration) * 1000;

    const startBootTimer = setTimeout(() => {
      setBootState('booting');
      setHasBooted(true);
    }, lidTotalTime);

    return () => {
      clearTimeout(startBootTimer);
    };
  }, []);

  useEffect(() => {
    if (!hasBooted) return;
    
    if (currentPhase === 'contact' && bootState !== 'off' && bootState !== 'turning_off') {
      setBootState('turning_off');
    } else if (currentPhase !== 'contact' && (bootState === 'off' || bootState === 'turning_off')) {
      setBootState('booting');
    }
  }, [currentPhase, hasBooted, bootState]);

  useEffect(() => {
    if (hasBooted && bootState === 'booting') {
      const finishBootTimer = setTimeout(() => {
        setBootState('on');
      }, 2000);
      return () => clearTimeout(finishBootTimer);
    }
    if (hasBooted && bootState === 'turning_off') {
      const powerOffTimer = setTimeout(() => {
        setBootState('off');
      }, 800);
      return () => clearTimeout(powerOffTimer);
    }
  }, [bootState, hasBooted]);

  const screenContent = useMemo(() => {
    switch (currentPhase) {
      case 'hero':
        return <HeroScreenContent />;
      case 'about':
        return <AboutScreenContent />;
      case 'skills':
        return <SkillsScreenContent />;
      case 'projects':
        return <ProjectScreenContent projectId={activeProject} />;
      case 'contact':
        return <ContactScreenContent />;
      default:
        return <HeroScreenContent />;
    }
  }, [currentPhase, activeProject]);

  return (
    <Html
      transform
      position={[0, 1.09, -1.015]}
      scale={0.3}
      style={{
        width: '320px',
        height: '200px',
        borderRadius: '4px',
        overflow: 'hidden',
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={
          bootState === 'off'
            ? { opacity: 0 }
            : bootState === 'booting'
            ? { opacity: [0, 1, 0.1, 1, 0.5, 1, 0.2, 1, 0.8, 1] }
            : bootState === 'turning_off'
            ? { opacity: [1, 0.2, 0.8, 0, 0.5, 0] }
            : { opacity: 1 }
        }
        transition={
          bootState === 'booting'
            ? {
                duration: 2,
                ease: 'linear',
                times: [0, 0.05, 0.1, 0.15, 0.3, 0.4, 0.6, 0.7, 0.8, 1],
              }
            : bootState === 'turning_off'
            ? {
                duration: 0.8,
                ease: 'linear',
                times: [0, 0.2, 0.4, 0.6, 0.8, 1],
              }
            : { duration: 0.3 }
        }
        style={{ width: '100%', height: '100%' }}
      >
        {screenContent}
      </motion.div>
    </Html>
  );
}
