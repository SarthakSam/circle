import { ChangeEvent, FormEvent, useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { saveUserDetails } from "../usersSlice";
import { showNotification } from '../../meta-info/metaInfoSlice'
import { useNavigate } from "react-router";
import { unwrapResult } from "@reduxjs/toolkit";
import styles from './InitialInfo.module.css';

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
        <div className={ styles.formContainer }>
            <form onSubmit={ saveChanges } className={ styles.initialInfoForm }>
                <h1>
                    Hi, Please tell us a bit about yourself
                </h1>

                <div className={ styles.formField }>
                    <label htmlFor="firstName">Enter first name</label>
                    <div className={ `input input--fluid`}>
                        <input type="text" name="firstName" value={ firstname } onChange={ (e: ChangeEvent< HTMLInputElement >) => { setFirstname(e.target.value)  } } />
                    </div>
                </div>

                <div className={ styles.formField }>
                    <label htmlFor="lastname">Enter last name</label>
                    <div className={ `input input--fluid`}>
                        <input type="text" name="lastname" value={ lastname } onChange={ (e: ChangeEvent< HTMLInputElement >) => { setLastname(e.target.value)  } } />  
                    </div>
                </div>
                
                <button className={ `btn btn--purple` }>Save changes</button>
            </form>
        </div>
    )
}