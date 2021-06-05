import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import styles from './Home.module.css';

export function Home() {
    const { loginWithRedirect, isAuthenticated } = useAuth0();

    const signup = () => {
        loginWithRedirect({ screen_hint: "signup",  redirectUri: 'http://localhost:3000/profile'  });
    }

    const signin = () => {
        loginWithRedirect({ redirectUri: 'http://localhost:3000/feed' });
    }

    return (
        <div className={`row ${styles.home}`} >
                <nav className={`row col-10 ${styles.nav}`}>
                    <span className={styles.title}>
                        <Link to="/">Connect</Link>
                    </span>
                    <ul>
                        <button className={`btn btn--inverted ${styles.navBtn}`} onClick={ signup } >Join Now</button>
                        <button className={`btn btn--primary btn--inverted  ${styles.navBtn}`} onClick = { signin } >Sign in</button>
                    </ul>
                </nav>
                <main className={ `row col-12 ${styles.main}` }>
                    <img className={ styles.image } src="/assets/home-page.svg" alt="" />
                </main>
        </div>
    )
}