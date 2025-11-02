import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface OrbProps {
  isSpeaking: boolean;
}

function CoreOrb({ isSpeaking }: OrbProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const distortRef = useRef(0.12);
  const scaleRef = useRef(1);
  const intensityRef = useRef(2.8);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();

    // Subtle orbital rotation
    meshRef.current.rotation.y = time * 0.06;
    meshRef.current.rotation.x = Math.sin(time * 0.25) * 0.08;

    // Gentle voice-reactive breathing
    const targetDistort = isSpeaking ? 0.26 : 0.12;
    const targetScale = isSpeaking ? 1.08 : 1.0;
    const targetIntensity = isSpeaking ? 4.2 : 2.8;

    // Calm AI pulse rhythm
    const breathe = Math.sin(time * 0.4) * 0.03 + 1;

    distortRef.current += (targetDistort - distortRef.current) * 0.08;
    scaleRef.current += (targetScale * breathe - scaleRef.current) * 0.06;
    intensityRef.current += (targetIntensity - intensityRef.current) * 0.08;

    meshRef.current.scale.setScalar(scaleRef.current);
  });

  return (
    <Sphere ref={meshRef} args={[1, 128, 128]}>
      <MeshDistortMaterial
        color="#C4B5FD"
        distort={distortRef.current}
        speed={isSpeaking ? 2.0 : 1}
        roughness={0}
        metalness={0.8}
        emissive="#93C5FD"
        emissiveIntensity={intensityRef.current}
        transparent
        opacity={0.95}
      />
    </Sphere>
  );
}

function HorizontalLines({ isSpeaking }: OrbProps) {
  const linesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!linesRef.current) return;
    const time = state.clock.getElapsedTime();
    linesRef.current.children.forEach((line, i) => {
      const offset = i * 0.4;
      const mesh = line as THREE.Mesh;
      const material = mesh.material as THREE.MeshBasicMaterial;
      material.opacity = 0.12 + Math.sin(time * (isSpeaking ? 1.6 : 1) + offset) * 0.08;
    });
  });

  return (
    <group ref={linesRef}>
      {[-2, -1.2, -0.5, 0, 0.5, 1.2, 2].map((y, i) => (
        <mesh key={i} position={[0, y, 0]}>
          <planeGeometry args={[20, 0.008]} />
          <meshBasicMaterial 
            color="#A5F3FC" 
            transparent 
            opacity={i === 3 ? 0.3 : 0.15} 
            side={THREE.DoubleSide} 
          />
        </mesh>
      ))}
    </group>
  );
}

function CircularRings({ isSpeaking }: OrbProps) {
  const rings = Array.from({ length: 5 }, () => useRef<THREE.Mesh>(null));

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const baseSpeed = 0.15;
    const speed = isSpeaking ? 0.3 : baseSpeed;
    const breathe = Math.sin(time * 0.6) * 0.1 + 1;

    rings.forEach((ref, i) => {
      if (!ref.current) return;
      const ring = ref.current;
      ring.rotation.z = time * speed * (i % 2 === 0 ? 1 : -0.6);
      const scale = breathe * (1 + i * 0.05);
      ring.scale.setScalar(scale);
    });
  });

  const ringColors = ['#A5F3FC', '#C4B5FD', '#93C5FD', '#E0E7FF', '#A78BFA'];
  const opacities = [0.45, 0.35, 0.3, 0.25, 0.2];

  return (
    <>
      {rings.map((ref, i) => (
        <mesh ref={ref} key={i}>
          <torusGeometry args={[1.3 + i * 0.45, 0.008, 32, 100]} />
          <meshBasicMaterial
            color={ringColors[i]}
            transparent
            opacity={isSpeaking ? opacities[i] + 0.1 : opacities[i]}
          />
        </mesh>
      ))}
    </>
  );
}

export function AnimatedOrb({ isSpeaking }: OrbProps) {
  return (
    <div
      className="w-full h-full absolute inset-0"
      style={{
        background: 'radial-gradient(circle at center, #0F172A 0%, #020617 100%)',
        backgroundImage: `linear-gradient(transparent 97%, rgba(255,255,255,0.05) 100%), linear-gradient(90deg, transparent 97%, rgba(255,255,255,0.05) 100%)`,
        backgroundSize: '60px 60px',
      }}
    >
      {/* Core glow layers */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={`w-[320px] h-[320px] rounded-full transition-all duration-700 ${
            isSpeaking ? 'bg-[#A78BFA]/80 blur-[130px]' : 'bg-[#A78BFA]/60 blur-[100px]'
          }`}
          style={{ mixBlendMode: 'screen' }}
        />
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={`w-[480px] h-[480px] rounded-full transition-all duration-1000 ${
            isSpeaking ? 'bg-[#93C5FD]/60 blur-[160px]' : 'bg-[#93C5FD]/40 blur-[140px]'
          }`}
          style={{ mixBlendMode: 'screen' }}
        />
      </div>

      <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
        <ambientLight intensity={0.35} />
        <pointLight position={[0, 0, 0]} intensity={isSpeaking ? 7 : 5.5} color="#FFFFFF" distance={15} />
        <pointLight position={[0, 0, 3]} intensity={isSpeaking ? 5 : 3.5} color="#A5F3FC" distance={12} />
        <CoreOrb isSpeaking={isSpeaking} />
        <CircularRings isSpeaking={isSpeaking} />
        <HorizontalLines isSpeaking={isSpeaking} />
      </Canvas>
    </div>
  );
}
