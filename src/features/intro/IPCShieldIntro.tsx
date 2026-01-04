'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useState, useEffect } from 'react';
import { Html, Loader, PerspectiveCamera } from '@react-three/drei';
import { gsap } from 'gsap';
import { IntroParticles } from '@/features/intro/IntroParticles';
import { IntroShield } from '@/features/intro/IntroShield';
import styles from './intro.module.css';

export function IPCShieldIntro({ onComplete }: { onComplete?: () => void }) {
    const [complete, setComplete] = useState(false);
    const [isStarted, setIsStarted] = useState(false);

    // Auto-hide when sequence finishes
    const handleComplete = () => {
        console.log("Intro sequence complete, hiding overlay.");
        setComplete(true);
        if (onComplete) onComplete();
    };

    useEffect(() => {
        console.log("IPCShieldIntro mounted");
        setIsStarted(true);
        // Lock scroll
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    useEffect(() => {
        if (complete) {
            document.body.style.overflow = '';
        }
    }, [complete]);

    if (complete && isStarted) return null;

    return (
        <div
            className={`${styles.container} ${complete ? styles.hidden : ''}`}
            style={{ zIndex: 99999 }} // Extra safe
        >
            <Canvas className={styles.canvas} gl={{ antialias: true, alpha: true }}>
                <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={1} />

                <Suspense fallback={<Html center><div className={styles.loadingWrap}>Initialising IPC...</div></Html>}>
                    <IntroScene onComplete={handleComplete} />
                </Suspense>
            </Canvas>

            {!complete && (
                <button className={styles.skipButton} onClick={handleComplete}>
                    Skip Intro
                </button>
            )}
        </div>
    );
}

function IntroScene({ onComplete }: { onComplete?: () => void }) {
    const [timeline] = useState(() => gsap.timeline({
        paused: true,
        onComplete: () => {
            onComplete?.();
        }
    }));

    useEffect(() => {
        const ctx = gsap.context(() => {
            timeline.play();
        });
        return () => ctx.revert();
    }, [timeline]);

    return (
        <group>
            <IntroParticles timeline={timeline} />
            <IntroShield timeline={timeline} />
        </group>
    );
}
