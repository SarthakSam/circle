import { Link, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import styles from './Home.module.css';
import { redirectUrl } from '../../environments';
import { useEffect } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { hideLoader, showLoader } from '../../features/meta-info/metaInfoSlice';


export function Home() {
    const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    if(isAuthenticated) {
        navigate('/feed');
    }

    useEffect(() => {
        if(isLoading)
            dispatch( showLoader() )
        else
            dispatch( hideLoader() )
    }, [isLoading])

    const signup = () => {
        loginWithRedirect({ screen_hint: "signup",  redirectUri: `${redirectUrl}/initial-info`  });
    }

    const signin = () => {
        loginWithRedirect({ redirectUri: `${redirectUrl}/feed` });
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