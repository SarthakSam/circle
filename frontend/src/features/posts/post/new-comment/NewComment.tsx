import { ChangeEvent, FormEvent, useState } from "react";

export function NewComment({ closeCommentBox, postComment }: { closeCommentBox: React.Dispatch<React.SetStateAction<boolean>>, postComment: Function }) {
    const [commentText, setCommentText] = useState("");

    const comment = () => {
       postComment(commentText);
    }

    return (
        <>
            <div className="input input--fluid">
                <input type="text" value={commentText} onChange = { (e: ChangeEvent<HTMLInputElement>) => { setCommentText(e.target.value) } } placeholder="Enter text" />
            </div>
            <button className="btn btn--danger btn--inverted" onClick = { () => { closeCommentBox(false) } } >Cancel</button>
            <button className="btn btn--primary" onClick = { comment } >Comment</button>
        </>
    )
}