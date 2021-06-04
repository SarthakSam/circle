import { NewPost } from '../../features/posts/new-post/NewPost';
import { Posts } from '../../features/posts/Posts';
import styles from './Feed.module.css';

export function Feed() {
    return (
    <div className={ `col-12 m-0 p-0 ${styles.feed}` }>
        <div className={styles.newPost}>
            <NewPost />
        </div>
        <div className={ styles.posts}>
            <Posts />
        </div>
    </div>
    );
}