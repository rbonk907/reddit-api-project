import { Comment } from "./commentsSlice";
import styles from "./CommentComp.module.css";

interface CommentCompProps {
    comment: Comment;
    index: number;
}

export default function CommentComp({ comment, index }: CommentCompProps) {
    
    
    return (
            <div className={styles.commentContainer}>
                <div style={{paddingLeft: 16 + index*21}}>
                    <p>{comment.author}</p>
                    <p>{comment.body}</p>
                </div>
            </div>
    );
    
}