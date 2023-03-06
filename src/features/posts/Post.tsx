import styles from './Post.module.css';
import { BsChatSquare } from 'react-icons/bs';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ListingChildren  } from './postsSlice';


interface PostProps {
    post: ListingChildren["data"]   
}

export default function Post({ post }: PostProps) {
    const navigate = useNavigate();
    let location = useLocation();

    const hasImage = post.post_hint === "image";

    const handleClick = () => {
        navigate(`posts/${post.id}`, {state: { backgroundlocation: location }});
    }
    
    return (
        <li className={`${styles.post} ${styles.boxShadow}`} onClick={handleClick}>
            
                <div className={styles.postContainer}>
                    <div className={styles.postPreview}>
                        <span>Posted by u/{post.author}</span>
                        <h3><ReactMarkdown>{post.title}</ReactMarkdown></h3>
                        <div className={hasImage ? `${styles.textPreview} ${styles.imagePreview}` : `${styles.textPreview}`}>
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.selftext}</ReactMarkdown>
                            <div className={styles.imageContainer}>
                                { hasImage ? <img src={post.url} alt="Post" /> : ''}
                            </div>
                            
                        </div>
                    </div>
                    <div className={styles.commentBar}>
                        <div className={styles.comments}>
                            <BsChatSquare />
                            <span>{post.num_comments} Comments</span>
                        </div>
                    </div>
                </div>
           
        </li>
    );
}