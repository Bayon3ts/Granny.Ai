import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface OrbProps {
  isSpeaking: boolean;
}

function CoreOrb({ isSpeaking }: OrbProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const distortRef = useRef(0.15);
  const scaleRef = useRef(1);
  const intensityRef = useRef(3);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();
    
    // Breathing rotation
    meshRef.current.rotation.y = time * 0.1;

    // Breathing pulse based on speaking state
    const targetDistort = isSpeaking ? 0.25 : 0.15;
    const targetScale = isSpeaking ? 1.08 : 1.04;
    const targetIntensity = isSpeaking ? 4 : 3;
    
    // Add breathing rhythm
    const breathe = Math.sin(time * 0.5) * 0.02 + 1;
    
    distortRef.current += (targetDistort - distortRef.current) * 0.05;
    scaleRef.current += (targetScale * breathe - scaleRef.current) * 0.05;
    intensityRef.current += (targetIntensity - intensityRef.current) * 0.05;

    meshRef.current.scale.setScalar(scaleRef.current);
  });

  return (
    <Sphere ref={meshRef} args={[1, 128, 128]}>
      <MeshDistortMaterial
        color="#6EE7F9"
        attach="material"
        distort={distortRef.current}
        speed={isSpeaking ? 2 : 1.2}
        roughness={0}
        metalness={1}
        emissive="#A5F3FC"
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
      const offset = i * 0.3;
      const mesh = line as THREE.Mesh;
      const material = mesh.material as THREE.MeshBasicMaterial;
      material.opacity = 0.15 + Math.sin(time * (isSpeaking ? 2 : 1) + offset) * 0.1;
    });
  });

  return (
    <group ref={linesRef}>
      {[-2, -1, 0, 1, 2].map((y, i) => (
        <mesh key={i} position={[0, y, 0]}>
          <planeGeometry args={[12, 0.015]} />
          <meshBasicMaterial 
            color="#6EE7F9" 
            transparent 
            opacity={0.15} 
            side={THREE.DoubleSide} 
          />
        </mesh>
      ))}
    </group>
  );
}

function CircularRings({ isSpeaking }: OrbProps) {
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const ring3 = useRef<THREE.Mesh>(null);
  const ring4 = useRef<THREE.Mesh>(null);
  const ring5 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const speed = isSpeaking ? 0.3 : 0.2;
    
    if (ring1.current) ring1.current.rotation.z = time * speed;
    if (ring2.current) ring2.current.rotation.z = -time * speed * 0.8;
    if (ring3.current) ring3.current.rotation.z = time * speed * 0.6;
    if (ring4.current) ring4.current.rotation.z = -time * speed * 0.4;
    if (ring5.current) ring5.current.rotation.z = time * speed * 0.5;
  });

  return (
    <>
      {/* Innermost ring */}
      <mesh ref={ring1}>
        <torusGeometry args={[1.3, 0.008, 32, 100]} />
        <meshBasicMaterial color="#6EE7F9" transparent opacity={isSpeaking ? 0.4 : 0.25} />
      </mesh>
      
      {/* Second ring */}
      <mesh ref={ring2}>
        <torusGeometry args={[1.7, 0.008, 32, 100]} />
        <meshBasicMaterial color="#A5F3FC" transparent opacity={isSpeaking ? 0.35 : 0.2} />
      </mesh>
      
      {/* Middle ring */}
      <mesh ref={ring3}>
        <torusGeometry args={[2.1, 0.008, 32, 100]} />
        <meshBasicMaterial color="#6EE7F9" transparent opacity={isSpeaking ? 0.3 : 0.18} />
      </mesh>
      
      {/* Fourth ring */}
      <mesh ref={ring4}>
        <torusGeometry args={[2.5, 0.008, 32, 100]} />
        <meshBasicMaterial color="#A5F3FC" transparent opacity={isSpeaking ? 0.25 : 0.15} />
      </mesh>
      
      {/* Outermost ring */}
      <mesh ref={ring5}>
        <torusGeometry args={[2.9, 0.008, 32, 100]} />
        <meshBasicMaterial color="#6EE7F9" transparent opacity={isSpeaking ? 0.2 : 0.12} />
      </mesh>
    </>
  );
}

export function AnimatedOrb({ isSpeaking }: OrbProps) {
  return (
    <div className="w-full h-full relative">
      {/* Intense centered glow matching reference */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`w-[500px] h-[500px] rounded-full transition-all duration-500 ${
          isSpeaking 
            ? 'bg-[#6EE7F9]/40 blur-[150px] animate-breathe' 
            : 'bg-[#6EE7F9]/30 blur-[120px] animate-breathe'
        }`} />
      </div>
      
      {/* Inner core glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`w-[200px] h-[200px] rounded-full transition-all duration-300 ${
          isSpeaking 
            ? 'bg-white/50 blur-[80px]' 
            : 'bg-white/30 blur-[60px]'
        }`} />
      </div>
      
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        {/* Enhanced lighting for intense glow */}
        <ambientLight intensity={0.3} />
        <pointLight 
          position={[0, 0, 0]} 
          intensity={isSpeaking ? 5 : 3.5} 
          color="#6EE7F9"
          distance={15}
          decay={2}
        />
        <pointLight 
          position={[0, 0, 4]} 
          intensity={isSpeaking ? 3 : 2} 
          color="#A5F3FC"
          distance={10}
        />
        <pointLight 
          position={[3, 0, 3]} 
          intensity={1} 
          color="#A78BFA"
        />
        
        {/* Core components */}
        <CoreOrb isSpeaking={isSpeaking} />
        <CircularRings isSpeaking={isSpeaking} />
        <HorizontalLines isSpeaking={isSpeaking} />
      </Canvas>
    </div>
  );
}
