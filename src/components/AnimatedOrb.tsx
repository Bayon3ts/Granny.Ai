import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface OrbProps {
  isSpeaking: boolean;
}

function Orb({ isSpeaking }: OrbProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const distortRef = useRef(0);
  const scaleRef = useRef(1);

  useFrame((state) => {
    if (!meshRef.current) return;

    // Rotation
    meshRef.current.rotation.x += 0.001;
    meshRef.current.rotation.y += 0.002;

    // Dynamic distortion and scale based on speaking state
    const targetDistort = isSpeaking ? 0.6 : 0.2;
    const targetScale = isSpeaking ? 1.15 : 1;
    
    distortRef.current += (targetDistort - distortRef.current) * 0.1;
    scaleRef.current += (targetScale - scaleRef.current) * 0.1;

    meshRef.current.scale.setScalar(scaleRef.current);
  });

  return (
    <Sphere ref={meshRef} args={[1, 128, 128]} scale={1}>
      <MeshDistortMaterial
        color="#4a9eff"
        attach="material"
        distort={distortRef.current}
        speed={isSpeaking ? 3 : 1}
        roughness={0.2}
        metalness={0.8}
        emissive="#2563eb"
        emissiveIntensity={isSpeaking ? 0.8 : 0.3}
      />
    </Sphere>
  );
}

export function AnimatedOrb({ isSpeaking }: OrbProps) {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4a9eff" />
        <Orb isSpeaking={isSpeaking} />
      </Canvas>
    </div>
  );
}
