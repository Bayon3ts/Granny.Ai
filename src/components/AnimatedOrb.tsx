import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Ring } from '@react-three/drei';
import * as THREE from 'three';

interface OrbProps {
  isSpeaking: boolean;
}

function Particles({ count = 50, isSpeaking }: { count?: number; isSpeaking: boolean }) {
  const points = useRef<THREE.Points>(null);
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const radius = 2 + Math.random() * 1;
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (!points.current) return;
    const time = state.clock.getElapsedTime();
    points.current.rotation.y = time * 0.05;
    points.current.rotation.x = time * 0.03;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={isSpeaking ? 0.08 : 0.04}
        color="#00d9ff"
        transparent
        opacity={isSpeaking ? 0.8 : 0.4}
        sizeAttenuation
      />
    </points>
  );
}

function CoreOrb({ isSpeaking }: OrbProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const distortRef = useRef(0.3);
  const scaleRef = useRef(1);
  const intensityRef = useRef(0.5);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();
    
    // Gentle rotation
    meshRef.current.rotation.x = Math.sin(time * 0.3) * 0.2;
    meshRef.current.rotation.y = time * 0.1;

    // Dynamic distortion and scale based on speaking state
    const targetDistort = isSpeaking ? 0.8 : 0.3;
    const targetScale = isSpeaking ? 1.2 : 1;
    const targetIntensity = isSpeaking ? 1.2 : 0.5;
    
    distortRef.current += (targetDistort - distortRef.current) * 0.1;
    scaleRef.current += (targetScale - scaleRef.current) * 0.1;
    intensityRef.current += (targetIntensity - intensityRef.current) * 0.1;

    meshRef.current.scale.setScalar(scaleRef.current);
  });

  return (
    <Sphere ref={meshRef} args={[1, 128, 128]}>
      <MeshDistortMaterial
        color="#00bfff"
        attach="material"
        distort={distortRef.current}
        speed={isSpeaking ? 4 : 1.5}
        roughness={0.1}
        metalness={0.9}
        emissive="#00d9ff"
        emissiveIntensity={intensityRef.current}
        transparent
        opacity={0.9}
      />
    </Sphere>
  );
}

function RotatingRings({ isSpeaking }: OrbProps) {
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const ring3 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const speed = isSpeaking ? 2 : 1;
    
    if (ring1.current) {
      ring1.current.rotation.x = time * 0.3 * speed;
      ring1.current.rotation.y = time * 0.2 * speed;
    }
    if (ring2.current) {
      ring2.current.rotation.x = -time * 0.4 * speed;
      ring2.current.rotation.z = time * 0.3 * speed;
    }
    if (ring3.current) {
      ring3.current.rotation.y = time * 0.5 * speed;
      ring3.current.rotation.z = -time * 0.2 * speed;
    }
  });

  const ringOpacity = isSpeaking ? 0.6 : 0.3;

  return (
    <>
      <Ring ref={ring1} args={[1.8, 2, 64]}>
        <meshBasicMaterial color="#00d9ff" transparent opacity={ringOpacity} side={THREE.DoubleSide} />
      </Ring>
      <Ring ref={ring2} args={[2.2, 2.4, 64]}>
        <meshBasicMaterial color="#0099cc" transparent opacity={ringOpacity} side={THREE.DoubleSide} />
      </Ring>
      <Ring ref={ring3} args={[2.6, 2.8, 64]}>
        <meshBasicMaterial color="#006699" transparent opacity={ringOpacity} side={THREE.DoubleSide} />
      </Ring>
    </>
  );
}

export function AnimatedOrb({ isSpeaking }: OrbProps) {
  return (
    <div className="w-full h-full relative">
      {/* Glowing background effect */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent blur-3xl" />
      
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        {/* Enhanced lighting */}
        <ambientLight intensity={0.3} />
        <pointLight position={[0, 0, 0]} intensity={isSpeaking ? 2 : 1} color="#00d9ff" />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#00bfff" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#0099cc" />
        
        {/* Core components */}
        <CoreOrb isSpeaking={isSpeaking} />
        <RotatingRings isSpeaking={isSpeaking} />
        <Particles count={100} isSpeaking={isSpeaking} />
      </Canvas>
    </div>
  );
}
