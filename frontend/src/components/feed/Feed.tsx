import { NewPost } from '../../features/posts/new-post/NewPost';
import { Posts } from '../../features/posts/Posts';
import { Suggestions } from '../../features/user-details/suggestions/Suggestions';
import styles from './Feed.module.css';

export function Feed() {

    return (
    <div className={ `row col-8 col-xl-10 col-lg-11 col-md-12 m-0 p-0 ${styles.feed}` }>
        <div className="col-7 col-lg-7 col-md-8 col-sm-12 m-0 p-0">
            <NewPost />
            <hr />
            <Posts />
        </div>
        <div className={ `col-4 col-md-4 ${ styles.suggestions }`  }>
            <Suggestions />
        </div>
</div>
    );
}