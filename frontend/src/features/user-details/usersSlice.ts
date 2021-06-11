import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { getURL } from "../../api.config";
import { ERROR, IDLE, LOADING, SUCCESS } from "../../app.constants";
import { RootState } from "../../app/store";
import { IFriendshipStatus, IUser } from "./users.types";

export interface UsersState {
    status: 'IDLE' | 'LOADING' | 'SUCCESS' | 'ERROR';
    currentUser: IUser;
    visitedUser: IUser | null;
    friendshipStatus: IFriendshipStatus;
    suggestions: {
        data: IUser[];
        status: 'IDLE' | 'LOADING' | 'SUCCESS' | 'ERROR';
    }
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
    visitedUser: null,
    friendshipStatus: "SAME_USER",
    suggestions: {
        data: [],
        status: 'IDLE'
    }
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

export const getFriendshipStatus = createAsyncThunk('users/getFriendshipStatus', async (userId: string, options) => {
    const state = options.getState() as RootState;
    if(state.users.currentUser._id === userId) {
        return 'SAME_USER';
    }
    const response = await axios.get(getURL('getFriendshipStatus', { user1: state.users.currentUser._id, user2: userId }));
    return response.data.status;
});

export const addFriend = createAsyncThunk('users/addFriend', async ({ user1, user2 }: { user1: string, user2: string }) => {
    const response = await axios.post(getURL('addFriend', { user1 }), { whom: user2 } );
    return response.data.status;
});

export const removeFriend = createAsyncThunk('users/removeFriend', async ({ user1, user2 }: { user1: string, user2: string }) => {
    const response = await axios.delete(getURL('removeFriend', { user1, user2 }));
    return response.data.status;
});

export const getFriendsSuggestions = createAsyncThunk('users/getFriendsSuggestions', async (user: string) => {
    const resp = await axios.get( getURL( 'friendSuggestions', { user } ) );
    return resp.data.suggestions;
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
        },
        setFriendShipStatus: (state, action) => {
            state.friendshipStatus = action.payload.status;
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
            .addCase(getFriendshipStatus.fulfilled, (state, action: PayloadAction<typeof state.friendshipStatus>) => {
                state.friendshipStatus = action.payload
            })
            .addCase(addFriend.fulfilled, (state, action: PayloadAction<typeof state.friendshipStatus>) => {
                state.friendshipStatus = action.payload
            })
            .addCase(removeFriend.fulfilled, (state, action: PayloadAction<typeof state.friendshipStatus>) => {
                state.friendshipStatus = action.payload
            })
            .addCase(getFriendsSuggestions.pending, (state) => {
                state.suggestions.status = 'LOADING';
            })
            .addCase(getFriendsSuggestions.fulfilled, (state, action: PayloadAction<IUser[]>) => {
                state.suggestions.data = action.payload;
                state.suggestions.status = 'SUCCESS';
            })
            .addCase(getFriendsSuggestions.rejected, (state) => {
                state.suggestions.status = 'ERROR';
            })
            .addMatcher(isPendingUserAction, (state) => {
                state.status = LOADING;
            })
            .addMatcher(isRejectedUserAction, (state) => {
                state.status = ERROR;
            })
    }
});

export const { updateUserDetails, setVisitedUser, setFriendShipStatus } = usersSlice.actions;

export const selectCurrentUser = (state: RootState) => state.users.currentUser;

export const selectVisitedUser = (state: RootState) => state.users.visitedUser;

export const selectFriendShipStatus = (state: RootState) => state.users.friendshipStatus;

export const selectSuggestions = (state: RootState) => state.users.suggestions;

export default usersSlice.reducer;