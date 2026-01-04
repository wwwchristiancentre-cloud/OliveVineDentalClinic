'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Shield() {
    const meshRef = useRef<THREE.Mesh>(null);
    const particlesRef = useRef<THREE.Points>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.01;
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.1;
        }
        if (particlesRef.current) {
            particlesRef.current.rotation.y -= 0.005;
        }
    });

    // Placeholder Shield Geometry
    return (
        <group>
            {/* The Shield (Core) */}
            <mesh ref={meshRef}>
                <icosahedronGeometry args={[1.5, 0]} />
                <meshPhysicalMaterial
                    color="#C9A962" // Gold
                    roughness={0}
                    metalness={0.8}
                    transmission={0.5} // Glass-like
                    thickness={2}
                    wireframe
                />
            </mesh>

            {/* Particle Chaos */}
            <points ref={particlesRef}>
                <sphereGeometry args={[2.5, 32, 32]} />
                <pointsMaterial size={0.05} color="#4A5D4A" transparent opacity={0.6} />
            </points>
        </group>
    );
}
