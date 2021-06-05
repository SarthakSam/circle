import styles from './App.module.css';
import { Loader } from './features/meta-info/loader/Loader';
import { NewPost } from './features/posts/new-post/NewPost';
import { Routes, Route } from 'react-router-dom';
import { Home } from './components/home/Home';
import Content from './components/content/Content';
import { Feed } from './components/feed/Feed';
import { Authentication } from './features/authentication/Authentication';
import { Profile } from './features/user-details/Profile';

function App() {
  return (
    <div className={ styles.app }>
      <Routes>
        <Route path="/" element={ <Home />} />
        <Route path="/home" element={ <Home />} />
        <Route path='/' element={ <Content /> } >
           <Route path="feed" element={<Feed />} />
           <Route path="newPost" element={<NewPost />} />
           <Route path="profile" element={<Profile />} />
        </Route>
           <Route path="private" element={<Authentication/>} />
      </Routes>
      <Loader /> 
    </div>
  );
}

export default App;
