import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import styles from './Home.module.css';

export function Home() {
    const { loginWithRedirect } = useAuth0();

    const signup = () => {
        loginWithRedirect({ screen_hint: "signup",  redirectUri: 'http://localhost:3000/initial-info'  });
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
                        <button className={`btn btn--purple btn--inverted  ${styles.navBtn}`} onClick = { signin } >Sign in</button>
                    </ul>
                </nav>
                <main className={ `row col-12 ${styles.main}` }>
                    <div className="col-4" style={{ marginBottom: '5em' }}>
                        <h1 className={ styles.headline }>
                            Post, like, share, comment
                        </h1>
                        <p className="text--lead">
                            Spread your love into social life wherever you are
                        </p>
                    </div>
                    <img className={ `col-8 ${styles.image}` } src="/assets/landing.png" alt="" />
                </main>
        </div>
    )
}