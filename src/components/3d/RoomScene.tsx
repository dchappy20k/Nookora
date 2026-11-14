'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface SceneProps {
  stage: number; // 1 to 5
}

function ProceduralBedroom({ stage }: SceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const bedRef = useRef<THREE.Group>(null);
  const deskRef = useRef<THREE.Group>(null);
  const decorRef = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state, delta) => {
    // Subtle breathing rotation
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        Math.sin(state.clock.elapsedTime * 0.25) * 0.08 - 0.45,
        0.05
      );
    }

    // Animate stage visibility and elevation transitions
    if (bedRef.current) {
      const targetY = stage >= 2 ? 0 : -3;
      bedRef.current.position.y = THREE.MathUtils.damp(bedRef.current.position.y, targetY, 4, delta);
      bedRef.current.visible = bedRef.current.position.y > -2.9;
    }

    if (deskRef.current) {
      const targetY = stage >= 3 ? 0 : -3;
      deskRef.current.position.y = THREE.MathUtils.damp(deskRef.current.position.y, targetY, 4, delta);
      deskRef.current.visible = deskRef.current.position.y > -2.9;
    }

    if (decorRef.current) {
      const targetY = stage >= 4 ? 0 : -2;
      decorRef.current.position.y = THREE.MathUtils.damp(decorRef.current.position.y, targetY, 4, delta);
      decorRef.current.visible = decorRef.current.position.y > -1.9;
    }

    if (lightRef.current) {
      const targetIntensity = stage >= 4 ? 2.5 : 0.8;
      lightRef.current.intensity = THREE.MathUtils.damp(
        lightRef.current.intensity,
        targetIntensity,
        3,
        delta
      );
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.6, 0]}>
      {/* 1. ROOM SHELL (Stage 1+) */}
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, 0, 0]}>
        <planeGeometry args={[7, 7]} />
        <meshStandardMaterial color="#1e2520" roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Back Wall */}
      <mesh position={[0, 2.5, -3.5]} receiveShadow>
        <planeGeometry args={[7, 5]} />
        <meshStandardMaterial color="#252f29" roughness={0.9} />
      </mesh>

      {/* Left Wall */}
      <mesh position={[-3.5, 2.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[7, 5]} />
        <meshStandardMaterial color="#222b25" roughness={0.9} />
      </mesh>

      {/* Window Frame on Left Wall */}
      <group position={[-3.48, 2.7, -0.5]} rotation={[0, Math.PI / 2, 0]}>
        <mesh>
          <planeGeometry args={[2, 2.4]} />
          <meshBasicMaterial color="#3a483e" />
        </mesh>
        <mesh position={[0, 0, 0.02]}>
          <boxGeometry args={[2.05, 0.05, 0.05]} />
          <meshStandardMaterial color="#B89565" />
        </mesh>
        <mesh position={[0, 0, 0.02]}>
          <boxGeometry args={[0.05, 2.45, 0.05]} />
          <meshStandardMaterial color="#B89565" />
        </mesh>
      </group>

      {/* 2. BED PLATFORM & MATTRESS (Stage 2+) */}
      <group ref={bedRef} position={[0.8, 0, -1.8]}>
        {/* Wooden Bed Base */}
        <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.4, 0.3, 3]} />
          <meshStandardMaterial color="#3a3023" roughness={0.8} />
        </mesh>
        {/* Mattress */}
        <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.2, 0.35, 2.8]} />
          <meshStandardMaterial color="#F2EFE7" roughness={0.9} />
        </mesh>
        {/* Duvet (Ochre warm linen) */}
        <mesh position={[0, 0.52, 0.3]} castShadow>
          <boxGeometry args={[2.24, 0.25, 2]} />
          <meshStandardMaterial color="#B8755B" roughness={0.85} />
        </mesh>
        {/* Pillows */}
        <mesh position={[-0.5, 0.72, -0.9]} rotation={[0.2, 0, 0]} castShadow>
          <boxGeometry args={[0.8, 0.18, 0.5]} />
          <meshStandardMaterial color="#e8dec8" />
        </mesh>
        <mesh position={[0.5, 0.72, -0.9]} rotation={[0.2, 0, 0]} castShadow>
          <boxGeometry args={[0.8, 0.18, 0.5]} />
          <meshStandardMaterial color="#e8dec8" />
        </mesh>
      </group>

      {/* 3. DESK & CHAIR (Stage 3+) */}
      <group ref={deskRef} position={[-2, 0, 1.2]}>
        {/* Floating Desk Top */}
        <mesh position={[0, 1.1, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.8, 0.08, 0.9]} />
          <meshStandardMaterial color="#8a7356" roughness={0.6} />
        </mesh>
        {/* Minimalist Legs */}
        <mesh position={[-0.8, 0.55, 0.35]}>
          <cylinderGeometry args={[0.02, 0.02, 1.1]} />
          <meshStandardMaterial color="#111714" />
        </mesh>
        <mesh position={[0.8, 0.55, 0.35]}>
          <cylinderGeometry args={[0.02, 0.02, 1.1]} />
          <meshStandardMaterial color="#111714" />
        </mesh>
        {/* Laptop */}
        <mesh position={[0, 1.16, 0]} castShadow>
          <boxGeometry args={[0.5, 0.02, 0.35]} />
          <meshStandardMaterial color="#C0BBAF" metalness={0.8} roughness={0.3} />
        </mesh>
        {/* Stool / Chair */}
        <mesh position={[0, 0.45, 0.65]} castShadow>
          <cylinderGeometry args={[0.3, 0.3, 0.06]} />
          <meshStandardMaterial color="#d8c19a" />
        </mesh>
      </group>

      {/* 4. DECOR, RUG, PLANTS & LIGHTING (Stage 4 & 5) */}
      <group ref={decorRef}>
        {/* Jute Rug under bed */}
        <mesh position={[0.8, 0.01, -0.8]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <circleGeometry args={[1.8, 32]} />
          <meshStandardMaterial color="#635848" roughness={0.95} />
        </mesh>

        {/* Akari Style Floor Lantern */}
        <group position={[-1.2, 0, -2.4]}>
          {/* Paper Shade */}
          <mesh position={[0, 0.8, 0]} castShadow>
            <sphereGeometry args={[0.35, 16, 16]} />
            <meshStandardMaterial
              color="#fff4dc"
              emissive="#D8C19A"
              emissiveIntensity={stage >= 4 ? 0.9 : 0.2}
              roughness={0.9}
            />
          </mesh>
          {/* Tripod Stand */}
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.01, 0.01, 0.6]} />
            <meshStandardMaterial color="#111714" />
          </mesh>
        </group>

        {/* Monstera Plant in Terracotta Pot */}
        <group position={[-2.4, 0, -1]}>
          <mesh position={[0, 0.25, 0]} castShadow>
            <cylinderGeometry args={[0.22, 0.16, 0.45, 16]} />
            <meshStandardMaterial color="#B8755B" roughness={0.8} />
          </mesh>
          {/* Green Foliage */}
          <mesh position={[0, 0.6, 0]} castShadow>
            <sphereGeometry args={[0.35, 8, 8]} />
            <meshStandardMaterial color="#47624b" roughness={0.7} />
          </mesh>
        </group>

        {/* Wall Art Frame */}
        <group position={[0.8, 3, -3.48]}>
          <mesh castShadow>
            <boxGeometry args={[1.2, 1.6, 0.04]} />
            <meshStandardMaterial color="#111714" />
          </mesh>
          <mesh position={[0, 0, 0.025]}>
            <planeGeometry args={[1.05, 1.45]} />
            <meshStandardMaterial color="#dcd5c7" roughness={0.9} />
          </mesh>
        </group>
      </group>

      {/* ATMOSPHERIC 2700K LIGHTING */}
      <ambientLight intensity={0.6} color="#e5dec9" />
      <directionalLight
        position={[-5, 6, 2]}
        intensity={stage >= 4 ? 1.4 : 0.8}
        color="#ffe8c2"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight
        ref={lightRef}
        position={[-1.2, 0.8, -2.4]}
        color="#ffc87a"
        distance={5}
        decay={2}
      />
    </group>
  );
}

export const RoomScene: React.FC<SceneProps> = ({ stage }) => {
  return (
    <Canvas
      shadows
      camera={{ position: [4.5, 3.8, 5.5], fov: 38 }}
      className="w-full h-full cursor-grab active:cursor-grabbing"
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <ProceduralBedroom stage={stage} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2.1}
        minAzimuthAngle={-Math.PI / 3}
        maxAzimuthAngle={Math.PI / 3}
        autoRotate={false}
      />
    </Canvas>
  );
};
