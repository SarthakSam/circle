import { useState } from "react";
import { Avatar } from "../../../shared-components/avatar/Avatar";
import { UserInfo } from "../../../shared-components/user-info/UserInfo";
// import Linkify from 'react-linkify';

import { IPost } from "../posts.type";
import styles from './Post.module.css';

export function Post({ _id, author, content, images, comments, reactions }: IPost) {
    const [allContentVisible, setAllContentVisible] = useState(false);

    const toggleAllContentVisible = () => {
        setAllContentVisible( visible => !visible );
    }

    return (
        <div className={styles.post}>
             <div className={styles.userInfo}>
                <Avatar size={50} />
                <UserInfo name={ author.firstname + " " + author.lastname }/>
            </div>
            <p className={ styles.body }>
                {/* <Linkify> */}
                    { allContentVisible? content : content.substring(0, 250) }
                    {
                        content.length > 250 && <span className={ styles.meta } onClick = { toggleAllContentVisible }>
                        {
                            allContentVisible? '...see less' : '...see more'
                        } 
                    </span>

                    }
                {/* </Linkify> */}
            </p>
            {/* <Reactions /> */}
        </div>
    )
}