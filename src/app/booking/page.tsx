import Navbar from '@/components/Navbar';
import styles from './page.module.css';

export default function Booking() {
    return (
        <div className={styles.page}>
            <Navbar />
            <div className={styles.card}>

                {/* Info Side */}
                <div className={styles.infoSide}>
                    <div>
                        <h2 className={styles.title}>Schedule Visit</h2>
                        <p className={styles.subtitle}>Select a time that works for you. Our team will confirm shortly.</p>

                        <div className={styles.checklist}>
                            <div className={styles.checkItem}>
                                <span className={styles.checkIcon}>✓</span>
                                Consultation (30m)
                            </div>
                            <div className={styles.checkItem}>
                                <span className={styles.dotIcon}></span>
                                Dr. Emmanuel Oke
                            </div>
                        </div>
                    </div>

                    <div className={styles.noteSection}>
                        <p className={styles.noteLabel}>Hours Note</p>
                        <p className={styles.noteText}>
                            We are closed on <span className={styles.goldText}>Sundays</span>. <br />
                            Wednesday appointments end at 4:00 PM.
                        </p>
                    </div>
                </div>

                {/* Calendar Side */}
                <div className={styles.calendarSide}>
                    <div className={styles.calHeader}>
                        <h3 className={styles.monthTitle}>January 2026</h3>
                        <div className={styles.navBtns}>
                            <button className={styles.navBtn}>←</button>
                            <button className={styles.navBtn}>→</button>
                        </div>
                    </div>

                    <div className={styles.daysGrid}>
                        <span className={styles.dayLabel}>Mon</span>
                        <span className={styles.dayLabel}>Tue</span>
                        <span className={styles.dayLabel}>Wed</span>
                        <span className={styles.dayLabel}>Thu</span>
                        <span className={styles.dayLabel}>Fri</span>
                        <span className={styles.dayLabel}>Sat</span>
                        <span className={`${styles.dayLabel} ${styles.sundayLabel}`}>Sun</span>

                        {/* Week Example */}
                        <button className={`${styles.dayBtn} ${styles.dayDisabled}`}>29</button>
                        <button className={styles.dayBtn}>30</button>
                        <button className={styles.dayBtn}>31</button>
                        <button className={`${styles.dayBtn} ${styles.daySelected}`}>1</button>
                        <button className={styles.dayBtn}>2</button>
                        <button className={styles.dayBtn}>3</button>
                        <button className={`${styles.dayBtn} ${styles.daySunday}`}>4</button>
                    </div>

                    <h4 className={styles.timeTitle}>Available Times</h4>
                    <div className={styles.timeGrid}>
                        <button className={styles.timeBtn}>09:00 AM</button>
                        <button className={`${styles.timeBtn} ${styles.timeSelected}`}>10:00 AM</button>
                        <button className={styles.timeBtn}>11:30 AM</button>
                        <button className={`${styles.timeBtn} ${styles.timeDisabled}`}>02:00 PM</button>
                    </div>

                    <button className={styles.confirmBtn}>Confirm Booking</button>
                </div>

            </div>
        </div>
    );
}
