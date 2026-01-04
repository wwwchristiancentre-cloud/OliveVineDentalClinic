import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <Link href="/">OLIVE VINE</Link>
            </div>
            <div className={styles.links}>
                <Link href="/about" className={styles.link}>Our Story</Link>
                <Link href="/services" className={styles.link}>Services</Link>
                <Link href="/booking" className={styles.link}>Contact</Link>
            </div>
            <Link href="/booking">
                <button className={styles.button}>Book Now</button>
            </Link>
        </nav>
    );
}
