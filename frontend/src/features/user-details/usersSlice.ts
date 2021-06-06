import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { getURL } from "../../api.config";
import { ERROR, IDLE, LOADING, SUCCESS } from "../../app.constants";
import { RootState } from "../../app/store";
import { IUser } from "./users.types";

export interface UsersState {
    status: 'IDLE' | 'LOADING' | 'SUCCESS' | 'ERROR';
    currentUser: IUser;
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
    }
}

export const getUserDetails = createAsyncThunk('users/getUserDetails', async () => {
    const resp = await axios.get( getURL('getUserDetails'));
    return resp.data.user;
});

export const saveUserDetails = createAsyncThunk('users/saveUserDetails', async ( updatedUserDetails: IUser ) => {
    const resp = await axios.put( getURL('saveUserDetails'), updatedUserDetails );
    return resp.data.user;
} );

export function isPendingUserAction(action: AnyAction) {
    return action.type === getUserDetails.pending || action.type === saveUserDetails.pending;
}

export function isRejectedUserAction(action: AnyAction) {
    return action.type === getUserDetails.rejected || action.type === saveUserDetails.rejected;
}


export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        updateUserDetails: (state, action) => {
            state.currentUser = { ...state.currentUser, ...action.payload.updates };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserDetails.fulfilled, (state, action: PayloadAction<IUser>) => {
                state.status = SUCCESS;
                state.currentUser = action.payload;
            })
            .addCase(saveUserDetails.fulfilled, (state, action: PayloadAction<IUser>) => {
                state.status = SUCCESS;
                state.currentUser = { ...state.currentUser, ...action.payload }
            })
            .addMatcher(isPendingUserAction, (state) => {
                state.status = LOADING;
            })
            .addMatcher(isRejectedUserAction, (state) => {
                state.status = ERROR;
            })
    }
});

export const { updateUserDetails } = usersSlice.actions;

export const selectCurrentUser = (state: RootState) => state.users.currentUser;

export default usersSlice.reducer;