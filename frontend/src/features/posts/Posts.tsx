import { useEffect } from "react";
import { ERROR, IDLE } from "../../app.constants";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectPostsState, fetchPosts } from './postsSlice';
import { showNotification } from '../meta-info/metaInfoSlice';

export function Posts() {
    const {data, status} = useAppSelector(selectPostsState);
    const dispatch = useAppDispatch();

    useEffect( () => {
        if( status === IDLE )
            dispatch( fetchPosts() );
        // else if( status === ERROR ) {
        //     dispatch( showNotification( { type: 'ERROR', message: 'Something went wrong' } ) );
        // }
            
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