'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Chair() {
    // Placeholder for Morphing Chair
    // In production, this would use GLTF with shape keys or particle morphing
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Base */}
            <mesh position={[0, -1, 0]}>
                <cylinderGeometry args={[0.5, 0.5, 0.2, 32]} />
                <meshStandardMaterial color="#1A1A1A" />
            </mesh>
            {/* Seat */}
            <mesh position={[0, -0.5, 0]}>
                <boxGeometry args={[1.5, 0.2, 1.5]} />
                <meshStandardMaterial color="#2D3B2D" />
            </mesh>
            {/* Backrest */}
            <mesh position={[0, 0.5, -0.6]}>
                <boxGeometry args={[1.5, 1.8, 0.2]} />
                <meshStandardMaterial color="#2D3B2D" />
            </mesh>
            {/* Floating Particles (Suggesting Morphing) */}
            <points position={[0, 0, 0]}>
                <sphereGeometry args={[2, 16, 16]} />
                <pointsMaterial size={0.03} color="#C9A962" sizeAttenuation transparent opacity={0.5} />
            </points>
        </group>
    );
}
