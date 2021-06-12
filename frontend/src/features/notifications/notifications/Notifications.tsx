import { useAppSelector } from "../../../app/hooks"
import { selectNotifications } from "../notificationsSlice"

export function NotificationsPage() {

    const notifications = useAppSelector(selectNotifications);

    return (
        <>
            Notifications
            {
                notifications.map( notification  => <li>{ notification._id } </li> )
            }
        </>
    )
}