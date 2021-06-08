import { unwrapResult } from "@reduxjs/toolkit";
import { useState } from "react";
import { useAppDispatch } from "../../../../app/hooks";
import { Avatar } from "../../../../shared-components/avatar/Avatar";
import { UserInfo } from "../../../../shared-components/user-info/UserInfo";
import { showNotification } from "../../../meta-info/metaInfoSlice";
import { IComment } from "../../posts.type";
import { replyOnComment } from "../../postsSlice";
import { NewComment } from "../new-comment/NewComment";

import styles from './Comment.module.css';

export function Comment({ _id, content, comments: replies, author, postId }: IComment & { postId: string }) {
    const [replyBox, setReplyBox] = useState(false);
    const dispatch = useAppDispatch();
    
    const onReplyClick = () => {
        setReplyBox(true);
    }

    const postReply = async (reply: string) => {
        try {
            const resultAction = await dispatch(replyOnComment({ postId, commentId: _id, reply }));
            unwrapResult(resultAction);
            setReplyBox(false);
        } catch(err) {
            console.log(err);
            dispatch(showNotification({ type: "ERROR", message: "Something went wrong" }));
        }
    }
    
    return (
        <div className="row" style={{ margin: '0.5em 0' }}>
            <Avatar size={40} />
            <div className={ styles.comment }>
                <div className={ styles.commentBody }>
                    <UserInfo name={ author.firstname + " " + author.lastname } userId={ author._id! } headline={ author.headline } />
                    <p>{ content }</p>
                </div>
                <button className={ styles.replyBtn } onClick = { onReplyClick } >Reply</button>
                <span className = { styles.repliesCount }>{ replies.length } replies</span>
                <ul style={{ listStyle: 'none' }}>
                {
                    replies.map( reply => <li key={reply._id} > 
                                <div className="row" style={{ margin: '0.5em 0' }}>
                                    <Avatar size={35} />
                                    <div className={ styles.comment }>
                                        <div className={ styles.commentBody }>
                                            <UserInfo name={ reply.author.firstname + " " + reply.author.lastname } userId={ reply.author._id! } headline={ reply.author.headline } />
                                            <p>{ reply.content }</p>
                                        </div>
                                        <button className={ styles.replyBtn } onClick = { onReplyClick }>Reply</button>
                                    </div>
                                </div>
                    </li> )
                }
                </ul>
                { replyBox && <NewComment  closeCommentBox = { () => { setReplyBox(false) }} postComment = { postReply } /> }
            </div>
        </div>
    )
}