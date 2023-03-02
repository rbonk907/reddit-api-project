import { NavLink } from "react-router-dom";
import styles from "./FilterBar.module.css";
import { MdLocalFireDepartment, MdLeaderboard, MdOutlineAutoAwesome } from "react-icons/md";


export default function FilterBar() {

    return (
        <div className={`${styles.filterBar} ${styles.boxShadow}`}>
            <NavLink to="/">
                <div className={styles.icon}><MdLocalFireDepartment /></div>
                <span>Hot</span>
            </NavLink>
            <NavLink to="/">
                <div className={styles.icon}><MdOutlineAutoAwesome /></div>
                <span>New</span>
            </NavLink>
            <NavLink to="/">
                <div className={styles.icon}><MdLeaderboard /></div>
                <span>Top</span>
            </NavLink>
        </div>
    )
}