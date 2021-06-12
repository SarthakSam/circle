import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { getURL } from "../../api.config";
import { RootState } from "../../app/store";
import { IUserNotification } from "./notification.types";

export type notificationsState = {
    data: IUserNotification[];
    unread: number;
}

const initialState: notificationsState = {
    data: [],
    unread: 0
}

export const getNotifications = createAsyncThunk('notifications/getNotifications', async () => {
    const resp = await axios.get(getURL( 'getNotifications' ));
    return resp.data.notifications;
})

export const markNotificationAsRead = createAsyncThunk('notifications/markNotificationAsRead', async (id) => {
    const resp = await axios.put(getURL( 'updateNotification', { id } ));
    return resp.data.notification;
})

export const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getNotifications.fulfilled, (state, action: PayloadAction<IUserNotification[]>) => {
            state.data = action.payload;
            state.unread = state.data.reduce( (acc, cur) => {
                return cur.isRead? acc : acc + 1;
            }, 0 )
        })
        builder.addCase(markNotificationAsRead.fulfilled, (state, action: PayloadAction<IUserNotification>) => {
            const notification = state.data.find( notification => notification._id === action.payload._id);
            if(notification)
                notification.isRead = true;
            state.unread--;
        })
    }
});

export const selectNotifications = (state: RootState) => state.notifications.data;

export const selectUnreadNotificationsCount = (state: RootState) => state.notifications.unread;

export default notificationsSlice.reducer;
