import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchPosts, selectPosts } from "./postsSlice";
import styles from './PostPage.module.css';
import { BsChatSquare } from 'react-icons/bs';
import ReactMarkdown from 'react-markdown';
import { useEffect } from "react";
import { fetchComments } from "../comments/commentsSlice";
import CommentList from "../comments/CommentList";

export default function PostPage() {
    const dispatch = useAppDispatch();
    const { subreddit, filter, postID } = useParams();
    const posts = useAppSelector(selectPosts);
    const post = postID ? posts[postID] : null;

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
                <button onClick={handleBackButton}>Go Back</button>
            </div>
            <div className={styles.postContainer}>
                <div className={styles.postPreview}>
                    <span>Posted by u/{post?.author}</span>
                    { post && <h3><ReactMarkdown>{post.title}</ReactMarkdown></h3> }
                    <div className={styles.textPreview}>
                        { post && <ReactMarkdown>{post.selftext}</ReactMarkdown> }
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