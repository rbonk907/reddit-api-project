import { useParams } from "react-router-dom"
import { useAppSelector } from "../../app/hooks";
import { selectComments } from "./commentsSlice";
import { Comment } from "./commentsSlice";
import CommentComp from "./CommentComp";
import styles from "./CommentList.module.css";

interface CommentListProps {
    postID?: string
}

const displayComment = (comment: Comment, index: number) => {
    if (!comment.replies) {
        return (
            <CommentComp key={comment.id} comment={comment} index={index}/>
        );
    }
    ++index;
    const commentList: JSX.Element[] = comment.replies.map(reply => {
        return (
            <div key={reply.id}>
                {displayComment(reply, index)}
            </div>
        )
            
        
    })

    return (
        <div>
            <CommentComp key={comment.id} comment={comment} index={index - 1}/>
            <div className={styles.commentThread} style={{paddingLeft: 32}}>
                {commentList}
            </div>
            
        </div>
    );

    //return (<div>{displayComment(comment.replies[0])}</div>);
}

export default function CommentList({ postID }: CommentListProps) {
    const comments = useAppSelector(selectComments);
    const postComments = postID ? comments.comments[postID] : [];

    return (
        <div className={styles.commentList}>
            <div>
                {postComments && postComments.map(comment => {
                   return (
                    <div key={comment.id}>
                        {displayComment(comment, 0)}
                    </div>
                   ) 
                })}
            </div>
        </div>
    );
}