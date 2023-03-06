import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

export interface PostsState {
    posts: { [key: string]: ListingChildren["data"] };
    isLoading: boolean;
    loadingFailed: boolean;
}

const initialState: PostsState = {
    posts: {},
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
            body?: string,
            created_utc: number,
            num_comments: number,
            score: number,
            thumbnail: string,
            thumbnail_height: number,
            thumbnail_width: number,
            post_hint: string,
            url?: string,
            media?: {[key: string]: {}} | null,
            replies?: { data: { children: ListingChildren[] } } | "" };
    kind: string
}

/* create an async thunk for fetching reddit posts. The async function
 * should accept an object of params for building a fetch request 
 */
export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async (subreddit: {name: string, filter: string}) => {
        const { name, filter } = subreddit;
        const response = await fetch(`https://www.reddit.com/r/${name}/${filter}.json`);
        const json = await response.json();
        console.log(json);
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
                const tempObj : PostsState['posts'] = {};
                posts.forEach(post => {
                    tempObj[post.data.id] = {
                        id: post.data.id,
                        author: post.data.author,
                        title: post.data.title,
                        selftext: post.data.selftext,
                        created_utc: post.data.created_utc,
                        num_comments: post.data.num_comments,
                        score: post.data.score,
                        thumbnail: post.data.thumbnail,
                        thumbnail_height: post.data.thumbnail_height,
                        thumbnail_width: post.data.thumbnail_width,
                        permalink: post.data.permalink,
                        media: post.data.media,
                        post_hint: post.data.post_hint,
                        url: post.data.url ? post.data.url : '',
                    };
                });
                state.posts = tempObj;
                state.isLoading = false;
                state.loadingFailed = false;
            })
            .addCase(fetchPosts.rejected, (state) => {
                state.isLoading = false;
                state.loadingFailed = true;
            })
    },
});

export const selectPosts = (state: RootState) => state.posts.posts;
export const selectPostsLoading = (state: RootState) => state.posts.isLoading;

export default postsSlice.reducer;