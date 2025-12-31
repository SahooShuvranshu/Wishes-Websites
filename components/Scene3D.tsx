
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles, Environment, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Define intrinsic Three.js elements to bypass JSX type checking errors
const Group = 'group' as any;
const Mesh = 'mesh' as any;
const CylinderGeometry = 'cylinderGeometry' as any;
const MeshStandardMaterial = 'meshStandardMaterial' as any;
const PointLight = 'pointLight' as any;
const TorusGeometry = 'torusGeometry' as any;
const AmbientLight = 'ambientLight' as any;
const Color = 'color' as any;
const Fog = 'fog' as any;

const TraditionalRedLantern = ({ position, scale, speed, delay }: { position: [number, number, number], scale: number, speed: number, delay: number }) => {
  const meshRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() + delay;
    if (meshRef.current) {
      // Gentle drift upwards
      meshRef.current.position.y += speed;
      
      // Floating sway
      meshRef.current.position.x = position[0] + Math.sin(t * 0.4) * 0.7;
      meshRef.current.position.z = position[2] + Math.cos(t * 0.3) * 0.7;
      
      // Rotation
      meshRef.current.rotation.y += 0.003;
      meshRef.current.rotation.z = Math.sin(t * 0.4) * 0.04;

      // Reset when too high
      if (meshRef.current.position.y > 15) {
        meshRef.current.position.y = -15;
      }
    }
  });

  return (
    <Group ref={meshRef} position={position} scale={scale}>
      {/* Paper Body - Deep Red Festive Color */}
      <Mesh>
        <CylinderGeometry args={[0.7, 0.55, 1.5, 12, 1, true]} />
        <MeshStandardMaterial 
          color="#991b1b" 
          emissive="#7f1d1d" 
          emissiveIntensity={1.5} 
          transparent 
          opacity={0.9} 
          side={THREE.DoubleSide}
        />
      </Mesh>
      
      {/* Top Cover - Gold/Yellow Accent */}
      <Mesh position={[0, 0.75, 0]}>
        <CylinderGeometry args={[0.7, 0.7, 0.05, 12]} />
        <MeshStandardMaterial color="#fbbf24" emissive="#d97706" emissiveIntensity={1} />
      </Mesh>

      {/* Internal Flame Glow - Warm Golden Light */}
      <PointLight intensity={18} distance={8} color="#f59e0b" position={[0, -0.3, 0]} />
      
      {/* Bottom Frame Ring - Gold Accent */}
      <Mesh position={[0, -0.75, 0]}>
        <TorusGeometry args={[0.55, 0.04, 8, 16]} />
        <MeshStandardMaterial color="#d97706" metalness={0.8} roughness={0.2} />
      </Mesh>

      {/* Tassel Mesh for Chinese Style */}
      <Mesh position={[0, -1.2, 0]}>
        <CylinderGeometry args={[0.05, 0.01, 0.8, 8]} />
        <MeshStandardMaterial color="#7f1d1d" />
      </Mesh>
    </Group>
  );
};

const SkyBackground = () => {
  return (
    <Group>
      <Stars radius={120} depth={60} count={6000} factor={4} saturation={0.5} fade speed={1.2} />
      <Sparkles count={50} scale={25} size={2.5} speed={0.5} opacity={0.3} color="#fcd34d" />
    </Group>
  );
};

export const Scene3D: React.FC = () => {
  const lanternData = useMemo(() => {
    return Array.from({ length: 28 }).map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.8) * 18
      ] as [number, number, number],
      scale: Math.random() * 0.4 + 0.25,
      speed: Math.random() * 0.012 + 0.006,
      delay: Math.random() * 200
    }));
  }, []);

  return (
    <div className="h-full w-full">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 14], fov: 40 }}>
        <Color attach="background" args={['#020617']} />
        <Fog attach="fog" args={['#020617', 8, 35]} />
        
        <AmbientLight intensity={0.2} />
        <PointLight position={[0, 25, 15]} intensity={0.6} color="#334155" />
        
        <SkyBackground />
        
        {lanternData.map((props, i) => (
          <TraditionalRedLantern key={i} {...props} />
        ))}
        
        <Environment preset="night" />
      </Canvas>
    </div>
  );
};
