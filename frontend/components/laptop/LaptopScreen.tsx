"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";
import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { terminalSkills, projects, experiences } from "@/lib/data";
import { TIMING } from "@/lib/constants";
import { Globe, GraduationCap, Trophy, MapPin, Activity, Code2, Sparkles, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LaptopScreenProps {
  activeProject?: string | null;
  currentPhase: string;
  lidRef?: React.RefObject<THREE.Group | null>;
}

// ── Hero Screen (Animated Profile Boot) ────────────────────────
function HeroScreenContent() {
  const [bootLines, setBootLines] = useState<{ text: string; status: 'loading' | 'done' }[]>([]);
  const [showProfile, setShowProfile] = useState(false);
  const [loopKey, setLoopKey] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);

  const bootSequence = useMemo(
    () => [
      { text: 'Loading profile...', delay: 400 },
      { text: 'Verifying credentials', delay: 600 },
      { text: 'Mounting projects', delay: 500 },
      { text: 'Syncing experience data', delay: 450 },
      { text: 'Initializing portfolio', delay: 700 },
    ],
    []
  );

  useEffect(() => {
    setBootLines([]);
    setShowProfile(false);
    setIsGlitching(false);
    let timeouts: NodeJS.Timeout[] = [];
    let cumulative = 300;

    bootSequence.forEach((step, i) => {
      // Show line as loading
      const showTimer = setTimeout(() => {
        setBootLines((prev) => [...prev, { text: step.text, status: 'loading' }]);
      }, cumulative);
      timeouts.push(showTimer);

      cumulative += step.delay;

      // Mark as done
      const doneTimer = setTimeout(() => {
        setBootLines((prev) =>
          prev.map((line, idx) => (idx === i ? { ...line, status: 'done' } : line))
        );
      }, cumulative);
      timeouts.push(doneTimer);

      cumulative += 150;
    });

    // Show profile after boot
    const profileTimer = setTimeout(() => {
      setShowProfile(true);
    }, cumulative + 300);
    timeouts.push(profileTimer);

    // Start glitch effect right before loop
    const glitchTimer = setTimeout(() => {
      setIsGlitching(true);
    }, cumulative + 7500);
    timeouts.push(glitchTimer);

    // Loop the whole sequence
    const loopTimer = setTimeout(() => {
      setLoopKey((k) => k + 1);
    }, cumulative + 8000);
    timeouts.push(loopTimer);

    return () => timeouts.forEach(clearTimeout);
  }, [bootSequence, loopKey]);

  return (
    <motion.div
      animate={
        isGlitching
          ? {
              x: [0, -4, 4, -2, 2, -4, 0],
              y: [0, 2, -2, 3, -3, 2, 0],
              opacity: [1, 0.8, 1, 0.4, 1, 0.8, 1],
              filter: [
                'blur(0px) hue-rotate(0deg)',
                'blur(1px) hue-rotate(90deg)',
                'blur(0px) hue-rotate(-90deg)',
                'blur(2px) hue-rotate(45deg)',
                'blur(0px) hue-rotate(0deg)',
              ],
            }
          : { x: 0, y: 0, opacity: 1, filter: 'blur(0px) hue-rotate(0deg)' }
      }
      transition={{ duration: 0.4, ease: 'linear' }}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: '#0a0e17',
        fontFamily: "'DM Mono', monospace",
        padding: '14px 18px',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Subtle scan line effect */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(200,169,126,0.015) 2px, rgba(200,169,126,0.015) 4px)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Boot sequence */}
      {!showProfile && (
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div
            style={{
              fontSize: '8px',
              color: '#484f58',
              marginBottom: '8px',
              borderBottom: '1px solid #1a1f2e',
              paddingBottom: '4px',
            }}
          >
            sys.init v2.1.0
          </div>
          {bootLines.map((line, i) => (
            <motion.div
              key={`${loopKey}-${i}`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                height: '16px',
                fontSize: '8px',
              }}
            >
              <span
                style={{
                  color: line.status === 'done' ? '#4ade80' : '#C8A97E',
                  fontSize: '9px',
                  width: '10px',
                  textAlign: 'center',
                }}
              >
                {line.status === 'done' ? '✓' : '⠿'}
              </span>
              <span style={{ color: line.status === 'done' ? '#6e7681' : '#8b949e' }}>
                {line.text}
              </span>
              {line.status === 'done' && (
                <span style={{ color: '#4ade80', fontSize: '7px', marginLeft: 'auto' }}>
                  OK
                </span>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Profile card */}
      {showProfile && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            gap: '10px',
          }}
        >
          {/* Gold ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              border: '1.5px solid transparent',
              borderTopColor: '#C8A97E',
              borderRightColor: 'rgba(200,169,126,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundImage: 'url(/images/me.png)',
                backgroundSize: 'contain',
                backgroundRepeat:"no-repeat",
                backgroundPosition: 'center',
                border: '1px solid rgba(200,169,126,0.4)',
              }}
            />
          </motion.div>

          {/* Name */}
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                fontSize: '14px',
                fontWeight: 700,
                fontFamily: "'Outfit', sans-serif",
                background: 'linear-gradient(135deg, #C8A97E, #E8D5B0)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.02em',
              }}
            >
              Alexander Kurian
            </div>
            <div
              style={{
                fontSize: '7px',
                color: '#6e7681',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginTop: '3px',
              }}
            >
              Full Stack Developer
            </div>
          </div>

          {/* Stats row */}
          <div
            style={{
              display: 'flex',
              gap: '12px',
              marginTop: '4px',
            }}
          >
            {[
              { value: '3', label: 'Internships' },
              { value: '9.0', label: 'CGPA' },
              { value: '15+', label: 'Projects' },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#C8A97E',
                    fontFamily: "'Outfit', sans-serif",
                  }}
                >
                  {stat.value}
                </div>
                <div style={{ fontSize: '6px', color: '#484f58', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Status indicator */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              marginTop: '4px',
            }}
          >
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: '#4ade80',
              }}
            />
            <span style={{ fontSize: '7px', color: '#4ade80' }}>
              Available for work
            </span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

