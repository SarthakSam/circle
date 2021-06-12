import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { selectCurrentUser } from '../../features/user-details/usersSlice';
import { Search } from '../search/Search';
import styles from './Nav.module.css';

export function Nav() {
    const { logout } = useAuth0();
    const user = useAppSelector(selectCurrentUser);

    const signout = () => {
        logout({ returnTo: window.location.origin });
    }

    return (
        <nav className= { `row col-8 col-xl-10 col-lg-11 col-md-12 m-0 ${styles.nav}` }>
                <span className={ styles.title }>
                    <Link to='/feed' >Connect</Link>
                </span>
                <Search />
                <ul className={ styles.navList }>
                {/* <Link to='/feed' >Home</Link> */}
                <Link to={`/profile/${user._id}`} >Profile</Link>
                <button className="btn btn--inverted" onClick={ signout }>Logout</button>
                </ul>
        </nav>
    )
}