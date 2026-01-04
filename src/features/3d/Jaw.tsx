'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Jaw() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.005;
        }
    });

    return (
        <group>
            {/* Jaw Placeholder (Torus for now) */}
            <mesh ref={meshRef}>
                <torusKnotGeometry args={[1, 0.3, 100, 16]} />
                <meshPhysicalMaterial
                    color="#FFFFFF"
                    roughness={0.1}
                    metalness={0.1}
                    transmission={0.9} // Crystal
                    thickness={1}
                    clearcoat={1}
                />
            </mesh>
        </group>
    );
}
