import { useEffect, useState } from "react";
import { FaThumbsUp } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import Linkify from 'react-linkify';

import { Avatar } from "../../../shared-components/avatar/Avatar";
import { UserInfo } from "../../../shared-components/user-info/UserInfo";
import { IPost, IReaction } from "../posts.type";
import styles from './Post.module.css';
import { selectCurrentUser } from '../../user-details/usersSlice';
import { commentOnPost, likePost, unlikePost } from "../postsSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { showNotification } from "../../meta-info/metaInfoSlice";
import { NewComment } from "./new-comment/NewComment";
import { Comment } from './comment/Comment';

export function Post({ _id, author, content, images, comments, reactions }: IPost) {
    const [allContentVisible, setAllContentVisible] = useState(false);
    const [userReacted, setUserReacted] = useState(false);
    const [commentBoxVisible, setCommentBoxVisible] = useState(false);
    const currentUser = useAppSelector(selectCurrentUser);
    const dispatch = useAppDispatch();

    const toggleAllContentVisible = () => {
        setAllContentVisible( visible => !visible );
    }

    useEffect( () => {
         setUserReacted(!!reactions.find( (reaction: IReaction) => reaction.reactedBy === currentUser._id ));
    }, [] );

    const onUserReaction = async () => {
        let resultAction;
        try {
            if(!userReacted)
                resultAction = await dispatch(likePost(_id));
            else       
                resultAction = await dispatch(unlikePost(_id));
            unwrapResult(resultAction);
            setUserReacted(isReacted => !isReacted);
        } catch(err) {
            console.log(err);
            dispatch(showNotification({ type: "ERROR", message: "Something went wrong" }));
        }
    };

    const postComment = async (commentText: string) => {
        try {
            const resultAction = await dispatch(commentOnPost({ postId: _id, commentBody: commentText }));
            unwrapResult(resultAction);
            setCommentBoxVisible(false);
        } catch (error) {
            console.log(error);
            dispatch(showNotification({ type: "ERROR", message: "Something went wrong" }));
        }
    }

    return (
        <div className={styles.post}>
             <div className={styles.userInfo}>
                <Avatar size={50} />
                <UserInfo name={ author.firstname + " " + author.lastname }/>
            </div>
            <p className={ styles.body }>
                <Linkify>
                    { allContentVisible? content : content.substring(0, 250) }
                    {
                        content.length > 250 && <span className={ styles.meta } onClick = { toggleAllContentVisible }>
                        {
                            allContentVisible? '...see less' : '...see more'
                        } 
                    </span>

                    }
                </Linkify>
            </p>
            <ul className={ styles.reactionsInfo }>
               { reactions.length > 0 && <li> { reactions.length } likes </li> } 
               { comments.length > 0 && <li> { comments.length } comments </li> }
            </ul>
            {/* ${styles.likeBtn} */}
            <ul className={styles.userActions}>
                <li className={ ` ${ userReacted && styles.reacted }` } onClick = { onUserReaction } > <FaThumbsUp fill="inherit" /> Like </li>
                <li onClick={ () => { setCommentBoxVisible(true) } } > Comment </li>
            </ul>
                
                { commentBoxVisible && <NewComment closeCommentBox={ setCommentBoxVisible } postComment = { postComment } /> }
                 <ul>
                     {
                         comments.map( comment => <li key = {comment._id}> <Comment {...comment} /> </li> )
                     }
                 </ul>
            {/* <Reactions /> */}
        </div>
    )
}