import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { SUCCESS } from "../../../app.constants";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { Avatar } from "../../../shared-components/avatar/Avatar";
import { getFriendsSuggestions, selectCurrentUser, selectSuggestions } from "../usersSlice";
import styles from './Suggestions.module.css';

export function Suggestions() {
    const suggestions = useAppSelector(selectSuggestions);
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectCurrentUser);
    const navigate = useNavigate();

    const openProfile = (id: string) => {
        navigate(`/profile/${id}`);
    }

    useEffect(() => {
        if(suggestions.status !== SUCCESS && user?._id ) {
            dispatch(getFriendsSuggestions(user._id!));
        }
    }, [user._id, suggestions, dispatch]);

    return (
        <>
            <div className={styles.userInfo} onClick = { () => { openProfile(user._id!) } }>
                <Avatar size={60} src = { user.profilePic?.url }/>
                <p className={ styles.userName }> { `${ user.firstname } ${user.lastname} ` } </p>
                <Link className={ styles.link } to={ `/profile/${user._id}` } >View Profile</Link>
            </div>
            <h3>Suggestions for you</h3>
            <ul style = {{ listStyle: 'none' }}>
                {
                    suggestions.data.map( ({ firstname, lastname, _id, profilePic }) => <li className={styles.userInfo}>
                        <Avatar size={30} src = { profilePic?.url }/>
                        <p className={ styles.userName }> { `${ firstname } ${lastname} ` } </p>
                        <Link className={ styles.link } to={ `/profile/${_id}` } >View Profile</Link>
                    </li> )
                }
            </ul>
        </>
    )
}