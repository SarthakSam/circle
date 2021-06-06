import { FaCheck, FaTimes, FaExclamation } from 'react-icons/fa';
import styles from './Notification.module.css';
import { useEffect } from 'react';
import { INotificationObj } from '../../metaInfo.types';
import { useAppDispatch } from '../../../../app/hooks';
import { clearNotification } from '../../metaInfoSlice';

export function Notification({ _id, type, message }: INotificationObj) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        setTimeout( () =>{
            dispatch( clearNotification(_id) );
        }, 3000 );
    }, [_id, dispatch])

    return (
    <li className = {"col-12 p-0 " + styles.notification}>
           {
               type === 'SUCCESS' && 
               <div className="alert bg-green text-white">
                    <FaCheck style={{ padding: 0 }}/>
                    <p>{message}</p>
                </div>
            }
            {
                type === 'ERROR' && 
                <div className="alert bg-red text-white">
                    <FaTimes style={{ padding: 0 }} />
                    <p>{message}</p>
                </div>
            }
            {
                type === 'WARNING' && 
                <div className="alert bg-yellow text-white">
                    <FaExclamation style={{ padding: 0 }} />
                    <p>{message}</p>
                </div>
            }
    </li>
    )
}