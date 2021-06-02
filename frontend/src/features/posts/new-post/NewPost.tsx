import { ChangeEvent, FormEvent, useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { createPost } from "../postsSlice";

export function NewPost() {
    const [content, setContent] = useState("");
    const dispatch = useAppDispatch();
    
    const onContentChange = (event: ChangeEvent<HTMLInputElement>) => {
        setContent(event.target.value);
    }

    const post = (event: FormEvent) => {
        event.preventDefault();
        dispatch( createPost(content) );
    }

    return (
        <form onSubmit={ post }>
            <input type="text" name="content" onChange = { onContentChange } />
            <button>Post</button>
        </form>
    )
}