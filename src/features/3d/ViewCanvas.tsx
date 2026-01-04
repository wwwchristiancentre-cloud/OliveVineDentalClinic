'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, Float } from '@react-three/drei';

interface WrapperProps {
    children: React.ReactNode;
    className?: string;
}

export default function ViewCanvas({ children, className }: WrapperProps) {
    return (
        <Canvas className={className} camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 2]}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                {children}
            </Float>
            <Environment files="/potsdamer_platz_1k.hdr" />
        </Canvas>
    );
}
