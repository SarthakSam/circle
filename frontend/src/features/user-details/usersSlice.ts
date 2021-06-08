import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { getURL } from "../../api.config";
import { ERROR, IDLE, LOADING, SUCCESS } from "../../app.constants";
import { RootState } from "../../app/store";
import { IUser } from "./users.types";

export interface UsersState {
    status: 'IDLE' | 'LOADING' | 'SUCCESS' | 'ERROR';
    currentUser: IUser;
    visitedUser: IUser | null;
}

const initialState: UsersState = {
    status: IDLE,
    currentUser: {
        _id: '',
        firstname: '',
        lastname: '',
        email: '',
        friends: [],
        emailVerified: false,
        posts: []
    },
    visitedUser: null
}

export const getCurrentUserDetails = createAsyncThunk('users/getCurrentUserDetails', async () => {
    const resp = await axios.get( getURL('getCurrentUserDetails'));
    return resp.data.user;
});

export const saveUserDetails = createAsyncThunk('users/saveUserDetails', async ( updatedUserDetails: IUser ) => {
    const resp = await axios.put( getURL('saveUserDetails'), updatedUserDetails );
    return resp.data.user;
} );

export const getUserDetails = createAsyncThunk( 'users/getUserDetails', async ( userId: string, options ) => {
    const state = options.getState() as RootState;
    if(state.users.currentUser._id === userId) {
        return state.users.currentUser;
    }
    const response = await axios.get(getURL('getUserDetails', { userId }));
    return response.data.user;
});

export function isPendingUserAction(action: AnyAction) {
    return action.type === getCurrentUserDetails.pending;
}

export function isRejectedUserAction(action: AnyAction) {
    return action.type === getCurrentUserDetails.rejected;
}


export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        updateUserDetails: (state, action) => {
            state.currentUser = { ...state.currentUser, ...action.payload.updates };
        },
        setVisitedUser: (state, action) => {
            state.visitedUser = action.payload.user;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCurrentUserDetails.fulfilled, (state, action: PayloadAction<IUser>) => {
                state.status = SUCCESS;
                state.currentUser = action.payload;
            })
            .addCase(saveUserDetails.fulfilled, (state, action: PayloadAction<IUser>) => {
                // state.status = SUCCESS;
                state.currentUser = { ...state.currentUser, ...action.payload }
            })
            .addCase(getUserDetails.fulfilled, (state, action: PayloadAction<IUser>) => {
                state.visitedUser = action.payload;
            })
            .addMatcher(isPendingUserAction, (state) => {
                state.status = LOADING;
            })
            .addMatcher(isRejectedUserAction, (state) => {
                state.status = ERROR;
            })
    }
});

export const { updateUserDetails, setVisitedUser } = usersSlice.actions;

export const selectCurrentUser = (state: RootState) => state.users.currentUser;

export const selectVisitedUser = (state: RootState) => state.users.visitedUser;

export default usersSlice.reducer;