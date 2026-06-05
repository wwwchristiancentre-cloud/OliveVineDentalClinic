'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

import Navbar from '@/components/Navbar';
import { getDynamicWhatsAppLink } from '@/config/constants';
import ViewCanvas from '@/features/3d/ViewCanvas';
import Jaw from '@/features/3d/Jaw';
import Tooth from '@/features/3d/Tooth';
import Shield from '@/features/3d/Shield';
import styles from './page.module.css';

export default function Services() {
    const [activeSection, setActiveSection] = useState<number>(1);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const whatsAppLink = getDynamicWhatsAppLink();

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const sections = container.querySelectorAll('.service-section');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = parseInt(entry.target.getAttribute('data-section') || '1', 10);
                        setActiveSection(index);
                    }
                });
            },
            {
                root: container,
                threshold: 0.5, // Trigger when 50% of the section is visible
            }
        );

        sections.forEach((sec) => observer.observe(sec));
        return () => observer.disconnect();
    }, []);

    return (
        <main style={{ height: '100vh', overflow: 'hidden' }} className="bg-charcoal text-white">
            <Navbar />

            <div className={styles.container}>
                {/* Fixed 3D Side */}
                <div className={styles.fixedSide}>
                    <ViewCanvas className={styles.fixedSide}>
                        {activeSection === 1 && <Tooth />}
                        {activeSection === 2 && <Shield />}
                        {activeSection === 3 && <Jaw />}
                    </ViewCanvas>
                    <div className={styles.floatingLabel}>
                        {activeSection === 1 && "← Viewing: Pristine Molar Crown"}
                        {activeSection === 2 && "← Viewing: Smile Artistry Shield"}
                        {activeSection === 3 && "← Viewing: Precision Implant Scaffold"}
                    </div>
                </div>

                {/* Scrollable Content Side */}
                <div 
                    ref={scrollContainerRef} 
                    className={`${styles.scrollSide} scrollSide-container`}
                >
                    {/* Section 1 */}
                    <section 
                        className={`${styles.section} service-section`} 
                        data-section="1"
                    >
                        <span className={styles.label}>01. Function</span>
                        <h2 className={styles.heading}>General Dentistry</h2>
                        <p className={styles.desc}>
                            The foundation of oral health. From ultrasonic cleanings to precision fillings, we maintain the
                            integrity of your smile using minimally invasive techniques.
                        </p>
                        <ul className={styles.list}>
                            <li>• Routine Hygiene & Exams</li>
                            <li>• Root Canal Therapy</li>
                            <li>• Composite Fillings</li>
                        </ul>
                    </section>

                    {/* Section 2 */}
                    <section 
                        className={`${styles.section} ${styles.bgGray} service-section`} 
                        data-section="2"
                    >
                        <span className={styles.label}>02. Aesthetics</span>
                        <h2 className={styles.heading}>Cosmetic Design</h2>
                        <p className={styles.desc}>
                            Artistry meets anatomy. We design smiles that complement your facial structure, using ultra-thin
                            veneers and professional whitening systems.
                        </p>
                        <div className={styles.buttons}>
                            <Link href="/booking" className={styles.btnPrimary}>Book Consultation</Link>
                            <a
                                href={whatsAppLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.btnLink}
                            >
                                Ask About Pricing
                            </a>
                        </div>
                    </section>

                    {/* Section 3 */}
                    <section 
                        className={`${styles.section} ${styles.bgDark} service-section`} 
                        data-section="3"
                    >
                        <span className={styles.label}>03. Reconstruction</span>
                        <h2 className={styles.heading}>Dental Implants</h2>
                        <p className={styles.desc}>
                            Permanent solutions for missing teeth. We use computer-guided surgery to place titanium implants
                            with sub-millimeter accuracy.
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}
