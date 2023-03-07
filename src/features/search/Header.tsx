import styles from './Header.module.css';
import { BsReddit } from 'react-icons/bs';

export default function Header() {
    return (
        <div className={styles.header}>
            <div className={styles.headerContent}>
                <div className={styles.logo}>
                    <BsReddit />
                    <h1 className={styles.title}>+ Redux</h1>
                </div>
            </div>
        </div>
    )
}