import { NewPost } from '../../features/posts/new-post/NewPost';
import { Posts } from '../../features/posts/Posts';
import { Suggestions } from '../../features/user-details/suggestions/Suggestions';
import styles from './Feed.module.css';

// import openSocket from 'socket.io-client';

export function Feed() {

    // const socket = openSocket('http://localhost:3001', {transports: ['websocket']});
    // console.log(socket);

    // function testConnection() {
    //     socket.emit('chat message', "hi");
    // }

    // socket.on('chat message', function(msg) {
    //     console.log(msg);
    //   });

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