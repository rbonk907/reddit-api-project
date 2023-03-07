import { Comment } from "./commentsSlice";
import styles from "./CommentComp.module.css";

interface CommentCompProps {
    comment: Comment;
    index: number;
}

export default function CommentComp({ comment, index }: CommentCompProps) {
    
    
    return (
            <div className={styles.commentContainer}>
                
                <div 
                  
                  className={styles.commentBody} >
                    <p className={styles.author}>{comment.author}</p>
                    <p className={styles.bodyText}>{comment.body}</p>
                </div>
            </div>
    );
    
}