import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { setupAuthHeaderForServiceCalls } from "../../utils/setAuthorizationToken";
import { Nav } from "../nav/Nav";

import styles from './Content.module.css';

export function Content() {
    const { getAccessTokenSilently } = useAuth0();
    const [isAuthTokenSet, setIsAuthToken] = useState(false);

    (async () => {
        try {
            const accessToken = await getAccessTokenSilently();
            setupAuthHeaderForServiceCalls(accessToken);
            setIsAuthToken(true);
        } catch (error) {
            console.log(error);
        }
    })();

    return (
        <div className={ `row ${styles.content}` }>
            <Nav />
            <main className={ `row ${styles.main}` }>
                {
                   isAuthTokenSet &&
                    <div className="col-10">
                        <Outlet />
                    </div>
                }
            </main>
        </div>
    )
}

export default withAuthenticationRequired(Content, {
    onRedirecting: () => <div>Loading...</div>,
  });