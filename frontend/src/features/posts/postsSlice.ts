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

export const likePost = createAsyncThunk('posts/likePost', async (postId: string) => {
    const resp = await axios.post( getURL('like', {postId}) );
    return {postId, reaction: resp.data.reaction};
});

export const unlikePost = createAsyncThunk('posts/unlikePost', async (postId: string) => {
    const resp = await axios.post( getURL('unlike', {postId}) );
    return {postId, reaction: resp.data.reaction};
});

export const commentOnPost = createAsyncThunk('posts/comment', async ({ postId, commentBody }: { postId: string, commentBody: string }, options) => {
    const resp = await axios.post(getURL('comment', { postId }), { commentBody } );
    const state = options.getState() as RootState;
    console.log(state);
    return { postId, comment: resp.data.comment, author: state.currentUser.data };
} );

export const replyOnComment = createAsyncThunk('posts/reply', async ({ postId, commentId, reply }: { postId: string, commentId: string, reply: string }, options) => {
    const resp = await axios.post(getURL('reply', { postId, commentId }), { reply } );
    const state = options.getState() as RootState;
    console.log(state);
    return { postId, commentId, reply: resp.data.reply, author: state.currentUser.data };
} );

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
            .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<IPost[]>) => {
                state.data = action.payload;
                state.status = SUCCESS;
            })
            .addCase(createPost.fulfilled, (state, action: PayloadAction<IPost>) => {
                state.data.push(action.payload);
                // state.status = SUCCESS;
            })
            .addCase(likePost.fulfilled, (state, action) => {
                // state.status = SUCCESS;
                const post = state.data.find( post => post._id === action.payload.postId );
                post?.reactions.push(action.payload.reaction);
            })
            .addCase(unlikePost.fulfilled, (state, action) => {
                // state.status = SUCCESS;
                const post = state.data.find( post => post._id === action.payload.postId );
                if(post)
                    post.reactions = post.reactions.filter( reaction => reaction._id !== action.payload.reaction._id );
            })
            .addCase(commentOnPost.fulfilled, (state, action) => {
                const post = state.data.find( post => post._id === action.payload.postId );
                post?.comments.push({ ...action.payload.comment, author: action.payload.author })
            })
            .addCase(replyOnComment.fulfilled, (state, action) => {
                const post = state.data.find( post => post._id === action.payload.postId );
                const comment = post?.comments.find( comment => comment._id === action.payload.commentId );
                comment?.comments.push({ ...action.payload.reply, author: action.payload.author });
            })
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