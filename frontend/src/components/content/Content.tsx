import { withAuthenticationRequired } from "@auth0/auth0-react";
import { Outlet } from "react-router";
import { Nav } from "../nav/Nav";

import styles from './Content.module.css';

export function Content() {
    return (
        <div className={ `row ${styles.content}` }>
            <Nav />
            <main className={ `row ${styles.main}` }>
               <Outlet />
            </main>
        </div>
    )
}

export default withAuthenticationRequired(Content, {
    onRedirecting: () => <div>Loading...</div>,
  });