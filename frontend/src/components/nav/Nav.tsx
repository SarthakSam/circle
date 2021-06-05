import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import styles from './Nav.module.css';

export function Nav() {
    const { logout } = useAuth0();

    const signout = () => {
        logout({ returnTo: window.location.origin });
    }

    return (
        <nav className={ `row col-12 m-0 ${styles.nav}` }>
            <span className={ styles.title }>
               <Link to='/feed' >Connect</Link>
            </span>
            <ul className={ styles.navList }>
               <Link to='/feed' >Home</Link>
               <Link to='/profile' >Profile</Link>
               <button className="btn btn--inverted" onClick={ signout }>Logout</button>
            </ul>
        </nav>
    )
}