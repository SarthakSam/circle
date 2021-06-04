import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import styles from './Home.module.css';

export function Home() {
    const { loginWithRedirect } = useAuth0();

    return (
        <div className={`row ${styles.home}`} >
                <nav className={`row col-10 ${styles.nav}`}>
                    <span className={styles.title}>
                        <Link to="/">Connect</Link>
                    </span>
                    <ul>
                        <button className={`btn btn--inverted ${styles.navBtn}`} onClick={ () => { loginWithRedirect({ screen_hint: "signup" }) } } >Join Now</button>
                        <button className={`btn btn--primary btn--inverted  ${styles.navBtn}`} onClick = { () => { loginWithRedirect({ redirectUri: 'http://localhost:3000/feed' }) } } >Sign in</button>
                    </ul>
                </nav>
                <main className={ `row col-12 ${styles.main}` }>
                    <img className={ styles.image } src="/assets/home-page.svg" alt="" />
                </main>
        </div>
    )
}