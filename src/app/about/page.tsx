import Navbar from '@/components/Navbar';
import styles from './page.module.css';

export default function About() {
    return (
        <main>
            <Navbar />

            {/* Editorial Hero */}
            <section className={styles.hero}>
                <div className={styles.imageSide}>
                    <div className={styles.placeholderImage}>
                        [Portrait: Dr. Emmanuel Oke]
                    </div>
                    <div className={styles.overlayText}>
                        <span className={styles.overlayLabel}>Lead Surgeon & Pastor</span>
                        <h1 className={styles.overlayTitle}>Dr. Emmanuel Oke</h1>
                    </div>
                    <div className={styles.gradient}></div>
                </div>

                <div className={styles.textSide}>
                    <span className={styles.quote}>"To heal is to serve."</span>
                    <p className={styles.bioText}>
                        Medicine treats the body, but true healing touches the spirit. At Olive Vine, we believe in a holistic
                        approach where clinical excellence is delivered with the compassion of a shepherd.
                    </p>
                    <div className={styles.credentials}>
                        <div>
                            <h3 className={styles.credTitle}>Clinical</h3>
                            <p className={styles.credDesc}>Head of Clinical Services,<br />Karshi General Hospital</p>
                        </div>
                        <div>
                            <h3 className={styles.credTitle}>Spiritual</h3>
                            <p className={styles.credDesc}>Pastor,<br />Winning Worship Way</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Scrollytelling Timeline */}
            <section className={styles.timelineSection}>
                <h2 className={styles.timelineTitle}>The Journey</h2>
                <div className={styles.timelineList}>
                    {/* Item 1 */}
                    <div className={styles.timelineItem}>
                        <div className={styles.timelineMarker}></div>
                        <span className={styles.timelineLabel}>The Foundation</span>
                        <h3 className={styles.timelineHeading}>Maitama District Hospital</h3>
                        <p className={styles.timelineDesc}>
                            Where the rigorous standards of surgical precision were forged in a high-volume trauma environment.
                        </p>
                    </div>
                    {/* Item 2 */}
                    <div className={styles.timelineItem}>
                        <div className={`${styles.timelineMarker} ${styles.markerWhite}`}></div>
                        <span className={styles.timelineLabel}>The Leadership</span>
                        <h3 className={styles.timelineHeading}>Karshi General Hospital</h3>
                        <p className={styles.timelineDesc}>
                            Leading clinical services and implementing the IPC protocols that would become the gold standard.
                        </p>
                    </div>
                    {/* Item 3 */}
                    <div className={styles.timelineItem}>
                        <div className={`${styles.timelineMarker} ${styles.markerPulse}`}>
                            <div className={styles.innerDot}></div>
                        </div>
                        <span style={{ color: 'var(--gold-DEFAULT)' }} className={styles.timelineLabel}>The Vision</span>
                        <h3 className={styles.timelineHeading}>Olive Vine Dental</h3>
                        <p style={{ color: 'var(--gray-300)', fontSize: '1.125rem' }} className={styles.timelineDesc}>
                            A sanctuary where cutting-edge dentistry meets the warmth of home.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
