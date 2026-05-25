'use client';

import React, { forwardRef, useRef, useEffect, useMemo } from 'react';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

// ── Keyboard Component ──────────────────────────────────────────
function Keyboard() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Standard key dims
  const keyW = 0.17;
  const keyD = 0.16;
  const gap = 0.02;
  const cols = 14;
  const rows = 6;
  const startX = -((cols * keyW + (cols - 1) * gap) / 2) + keyW / 2;
  const startZ = -0.45;

  useEffect(() => {
    if (!meshRef.current) return;
    let i = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Spacebar logic
        let w = keyW;
        let d = r === 0 ? 0.1 : keyD; // top row is half height
        let x = startX + c * (keyW + gap);
        let z = startZ + r * (keyD + gap) - (r > 0 ? 0.03 : 0);

        if (r === 5) {
          if (c > 3 && c < 9) continue; // skip spacebar area keys
          if (c === 3) {
            w = keyW * 6 + gap * 5; // spacebar width
            x += (w - keyW) / 2;
          }
        }

        dummy.scale.set(w, 0.01, d);
        dummy.position.set(x, 0.005, z);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i++, dummy.matrix);
      }
    }
    meshRef.current.count = i;
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [dummy]);

  return (
    <group position={[0, 0.051, -0.05]}>
      {/* Keyboard Well */}
      <RoundedBox args={[2.8, 0.005, 1.2]} radius={0.002} position={[0, 0, -0.15]}>
        <meshStandardMaterial color="#333333" roughness={0.9} />
      </RoundedBox>
      <instancedMesh ref={meshRef} args={[undefined, undefined, 100]} castShadow receiveShadow>
        <boxGeometry args={[1, 1, 0]} />
        <meshStandardMaterial color={"#ffffff"} metalness={0.6} roughness={0.4} />
      </instancedMesh>
    </group>
  );
}

interface LaptopModelProps {
  lidRef: React.RefObject<THREE.Group | null>;
  children?: React.ReactNode;
}

const LaptopModel = forwardRef<THREE.Group, LaptopModelProps>(
  function LaptopModel({ lidRef, children }, ref) {
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: '#1a1a1a',
      metalness: 0.8,
      roughness: 0.3,
    });

    const edgeMaterial = new THREE.MeshStandardMaterial({
      color: '#C8A97E',
      metalness: 0.9,
      roughness: 0.2,
      emissive: '#C8A97E',
      emissiveIntensity: 0.1,
    });

    const screenMaterial = new THREE.MeshStandardMaterial({
      color: '#0a1628',
      emissive: '#1A3A5C',
      emissiveIntensity: 0.3,
      metalness: 0.1,
      roughness: 0.9,
    });

    return (
      <group ref={ref}>
        {/* ── Base (keyboard half) ── */}
        <group position={[0, -0.02, 0]}>
          {/* Main body */}
          <RoundedBox
            args={[3.2, 0.08, 2.1]}
            radius={0.03}
            smoothness={4}
            castShadow
            receiveShadow
          >
            <primitive object={bodyMaterial} attach="material" />
          </RoundedBox>

          {/* Gold edge trim */}
          <RoundedBox
            args={[3.22, 0.01, 2.12]}
            radius={0.004}
            smoothness={4}
            position={[0, 0.04, 0]}
          >
            <primitive object={edgeMaterial} attach="material" />
          </RoundedBox>

          {/* Keyboard */}
          <Keyboard />

          {/* Touchpad */}
          <RoundedBox
            args={[1.0, 0.005, 0.6]}
            radius={0.002}
            smoothness={4}
            position={[0, 0.048, 0.73]}
          >
            <meshStandardMaterial color="#3c3c3c" roughness={0.5} metalness={0.12} />
          </RoundedBox>
        </group>

        {/* ── Lid (screen half) - pivots at back edge ── */}
        <group ref={lidRef} position={[0, 0.02, -1.05]}>
          <group position={[0, 1.05, 0]}>
            {/* Lid body */}
            <RoundedBox
              args={[3.2, 2.1, 0.06]}
              radius={0.03}
              smoothness={4}
              castShadow
            >
              <primitive object={bodyMaterial} attach="material" />
            </RoundedBox>

            {/* Screen surface (inner face) */}
            <mesh position={[0, 0.02, 0.032]}>
              <planeGeometry args={[2.9, 1.85]} />
              <primitive object={screenMaterial} attach="material" />
            </mesh>

            {/* Screen bezel frame */}
            <RoundedBox
              args={[3.0, 1.95, 0.005]}
              radius={0.02}
              smoothness={4}
              position={[0, 0.02, 0.033]}
            >
              <meshStandardMaterial
                color="#111111"
                metalness={0.5}
                roughness={0.5}
                transparent
                opacity={0.6}
              />
            </RoundedBox>

            {/* Camera dot */}
            <mesh position={[0, 0.98, 0.035]}>
              <circleGeometry args={[0.02, 16]} />
              <meshStandardMaterial
                color="#333333"
                emissive="#1A3A5C"
                emissiveIntensity={0.5}
              />
            </mesh>

            {/* Gold lid edge trim */}
            <RoundedBox
              args={[3.22, 2.12, 0.005]}
              radius={0.03}
              smoothness={4}
              position={[0, 0, -0.033]}
            >
              <primitive object={edgeMaterial} attach="material" />
            </RoundedBox>

            {/* Screen content (e.g. Html) */}
            {children}
          </group>
        </group>
      </group>
    );
  }
);

export default LaptopModel;
