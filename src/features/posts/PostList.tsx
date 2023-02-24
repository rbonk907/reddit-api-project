import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectPosts, fetchPosts } from './postsSlice';
import { useEffect } from 'react';
import styles from './PostList.module.css';
import Post from './Post';


export function PostList() {
    const posts = useAppSelector(selectPosts);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);
    

    return (
        <div className={styles.postList}>
            <ul>
                { Object.values(posts.embedded).map(post => {
                    return (
                        <Post key={post.id} post={post} />
                    );
                })}
            </ul>
            
        </div>
    );
}