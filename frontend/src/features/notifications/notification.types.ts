export type IUserNotification = {
    _id: string;
    user: string;
    type: string;
    isRead: boolean;
    extraInfo?: any;
}