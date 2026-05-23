'use client';

import React, { useState, useCallback, useEffect, Suspense, lazy } from 'react';
import dynamic from 'next/dynamic';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { initSmoothScroll, destroySmoothScroll } from '@/lib/smoothScroll';
import { SCROLL_HEIGHT_VH, MOBILE_BREAKPOINT } from '@/lib/constants';

// Dynamic imports for heavy components
const LaptopScene = dynamic(
  () => import('@/components/laptop/LaptopScene'),
  { ssr: false }
);

import Preloader from '@/components/ui/Preloader';
import CustomCursor from '@/components/ui/CustomCursor';
import SectionLabel from '@/components/ui/SectionLabel';
import NavDots from '@/components/ui/NavDots';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Experience from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const { currentPhase } = useScrollProgress();

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Initialize smooth scroll
  useEffect(() => {
    const lenis = initSmoothScroll();
    return () => {
      destroySmoothScroll();
    };
  }, []);

  const handlePreloaderComplete = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleProjectHover = useCallback((projectId: string | null) => {
    setActiveProject(projectId);
  }, []);

  return (
    <>
      {/* Preloader */}
      {!isLoaded && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Custom cursor (desktop only) */}
      {isLoaded && <CustomCursor />}

      {/* 3D Laptop Scene - fixed, behind everything (desktop only) */}
      {isLoaded && !isMobile && (
        <LaptopScene
          currentPhase={currentPhase}
          activeProject={activeProject}
        />
      )}

      {/* Navigation UI & Fixed Elements */}
      {isLoaded && (
        <>
          <SectionLabel currentPhase={currentPhase} />
          <NavDots currentPhase={currentPhase} />
          
          <a
            href="/Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card"
            style={{
              position: 'fixed',
              top: '2rem',
              right: '2rem',
              zIndex: 50,
              padding: '10px 20px',
              color: '#C8A97E',
              fontSize: '12px',
              fontFamily: "'DM Mono', monospace",
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              border: '1px solid rgba(200,169,126,0.3)',
              borderRadius: '4px',
              background: 'rgba(200,169,126,0.05)',
              pointerEvents: 'auto',
              backdropFilter: 'blur(8px)',
            }}
          >
            Resume
          </a>
        </>
      )}

      {/* Scroll container */}
      <div
        id="scroll-container"
        style={{
          position: 'relative',
          zIndex: 10,
          height: `${SCROLL_HEIGHT_VH}vh`,
          pointerEvents: 'none',
        }}
      >
        {/* Phase 1: Hero */}
        <div
          style={{
            height: '12%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Hero />
        </div>

        {/* Phase 2: About */}
        <div
          style={{
            height: '18%',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <About isActive={currentPhase === 'about'} />
        </div>

        {/* Phase 3: Skills */}
        <div
          style={{
            height: '18%',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Skills isActive={currentPhase === 'skills'} />
        </div>

        {/* Phase 4: Experience */}
        <div
          style={{
            height: '18%',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Experience isActive={currentPhase === 'experience'} />
        </div>

        {/* Phase 5: Projects */}
        <div
          style={{
            height: '19%',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Projects
            isActive={currentPhase === 'projects'}
            onProjectHover={handleProjectHover}
          />
        </div>

        {/* Phase 6: Contact */}
        <div
          style={{
            height: '15%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Contact isActive={currentPhase === 'contact'} />
        </div>
      </div>
    </>
  );
}
