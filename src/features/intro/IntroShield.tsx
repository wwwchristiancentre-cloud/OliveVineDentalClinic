'use client';

import { Sphere } from '@react-three/drei';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

interface IntroShieldProps {
    timeline: gsap.core.Timeline;
}

export function IntroShield({ timeline }: IntroShieldProps) {
    const meshRef = useRef<THREE.Mesh>(null);

    useEffect(() => {
        if (!meshRef.current) return;

        // Initially invisible
        meshRef.current.scale.setScalar(0);

        // Animate in sync with Particles becoming Shield (Phase 3 of particles)
        // Particles Phase 1: 0.5s -> 3s (Chaos to Hand)
        // Particles Phase 2: 3s -> 4s (Wait)
        // Particles Phase 3: 4s -> 6s (Hand to Shield)

        // We want the shield surface to appear AS the particles arrive
        timeline.to(meshRef.current.scale, {
            x: 1, y: 1, z: 1,
            duration: 2,
            ease: 'elastic.out(1, 0.5)',
        }, 4); // Start at 4s mark

    }, [timeline]);

    return (
        <Sphere ref={meshRef} args={[3.4, 64, 64]}>
            {/* 3.4 radius, slightly inside the 3.5 particle radius */}
            <meshPhysicalMaterial
                color="#a5f3fc"
                roughness={0}
                metalness={0.2}
                transmission={0.95} // Glass-like
                thickness={0.5}
                transparent
                opacity={0.5}
                emissive="#a5f3fc"
                emissiveIntensity={0.2}
            />
        </Sphere>
    );
}
