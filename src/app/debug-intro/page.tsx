'use client';

import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler.js';
import { Leva, useControls } from 'leva';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';

export default function DebugIntroPage() {
    return (
        <div style={{ width: '100vw', height: '100vh', background: 'black' }}>
            <Leva collapsed={false} />
            <Canvas gl={{ antialias: true, alpha: true }}>
                <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={1} />
                <OrbitControls />
                <DebugParticles />
            </Canvas>
        </div>
    );
}

function DebugParticles() {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const obj = useLoader(OBJLoader, '/assets/hand/Femhand.obj');

    // Controls - DEFAULTS SET TO ACCEPTED TUNED VALUES
    const {
        count,
        scale,

        // Left Hand
        leftX, leftY, leftZ,
        leftRotX, leftRotY, leftRotZ,

        // Right Hand
        rightX, rightY, rightZ,
        rightRotX, rightRotY, rightRotZ,

        particleSize
    } = useControls('Hand Tuner', {
        count: { value: 6000, min: 1000, max: 20000, step: 100 },
        scale: { value: 3.5, min: 0.1, max: 10, step: 0.1 },
        particleSize: { value: 0.22, min: 0.01, max: 1, step: 0.01 },

        // Left Hand Tuned Defaults
        leftX: { value: -0.4, min: -5, max: 5, step: 0.1 },
        leftY: { value: -0.1, min: -5, max: 5, step: 0.1 },
        leftZ: { value: 0.5, min: -5, max: 5, step: 0.1 },

        leftRotX: { value: -0.3, min: -3.14, max: 3.14, step: 0.1 },
        leftRotY: { value: 0.0, min: -3.14, max: 3.14, step: 0.1 },
        leftRotZ: { value: 2.35, min: -3.14, max: 3.14, step: 0.01 },

        // Right Hand Tuned Defaults
        rightX: { value: 0.4, min: -5, max: 5, step: 0.1 },
        rightY: { value: -0.1, min: -5, max: 5, step: 0.1 },
        rightZ: { value: 0.5, min: -5, max: 5, step: 0.1 },

        rightRotX: { value: -0.3, min: -3.14, max: 3.14, step: 0.1 },
        rightRotY: { value: 0.0, min: -3.14, max: 3.14, step: 0.1 },
        rightRotZ: { value: -2.40, min: -3.14, max: 3.14, step: 0.01 },
    });

    const handPositions = useMemo(() => {
        if (!obj) return new Float32Array(0);

        const positions = new Float32Array(count * 3);
        const meshArray: THREE.Mesh[] = [];
        obj.traverse((child) => {
            if ((child as THREE.Mesh).isMesh && meshArray.length === 0) {
                meshArray.push(child as THREE.Mesh);
            }
        });
        const targetMesh = meshArray[0];

        if (targetMesh && targetMesh.geometry && targetMesh.geometry.attributes.position) {
            const sampler = new MeshSurfaceSampler(targetMesh);
            sampler.build();
            const tempPosition = new THREE.Vector3();
            const tempVector = new THREE.Vector3();

            // Matrices
            const leftMatrix = new THREE.Matrix4();
            leftMatrix.makeRotationZ(leftRotZ);
            leftMatrix.multiply(new THREE.Matrix4().makeRotationX(leftRotX));
            leftMatrix.multiply(new THREE.Matrix4().makeRotationY(leftRotY));
            leftMatrix.setPosition(leftX, leftY, leftZ);

            const mirrorMatrix = new THREE.Matrix4().makeScale(-1, 1, 1);

            const rightMatrix = new THREE.Matrix4();
            rightMatrix.makeRotationZ(rightRotZ);
            rightMatrix.multiply(new THREE.Matrix4().makeRotationX(rightRotX));
            rightMatrix.multiply(new THREE.Matrix4().makeRotationY(rightRotY));
            rightMatrix.setPosition(rightX, rightY, rightZ);

            const halfCount = Math.floor(count / 2);

            for (let i = 0; i < halfCount; i++) {
                sampler.sample(tempPosition);
                // Apply Mirror -> Transform -> Scale
                tempVector.copy(tempPosition).applyMatrix4(mirrorMatrix).applyMatrix4(leftMatrix);
                positions[i * 3] = tempVector.x * scale;
                positions[i * 3 + 1] = tempVector.y * scale;
                positions[i * 3 + 2] = tempVector.z * scale;
            }

            for (let i = halfCount; i < count; i++) {
                sampler.sample(tempPosition);
                tempVector.copy(tempPosition).applyMatrix4(rightMatrix);
                positions[i * 3] = tempVector.x * scale;
                positions[i * 3 + 1] = tempVector.y * scale;
                positions[i * 3 + 2] = tempVector.z * scale;
            }
        }
        return positions;
    }, [obj, count, scale, leftX, leftY, leftZ, leftRotX, leftRotY, leftRotZ, rightX, rightY, rightZ, rightRotX, rightRotY, rightRotZ]);

    useFrame(() => {
        if (!meshRef.current) return;

        const dummy = new THREE.Object3D();
        for (let i = 0; i < count; i++) {
            dummy.position.set(
                handPositions[i * 3],
                handPositions[i * 3 + 1],
                handPositions[i * 3 + 2]
            );
            dummy.scale.setScalar(0.04);
            dummy.updateMatrix();
            meshRef.current.setMatrixAt(i, dummy.matrix);
        }
        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]} frustumCulled={false}>
            <dodecahedronGeometry args={[particleSize, 0]} />
            <meshStandardMaterial color="#4ade80" emissive="#4ade80" emissiveIntensity={0.6} toneMapped={false} />
        </instancedMesh>
    );
}
