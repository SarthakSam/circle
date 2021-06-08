import { Link } from 'react-router-dom';
import styles from './UserInfo.module.css';

export function UserInfo({ userId, name, headline="", postedOn }: { userId: string, name: string, headline?: string, postedOn?: string }) {

    return (
        <div className={ styles.userInfo }>
           <Link to={`/profile/${userId}`} className={ styles.author }>{ name }</Link>
           <p className={ styles.metaInfo }>{ headline }</p>
           <p className={ styles.metaInfo }>{ postedOn }</p>
        </div>
    )
}