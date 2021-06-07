import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { getURL } from "../../api.config";
import { ERROR, IDLE, LOADING, SUCCESS } from "../../app.constants";
import { RootState } from "../../app/store";
import { IUser } from "./users.types";

export interface UsersState {
    status: 'IDLE' | 'LOADING' | 'SUCCESS' | 'ERROR';
    data: IUser;
}

const initialState: UsersState = {
    status: IDLE,
    data: {
        _id: '',
        firstname: '',
        lastname: '',
        email: '',
        friends: [],
        emailVerified: false,
        posts: []
    }
}

export const getUserDetails = createAsyncThunk('currentUser/getUserDetails', async () => {
    const resp = await axios.get( getURL('getUserDetails'));
    return resp.data.user;
});

export const saveUserDetails = createAsyncThunk('currentUser/saveUserDetails', async ( updatedUserDetails: IUser ) => {
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
    name: 'currentUser',
    initialState,
    reducers: {
        updateUserDetails: (state, action) => {
            state.data = { ...state.data, ...action.payload.updates };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserDetails.fulfilled, (state, action: PayloadAction<IUser>) => {
                state.status = SUCCESS;
                state.data = action.payload;
            })
            .addCase(saveUserDetails.fulfilled, (state, action: PayloadAction<IUser>) => {
                state.status = SUCCESS;
                state.data = { ...state.data, ...action.payload }
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

export const selectCurrentUser = (state: RootState) => state.currentUser.data;

export default usersSlice.reducer;