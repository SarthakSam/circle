
export type IPost = {
    _id: string,
    author: string,
    content: string,
    images: [],
    comments: [],
    reactions: {}
}

export type IPostsResponse = {
    posts: IPost[];
    message: string;
}