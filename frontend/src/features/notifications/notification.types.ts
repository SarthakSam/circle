import { IUser } from "../user-details/users.types";

export type IUserNotification = {
    _id: string;
    notificationFor: string;
    notificationBy: IUser;
    type: string;
    isRead: boolean;
    extraInfo?: any;
}