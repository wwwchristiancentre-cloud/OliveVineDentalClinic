import Link from 'next/link';
import ViewCanvas from '@/features/3d/ViewCanvas';
import Chair from '@/features/3d/Chair';
import Shield from '@/features/3d/Shield';
import Navbar from '@/components/Navbar';
import styles from './page.module.css';

export default function Home() {
  return (
    <main>
      <Navbar />

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.canvasPlaceholder}>
          <div className={styles.canvasCircle} style={{ border: 'none' }}>
            <ViewCanvas className={styles.canvasPlaceholder}><Chair /></ViewCanvas>
          </div>
        </div>

        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Clinical Excellence <br />
            <span className={styles.soulText}>With a Soul</span>
          </h1>
          <p className={styles.heroDesc}>
            Experience Abuja's most advanced dental care in an environment of spiritual calm and medical precision.
          </p>
          <div className={styles.scrollIcon}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Intro / IPC Shield */}
      <section className={styles.intro}>
        <div className={styles.introGrid}>
          <div>
            <span className={styles.label}>Safety First</span>
            <h2 className={styles.sectionTitle}>Your Safety is Our Fortress</h2>
            <p className={styles.introText}>
              Our Infection Prevention and Control (IPC) protocols exceed international standards.
              We treat every instrument with surgical reverence, ensuring a pristine environment for your healing.
            </p>
            <Link href="/about" className={styles.readMore}>
              Read our Protocols <span style={{ marginLeft: '0.5rem' }}>→</span>
            </Link>
          </div>
          <div className={styles.shieldPlaceholder} style={{ background: 'transparent', border: 'none' }}>
            <ViewCanvas className={styles.shieldPlaceholder}><Shield /></ViewCanvas>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className={styles.services}>
        <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
          <div style={{ textAlign: 'center' }}>
            <h2 className={`${styles.sectionTitle} ${styles.servicesTitle}`}>Curated Treatments</h2>
            <p style={{ color: 'var(--gray-600)' }}>Precision procedures tailored to your anatomy.</p>
          </div>

          <div className={styles.servicesGrid}>
            {/* Card 1 */}
            <Link href="/services" className={styles.serviceCard}>
              <h3 className={styles.cardTitle}>Restorative</h3>
              <p className={styles.cardDesc}>
                Implants, crowns, and bridges engineered to restore full function and natural aesthetics.
              </p>
            </Link>
            {/* Card 2 */}
            <Link href="/services" className={styles.serviceCard}>
              <h3 className={styles.cardTitle}>Cosmetic</h3>
              <p className={styles.cardDesc}>
                Veneers and whitening designed to enhance your natural beauty, not mask it.
              </p>
            </Link>
            {/* Card 3 */}
            <Link href="/services" className={styles.serviceCard}>
              <h3 className={styles.cardTitle}>Orthodontics</h3>
              <p className={styles.cardDesc}>
                Alignment solutions including invisible aligners for discreet correction.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
