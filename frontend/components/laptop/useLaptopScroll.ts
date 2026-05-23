'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import { LAPTOP_KEYFRAMES, SCROLL_BREAKPOINTS } from '@/lib/constants';

gsap.registerPlugin(ScrollTrigger);

interface LaptopRefs {
  groupRef: React.RefObject<THREE.Group | null>;
  lidRef: React.RefObject<THREE.Group | null>;
  screenHtmlRef: React.RefObject<HTMLDivElement | null>;
}

export function useLaptopScroll({ groupRef, lidRef }: LaptopRefs) {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!groupRef.current || !lidRef.current) return;

    const group = groupRef.current;
    const lid = lidRef.current;
    const kf = LAPTOP_KEYFRAMES;
    const bp = SCROLL_BREAKPOINTS;

    // Create a master timeline scrubbed by scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#scroll-container',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
    });

    // Pause for 35% of the section before transitioning
    const pauseRatio = 0.35;

    const getTransition = (startBP: number, nextBP: number) => {
      const totalDuration = nextBP - startBP;
      const pauseDuration = totalDuration * pauseRatio;
      const moveDuration = totalDuration - pauseDuration;
      return {
        startTime: startBP + pauseDuration,
        duration: moveDuration,
      };
    };

    // ── Hero → About transition ──
    const heroT = getTransition(bp.hero.start, bp.about.start);
    tl.to(
      group.position,
      {
        x: kf.about.position.x,
        y: kf.about.position.y,
        duration: heroT.duration,
        ease: 'power1.inOut',
      },
      heroT.startTime
    );
    tl.to(
      group.scale,
      {
        x: kf.about.scale,
        y: kf.about.scale,
        z: kf.about.scale,
        duration: heroT.duration,
        ease: 'power1.inOut',
      },
      heroT.startTime
    );

    // ── About → Skills ──
    const aboutT = getTransition(bp.about.start, bp.skills.start);
    tl.to(
      group.position,
      {
        x: kf.skills.position.x,
        y: kf.skills.position.y,
        duration: aboutT.duration,
        ease: 'power1.inOut',
      },
      aboutT.startTime
    );

    // ── Skills → Experience ──
    const skillsT = getTransition(bp.skills.start, bp.experience.start);
    tl.to(
      group.position,
      {
        x: kf.experience.position.x,
        y: kf.experience.position.y,
        duration: skillsT.duration,
        ease: 'power1.inOut',
      },
      skillsT.startTime
    );

    // ── Experience → Projects ──
    const expT = getTransition(bp.experience.start, bp.projects.start);
    tl.to(
      group.position,
      {
        x: kf.projects.position.x,
        y: kf.projects.position.y,
        duration: expT.duration,
        ease: 'power1.inOut',
      },
      expT.startTime
    );

    // ── Projects → Contact ──
    const projT = getTransition(bp.projects.start, bp.contact.start);
    tl.to(
      group.position,
      {
        x: kf.contact.position.x,
        y: kf.contact.position.y,
        duration: projT.duration,
        ease: 'power1.inOut',
      },
      projT.startTime
    );
    tl.to(
      group.scale,
      {
        x: kf.contact.scale,
        y: kf.contact.scale,
        z: kf.contact.scale,
        duration: projT.duration,
        ease: 'power1.inOut',
      },
      projT.startTime
    );
    tl.to(
      lid.rotation,
      {
        x: kf.contact.lidRotation,
        duration: projT.duration * 0.5,
        ease: 'power1.inOut',
      },
      projT.startTime + (projT.duration * 0.5)
    );

    timelineRef.current = tl;

    return () => {
      tl.kill();
    };
  }, [groupRef, lidRef]);

  return timelineRef;
}
