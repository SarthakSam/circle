import styles from './App.module.css';
import { Loader } from './features/meta-info/loader/Loader';
import { NewPost } from './features/posts/new-post/NewPost';
import { Posts } from './features/posts/Posts';

function App() {
  return (
    <div className={ styles.app }>
      <NewPost />
      <Posts />
      <Loader />
    </div>
  );
}

export default App;
