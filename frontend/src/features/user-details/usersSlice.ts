import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
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
        firstname: '',
        lastname: '',
        email: '',
        friends: [],
        emailVerified: false,
        posts: []
    }
}

export const saveUserDetails = createAsyncThunk('users/saveUserDetails', async ( updatedUserDetails: IUser ) => {
    const resp = await axios.put( getURL('saveUserDetails'), updatedUserDetails );
    return resp.data.user;
} );

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
            .addCase(saveUserDetails.pending, (state) => {
                state.status = LOADING;
            })
            .addCase(saveUserDetails.fulfilled, (state, action: PayloadAction<IUser>) => {
                state.status = SUCCESS;
                state.currentUser = { ...state.currentUser, ...action.payload }
            })
            .addCase(saveUserDetails.rejected, (state) => {
                state.status = ERROR;
            })
    }
});

export const { updateUserDetails } = usersSlice.actions;

export const selectUsersState = (state: RootState) => state.users;

export default usersSlice.reducer;