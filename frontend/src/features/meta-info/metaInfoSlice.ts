import { AnyAction, AsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { INotification, INotificationObj } from "./metaInfo.types";
import { v4 as uuidv4 } from 'uuid';

export type IMetaInfoState = {
    isLoading: boolean;
    notifications: INotificationObj[];
}

export const initialState: IMetaInfoState = {
    isLoading: false,
    notifications: []
}

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>

type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
// type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>

function isPendingAction(action: AnyAction): action is PendingAction {
    return action.type.endsWith('/pending');
}

function isRejectedAction(action: AnyAction): action is RejectedAction {
    return action.type.endsWith('/rejected');
}

// function isResolvedAction(action: AnyAction): action is RejectedAction | FulfilledAction {
//     return action.type.endsWith('/rejected') || action.type.endsWith('/fulfilled');
// }   

export const metaInfoSlice = createSlice({
    name: 'metaInfo',
    initialState,
    reducers: {
        showLoader: (state) => {
            state.isLoading = true;
        },
        hideLoader: (state) => {
            state.isLoading = false;
        },
        showNotification: (state, action: PayloadAction<INotification>) => {
            state.notifications.push({ _id: uuidv4() , ...action.payload });
        },
        clearNotification: (state, action: PayloadAction<string> ) => {
            state.notifications = state.notifications.filter( notification => notification._id !== action.payload )
        }
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(isPendingAction, (state) => {
                state.isLoading = true;
            })
            .addMatcher(isRejectedAction, (state, action ) => {
                console.log(action);
                state.isLoading = false;
                // state.notifications.push( { _id: '1', type: 'ERROR', message: action.error } )
            })
            .addDefaultCase((state) => {
                state.isLoading = false;
            });
    }
});

export const { showLoader, hideLoader, showNotification, clearNotification } = metaInfoSlice.actions;

export const selectIsLoading = (state: RootState) => state.metaInfo.isLoading;

export const selectNotifications = (state: RootState) => state.metaInfo.notifications;

export default metaInfoSlice.reducer;