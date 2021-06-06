import { IUser } from "../user-details/users.types"

export type IPost = {
    _id: string,
    author: IUser,
    content: string,
    images: [],
    comments: [],
    reactions: IReaction[]
}

export type IPostsResponse = {
    posts: IPost[];
    message: string;
}

export type IReactionTypes = 'LIKE';

export type IReaction = {
    _id?: string;
    reactedBy: string;
    type: IReactionTypes;
}