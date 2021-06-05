import { IPost } from "../posts/posts.type";

export interface IUser {
    firstname?: string;
    lastname?: string;
    email?: string;
    posts?: IPost[];
    friends?: IUser[];
    emailVerified?: boolean;
}