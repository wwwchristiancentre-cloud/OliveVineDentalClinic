'use client';

import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { useMemo, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler.js';

interface IntroParticlesProps {
    timeline: gsap.core.Timeline;
}

export function IntroParticles({ timeline }: IntroParticlesProps) {
    const { viewport } = useThree();
    const isMobile = viewport.width < 5; // Approx split for vertical layout

    // Scale down on mobile, keep normal on desktop
    // Desktop was 3.5, Mobile should be ~1.8 to fit
    const spreadScale = isMobile ? 1.8 : 3.5;

    const count = 6000;
    const meshRef = useRef<THREE.InstancedMesh>(null);

    // Load the Hand Model
    // Note: R3F's useLoader caches the result automatically
    const obj = useLoader(OBJLoader, '/assets/hand/Femhand.obj');

    // 1. CHAOS POSITIONS (Random spread)
    const chaosData = useMemo(() => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            // Spread wider for initial chaos
            positions[i * 3] = (Math.random() - 0.5) * 30;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
        }
        return positions;
    }, []);

    // 2. HAND POSITIONS (Creating "Open Hands" Gesture from Single Model)
    const handData = useMemo(() => {
        const positions = new Float32Array(count * 3);

        const meshArray: THREE.Mesh[] = [];
        if (obj && typeof obj.traverse === 'function') {
            obj.traverse((child) => {
                if ((child as THREE.Mesh).isMesh && meshArray.length === 0) {
                    meshArray.push(child as THREE.Mesh);
                }
            });
        }
        const targetMesh = meshArray[0];

        let sampledSuccessfully = false;
        if (targetMesh && targetMesh.geometry && targetMesh.geometry.attributes.position) {
            try {
                const sampler = new MeshSurfaceSampler(targetMesh);
                sampler.build();
                const tempPosition = new THREE.Vector3();
                const tempVector = new THREE.Vector3();

                // Matrices for the gesture (Offering / Palms Up towards Camera)
                // Assuming standard hand model: Palm Down, Fingers Forward

                // Matrices from User Debugging Session

                // LEFT HAND
                const leftMatrix = new THREE.Matrix4();
                leftMatrix.makeRotationZ(2.35);
                leftMatrix.multiply(new THREE.Matrix4().makeRotationX(-0.3));
                leftMatrix.multiply(new THREE.Matrix4().makeRotationY(0.0));
                leftMatrix.setPosition(-0.4, -0.1, 0.5);

                // Mirror for Left Hand (Scale X by -1)
                const mirrorMatrix = new THREE.Matrix4().makeScale(-1, 1, 1);

                // RIGHT HAND 
                const rightMatrix = new THREE.Matrix4();
                rightMatrix.makeRotationZ(-2.40);
                rightMatrix.multiply(new THREE.Matrix4().makeRotationX(-0.3));
                rightMatrix.multiply(new THREE.Matrix4().makeRotationY(0.0));
                rightMatrix.setPosition(0.4, -0.1, 0.5);

                const halfCount = Math.floor(count / 2);

                // Sample Left Hand
                for (let i = 0; i < halfCount; i++) {
                    sampler.sample(tempPosition);
                    tempVector.copy(tempPosition).applyMatrix4(mirrorMatrix).applyMatrix4(leftMatrix);

                    positions[i * 3] = tempVector.x * spreadScale;
                    positions[i * 3 + 1] = tempVector.y * spreadScale;
                    positions[i * 3 + 2] = tempVector.z * spreadScale;
                }

                // Sample Right Hand
                for (let i = halfCount; i < count; i++) {
                    sampler.sample(tempPosition);
                    tempVector.copy(tempPosition).applyMatrix4(rightMatrix);

                    positions[i * 3] = tempVector.x * spreadScale;
                    positions[i * 3 + 1] = tempVector.y * spreadScale;
                    positions[i * 3 + 2] = tempVector.z * spreadScale;
                }

                sampledSuccessfully = true;
                console.log("Successfully sampled Two Hands gesture.");
            } catch (error) {
                console.error('Error building MeshSurfaceSampler:', error);
            }
        }

        if (!sampledSuccessfully) {
            console.warn("Hand sampling failed, falling back to random cloud.");
            // Fallback to random distribution if sampling fails or no mesh found
            for (let i = 0; i < count; i++) {
                positions[i * 3] = (Math.random() - 0.5) * 4;
                positions[i * 3 + 1] = (Math.random() - 0.5) * 4;
                positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
            }
        }

        return positions;
    }, [obj]);

    // 3. SHIELD POSITIONS (Surface of a Sphere)
    const shieldData = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const radius = 3.5;
        for (let i = 0; i < count; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);

            positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = radius * Math.cos(phi);
        }
        return positions;
    }, []);

    // Animation State
    const progress = useRef({ value: 0 }); // 0=Chaos, 1=Hand, 2=Shield

    useEffect(() => {
        console.log("IntroParticles mounted, adding tweens to timeline.");
        // Phase 1: Chaos -> Hand (Start: 0.5s, Dur: 3s -> End: 3.5s)
        timeline.to(progress.current, {
            value: 1,
            duration: 3,
            ease: 'power2.inOut',
        }, 0.5);

        // Phase 2: Hand Hold (Shortened to 0.5s -> End: 4.0s)
        timeline.to({}, { duration: 0.5 });

        // Phase 3: Hand -> Shield (Start: 4.0s, Dur: 2.5s -> End: 6.5s)
        timeline.to(progress.current, {
            value: 2,
            duration: 2.5,
            ease: 'elastic.out(1, 0.5)',
        });
    }, [timeline]);

    useFrame((state) => {
        if (!meshRef.current) return;

        // Add subtle rotation to the whole group for life
        meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;

        const p = progress.current.value;
        const dummy = new THREE.Object3D();

        for (let i = 0; i < count; i++) {
            let x, y, z;

            if (p <= 1) {
                // Chaos -> Hand
                x = THREE.MathUtils.lerp(chaosData[i * 3], handData[i * 3], p);
                y = THREE.MathUtils.lerp(chaosData[i * 3 + 1], handData[i * 3 + 1], p);
                z = THREE.MathUtils.lerp(chaosData[i * 3 + 2], handData[i * 3 + 2], p);
            } else {
                // Hand -> Shield
                const t = p - 1; // 0 to 1
                x = THREE.MathUtils.lerp(handData[i * 3], shieldData[i * 3], t);
                y = THREE.MathUtils.lerp(handData[i * 3 + 1], shieldData[i * 3 + 1], t);
                z = THREE.MathUtils.lerp(handData[i * 3 + 2], shieldData[i * 3 + 2], t);
            }

            dummy.position.set(x, y, z);

            // Scale particles down when they form the detailed Hand, up when Shield?
            // Keep constant for now
            dummy.scale.setScalar(0.04);

            dummy.updateMatrix();
            meshRef.current.setMatrixAt(i, dummy.matrix);
        }
        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]} frustumCulled={false}>
            {/* Smaller dots on mobile to look sharper */}
            <dodecahedronGeometry args={[isMobile ? 0.15 : 0.22, 0]} />
            <meshStandardMaterial
                name="intro-particles-material" // For GSAP targeting
                color="#4ade80"
                emissive="#4ade80"
                emissiveIntensity={0.6}
                toneMapped={false}
                transparent={true} // Enable transparency for fade
            />
        </instancedMesh>
    );
}