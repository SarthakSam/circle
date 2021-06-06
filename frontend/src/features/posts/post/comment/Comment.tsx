import { IComment } from "../../posts.type";

export function Comment({ _id, content, comments: replies, author }: IComment) {
    const reply = () => {

    }
    
    return (
        <div>
            <strong>{ author.firstname + " " + author.lastname } </strong>
            <p>{ content }</p>
            <span onClick = { reply } >Reply</span>
            <ul style={{ marginLeft: '3em' }}>
            {
                replies.map( reply => <li key={reply._id} > 
                    <strong>{ author.firstname + " " + author.lastname } </strong>
                    { content }
                </li> )
            }
            </ul>
            
        </div>
    )
}