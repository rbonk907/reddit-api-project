import { NavLink, useParams } from "react-router-dom";
import styles from "./FilterBar.module.css";
import { MdLocalFireDepartment, MdLeaderboard, MdOutlineAutoAwesome } from "react-icons/md";

interface FilterBarProps {
    handleClick: (subreddit: string, filter: string) => void;
}

export default function FilterBar({ handleClick }: FilterBarProps) {
    const { subreddit } = useParams();

    return (
        <div className={`${styles.filterBar} ${styles.boxShadow}`}>
            <NavLink 
                to={ subreddit ? `${subreddit}/hot/` : '/'}
                onClick={subreddit ? () => handleClick(subreddit, 'hot') : undefined }
                className={({ isActive }) => isActive ? styles.linkActive : undefined} >
                <div className={styles.icon}>
                    <MdLocalFireDepartment />
                </div>
                <span>Hot</span>
            </NavLink>
            <NavLink 
                to={ subreddit ? `${subreddit}/new/` : 'new/'}
                onClick={subreddit ? () => handleClick(subreddit, 'new') : undefined }
                className={({ isActive }) => isActive ? styles.linkActive : undefined} >
                <div className={styles.icon}><MdOutlineAutoAwesome /></div>
                <span>New</span>
            </NavLink>
            <NavLink 
                to={ subreddit ? `${subreddit}/top/` : 'top/'}
                onClick={subreddit ? () => handleClick(subreddit, 'top') : undefined }
                className={({ isActive }) => isActive ? styles.linkActive : undefined} >
                <div className={styles.icon}><MdLeaderboard /></div>
                <span>Top</span>
            </NavLink>
        </div>
    )
}