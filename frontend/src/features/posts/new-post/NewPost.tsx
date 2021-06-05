import { ChangeEvent, FormEvent, useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { createPost } from "../postsSlice";
import styles from './NewPost.module.css';

export function NewPost() {
    const [content, setContent] = useState("");
    const dispatch = useAppDispatch();
    
    const onContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setContent(event.target.value);
    }

    const post = (event: FormEvent) => {
        event.preventDefault();
        dispatch( createPost(content) );
    }

    return (
        <form onSubmit={ post } className={styles.form}>
            <textarea name="content" rows={6} className="textarea textarea--fluid" placeholder="What's in you mind?" onChange = { onContentChange } ></textarea>
            <button className="btn btn--primary">Post</button>
        </form>
    )
}