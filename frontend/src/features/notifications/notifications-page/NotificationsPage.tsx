import { Link } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks"
import { Avatar } from "../../../shared-components/avatar/Avatar";
import { selectNotifications } from "../notificationsSlice"
import styles from './NotificationsPage.module.css';

export function NotificationsPage() {

    const notifications = useAppSelector(selectNotifications);

    return (
        <>
        {
            notifications.length > 0? 
            <ul className={ `col-5 col-lg-7 col-md-8 col-sm-10 ${ styles.notifications }` }>
            {
                notifications.map( notification  => <li className={ styles.notification }>
                    <Avatar size={40} src={ notification.notificationBy.profilePic?.url } />
                    {
                        notification.type === 'COMMENT' &&
                        <p className="text--lead">
                             <Link to={ `/profile/${ notification.notificationBy._id }` } > { `${ notification.notificationBy.firstname } ${ notification.notificationBy.lastname }` } </Link>
                            commented on your <Link to={ `/post/${ notification.extraInfo.post }` } >post</Link>.
                        </p>
                    }
                    {
                        notification.type === 'LIKE' &&
                        <p className="text--lead">
                            <Link to={ `/profile/${ notification.notificationBy._id }` } > { `${ notification.notificationBy.firstname } ${ notification.notificationBy.lastname }` } </Link>
                            liked your <Link to={ `/post/${ notification.extraInfo.post }` } >post</Link>.
                        </p>
                    }
                    {
                        notification.type === 'FRIEND_REQUESTED' &&
                        <p className="text--lead">
                            <Link to={ `/profile/${ notification.notificationBy._id }` } > { `${ notification.notificationBy.firstname } ${ notification.notificationBy.lastname }` } </Link>
                            sent you friend request.
                        </p>
                    }
                    {
                        notification.type === 'FRIEND_REQUEST_ACCEPTED' &&
                        <p className="text--lead">
                            <Link to={ `/profile/${ notification.notificationBy._id }` } > { `${ notification.notificationBy.firstname } ${ notification.notificationBy.lastname }` } </Link>
                            accepted your friend request.
                        </p>
                    }
                </li> )
            }
        </ul>
        :
            <p>No Notifications for now.</p>
        }
        </>
    )
}