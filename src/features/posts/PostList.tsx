import styles from './PostList.module.css';
import Post from './Post';
import { PostsState, selectPostsLoading } from './postsSlice';
import { useAppSelector } from '../../app/hooks';
import { BsChatSquare } from 'react-icons/bs';
import { useEffect } from 'react';

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

export default function PostList({ posts }: PostListProps) {
    const isLoading = useAppSelector(selectPostsLoading);
    
    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    })
   
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

