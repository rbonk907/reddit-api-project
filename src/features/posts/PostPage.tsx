import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchPosts, selectPosts } from "./postsSlice";
import styles from './PostPage.module.css';
import { BsChatSquare, BsArrowLeftShort } from 'react-icons/bs';
import ReactMarkdown from 'react-markdown';
import { useEffect } from "react";
import { fetchComments } from "../comments/commentsSlice";
import CommentList from "../comments/CommentList";

export default function PostPage() {
    const dispatch = useAppDispatch();
    const { subreddit, filter, postID } = useParams();
    const posts = useAppSelector(selectPosts);
    const post = postID ? posts[postID] : null;

    const hasImage = post ? post.post_hint === "image" : false;

    const navigate = useNavigate();

    useEffect(() => {
        if(!Object.keys(posts).length) {
            console.log("Fetching posts...");
            subreddit && filter && 
            dispatch(fetchPosts({name: subreddit, filter: filter}));
        }

        
        post && dispatch(fetchComments(post.permalink))
        
        
    }, [dispatch, posts, post]);

    const handleBackButton = () => {
        navigate(-1);
    }
    
    return (
        <div className={styles.postPage}>
            <div className={styles.navigation}>
                <button onClick={handleBackButton}><BsArrowLeftShort /> Go Back</button>
            </div>
            <div className={`${styles.postContainer} ${styles.boxShadow}`}>
                <div className={styles.postPreview}>
                    <span>Posted by u/{post?.author}</span>
                    { post && <h3><ReactMarkdown>{post.title}</ReactMarkdown></h3> }
                    <div className={styles.textPreview}>
                        { post && <ReactMarkdown>{post.selftext}</ReactMarkdown> }
                        <div className={hasImage ? styles.imageContainer: ''}>
                            { hasImage ? <img src={post?.url} alt="Post" /> : ''}
                        </div>
                    </div>
                </div>
                <div className={styles.commentBar}>
                    <div className={styles.comments}>
                        <BsChatSquare />
                        <span>{post?.num_comments} Comments</span>
                    </div>
                </div>
            </div>
            
            <CommentList postID={postID} />
            
        </div>
        
    );
}