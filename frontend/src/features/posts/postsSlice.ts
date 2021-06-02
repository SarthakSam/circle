import { createSlice, createAsyncThunk, PayloadAction, AnyAction  } from '@reduxjs/toolkit';
import { IPost, IPostsResponse } from './posts.type';
import { RootState } from '../../app/store';
import { SUCCESS, LOADING, ERROR } from '../../app.constants';
import axios from 'axios';
import { getURL } from '../../api.config';

export type IPostsState = {
    data: IPost[]
    status: 'IDLE' | 'LOADING' | 'SUCCESS' | 'ERROR';
}

export const initialState: IPostsState = {
    data: new Array<IPost>(0),
    status: 'IDLE'
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const resp = await axios.get< IPostsResponse>( getURL('fetchPosts') );
    return resp.data.posts;
});

export const createPost = createAsyncThunk('posts/createPost', async (body: string) => {
    const resp = await axios.post( getURL('createPost'), { content: body }  );
    return resp.data.post;
});

export function isPendingPostAction(action: AnyAction) {
    return action.type === fetchPosts.pending || action.type === createPost.pending;
}

export function isRejectedPostAction(action: AnyAction) {
    return action.type === fetchPosts.rejected || action.type === createPost.rejected;
}

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
     
    },
    extraReducers: (builder) => {
        builder
            // .addCase(fetchPosts.pending, (state: typeof initialState) => {
            //     state.status = LOADING;
            // })
            .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<IPost[]>) => {
                // console.log(state);
                state.data = action.payload;
                state.status = SUCCESS;
            })
            // .addCase(fetchPosts.rejected, (state) => {
            //     state.status = ERROR;
            // })
            // .addCase(createPost.pending, (state: typeof initialState) => {
            //     state.status = LOADING;
            // })
            .addCase(createPost.fulfilled, (state, action: PayloadAction<IPost>) => {
                // console.log(state);
                state.data.push(action.payload);
                state.status = SUCCESS;
            })
            // .addCase(createPost.rejected, (state) => {
            //     state.status = ERROR;
            // })
            .addMatcher(isPendingPostAction, (state) => {
                state.status = LOADING;
            })
            .addMatcher(isRejectedPostAction, (state) => {
                state.status = ERROR;
            });
    }
});

export const selectPostsState = (state: RootState) => state.posts;

export default postsSlice.reducer;