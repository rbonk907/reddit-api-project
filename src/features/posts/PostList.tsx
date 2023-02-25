import styles from './PostList.module.css';
import Post from './Post';
import { PostsState } from './postsSlice';

interface PostListProps {
    posts: PostsState
}

export function PostList({ posts }: PostListProps) {
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