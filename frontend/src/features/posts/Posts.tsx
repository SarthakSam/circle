import { useEffect } from "react";
import { IDLE, LOADING } from "../../app.constants";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectPostsState, fetchPosts } from './postsSlice';

export function Posts() {
    const {data, status} = useAppSelector(selectPostsState);
    const dispatch = useAppDispatch();

    useEffect( () => {
        if( status === IDLE )
            dispatch( fetchPosts() );
        else if( status === LOADING )
            console.log("Loading data from api");
    }, [dispatch, status]);

    return (
        <div>
            POSTS
            <ul>
                {
                    data.map( post => <li key={post._id}>{post.content}</li> )
                }
            </ul>
        </div>
    )
}