// ── About Screen (Telemetry Dashboard) ─────────────────────────
function AboutScreenContent() {
  const cards = [
    {
      id: 'academics',
      title: 'ACADEMICS',
      value: '9.0 CGPA',
      sub: 'Computer Science',
      icon: <GraduationCap size={12} color="#C8A97E" />,
      delay: 0.1,
    },
    {
      id: 'global',
      title: 'GLOBAL REACH',
      value: 'Warsaw',
      sub: 'International Internship',
      icon: <Globe size={12} color="#C8A97E" />,
      delay: 0.3,
    },
    {
      id: 'achievements',
      title: 'ACHIEVEMENTS',
      value: 'SIH Finalist',
      sub: 'Smart India Hackathon',
      icon: <Trophy size={12} color="#C8A97E" />,
      delay: 0.5,
    },
  ];

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        background: '#060b13',
        fontFamily: "'DM Mono', monospace",
        padding: '12px 16px',
        gap: '8px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundSize: '20px 20px',
          backgroundImage: 'linear-gradient(to right, rgba(200, 169, 126, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(200, 169, 126, 0.03) 1px, transparent 1px)',
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
          zIndex: 0,
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {cards.map((card) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: card.delay, type: 'spring', bounce: 0.4 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '8px 10px',
              background: 'rgba(16, 22, 34, 0.6)',
              border: '1px solid rgba(200, 169, 126, 0.1)',
              borderRadius: '6px',
              backdropFilter: 'blur(4px)',
            }}
          >
            <div
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '4px',
                background: 'rgba(200, 169, 126, 0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(200, 169, 126, 0.1)',
                flexShrink: 0,
              }}
            >
              {card.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                <div style={{ fontSize: '6px', color: '#6e7681', letterSpacing: '0.1em' }}>
                  {card.title}
                </div>
                {/* Mini pulsing indicator */}
                <motion.div
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: card.delay }}
                  style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#C8A97E' }}
                />
              </div>
              <div style={{ fontSize: '12px', color: '#E8D5B0', fontWeight: 600, letterSpacing: '-0.02em' }}>
                {card.value}
              </div>
              <div style={{ fontSize: '7px', color: '#8A8A8A', marginTop: '1px' }}>
                {card.sub}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── Skills Screen (Terminal) ───────────────────────────────────
