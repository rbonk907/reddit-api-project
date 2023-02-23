import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectPosts, fetchPosts } from './postsSlice';


import { useEffect } from 'react';
import styles from './PostList.module.css';


export function PostList() {
    const posts = useAppSelector(selectPosts);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);
    

    return (
        <div>
            <h1>Post List Goes Here...</h1>
            <ul>
                { Object.values(posts.embedded).map(post => {
                    return (
                        <li key={post.id}>
                            <h3>{post.title}</h3>
                            <p>{post.author}</p>
                        </li>
                    );
                })}
            </ul>
            
        </div>
    );
}