'use client';

import React, { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import LaptopModel from './LaptopModel';
import LaptopScreen from './LaptopScreen';
import { useLaptopScroll } from './useLaptopScroll';
import { TIMING } from '@/lib/constants';

// ── Glow Effect ────────────────────────────────────────────────
function Glow({ lidRef }: { lidRef: React.RefObject<THREE.Group | null> }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const shaderArgs = useMemo(() => ({
    uniforms: {
      color1: { value: new THREE.Color('#C8A97E') }, // Gold
      color2: { value: new THREE.Color('#1A3A5C') }, // Dark Blue
      time: { value: 0 },
      intensity: { value: 0 },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      uniform vec3 color1;
      uniform vec3 color2;
      uniform float time;
      uniform float intensity;
      void main() {
        float dist = distance(vUv, vec2(0.5));
        
        // Animated pulse
        float pulse = sin(time * 2.0) * 0.15 + 0.99;
        float alpha = smoothstep(0.5, 0.0, dist * pulse);
        
        // Mix colors based on distance and time
        vec3 finalColor = mix(color1, color2, dist * 2.0 + sin(time) * 0.2);
        
        gl_FragColor = vec4(finalColor, alpha * 0.4 * intensity); // Apply lid intensity
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  }), []);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = clock.getElapsedTime();
      
      if (lidRef.current) {
        // rotation.x is 0 when open, -Math.PI / 2 when closed
        const rotX = lidRef.current.rotation.x;
        // Map from -Math.PI/2 to 0 -> 0 to 1
        const mapped = Math.max(0, Math.min(1, 1 + rotX / (Math.PI / 2)));
        materialRef.current.uniforms.intensity.value = mapped;
      }
    }
  });

  return (
    <mesh position={[0, 1.2, -1.5]}>
      <planeGeometry args={[6, 6]} />
      <shaderMaterial ref={materialRef} args={[shaderArgs]} />
    </mesh>
  );
}

// ── Floating Particles ─────────────────────────────────────────
function Particles({ count = 50 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      position: [
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6 - 2,
      ] as [number, number, number],
      speed: 0.2 + Math.random() * 0.5,
      offset: Math.random() * Math.PI * 2,
      scale: 0.01 + Math.random() * 0.02,
    }));
  }, [count]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();

    particles.forEach((p, i) => {
      dummy.position.set(
        p.position[0] + Math.sin(t * p.speed + p.offset) * 0.3,
        p.position[1] + Math.cos(t * p.speed * 0.7 + p.offset) * 0.2,
        p.position[2]
      );
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#C8A97E" transparent opacity={0.4} />
    </instancedMesh>
  );
}

// ── Scene Content ──────────────────────────────────────────────
function SceneContent({
  currentPhase,
  activeProject,
}: {
  currentPhase: string;
  activeProject?: string | null;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const lidRef = useRef<THREE.Group>(null);
  const screenHtmlRef = useRef<HTMLDivElement>(null);

  // Set up scroll-driven animations
  useLaptopScroll({ groupRef, lidRef, screenHtmlRef });

  // Spring-open the lid on mount
  useEffect(() => {
    if (!lidRef.current) return;

    // Start closed
    lidRef.current.rotation.x = -Math.PI / 2;

    const timer = setTimeout(() => {
      if (lidRef.current) {
        gsap.to(lidRef.current.rotation, {
          x: 0,
          duration: TIMING.lidOpenDuration,
          ease: 'elastic.out(1, 0.5)',
          delay: 0,
        });
      }
    }, TIMING.lidOpenDelay * 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 1.2, 3.5]} fov={45} />

      {/* Ambient + directional lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={0.8}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight
        position={[-3, 3, 2]}
        intensity={0.3}
        color="#C8A97E"
      />

      {/* Gold accent light */}
      <pointLight
        position={[0, 2, 3]}
        intensity={0.5}
        color="#C8A97E"
        distance={10}
        decay={2}
      />

      {/* Screen glow light */}
      <pointLight
        position={[0, 1.5, -0.5]}
        intensity={0.3}
        color="#1A3A5C"
        distance={5}
        decay={2}
      />

      {/* The laptop */}
      <Float
        speed={1}
        rotationIntensity={0.05}
        floatIntensity={0.1}
        enabled={currentPhase === 'hero' || currentPhase === 'message'}
      >
        <group ref={groupRef} rotation={[0.05, 0, 0]}>
          <Glow lidRef={lidRef} />
          <LaptopModel lidRef={lidRef}>
            <LaptopScreen
              currentPhase={currentPhase}
              activeProject={activeProject}
              lidRef={lidRef}
            />
          </LaptopModel>

          {/* Title for Message phase on Desktop */}
          <Html center position={[0, 2.5, -1.05]} style={{ pointerEvents: 'none' }}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: currentPhase === 'message' ? 1 : 0,
                y: currentPhase === 'message' ? 0 : 10,
              }}
              transition={{ duration: 0.5 }}
              style={{
                pointerEvents: 'none',
                textAlign: 'center',
                whiteSpace: 'nowrap',
                userSelect: 'none',
              }}
            >
              <h2 style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '2rem',
                fontWeight: 300,
                color: '#F0EDE6',
                margin: 0,
                letterSpacing: '-0.02em',
              }}>
                Send a <span className="gold-gradient-text" style={{ fontWeight: 500 }}>message</span>
              </h2>
            </motion.div>
          </Html>
        </group>
      </Float>

      {/* Particles */}
      <Particles count={40} />
    </>
  );
}

// ── Main Scene Wrapper ─────────────────────────────────────────
interface LaptopSceneProps {
  currentPhase: string;
  activeProject?: string | null;
}

export default function LaptopScene({
  currentPhase,
  activeProject,
}: LaptopSceneProps) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: currentPhase === 'message' ? 20 : 0,
        pointerEvents: currentPhase === 'message' || currentPhase === 'projects' ? 'auto' : 'none',
      }}
    >
      <Canvas
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        <SceneContent
          currentPhase={currentPhase}
          activeProject={activeProject}
        />
      </Canvas>
    </div>
  );
}
