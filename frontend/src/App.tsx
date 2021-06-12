import styles from './App.module.css';
import { Loader } from './features/meta-info/loader/Loader';
import { NewPost } from './features/posts/new-post/NewPost';
import { Routes, Route } from 'react-router-dom';
import { Home } from './components/home/Home';
import Content from './components/content/Content';
import { Feed } from './components/feed/Feed';
// import { Authentication } from './features/authentication/Authentication';
// import { Profile } from './features/user-details/Profile';
import { Notifications } from './features/meta-info/notifications/Notifications';
import { InitialInfo } from './features/user-details/initialInfo';
import { NotFound } from './components/not-found/NotFound';
import { Profile } from './features/user-details/profile/Profile';
import { NotificationsPage } from './features/notifications/notifications/Notifications';

function App() {
  return (
    <div className={ styles.app }>
      <Routes>
        <Route path="/" element={ <Home />} />
        <Route path="/home" element={ <Home />} />
        <Route path='/' element={ <Content /> } >
           <Route path="feed" element={<Feed />} />
           <Route path="newPost" element={<NewPost />} />
           <Route path="/initial-info" element={ <InitialInfo />} />
           <Route path="profile/:userId" element={<Profile />} />
           <Route path="notifications" element={<NotificationsPage />} />
        </Route>
           {/* <Route path="private" element={<Authentication/>} /> */}
        <Route path="*" element= { <NotFound /> } />
      </Routes>
      <Loader /> 
      <Notifications />
    </div>
  );
}

export default App;
