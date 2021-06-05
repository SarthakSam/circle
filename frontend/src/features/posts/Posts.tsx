import { useEffect } from "react";
import { IDLE } from "../../app.constants";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Post } from "./post/Post";
import { selectPostsState, fetchPosts } from './postsSlice';
// import { showNotification } from '../meta-info/metaInfoSlice';

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
        <ul className={`col-12 m-0 p-0`} style={{ listStyle: 'none' }}>
            {
                data.map( post => <li key={post._id} style={{ flex: 1 }}><Post { ...post } /></li> )
            }
        </ul>
    )
}