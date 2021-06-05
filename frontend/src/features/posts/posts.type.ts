import { IUser } from "../user-details/users.types"

export type IPost = {
    _id: string,
    author: IUser,
    content: string,
    images: [],
    comments: [],
    reactions: {}
}

export type IPostsResponse = {
    posts: IPost[];
    message: string;
}