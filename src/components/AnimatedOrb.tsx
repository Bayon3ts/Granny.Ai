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
  const intensityRef = useRef(2.5);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();
    
    // Gentle rotation
    meshRef.current.rotation.y = time * 0.08;
    meshRef.current.rotation.x = Math.sin(time * 0.3) * 0.1;

    // Voice-reactive breathing
    const targetDistort = isSpeaking ? 0.28 : 0.12;
    const targetScale = isSpeaking ? 1.1 : 1.0;
    const targetIntensity = isSpeaking ? 4.5 : 2.5;
    
    // Natural breathing rhythm
    const breathe = Math.sin(time * 0.5) * 0.03 + 1;
    
    distortRef.current += (targetDistort - distortRef.current) * 0.08;
    scaleRef.current += (targetScale * breathe - scaleRef.current) * 0.06;
    intensityRef.current += (targetIntensity - intensityRef.current) * 0.08;

    meshRef.current.scale.setScalar(scaleRef.current);
  });

  return (
    <Sphere ref={meshRef} args={[1, 128, 128]}>
      <MeshDistortMaterial
        color="#00C8FF"
        attach="material"
        distort={distortRef.current}
        speed={isSpeaking ? 2.5 : 1}
        roughness={0}
        metalness={1}
        emissive="#62E5FF"
        emissiveIntensity={intensityRef.current}
        transparent
        opacity={0.9}
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
    const baseSpeed = 0.15;
    const speed = isSpeaking ? 0.35 : baseSpeed;
    
    // Breathing pulse effect for each ring
    const breathe = Math.sin(time * 0.8) * 0.15 + 1;
    
    if (ring1.current) {
      ring1.current.rotation.z = time * speed;
      const scale = breathe * (isSpeaking ? 1.05 : 1);
      ring1.current.scale.setScalar(scale);
    }
    if (ring2.current) {
      ring2.current.rotation.z = -time * speed * 0.8;
      const scale = breathe * (isSpeaking ? 1.08 : 1);
      ring2.current.scale.setScalar(scale);
    }
    if (ring3.current) {
      ring3.current.rotation.z = time * speed * 0.6;
      const scale = breathe * (isSpeaking ? 1.12 : 1);
      ring3.current.scale.setScalar(scale);
    }
    if (ring4.current) {
      ring4.current.rotation.z = -time * speed * 0.4;
      const scale = breathe * (isSpeaking ? 1.15 : 1);
      ring4.current.scale.setScalar(scale);
    }
    if (ring5.current) {
      ring5.current.rotation.z = time * speed * 0.5;
      const scale = breathe * (isSpeaking ? 1.18 : 1);
      ring5.current.scale.setScalar(scale);
    }
  });

  return (
    <>
      {/* Innermost ring */}
      <mesh ref={ring1}>
        <torusGeometry args={[1.3, 0.01, 32, 100]} />
        <meshBasicMaterial color="#00C8FF" transparent opacity={isSpeaking ? 0.7 : 0.4} />
      </mesh>
      
      {/* Second ring */}
      <mesh ref={ring2}>
        <torusGeometry args={[1.7, 0.01, 32, 100]} />
        <meshBasicMaterial color="#62E5FF" transparent opacity={isSpeaking ? 0.6 : 0.35} />
      </mesh>
      
      {/* Middle ring */}
      <mesh ref={ring3}>
        <torusGeometry args={[2.1, 0.01, 32, 100]} />
        <meshBasicMaterial color="#00C8FF" transparent opacity={isSpeaking ? 0.5 : 0.3} />
      </mesh>
      
      {/* Fourth ring */}
      <mesh ref={ring4}>
        <torusGeometry args={[2.5, 0.01, 32, 100]} />
        <meshBasicMaterial color="#62E5FF" transparent opacity={isSpeaking ? 0.4 : 0.25} />
      </mesh>
      
      {/* Outermost ring */}
      <mesh ref={ring5}>
        <torusGeometry args={[2.9, 0.01, 32, 100]} />
        <meshBasicMaterial color="#00C8FF" transparent opacity={isSpeaking ? 0.35 : 0.2} />
      </mesh>
    </>
  );
}

export function AnimatedOrb({ isSpeaking }: OrbProps) {
  return (
    <div className="w-full h-full relative">
      {/* Holographic glow layers */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`w-[600px] h-[600px] rounded-full transition-all duration-700 ${
          isSpeaking 
            ? 'bg-[#00C8FF]/50 blur-[150px] animate-pulse-intense' 
            : 'bg-[#00C8FF]/30 blur-[120px] animate-breathe'
        }`} style={{ mixBlendMode: 'screen' }} />
      </div>
      
      {/* Core radiance */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`w-[250px] h-[250px] rounded-full transition-all duration-500 ${
          isSpeaking 
            ? 'bg-[#62E5FF]/60 blur-[80px]' 
            : 'bg-[#62E5FF]/40 blur-[60px]'
        }`} style={{ mixBlendMode: 'lighten' }} />
      </div>
      
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        {/* Voice-reactive lighting */}
        <ambientLight intensity={0.2} />
        <pointLight 
          position={[0, 0, 0]} 
          intensity={isSpeaking ? 6 : 4} 
          color="#00C8FF"
          distance={15}
          decay={2}
        />
        <pointLight 
          position={[0, 0, 4]} 
          intensity={isSpeaking ? 4 : 2.5} 
          color="#62E5FF"
          distance={12}
          decay={1.8}
        />
        <pointLight 
          position={[3, 0, 3]} 
          intensity={1.5} 
          color="#B8E8FF"
        />
        <pointLight 
          position={[-3, 0, 3]} 
          intensity={1.5} 
          color="#B8E8FF"
        />
        
        {/* Core components */}
        <CoreOrb isSpeaking={isSpeaking} />
        <CircularRings isSpeaking={isSpeaking} />
        <HorizontalLines isSpeaking={isSpeaking} />
      </Canvas>
    </div>
  );
}
