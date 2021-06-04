import styles from './App.module.css';
import { Authentication } from './features/authentication/Authentication';
import { Loader } from './features/meta-info/loader/Loader';
import { NewPost } from './features/posts/new-post/NewPost';
import { Posts } from './features/posts/Posts';
import { Routes, Route } from 'react-router-dom';
import { Home } from './components/home/Home';

function App() {
  return (
    <div className={ styles.app }>
      <Routes>
        <Route path="/" element={ <Home />} />
        <Route path="/home" element={ <Home />} />
      </Routes>
      {/* <Authentication />
      <NewPost />
      <Posts />
      <Loader /> */}
    </div>
  );
}

export default App;
