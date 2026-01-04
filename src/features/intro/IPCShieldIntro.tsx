'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useState, useEffect } from 'react';
import { Html, Loader, PerspectiveCamera } from '@react-three/drei';
import { gsap } from 'gsap';
import { IntroParticles } from '@/features/intro/IntroParticles';
import { IntroShield } from '@/features/intro/IntroShield';
import styles from './intro.module.css';

export function IPCShieldIntro({ onComplete }: { onComplete?: () => void }) {
    const [isFading, setIsFading] = useState(false); // Triggers CSS fade out
    const [complete, setComplete] = useState(false); // Removes from DOM
    const [isStarted, setIsStarted] = useState(false);

    // Auto-hide when sequence finishes
    const handleComplete = () => {
        console.log("Intro sequence complete, starting fade out.");
        setIsFading(true);

        // Wait for CSS transition (1.5s) before unmounting
        setTimeout(() => {
            console.log("Fade out complete, unmounting.");
            setComplete(true);
            if (onComplete) onComplete();
        }, 1500);
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

    if (complete) return null;

    return (
        <div
            className={`${styles.container} ${isFading ? styles.hidden : ''}`}
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

            {!isFading && (
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
            // Trigger exit transition exactly when the shield starts expanding (6.5s)
            // This creates a "Dissolve to Content" effect rather than "Fade to Black -> Reveal".
            timeline.call(() => {
                console.log("Timeline Trigger: Start Page Reveal");
                onComplete?.();
            }, [], 6.5);

            timeline.play();
        });
        return () => ctx.revert();
    }, [timeline, onComplete]);

    return (
        <group>
            <IntroParticles timeline={timeline} />
            <IntroShield timeline={timeline} />
        </group>
    );
}
