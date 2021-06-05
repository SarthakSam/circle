import { useAuth0 } from "@auth0/auth0-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { saveUserDetails, selectUsersState, updateUserDetails } from "./usersSlice";
import { showLoader, hideLoader } from '../meta-info/metaInfoSlice'
import { SUCCESS } from "../../app.constants";
import { useNavigate } from "react-router";

export function Profile() {
    const {currentUser, status} = useAppSelector(selectUsersState);
    const dispatch = useAppDispatch();
    const { user, isLoading } = useAuth0();
    const navigate = useNavigate();

    const [firstname, setFirstname] = useState(currentUser.firstname);
    const [lastname, setLastname] = useState(currentUser.lastname);

    console.log(currentUser);

    useEffect(()=> {
        if(status === SUCCESS) {
            navigate('/feed');
        }
    }, [status]);

    useEffect( () => {
        if(!currentUser.email && user) {
            dispatch( updateUserDetails({ updates: { email: user?.email } }) );
            //  console.log(user);
        }
    }, [dispatch, currentUser, user] );

    useEffect( () => {
        if(isLoading) {
            dispatch( showLoader() );
        } else {
            dispatch( hideLoader() );
        }
    }, [dispatch, isLoading] );

    const saveChanges = (event: FormEvent) => {
        event.preventDefault();
        dispatch(saveUserDetails( { firstname, lastname } ));
    }

    return (
        <form onSubmit={ saveChanges } >
            <label htmlFor="firstName">Enter first name</label>
            <input type="text" name="firstName" value={ firstname } onChange={ (e: ChangeEvent< HTMLInputElement >) => { setFirstname(e.target.value)  } } />

            <label htmlFor="lastname">Enter last name</label>
            <input type="text" name="lastname" value={ lastname } onChange={ (e: ChangeEvent< HTMLInputElement >) => { setLastname(e.target.value)  } } />
            <button>Save changes</button>
        </form>
    )
}