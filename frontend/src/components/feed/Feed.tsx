import { NewPost } from '../../features/posts/new-post/NewPost';
import { Posts } from '../../features/posts/Posts';
import { Suggestions } from '../../features/user-details/suggestions/Suggestions';
import styles from './Feed.module.css';

export function Feed() {

    return (
    <div className={ `row col-9 m-0 p-0 ${styles.feed}` }>
        <div className="col-7 m-0 p-0">
            <NewPost />
            <hr />
            <Posts />
        </div>
        <div className="col-4">
            <Suggestions />
        </div>
</div>
    );
}