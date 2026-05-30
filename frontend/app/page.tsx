"use client";

import React, { useState, useCallback, useEffect, Suspense, lazy } from "react";
import dynamic from "next/dynamic";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { initSmoothScroll, destroySmoothScroll } from "@/lib/smoothScroll";
import { SCROLL_HEIGHT_VH, MOBILE_BREAKPOINT } from "@/lib/constants";

// Dynamic imports for heavy components
const LaptopScene = dynamic(() => import("@/components/laptop/LaptopScene"), {
  ssr: false,
});

import Preloader from "@/components/ui/Preloader";
import SectionLabel from "@/components/ui/SectionLabel";
import NavDots from "@/components/ui/NavDots";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import Message from "@/components/sections/Message";

let hasLoadedOnce = false;
let savedScrollPosition = 0;

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(hasLoadedOnce);
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const { currentPhase } = useScrollProgress();

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Initialize smooth scroll
  useEffect(() => {
    const lenis = initSmoothScroll();

    if (savedScrollPosition > 0) {
      setTimeout(() => {
        window.scrollTo(0, savedScrollPosition);
        lenis.scrollTo(savedScrollPosition, { immediate: true });
      }, 100);
    }

    const saveScroll = () => {
      if (window.scrollY > 0) {
        savedScrollPosition = window.scrollY;
      }
    };
    window.addEventListener("pointerdown", saveScroll);
    window.addEventListener("keydown", saveScroll);

    return () => {
      window.removeEventListener("pointerdown", saveScroll);
      window.removeEventListener("keydown", saveScroll);
      destroySmoothScroll();
    };
  }, []);

  const handlePreloaderComplete = useCallback(() => {
    hasLoadedOnce = true;
    setIsLoaded(true);
  }, []);

  const handleProjectHover = useCallback((projectId: string | null) => {
    setActiveProject(projectId);
  }, []);

  return (
    <>
      {/* Preloader */}
      {!isLoaded && <Preloader onComplete={handlePreloaderComplete} />}

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
              position: "fixed",
              top: "2rem",
              right: "2rem",
              zIndex: 50,
              padding: "10px 20px",
              color: "#C8A97E",
              fontSize: "12px",
              fontFamily: "'DM Mono', monospace",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              border: "1px solid rgba(200,169,126,0.3)",
              borderRadius: "4px",
              background: "rgba(200,169,126,0.05)",
              pointerEvents: "auto",
              backdropFilter: "blur(8px)",
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
          position: "relative",
          zIndex: 10,
          height: isMobile ? "auto" : `${SCROLL_HEIGHT_VH}vh`,
          pointerEvents: "none",
        }}
      >
        {/* Phase 1: Hero */}
        <div
          style={{
            height: isMobile ? "auto" : "10%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Hero />
        </div>

        {/* Phase 2: About */}
        <div
          style={{
            height: isMobile ? "auto" : "15%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <About isActive={currentPhase === "about"} isMobile={isMobile} />
        </div>

        {/* Phase 3: Skills */}
        <div
          style={{
            height: isMobile ? "auto" : "15%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Skills isActive={currentPhase === "skills"} isMobile={isMobile} />
        </div>

        {/* Phase 4: Experience */}
        <div
          style={{
            height: isMobile ? "auto" : "15%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Experience isActive={currentPhase === "experience"} onHover={handleProjectHover} isMobile={isMobile} />
        </div>

        {/* Phase 5: Projects */}
        <div
          style={{
            height: isMobile ? "auto" : "17%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Projects
            isActive={currentPhase === "projects"}
            onProjectHover={handleProjectHover}
            isMobile={isMobile}
          />
        </div>

        {/* Phase 6: Contact */}
        <div
          style={{
            height: isMobile ? "auto" : "13%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Contact isActive={currentPhase === "contact"} isMobile={isMobile} />
        </div>

        {/* Phase 7: Message */}
        <div
          style={{
            height: isMobile ? "auto" : "15%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Message isActive={currentPhase === "message"} isMobile={isMobile} />
        </div>
      </div>
    </>
  );
}
