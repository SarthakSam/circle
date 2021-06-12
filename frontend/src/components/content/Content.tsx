import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { useAppDispatch } from "../../app/hooks";
import { getNotifications } from "../../features/notifications/notificationsSlice";
import { getCurrentUserDetails } from "../../features/user-details/usersSlice";
import { setupAuthHeaderForServiceCalls } from "../../utils/setAuthorizationToken";
import { Nav } from "../nav/Nav";

import styles from './Content.module.css';

export function Content() {
    const { getAccessTokenSilently } = useAuth0();
    const [isAuthTokenSet, setIsAuthToken] = useState(false);
    const dispatch = useAppDispatch();

    (async () => {
        try {
            const accessToken = await getAccessTokenSilently();
            setupAuthHeaderForServiceCalls(accessToken);
            setIsAuthToken(true);
        } catch (error) {
            console.log(error);
        }
    })();

    useEffect( () => { 
        if(isAuthTokenSet) {
            dispatch( getCurrentUserDetails() );
        }
     }, [isAuthTokenSet, dispatch] );

     
    useEffect( () => {
        if(isAuthTokenSet) {
        dispatch( getNotifications() );
        }
    }, [isAuthTokenSet, dispatch] );

    return (
        <div className={ `row ${styles.content}` }>
            <Nav />
            <main className={ `row ${styles.main}` }>
                {
                   isAuthTokenSet &&
                    // <div className="col-10">
                        <Outlet />
                    // </div>
                }
        </main>
        </div>
    )
}

export default withAuthenticationRequired(Content, {
    onRedirecting: () => <div>Loading...</div>,
  });