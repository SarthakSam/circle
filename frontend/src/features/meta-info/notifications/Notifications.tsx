import { useAppSelector } from "../../../app/hooks";
import { selectNotifications } from "../metaInfoSlice";
import styles from './Notifications.module.css';
import { Notification } from './notification/Notification';

export function Notifications() {
    const notifications = useAppSelector(selectNotifications);

    return (
        <ul className={styles.notification__container + " row"}>
        {
            notifications.map( notification => <Notification key={notification._id} {...notification} />)
        }
    </ul>
    )
}