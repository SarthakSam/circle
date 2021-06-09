export type IApiResponse<T> = {
    data: T;
    message: string;
}

export type IImage = {
    publicId: string;
    url: string;
}