'use client';

import { useRef, useCallback, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SCROLL_BREAKPOINTS } from '@/lib/constants';
import { ScrollPhase } from '@/types';

gsap.registerPlugin(ScrollTrigger);

export function useScrollProgress() {
  const progressRef = useRef(0);
  const [currentPhase, setCurrentPhase] = useState<ScrollPhase>('hero');

  const getPhase = useCallback((progress: number): ScrollPhase => {
    for (const [phase, { start, end }] of Object.entries(SCROLL_BREAKPOINTS)) {
      if (progress >= start && progress < end) {
        return phase as ScrollPhase;
      }
    }
    return 'message';
  }, []);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: '#scroll-container',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5,
      onUpdate: (self) => {
        progressRef.current = self.progress;
        const newPhase = getPhase(self.progress);
        setCurrentPhase((prev) => (prev !== newPhase ? newPhase : prev));
      },
    });

    return () => {
      trigger.kill();
    };
  }, [getPhase]);

  return { progressRef, currentPhase };
}
