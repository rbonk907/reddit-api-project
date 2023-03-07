import styles from './PostList.module.css';
import Post from './Post';
import { fetchPosts, PostsState, selectPosts, selectPostsLoading } from './postsSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { BsChatSquare } from 'react-icons/bs';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface PostListProps {
    posts: PostsState["posts"]
}

const displayPosts = (isLoading: boolean, posts: PostsState["posts"]) => {
    if (isLoading) {
        
        return (
            <>
                <LoadingPost />
                <LoadingPost />
                <LoadingPost />
                <LoadingPost />
                <LoadingPost />
            </>
        );
    }

    const postsArray = Object.values(posts).map(post => {
        return (<Post key={post.id} post={post} />);
    });
    return postsArray;
}

export default function PostList() {
    const isLoading = useAppSelector(selectPostsLoading);
    const posts = useAppSelector(selectPosts);
    const dispatch = useAppDispatch();
    const { subreddit, filter } = useParams();

    // useEffect(() => {
    //     window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    // })

    useEffect(() => {
        if (subreddit && !filter) {
            dispatch(fetchPosts({name: subreddit, filter: 'hot'}));
        } else if (subreddit && filter) {
            dispatch(fetchPosts({name: subreddit, filter: filter}));
        } else {
            dispatch(fetchPosts({name: 'embedded', filter: 'hot'}));
        }
    }, [dispatch, subreddit, filter])
   
    return (
        <div className={styles.postList}>
            <ul>
                {displayPosts(isLoading, posts)}
            </ul>
            
        </div>
    );
}


function LoadingPost() {

    return (
        <div className={styles.postLoading}>
                <div className={styles.postHeader}>
                    <span>
                        Posted by <span className={styles.user}></span>
                    </span>
                    <div className={styles.loadingTitle}></div>
                </div>
                
                <div className={styles.comments}>
                    <BsChatSquare />
                    <span>Comments</span>
                </div>
        </div>
    );
}

