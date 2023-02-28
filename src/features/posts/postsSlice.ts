import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

export interface PostsState {
    embedded: { [key: string]: { [key: string]: string | boolean | number,
                                 id: string,
                                 selftext: string,
                                 title: string,
                                 permalink: string } };
    isLoading: boolean;
    loadingFailed: boolean;
}

const initialState: PostsState = {
    embedded: {},
    isLoading: false,
    loadingFailed: false
}

export interface ListingChildren {
    data: { 
            id: string,
            selftext: string,
            title: string,
            permalink: string,
            author: string,
            body: string,
            created_utc: number,
            num_comments: number,
            score: number,
            thumbnail: string,
            thumbnail_height: number,
            thumbnail_width: number,
            replies: { data: { children: ListingChildren[] } } | "" };
    kind: string
}

/* create an async thunk for fetching reddit posts. The async function
 * should accept an object of params for building a fetch request 
 */
export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async () => {
        const response = await fetch('https://www.reddit.com/r/embedded.json');
        const json = await response.json();
        // console.log(json);
        return json;
    }
)

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.isLoading = true;
                state.loadingFailed = false;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                const posts: ListingChildren[] = action.payload.data.children;
                posts.forEach(post => {
                    state.embedded[post.data.id] = {
                        id: post.data.id,
                        author: post.data.author,
                        title: post.data.title,
                        selftext: post.data.selftext,
                        createdUTC: post.data.created_utc,
                        numOfComments: post.data.num_comments,
                        score: post.data.score,
                        thumbnail: post.data.thumbnail,
                        thumbnailHeight: post.data.thumbnail_height,
                        thumbnailWidth: post.data.thumbnail_width,
                        permalink: post.data.permalink
                    };
                });
                state.isLoading = false;
                state.loadingFailed = false;
            })
            .addCase(fetchPosts.rejected, (state) => {
                state.isLoading = false;
                state.loadingFailed = true;
            })
    },
});

export const selectPosts = (state: RootState) => state.posts;

export default postsSlice.reducer;