import { useParams } from "react-router-dom"
import { useAppSelector } from "../../app/hooks";
import { selectComments } from "./commentsSlice";
import { Comment } from "./commentsSlice";
import CommentComp from "./CommentComp";

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
        return displayComment(reply, index);
            
        
    })

    return (
        <>
            <CommentComp key={comment.id} comment={comment} index={index - 1}/>
            {commentList}
        </>
    );

    //return (<div>{displayComment(comment.replies[0])}</div>);
}

export default function CommentList({ postID }: CommentListProps) {
    const comments = useAppSelector(selectComments);
    const postComments = postID ? comments.comments[postID] : [];

    return (
        <div>
            <div>
                {postComments && postComments.map(comment => displayComment(comment, 0))}
            </div>
        </div>
    );
}