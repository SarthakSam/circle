import { createSlice, createAsyncThunk, PayloadAction  } from '@reduxjs/toolkit';
import { getPosts } from './postsAPI';
import { IPost } from './posts.type';
import { RootState } from '../../app/store';
import { SUCCESS, LOADING, ERROR } from '../../app.constants';

export type IPostsState = {
    data: IPost[]
    status: 'IDLE' | 'LOADING' | 'SUCCESS' | 'ERROR';
}

export const initialState: IPostsState = {
    data: new Array<IPost>(0),
    status: 'IDLE'
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const resp = await getPosts();
    return resp.data;
});


export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state: typeof initialState) => {
                state.status = LOADING;
            })
            .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<IPost[]>) => {
                // console.log(state);
                state.data = action.payload;
                state.status = SUCCESS;
            })
            .addCase(fetchPosts.rejected, (state) => {
                state.status = ERROR;
            });
    }
});

export const selectPostsState = (state: RootState) => state.posts;

export default postsSlice.reducer;