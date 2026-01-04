import Navbar from '@/components/Navbar';
import ViewCanvas from '@/features/3d/ViewCanvas';
import Jaw from '@/features/3d/Jaw';
import styles from './page.module.css';

export default function Services() {
    return (
        <main style={{ height: '100vh', overflow: 'hidden' }}>
            <Navbar />

            <div className={styles.container}>
                {/* Fixed 3D Side */}
                <div className={styles.fixedSide}>
                    <ViewCanvas className={styles.fixedSide}><Jaw /></ViewCanvas>
                    <div className={styles.floatingLabel}>
                        ← Viewing: Implants
                    </div>
                </div>

                {/* Scrollable Content Side */}
                <div className={styles.scrollSide}>
                    {/* Section 1 */}
                    <section className={styles.section}>
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
                    <section className={`${styles.section} ${styles.bgGray}`}>
                        <span className={styles.label}>02. Aesthetics</span>
                        <h2 className={styles.heading}>Cosmetic Design</h2>
                        <p className={styles.desc}>
                            Artistry meets anatomy. We design smiles that complement your facial structure, using ultra-thin
                            veneers and professional whitening systems.
                        </p>
                        <div className={styles.buttons}>
                            <button className={styles.btnPrimary}>View Gallery</button>
                            <button className={styles.btnLink}>Pricing</button>
                        </div>
                    </section>

                    {/* Section 3 */}
                    <section className={`${styles.section} ${styles.bgDark}`}>
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
