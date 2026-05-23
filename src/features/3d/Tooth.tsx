'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Tooth() {
    const groupRef = useRef<THREE.Group>(null);
    const pulpRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (groupRef.current) {
            // Smooth, luxurious spinning and organic breathing movement
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.45;
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.12;
            groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
        }
        if (pulpRef.current) {
            // Pulse the inner golden core gently
            const scale = 1 + Math.sin(state.clock.elapsedTime * 2.5) * 0.08;
            pulpRef.current.scale.set(scale, scale, scale);
        }
    });

    return (
        <group ref={groupRef}>
            {/* The Enamel Molar Crown - Composed of 4 overlapping highly glossy, translucent cusps */}
            {/* Cusp 1 (Front Left) */}
            <mesh position={[-0.28, 0.35, 0.28]}>
                <sphereGeometry args={[0.42, 32, 32]} />
                <meshPhysicalMaterial
                    color="#FAFAFA"
                    roughness={0.02}
                    metalness={0.05}
                    transmission={0.92} // Premium clinical glassy enamel look
                    thickness={1}
                    clearcoat={1.0}
                    clearcoatRoughness={0.02}
                />
            </mesh>
            {/* Cusp 2 (Front Right) */}
            <mesh position={[0.28, 0.35, 0.28]}>
                <sphereGeometry args={[0.42, 32, 32]} />
                <meshPhysicalMaterial
                    color="#FAFAFA"
                    roughness={0.02}
                    metalness={0.05}
                    transmission={0.92}
                    thickness={1}
                    clearcoat={1.0}
                    clearcoatRoughness={0.02}
                />
            </mesh>
            {/* Cusp 3 (Back Left) */}
            <mesh position={[-0.28, 0.35, -0.28]}>
                <sphereGeometry args={[0.42, 32, 32]} />
                <meshPhysicalMaterial
                    color="#FAFAFA"
                    roughness={0.02}
                    metalness={0.05}
                    transmission={0.92}
                    thickness={1}
                    clearcoat={1.0}
                    clearcoatRoughness={0.02}
                />
            </mesh>
            {/* Cusp 4 (Back Right) */}
            <mesh position={[0.28, 0.35, -0.28]}>
                <sphereGeometry args={[0.42, 32, 32]} />
                <meshPhysicalMaterial
                    color="#FAFAFA"
                    roughness={0.02}
                    metalness={0.05}
                    transmission={0.92}
                    thickness={1}
                    clearcoat={1.0}
                    clearcoatRoughness={0.02}
                />
            </mesh>

            {/* Tooth Neck / Enamel Junction */}
            <mesh position={[0, 0.05, 0]}>
                <cylinderGeometry args={[0.55, 0.45, 0.5, 32]} />
                <meshPhysicalMaterial
                    color="#F5F5F5"
                    roughness={0.05}
                    metalness={0.05}
                    transmission={0.88}
                    thickness={0.8}
                    clearcoat={0.8}
                />
            </mesh>

            {/* Anatomical Roots - 2 Tapering, slightly splayed roots */}
            {/* Left Root */}
            <mesh position={[-0.2, -0.45, 0]} rotation={[0, 0, 0.12]}>
                <cylinderGeometry args={[0.22, 0.04, 0.7, 32]} />
                <meshPhysicalMaterial
                    color="#EEEEEE"
                    roughness={0.12}
                    metalness={0.05}
                    transmission={0.75}
                    thickness={0.5}
                />
            </mesh>
            {/* Right Root */}
            <mesh position={[0.2, -0.45, 0]} rotation={[0, 0, -0.12]}>
                <cylinderGeometry args={[0.22, 0.04, 0.7, 32]} />
                <meshPhysicalMaterial
                    color="#EEEEEE"
                    roughness={0.12}
                    metalness={0.05}
                    transmission={0.75}
                    thickness={0.5}
                />
            </mesh>

            {/* Glowing Pulp Core (Champagne Gold vitality energy) */}
            <mesh ref={pulpRef} position={[0, 0.12, 0]}>
                <sphereGeometry args={[0.22, 32, 32]} />
                <meshStandardMaterial
                    color="#C9A962"
                    emissive="#C9A962"
                    emissiveIntensity={1.8}
                    roughness={0.1}
                />
            </mesh>

            {/* Hygiene Halo - Floating Golden Sparkles */}
            <points>
                <sphereGeometry args={[1.6, 28, 28]} />
                <pointsMaterial 
                    size={0.035} 
                    color="#C9A962" 
                    sizeAttenuation 
                    transparent 
                    opacity={0.65} 
                />
            </points>
        </group>
    );
}
