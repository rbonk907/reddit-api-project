import { useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectPosts } from "./postsSlice";
import styles from './PostPage.module.css';
import { BsChatSquare } from 'react-icons/bs';
import ReactMarkdown from 'react-markdown';

export default function PostPage() {
    const { postID } = useParams();
    const posts = useAppSelector(selectPosts);
    const post = postID ? posts.embedded[postID] : undefined;
    
    return (
        <div className={styles.postContainer}>
            <div className={styles.postPreview}>
                <span>Posted by u/{post?.author}</span>
                { post ? <h3><ReactMarkdown>{post.title}</ReactMarkdown></h3> : <h3>Error</h3>}
                <div className={styles.textPreview}>
                    { post ? <ReactMarkdown>{post.selftext}</ReactMarkdown> : <>Error</>}
                </div>
            </div>
            <div className={styles.commentBar}>
                <div className={styles.comments}>
                    <BsChatSquare />
                    <span>{post?.numOfComments} Comments</span>
                </div>
            </div>
        </div>
    );
}