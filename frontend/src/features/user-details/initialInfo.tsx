import { ChangeEvent, FormEvent, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { saveUserDetails } from "./usersSlice";
import { showNotification } from '../meta-info/metaInfoSlice'
import { useNavigate } from "react-router";
import { unwrapResult } from "@reduxjs/toolkit";

export function InitialInfo() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");

    const saveChanges = async (event: FormEvent) => {
        event.preventDefault();
        try {
            const resultAction = await dispatch(saveUserDetails( { firstname, lastname } ));
            unwrapResult(resultAction);
            navigate('/feed');
        } catch(err) {
            console.log(err);
            dispatch(showNotification({ type: 'ERROR', message: 'Something went wrong. Please try again' }));
            
        }
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