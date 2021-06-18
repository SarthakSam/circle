import { unwrapResult } from "@reduxjs/toolkit";
import { ChangeEvent, FormEvent, useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { Avatar } from "../../../shared-components/avatar/Avatar";
import { Popup } from "../../../shared-components/popup/Popup";
import { showNotification } from "../../meta-info/metaInfoSlice";
import { createPost } from "../postsSlice";
import styles from './NewPost.module.css';

export function NewPost() {
    const [formVisible, setFormVisible] = useState(false);
    const [content, setContent] = useState("");
    const dispatch = useAppDispatch();
    
    const onContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setContent(event.target.value);
    }

    const post = async (event: FormEvent) => {
        event.preventDefault();
        try {
            const resultAction = await dispatch( createPost(content) );
            unwrapResult(resultAction);
            setFormVisible(false);
            dispatch(showNotification({ type: 'SUCCESS', message: 'Post created successfully' }));
        } catch(err) {
            console.log(err);
            dispatch(showNotification({ type: 'ERROR', message: 'Somwthing went wrong' }));
        }
    }

    return (
        <>
        <div className={`row ${styles.formBtn}`}>
             <Avatar size={50} />
             <div className={styles.newPostBtn} tabIndex={1} onClick = { () => { setFormVisible(true) } }>Start a Post</div>
        </div>
        {
            formVisible && 
            <Popup title="Create a post" closePopup = { () => { setFormVisible(false) } }>
                 <form onSubmit={ post } className={styles.form}>
                    <textarea name="content" rows={6} className="textarea textarea--fluid" placeholder="What's in you mind?" onChange = { onContentChange } ></textarea>
                    <button className="btn btn--primary">Post</button>
                </form>
            </Popup>
        }
        </>
    )
}