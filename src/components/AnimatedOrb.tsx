import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface OrbProps {
  isSpeaking: boolean;
}

function CoreOrb({ isSpeaking }: OrbProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const distortRef = useRef(0.2);
  const scaleRef = useRef(1);
  const intensityRef = useRef(1.5);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();
    
    // Subtle rotation
    meshRef.current.rotation.y = time * 0.15;

    // Dynamic distortion and scale based on speaking state
    const targetDistort = isSpeaking ? 0.4 : 0.2;
    const targetScale = isSpeaking ? 1.15 : 1;
    const targetIntensity = isSpeaking ? 2.5 : 1.5;
    
    distortRef.current += (targetDistort - distortRef.current) * 0.08;
    scaleRef.current += (targetScale - scaleRef.current) * 0.08;
    intensityRef.current += (targetIntensity - intensityRef.current) * 0.08;

    meshRef.current.scale.setScalar(scaleRef.current);
  });

  return (
    <Sphere ref={meshRef} args={[1, 100, 100]}>
      <MeshDistortMaterial
        color="#4fc3f7"
        attach="material"
        distort={distortRef.current}
        speed={isSpeaking ? 2.5 : 1.5}
        roughness={0.1}
        metalness={0.9}
        emissive="#00bcd4"
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
      const offset = i * 0.2;
      const mesh = line as THREE.Mesh;
      const material = mesh.material as THREE.MeshBasicMaterial;
      material.opacity = 0.3 + Math.sin(time * (isSpeaking ? 3 : 1.5) + offset) * 0.2;
    });
  });

  return (
    <group ref={linesRef}>
      {[-1.5, -0.75, 0, 0.75, 1.5].map((y, i) => (
        <mesh key={i} position={[0, y, 0]}>
          <planeGeometry args={[10, 0.02]} />
          <meshBasicMaterial 
            color="#4fc3f7" 
            transparent 
            opacity={0.3} 
            side={THREE.DoubleSide} 
          />
        </mesh>
      ))}
    </group>
  );
}

function CircularRings({ isSpeaking }: OrbProps) {
  const outerRing = useRef<THREE.Mesh>(null);
  const middleRing = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const speed = isSpeaking ? 0.5 : 0.3;
    
    if (outerRing.current) {
      outerRing.current.rotation.z = time * speed;
    }
    if (middleRing.current) {
      middleRing.current.rotation.z = -time * speed * 0.8;
    }
  });

  return (
    <>
      <mesh ref={outerRing}>
        <torusGeometry args={[2.5, 0.01, 16, 100]} />
        <meshBasicMaterial color="#4fc3f7" transparent opacity={isSpeaking ? 0.6 : 0.4} />
      </mesh>
      <mesh ref={middleRing}>
        <torusGeometry args={[2, 0.01, 16, 100]} />
        <meshBasicMaterial color="#b794f6" transparent opacity={isSpeaking ? 0.5 : 0.3} />
      </mesh>
      <mesh>
        <torusGeometry args={[1.5, 0.015, 16, 100]} />
        <meshBasicMaterial color="#7dd3c0" transparent opacity={isSpeaking ? 0.7 : 0.5} />
      </mesh>
    </>
  );
}

export function AnimatedOrb({ isSpeaking }: OrbProps) {
  return (
    <div className="w-full h-full relative">
      {/* Centered glowing background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`w-96 h-96 rounded-full transition-all duration-500 ${
          isSpeaking 
            ? 'bg-[#4fc3f7]/30 blur-[120px]' 
            : 'bg-[#4fc3f7]/20 blur-[100px]'
        }`} />
      </div>
      
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        {/* Focused lighting */}
        <ambientLight intensity={0.2} />
        <pointLight 
          position={[0, 0, 0]} 
          intensity={isSpeaking ? 3 : 2} 
          color="#00bcd4"
          distance={10}
        />
        <pointLight 
          position={[0, 0, 5]} 
          intensity={isSpeaking ? 2 : 1} 
          color="#4fc3f7"
        />
        
        {/* Core components matching reference */}
        <CoreOrb isSpeaking={isSpeaking} />
        <CircularRings isSpeaking={isSpeaking} />
        <HorizontalLines isSpeaking={isSpeaking} />
      </Canvas>
    </div>
  );
}
