import styles from './Post.module.css';
import { BsChatSquare } from 'react-icons/bs';
import ReactMarkdown from 'react-markdown';
import { Link, useLocation, useNavigate } from 'react-router-dom';


interface PostProps {
    post: {
        [key: string]: string | boolean | number,
        id: string,
        selftext: string,
        title: string
    }   
}

export default function Post({ post }: PostProps) {
    const navigate = useNavigate();
    let location = useLocation();

    const handleClick = () => {
        navigate(`posts/${post.id}`, {state: { backgroundlocation: location }});
    }
    
    return (
        <li className={styles.post} onClick={handleClick}>
            
                <div className={styles.postContainer}>
                    <div className={styles.postPreview}>
                        <span>Posted by u/{post.author}</span>
                        <h3><ReactMarkdown>{post.title}</ReactMarkdown></h3>
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