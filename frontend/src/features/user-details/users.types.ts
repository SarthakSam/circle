import { IImage } from "../../app.types";
import { IPost } from "../posts/posts.type";
export interface IUser {
    _id?: string;
    firstname?: string;
    lastname?: string;
    email?: string;
    posts?: IPost[];
    friends?: IUser[];
    profilePic?: IImage;
    backgroundPic?: IImage;
    headline?: string;
    emailVerified?: boolean;
    gender?: string;
}