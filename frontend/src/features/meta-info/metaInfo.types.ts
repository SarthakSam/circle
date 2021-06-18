export interface INotification {
    type: 'SUCCESS' | 'ERROR' | 'WARNING';
    message: string;
}

export interface INotificationObj extends INotification {
    _id: string;
}

export type IApiError = {
    errorMessage: string;
}