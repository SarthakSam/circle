import axios from 'axios';
import { ChangeEvent, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { getURL } from '../../api.config';
import { useAppDispatch } from '../../app/hooks';
import { showNotification } from '../../features/meta-info/metaInfoSlice';
import { IUser } from '../../features/user-details/users.types';
import { Avatar } from '../../shared-components/avatar/Avatar';
import styles from './Search.module.css';

export function Search() {
    const [searchString, setSearchString] = useState("");
    const [suggestions, setSuggestions] = useState< IUser[] >([]);
    const dispatch = useAppDispatch();
    const [timer, setTimer] = useState<ReturnType<typeof setTimeout>>();
    const navigate = useNavigate();
    
    const getUsers = async () => {
        console.log("users")
        try {
            const resp = await axios.get(getURL('searchUsers', { query: searchString }));
            setSuggestions( resp.data.users );
        } catch(err) {
            dispatch(showNotification( { type: "ERROR", message: err.errorMessage } ));
        }
    }

    const visitProfile = ( id: string ) => {
        navigate(`/profile/${id}`);
        closeSearch();
    }

    const closeSearch = () => {
        setSuggestions([]); 
        setSearchString("") 
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchString(e.target.value);
        if( timer ) {
            clearTimeout(timer);
            setTimer(undefined);
        }
        const temp = setTimeout( getUsers, 2000);
        setTimer(temp);
    }

    return (
        <>
                <div className={ styles.searchbar }>
                    <FaSearch />
                    <input type="search" name="search" id="search" value={ searchString } onChange = { onChange } />
                    {
                        suggestions.length > 0 && 
                        <ul className={styles.list}>
                            {
                                suggestions.map( suggestion => <li className="row" onClick = { () => { visitProfile(suggestion._id!) } }> 
                                    <Avatar size={40} src={ suggestion.profilePic?.url } /> 
                                    <p className="col-9"> { `${suggestion.firstname} ${suggestion.lastname}  ` } </p>
                                </li> )                            
                            }
                        </ul>
                    }
                </div>
                {
                    suggestions.length > 0 && <div className={ styles.autocompleteContainer } onClick = { closeSearch } ></div>
                }
        </>
    )
}