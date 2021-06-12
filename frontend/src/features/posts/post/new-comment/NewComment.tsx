import { ChangeEvent, FormEvent, useState } from "react";
import { useAppDispatch } from "../../../../app/hooks";

import { Avatar } from "../../../../shared-components/avatar/Avatar";
import { showNotification } from "../../../meta-info/metaInfoSlice";
import styles from './NewComment.module.css';

export function NewComment({ closeCommentBox, postComment }: { closeCommentBox: React.Dispatch<React.SetStateAction<boolean>>, postComment: Function }) {
    const [commentText, setCommentText] = useState("");
    const dispatch = useAppDispatch();

    const comment = (event: FormEvent) => {
        event.preventDefault();
        if(commentText.length === 0) {
            dispatch(showNotification({ type: "WARNING", message: "Cannot post an empty comment" }));
            return;
        }
       postComment(commentText);
    }

    return (
        <>
            <form className="row" onSubmit = { comment }>
                <Avatar size={35} />
                <input className={ styles.commentBox } type="text" value={commentText} onChange = { (e: ChangeEvent<HTMLInputElement>) => { setCommentText(e.target.value) } } placeholder="Enter text" />
                <div className="col-12 m-0 p-0">
                    <button type="submit" className={ `btn btn--purple ${ styles.formBtn }` }  disabled={ commentText.length === 0 }>Comment</button>
                    <button type="button" className={ `btn btn--danger btn--inverted  ${ styles.formBtn }` } onClick = { () => { closeCommentBox(false) } } >Cancel</button>
                </div>        
            </form>        
        </>
    )
}