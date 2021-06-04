import styles from './App.module.css';
import { Authentication } from './features/authentication/Authentication';
import { Loader } from './features/meta-info/loader/Loader';
import { NewPost } from './features/posts/new-post/NewPost';
import { Posts } from './features/posts/Posts';
import { Routes, Route } from 'react-router-dom';
import { Home } from './components/home/Home';
import Content from './components/content/Content';

function App() {
  return (
    <div className={ styles.app }>
      <Routes>
        <Route path="/" element={ <Home />} />
        <Route path="/home" element={ <Home />} />
        <Route path='/' element={ <Content /> } >
           <Route path="feed" element={<Posts />} />
           {/* <Route path="feed" element={<Posts />} /> */}
           <Route path="newPost" element={<NewPost />} />
        </Route>
      </Routes>
      {/* <Authentication />
      <NewPost />
      <Posts /> */}
      <Loader /> 
    </div>
  );
}

export default App;
