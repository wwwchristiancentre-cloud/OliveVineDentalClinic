import styles from './Navbar.module.css';

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>OLIVE VINE</div>
            <div className={styles.links}>
                <a href="#" className={styles.link}>Our Story</a>
                <a href="#" className={styles.link}>Services</a>
                <a href="#" className={styles.link}>Contact</a>
            </div>
            <button className={styles.button}>Book Now</button>
        </nav>
    );
}
