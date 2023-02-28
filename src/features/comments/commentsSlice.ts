import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { ListingChildren } from '../posts/postsSlice';

export interface Comment {
    id: string;
    author: string;
    body: string;
    createdAt: number;
    replies: Comment[] | null;
}

interface CommentState {
    comments: { [key: string]: Comment[] };
    isLoading: boolean;
    loadingFailed: boolean;
}

const initialState : CommentState = {
    comments: {},
    isLoading: false,
    loadingFailed: false
}

const handleCommentObj = (comment: ListingChildren) => {
    // if the replies member is an empty string, return
    // a comment object as defined by the interface
    if (!comment.data.replies) {
        return {
            id: comment.data.id,
            author: comment.data.author,
            body: comment.data.body,
            createdAt: comment.data.created_utc,
            replies: null
        };
    }

    // otherwise, call this function again
    const repliesArray : Comment[] = [];
    comment.data.replies.data.children.forEach(reply => {
        repliesArray.push(handleCommentObj(reply));
    });

    return {
        id: comment.data.id,
        author: comment.data.author,
        body: comment.data.body,
        createdAt: comment.data.created_utc,
        replies: repliesArray,
    }
}


/* create an async thunk for fetching reddit comments. For a given
 * reddit post. The async function should accept an object
 * of params for building a fetch request 
 */
export const fetchComments = createAsyncThunk(
    'comments/fetchComments',
    async (baseURL: string) => {
        baseURL = baseURL.slice(0, -1);
        const response = await fetch(`https://www.reddit.com${baseURL}.json`);
        const json = await response.json();
        // console.log(json);
        return json;
    }
)


export const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchComments.pending, (state) => {
                state.isLoading = true;
                state.loadingFailed = false;
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                const postID: string = action.payload[0]
                                                .data.children[0].data.id;
                const comments: ListingChildren[] = action.payload[1]
                                                        .data.children;
                state.comments[postID] = [];
                comments.forEach(comment => {
                    state.comments[postID].push(handleCommentObj(comment));
                });

                state.isLoading = false;
                state.loadingFailed = false;
            })
            .addCase(fetchComments.rejected, (state) => {
                state.isLoading = false;
                state.loadingFailed = true;
            })
    },
});

export const selectComments = (state: RootState) => state.comments;

export default commentsSlice.reducer;