import styles from './Post.module.css';
import { BsChatSquare } from 'react-icons/bs';
import ReactMarkdown from 'react-markdown';

interface PostProps {
    post: {
        [key: string]: string | boolean | number,
        id: string,
        selftext: string
    }   
}

export default function Post({ post }: PostProps) {

    return (
        <li className={styles.post}>
            <div className={styles.postContainer}>
                <div className={styles.postPreview}>
                    <span>Posted by u/{post.author}</span>
                    <h3>{post.title}</h3>
                    <div className={styles.textPreview}>
                        <ReactMarkdown>{post.selftext}</ReactMarkdown>
                    </div>
                </div>
                <div className={styles.commentBar}>
                    <div className={styles.comments}>
                        <BsChatSquare />
                        <span>{post.numOfComments} Comments</span>
                    </div>
                </div>
            </div>
        </li>
    );
}