function SkillsScreenContent() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "#0a0a0a",
        fontFamily: "'DM Mono', monospace",
        padding: "12px 16px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "6px",
          marginBottom: "10px",
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#FF5F57",
          }}
        />
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#FEBC2E",
          }}
        />
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#28C840",
          }}
        />
      </div>
      <div style={{ fontSize: "9px", color: "#666", marginBottom: "6px" }}>
        alex@dev ~ % stack --list
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "4px",
        }}
      >
        {terminalSkills.map((skill) => (
          <span
            key={skill}
            style={{
              fontSize: "9px",
              color: "#C8A97E",
              padding: "2px 6px",
              background: "rgba(200,169,126,0.08)",
              borderRadius: "3px",
              border: "1px solid rgba(200,169,126,0.15)",
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Experience Screen (Canvas Animation) ─────────────────────────
function ExperienceScreenContent() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const GOLD = '#C8A97E';
    const GOLD_DARK = '#8B6B3D';
    const GOLD_BRIGHT = '#E8C99E';
    const BG = '#0a0a0a';
    const W = 680, H = 320;

    // Polyfill roundRect if missing
    if (!CanvasRenderingContext2D.prototype.roundRect) {
      CanvasRenderingContext2D.prototype.roundRect = function(this: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number | number[]) {
        const rr = typeof r === 'number' ? [r,r,r,r] : (r as number[]);
        this.beginPath();
        this.moveTo(x+rr[0],y); this.lineTo(x+w-rr[1],y);
        this.quadraticCurveTo(x+w,y,x+w,y+rr[1]); this.lineTo(x+w,y+h-rr[2]);
        this.quadraticCurveTo(x+w,y+h,x+w-rr[2],y+h); this.lineTo(x+rr[3],y+h);
        this.quadraticCurveTo(x,y+h,x,y+h-rr[3]); this.lineTo(x,y+rr[0]);
        this.quadraticCurveTo(x,y,x+rr[0],y); this.closePath();
      } as any;
    }

    const stops = [
      { x: 110, label: 'Refactore HU', sub: 'Warsaw · Remote · 2024' },
      { x: 340, label: 'Appyard Technologies', sub: 'Remote · 2025' },
      { x: 570, label: 'Ameya Books', sub: 'Ghaziabad · 2026' },
    ];

    const GROUND_Y = 180;
    const CHAR_H = 64;
    const charBaseY = GROUND_Y - CHAR_H;

    let t = 0;
    let charX = stops[0].x;
    let phase = 'wait';
    let currentStop = 0;
    let nextStop = 1;
    let walkProgress = 0;
    let waitTimer = 0;
    let arrivedStops = [0];
    let labelAlpha = [1, 0, 0];
    let labelY = [0, 8, 8];

    const faceCanvas = document.createElement('canvas');
    const faceCtx = faceCanvas.getContext('2d');
    if (faceCtx) {
      faceCanvas.width = 80;
      faceCanvas.height = 80;
    }
    let faceReady = false;

    const img = new Image();
    img.onload = () => {
      if (!faceCtx) return;
      const iw = img.naturalWidth, ih = img.naturalHeight;
      const size = Math.min(iw, ih);
      const sx = (iw - size) / 2;
      const sy = (ih - size) * 0.15;
      faceCtx.clearRect(0, 0, 80, 80);
      faceCtx.save();
      faceCtx.beginPath();
      faceCtx.arc(40, 40, 38, 0, Math.PI * 2);
      faceCtx.clip();
      faceCtx.drawImage(img, sx, sy, size, size * 1.3, 0, 0, 80, 80);
      faceCtx.restore();
      faceReady = true;
    };
    img.src = '/images/me.png';

    function drawGround() {
      if (!ctx) return;
      ctx.strokeStyle = '#222';
      ctx.lineWidth = 1;
      ctx.setLineDash([6, 6]);
      ctx.beginPath();
      ctx.moveTo(40, GROUND_Y);
      ctx.lineTo(640, GROUND_Y);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    function drawTrail() {
      if (!ctx) return;
      for (let i = 0; i < arrivedStops.length - 1; i++) {
        const a = stops[arrivedStops[i]].x;
        const b = stops[arrivedStops[i+1]].x;
        ctx.strokeStyle = GOLD_DARK;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.moveTo(a, GROUND_Y - 2);
        ctx.lineTo(b, GROUND_Y - 2);
        ctx.stroke();
      }
      if (phase === 'walk') {
        const a = stops[currentStop].x;
        const b = stops[nextStop].x;
        const cx2 = a + (b - a) * walkProgress;
        ctx.strokeStyle = GOLD_DARK;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(a, GROUND_Y - 2);
        ctx.lineTo(cx2, GROUND_Y - 2);
        ctx.stroke();
      }
    }

    function drawStop(idx: number, alpha: number) {
      if (!ctx) return;
      const s = stops[idx];
      const isArrived = arrivedStops.includes(idx);
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.arc(s.x, GROUND_Y - 2, isArrived ? 6 : 5, 0, Math.PI * 2);
      ctx.fillStyle = isArrived ? GOLD : '#333';
      ctx.fill();
      if (isArrived) {
        ctx.strokeStyle = GOLD_BRIGHT;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
      const ly = labelY[idx];
      ctx.fillStyle = GOLD;
      ctx.font = '600 12px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(s.label, s.x, GROUND_Y + 18 + ly);
      ctx.fillStyle = '#666';
      ctx.font = '10px system-ui, sans-serif';
      ctx.fillText(s.sub, s.x, GROUND_Y + 32 + ly);
      ctx.globalAlpha = 1;
    }

    function drawLego(x: number, walking: boolean) {
      if (!ctx) return;
      const bob = walking ? Math.sin(t * 0.18) * 2 : 0;
      const legSwing = walking ? Math.sin(t * 0.18) * 18 : 0;
      const armSwing = walking ? Math.sin(t * 0.18) * 22 : 0;

      ctx.save();
      ctx.translate(x, charBaseY + bob);

      const G = GOLD, GD = GOLD_DARK, GB = GOLD_BRIGHT;

      ctx.save();
      ctx.translate(0, 52);
      ctx.save();
      ctx.translate(-7, 0);
      ctx.rotate((legSwing * Math.PI) / 180);
      ctx.fillStyle = GD;
      ctx.beginPath(); ctx.roundRect(0, 0, 10, 18, 3); ctx.fill();
      ctx.fillStyle = '#1a1a1a';
      ctx.beginPath(); ctx.roundRect(-1, 16, 12, 6, 2); ctx.fill();
      ctx.restore();
      ctx.save();
      ctx.translate(3, 0);
      ctx.rotate((-legSwing * Math.PI) / 180);
      ctx.fillStyle = GD;
      ctx.beginPath(); ctx.roundRect(0, 0, 10, 18, 3); ctx.fill();
      ctx.fillStyle = '#1a1a1a';
      ctx.beginPath(); ctx.roundRect(-1, 16, 12, 6, 2); ctx.fill();
      ctx.restore();
      ctx.restore();

      ctx.fillStyle = G;
      ctx.beginPath(); ctx.roundRect(-12, 28, 24, 24, 3); ctx.fill();
      ctx.fillStyle = GB;
      ctx.beginPath(); ctx.roundRect(-9, 31, 18, 3, 1); ctx.fill();

      ctx.save();
      ctx.translate(-14, 30);
      ctx.rotate((-armSwing * Math.PI) / 180);
      ctx.fillStyle = G;
      ctx.beginPath(); ctx.roundRect(0, 0, 6, 16, 3); ctx.fill();
      ctx.restore();

      ctx.save();
      ctx.translate(8, 30);
      ctx.rotate((armSwing * Math.PI) / 180);
      ctx.fillStyle = G;
      ctx.beginPath(); ctx.roundRect(0, 0, 6, 16, 3); ctx.fill();
      ctx.restore();

      const headW = 22, headH = 22;
      const headX = -headW / 2, headY = 4;

      ctx.fillStyle = GOLD;
      ctx.beginPath(); ctx.roundRect(headX, headY, headW, headH, 5); ctx.fill();
      ctx.strokeStyle = GOLD_DARK; ctx.lineWidth = 1; ctx.stroke();

      if (faceReady && faceCanvas) {
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(headX + 1, headY + 1, headW - 2, headH - 2, 4);
        ctx.clip();
        ctx.drawImage(faceCanvas, headX, headY, headW, headH);
        ctx.restore();
      } else {
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(-6, 12, 4, 3);
        ctx.fillRect(2, 12, 4, 3);
        ctx.strokeStyle = '#8B5E3C'; ctx.lineWidth = 1.2; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(-4, 21); ctx.quadraticCurveTo(0, 24, 4, 21); ctx.stroke();
      }

      ctx.fillStyle = GOLD;
      ctx.beginPath(); ctx.roundRect(-4, 0, 8, 6, 2); ctx.fill();

      ctx.restore();
    }

    function easeInOut(x: number) {
      return x < 0.5 ? 2*x*x : -1+(4-2*x)*x;
    }

    let animationFrameId: number;

    function loop() {
      if (!ctx) return;
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, W, H);
      drawGround();
      drawTrail();
      stops.forEach((s, i) => { if (labelAlpha[i] > 0) drawStop(i, labelAlpha[i]); });
      drawLego(charX, phase === 'walk');

      if (phase === 'wait') {
        waitTimer++;
        if (waitTimer > 80) { waitTimer = 0; phase = 'walk'; walkProgress = 0; nextStop = currentStop + 1; }
      } else if (phase === 'walk') {
        walkProgress += 0.008;
        const ease = easeInOut(Math.min(walkProgress, 1));
        charX = stops[currentStop].x + (stops[nextStop].x - stops[currentStop].x) * ease;
        labelAlpha[nextStop] = Math.min(1, walkProgress * 3);
        labelY[nextStop] = 8 * (1 - Math.min(1, walkProgress * 3));
        if (walkProgress >= 1) {
          charX = stops[nextStop].x;
          currentStop = nextStop;
          arrivedStops.push(currentStop);
          labelAlpha[currentStop] = 1; labelY[currentStop] = 0;
          if (currentStop >= stops.length - 1) { phase = 'done'; waitTimer = 0; }
          else { nextStop = currentStop + 1; phase = 'wait'; waitTimer = 0; }
        }
      } else if (phase === 'done') {
        waitTimer++;
        if (waitTimer > 140) {
          currentStop = 0; nextStop = 1; charX = stops[0].x;
          arrivedStops = [0]; labelAlpha = [1, 0, 0]; labelY = [0, 8, 8];
          phase = 'wait'; waitTimer = 0;
        }
      }
      t++;
      animationFrameId = requestAnimationFrame(loop);
    }

    loop();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <canvas
        ref={canvasRef}
        width={680}
        height={320}
        style={{ width: '100%', height: '100%', objectFit: 'contain', flexShrink: 0, scale: "1.2 2" }}
      />
    </div>
  );
}

// ── Detailed Experience Screen (Iframe) ────────────────────────
function DetailedExperienceScreenContent({ expId }: { expId: string }) {
  const scale = 320 / 680;

  return (
    <div style={{ 
      width: '100%', 
      height: '100%', 
      background: '#0a0a0a', 
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        width: '680px',
        height: '360px',
        transform: `scale(${scale})`,
        transformOrigin: 'center',
        flexShrink: 0
      }}>
        <iframe 
          src={`/${expId}.html`} 
          width="100%" 
          height="100%" 
          style={{ border: "none" }}
          title={`${expId} scene`}
          scrolling="no"
        />
      </div>
    </div>
  );
}

// ── Project Idle Screen (Mini IDE) ─────────────────────────────
function ProjectIdleScreen() {
  const codeSnippets = useMemo(
    () => [
      {
        file: "carma",
        lines: [
          { text: "export default function CARMA() {", color: "#C792EA" },
          { text: '  """Wait for my dumbass to fix it"""', color: "#C3E88D" },
          { text: "  const sim = useSimulation();", color: "#82AAFF" },
          { text: "  const policy = usePolicyEngine();", color: "#82AAFF" },
          { text: "", color: "#546E7A" },
          {
            text: "  // Carbon & Air Research Mitigation Analysis",
            color: "#546E7A",
          },
          { text: "  return <Dashboard data={sim} />", color: "#C792EA" },
          { text: "}", color: "#C792EA" },
        ],
      },
      {
        file: "helix",
        lines: [
          { text: "class RAGPipeline:", color: "#C792EA" },
          { text: '    """I don\'t know how this works"""', color: "#C3E88D" },
          { text: "", color: "#546E7A" },
          { text: "    def generate_protocol(self):", color: "#82AAFF" },
          { text: "        docs = self.retrieve(query)", color: "#F0EDE6" },
          { text: "        return self.llm.synthesize(", color: "#F0EDE6" },
          { text: "            context=docs", color: "#FFCB6B" },
          { text: "        )", color: "#F0EDE6" },
        ],
      },
      {
        file: "cge",
        lines: [
          { text: "interface Simulation {", color: "#C792EA" },
          { text: "  macro: MacroImpact;", color: "#82AAFF" },
          { text: "  persona: PersonaLevel[];", color: "#82AAFF" },
          { text: "}", color: "#C792EA" },
          { text: "", color: "#546E7A" },
          { text: "// Causal graph engine", color: "#546E7A" },
          { text: "const engine = new CGE();", color: "#FFCB6B" },
        ],
      },
    ],
    [],
  );

  const [snippetIdx, setSnippetIdx] = useState(0);
  const [visibleLines, setVisibleLines] = useState(0);
  const [charIdx, setCharIdx] = useState(0);

  const currentSnippet = codeSnippets[snippetIdx];

  // Switch tab and restart typing animation
  const switchToTab = (idx: number) => {
    if (idx === snippetIdx) return;
    setSnippetIdx(idx);
    setVisibleLines(0);
    setCharIdx(0);
  };

  // Typing animation: reveal characters then lines, loops on same tab
  useEffect(() => {
    if (visibleLines >= currentSnippet.lines.length) {
      // All lines typed — pause then restart the typing loop
      const loopTimer = setTimeout(() => {
        setVisibleLines(0);
        setCharIdx(0);
      }, 1500);
      return () => clearTimeout(loopTimer);
    }

    const currentLine = currentSnippet.lines[visibleLines];
    if (charIdx >= currentLine.text.length) {
      // Line complete, move to next line
      const lineTimer = setTimeout(() => {
        setVisibleLines((prev) => prev + 1);
        setCharIdx(0);
      }, 120);
      return () => clearTimeout(lineTimer);
    }

    // Type next character
    const charTimer = setTimeout(
      () => {
        setCharIdx((prev) => prev + 1);
      },
      28 + Math.random() * 22,
    );
    return () => clearTimeout(charTimer);
  }, [visibleLines, charIdx, currentSnippet]);

  const sidebarFiles = codeSnippets.map((s) => s.file);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "#0d1117",
        fontFamily: "'DM Mono', monospace",
        overflow: "hidden",
      }}
    >
      {/* Tab bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: "22px",
          background: "#161b22",
          borderBottom: "1px solid #21262d",
          paddingLeft: "6px",
          gap: "0",
          flexShrink: 0,
        }}
      >
        {sidebarFiles.map((file, i) => (
          <div
            key={file}
            onClick={() => switchToTab(i)}
            style={{
              padding: "3px 10px",
              fontSize: "8px",
              color: i === snippetIdx ? "#E8D5B0" : "#484f58",
              background: i === snippetIdx ? "#0d1117" : "transparent",
              borderBottom:
                i === snippetIdx
                  ? "1px solid #C8A97E"
                  : "1px solid transparent",
              transition: "all 0.3s",
              cursor: "pointer",
              userSelect: "none",
            }}
          >
            {file}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* File tree sidebar */}
        <div
          style={{
            width: "70px",
            background: "#0d1117",
            borderRight: "1px solid #21262d",
            padding: "8px 6px",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              fontSize: "7px",
              color: "#484f58",
              marginBottom: "6px",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            explorer
          </div>
          <div
            style={{ fontSize: "7px", color: "#8b949e", marginBottom: "3px" }}
          >
            ▼ src/
          </div>
          {sidebarFiles.map((file, i) => (
            <div
              key={file}
              onClick={() => switchToTab(i)}
              style={{
                fontSize: "7px",
                color: i === snippetIdx ? "#C8A97E" : "#6e7681",
                padding: "1.5px 0 1.5px 8px",
                background:
                  i === snippetIdx ? "rgba(200,169,126,0.08)" : "transparent",
                borderRadius: "2px",
                transition: "all 0.3s",
                cursor: "pointer",
                userSelect: "none",
              }}
            >
              {file}
            </div>
          ))}
          <div
            style={{
              fontSize: "7px",
              color: "#6e7681",
              marginTop: "4px",
              paddingLeft: "0",
            }}
          >
            ▶ lib/
          </div>
          <div style={{ fontSize: "7px", color: "#6e7681", paddingLeft: "0" }}>
            ▶ hooks/
          </div>
        </div>

        {/* Code editor area */}
        <div style={{ flex: 1, padding: "8px 10px", overflow: "hidden" }}>
          {currentSnippet.lines.map((line, lineIdx) => {
            if (lineIdx > visibleLines) return null;

            const isCurrentLine = lineIdx === visibleLines;
            const displayText = isCurrentLine
              ? line.text.slice(0, charIdx)
              : line.text;

            return (
              <div
                key={`${snippetIdx}-${lineIdx}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "14px",
                  gap: "8px",
                }}
              >
                <span
                  style={{
                    fontSize: "7px",
                    color: "#484f58",
                    width: "12px",
                    textAlign: "right",
                    flexShrink: 0,
                    userSelect: "none",
                  }}
                >
                  {lineIdx + 1}
                </span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.1 }}
                  style={{
                    fontSize: "8px",
                    color: line.color,
                    whiteSpace: "pre",
                  }}
                >
                  {displayText}
                  {isCurrentLine &&
                    visibleLines < currentSnippet.lines.length && (
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          repeatType: "reverse",
                        }}
                        style={{
                          display: "inline-block",
                          width: "4px",
                          height: "10px",
                          background: "#C8A97E",
                          marginLeft: "1px",
                          verticalAlign: "text-bottom",
                        }}
                      />
                    )}
                </motion.span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Status bar */}
      <div
        style={{
          height: "16px",
          background: "#161b22",
          borderTop: "1px solid #21262d",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 8px",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", gap: "8px" }}>
          <span style={{ fontSize: "6px", color: "#C8A97E" }}>● main</span>
          <span style={{ fontSize: "6px", color: "#484f58" }}>UTF-8</span>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <span style={{ fontSize: "6px", color: "#484f58" }}>
            Ln {visibleLines + 1}, Col {charIdx + 1}
          </span>
          <span style={{ fontSize: "6px", color: "#484f58" }}>
            {currentSnippet.file === "carma"
              ? "TypeScript React"
              : currentSnippet.file === "helix"
                ? "Python"
                : "TypeScript"}
          </span>
        </div>
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
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a1628",
        fontFamily: "'Outfit', sans-serif",
        position: "relative",
        overflow: "hidden",
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
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "fill",
          }}
        />
      ) : (
        <ProjectIdleScreen />
      )}
    </div>
  );
}

// ── Contact Screen ─────────────────────────────────────────────
function ContactScreenContent() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#080808",
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      <div
        style={{
          fontSize: "14px",
          fontWeight: 300,
          color: "#C8A97E",
          opacity: 0.6,
        }}
      >
        ✦
      </div>
    </div>
  );
}

// ── Message Screen (Contact Form) ──────────────────────────────
function MessageScreenContent() {
  const [formState, setFormState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('sending');

    try {
      const res = await fetch('https://formspree.io/f/mvzybnvk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _subject: formData.subject,
          message: formData.message,
        }),
      });

      if (res.ok) {
        setFormState('sent');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setFormState('error');
      }
    } catch {
      setFormState('error');
    }
  };

  if (formState === 'sent') {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#060b13',
          fontFamily: "'DM Mono', monospace",
          gap: '8px',
        }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', bounce: 0.5 }}
          style={{ fontSize: '20px' }}
        >
          ✓
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{ fontSize: '10px', color: '#4ade80', letterSpacing: '0.1em' }}
        >
          MESSAGE SENT
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{ fontSize: '8px', color: '#6e7681', marginTop: '4px' }}
        >
          I&apos;ll get back to you soon!
        </motion.div>
      </div>
    );
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: '#060b13',
        fontFamily: "'DM Mono', monospace",
        padding: '10px 14px',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundSize: '20px 20px',
          backgroundImage:
            'linear-gradient(to right, rgba(200, 169, 126, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(200, 169, 126, 0.03) 1px, transparent 1px)',
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
          zIndex: 0,
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '6px',
            paddingBottom: '4px',
            borderBottom: '1px solid rgba(200, 169, 126, 0.1)',
          }}
        >
          <div style={{ display: 'flex', gap: '3px' }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#FF5F57' }} />
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#FEBC2E' }} />
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#28C840' }} />
          </div>
          <span style={{ fontSize: '7px', color: '#484f58', marginLeft: '4px' }}>
            compose_message.sh
          </span>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            flex: 1,
          }}
        >
          {/* Name field */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '7px', color: '#C8A97E', width: '40px', flexShrink: 0 }}>
              NAME
            </span>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData((d) => ({ ...d, name: e.target.value }))}
              required
              placeholder="Your name"
              style={{
                flex: 1,
                background: 'rgba(200, 169, 126, 0.04)',
                border: '1px solid rgba(200, 169, 126, 0.12)',
                borderRadius: '3px',
                padding: '4px 6px',
                fontSize: '8px',
                color: '#E8D5B0',
                fontFamily: "'DM Mono', monospace",
                outline: 'none',
              }}
            />
          </div>

          {/* Email field */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '7px', color: '#C8A97E', width: '40px', flexShrink: 0 }}>
              EMAIL
            </span>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData((d) => ({ ...d, email: e.target.value }))}
              required
              placeholder="your@email.com"
              style={{
                flex: 1,
                background: 'rgba(200, 169, 126, 0.04)',
                border: '1px solid rgba(200, 169, 126, 0.12)',
                borderRadius: '3px',
                padding: '4px 6px',
                fontSize: '8px',
                color: '#E8D5B0',
                fontFamily: "'DM Mono', monospace",
                outline: 'none',
              }}
            />
          </div>

          {/* Subject field */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '7px', color: '#C8A97E', width: '40px', flexShrink: 0 }}>
              SUBJ
            </span>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData((d) => ({ ...d, subject: e.target.value }))}
              required
              placeholder="Subject"
              style={{
                flex: 1,
                background: 'rgba(200, 169, 126, 0.04)',
                border: '1px solid rgba(200, 169, 126, 0.12)',
                borderRadius: '3px',
                padding: '4px 6px',
                fontSize: '8px',
                color: '#E8D5B0',
                fontFamily: "'DM Mono', monospace",
                outline: 'none',
              }}
            />
          </div>

          {/* Message field */}
          <div style={{ display: 'flex', gap: '6px', flex: 1 }}>
            <span style={{ fontSize: '7px', color: '#C8A97E', width: '40px', flexShrink: 0, paddingTop: '4px' }}>
              MSG
            </span>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData((d) => ({ ...d, message: e.target.value }))}
              required
              placeholder="Write your message..."
              style={{
                flex: 1,
                background: 'rgba(200, 169, 126, 0.04)',
                border: '1px solid rgba(200, 169, 126, 0.12)',
                borderRadius: '3px',
                padding: '4px 6px',
                fontSize: '8px',
                color: '#E8D5B0',
                fontFamily: "'DM Mono', monospace",
                outline: 'none',
                resize: 'none',
                minHeight: '50px',
              }}
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={formState === 'sending'}
            style={{
              alignSelf: 'flex-end',
              background: formState === 'sending'
                ? 'rgba(200, 169, 126, 0.1)'
                : 'rgba(200, 169, 126, 0.15)',
              border: '1px solid rgba(200, 169, 126, 0.25)',
              borderRadius: '3px',
              padding: '4px 12px',
              fontSize: '7px',
              color: '#C8A97E',
              fontFamily: "'DM Mono', monospace",
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              cursor: formState === 'sending' ? 'wait' : 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {formState === 'sending' ? '⠿ Sending...' : formState === 'error' ? '✗ Retry' : '→ Send'}
          </button>
        </form>
      </div>
    </div>
  );
}

// ── Main Screen Component ──────────────────────────────────────
export default function LaptopScreen({
  activeProject,
  currentPhase,
  lidRef,
}: LaptopScreenProps) {
  const [bootState, setBootState] = useState<
    "off" | "booting" | "on" | "turning_off"
  >("off");

  const bootStateRef = useRef(bootState);
  
  useEffect(() => {
    bootStateRef.current = bootState;
  }, [bootState]);

  useFrame(() => {
    if (!lidRef?.current) return;
    const rotX = lidRef.current.rotation.x;
    const current = bootStateRef.current;

    // Lid open threshold: well above Float wobble range
    // Lid closed threshold: well below Float wobble range
    if (rotX > -0.02 && current === "off") {
      setBootState("booting");
    } else if (rotX < -0.3 && (current === "on" || current === "booting")) {
      setBootState("turning_off");
    }
  });

  useEffect(() => {
    if (bootState === "booting") {
      const finishBootTimer = setTimeout(() => {
        setBootState("on");
      }, 2000);
      return () => clearTimeout(finishBootTimer);
    }
    if (bootState === "turning_off") {
      const powerOffTimer = setTimeout(() => {
        setBootState("off");
      }, 300); // Faster turn-off to avoid clipping
      return () => clearTimeout(powerOffTimer);
    }
  }, [bootState]);

  const screenContent = useMemo(() => {
    switch (currentPhase) {
      case "hero":
        return <HeroScreenContent />;
      case "about":
        return <AboutScreenContent />;
      case "skills":
        return <SkillsScreenContent />;
      case "experience":
        if (activeProject) {
          return <DetailedExperienceScreenContent expId={activeProject} />;
        }
        return <ExperienceScreenContent />;
      case "projects":
        return <ProjectScreenContent projectId={activeProject} />;
      case "contact":
        return <ContactScreenContent />;
      case "message":
        return <MessageScreenContent />;
      default:
        return <HeroScreenContent />;
    }
  }, [currentPhase, activeProject]);

  // Don't render screen at all when lid is closed (contact phase)
  if (currentPhase === "contact") {
    return null;
  }

  return (
    <Html
      transform
      position={[0, 0.02, 0.034]}
      scale={0.35}
      style={{
        width: "320px",
        height: "200px",
        borderRadius: "4px",
        overflow: "hidden",
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={
          bootState === "off"
            ? { opacity: 0 }
            : bootState === "booting"
              ? { opacity: [0, 1, 0.1, 1, 0.5, 1, 0.2, 1, 0.8, 1] }
              : bootState === "turning_off"
                ? { opacity: [1, 0.2, 0.8, 0, 0.5, 0] }
                : { opacity: 1 }
        }
        transition={
          bootState === "booting"
            ? {
                duration: 2,
                ease: "linear",
                times: [0, 0.05, 0.1, 0.15, 0.3, 0.4, 0.6, 0.7, 0.8, 1],
              }
            : bootState === "turning_off"
              ? {
                  duration: 0.3,
                  ease: "linear",
                  times: [0, 0.2, 0.4, 0.6, 0.8, 1],
                }
              : { duration: 0.3 }
        }
        style={{ width: "100%", height: "100%" }}
      >
        {screenContent}
      </motion.div>
    </Html>
  );
}
