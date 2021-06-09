import { unwrapResult } from '@reduxjs/toolkit';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppDispatch } from '../../../../app/hooks';
import { showNotification } from '../../../meta-info/metaInfoSlice';
import { IUser } from '../../users.types';
import { saveUserDetails } from '../../usersSlice';
import styles from './UserInfoForm.module.css';


export function UserInfoForm( { user, currentUser }: {user: IUser, currentUser: IUser} ) {
    const [userInfo, setUserInfo] = useState(user);
    const dispatch = useAppDispatch();
    
    const onChange = (key: string, value: string) => {
        setUserInfo( userInfo => ({ ...userInfo, [key]: value }) );
    }

    const saveChanges = async (event: FormEvent) => {
        event.preventDefault();
        try {
            const resultAction = await dispatch(saveUserDetails(userInfo));
            unwrapResult(resultAction);
            dispatch(showNotification({ type: 'SUCCESS', message: 'Changes made successfully' }));
        } catch(err) {
            dispatch( showNotification({ type: 'ERROR', message: 'Unable to save changes' }) );
        }
    }

    return (
        <form className={ `row ${styles.userInfoForm}` } onSubmit = { saveChanges } >           
                <h2 className="col-9"> User Details </h2>
                <div className = "col-9">
                    <label htmlFor="firstname">First Name</label>
                    <div className={ `input input--fluid ${ userInfo._id !== currentUser._id? styles.uneditable : '' }`}>
                        <input type="text" name="firstname" disabled = { userInfo._id !== currentUser._id } id="firstname" value={ userInfo.firstname } onChange = { (e: ChangeEvent<HTMLInputElement>) => { onChange('firstname', e.target.value) } }/>
                    </div>
                </div>
                
                <div className = "col-9">
                    <label htmlFor="lastname">Last Name</label>
                    <div className={ `input input--fluid ${ userInfo._id !== currentUser._id? styles.uneditable : '' }`}>
                        <input type="text" name="lastname" disabled = { userInfo._id !== currentUser._id } id="lastname" value={ userInfo.lastname } onChange = { (e: ChangeEvent<HTMLInputElement>) => { onChange('lastname', e.target.value) } } />
                    </div>
                </div>

                <div className = "col-9">
                    <label htmlFor="headline">Headline</label>
                    <div className={ `input input--fluid ${ userInfo._id !== currentUser._id? styles.uneditable : '' }`}>
                        <input type="text" name="headline" disabled = { userInfo._id !== currentUser._id } id="headline" value={ userInfo.headline || "Not added" } onChange = { (e: ChangeEvent<HTMLInputElement>) => { onChange('headline', e.target.value) } }/>
                    </div>
                </div>

                <div className = "col-9">
                    <label htmlFor="gender">Gender</label>
                    {
                        userInfo._id === currentUser._id?   
                        <div className="row">
                                <div className="col-2 col-sm-4">
                                <label htmlFor="male">Male</label>
                                <input type="radio" name="gender" id="male" checked={ userInfo.gender === "male" } onChange = { () => { onChange('gender', 'male') } }/>
                            </div>
                            <div className="col-2 col-sm-4">
                                <label htmlFor="female">Female</label>
                                <input type="radio" name="gender" id="female"  checked={ userInfo.gender === "female" } onChange = { () => { onChange('gender', 'female') } }/>
                            </div>
                            <div className="col-2 col-sm-4">
                                <label htmlFor="others">Others</label>
                                <input type="radio" name="gender" id="others" checked={ userInfo.gender === "others" } onChange = { () => { onChange('gender', 'others') } } />
                            </div>
                        </div>
                        : 
                        <div className={ `input input--fluid ${ styles.uneditable }`}>
                            <input type="text" name="gender" disabled id="gender" value={ userInfo.gender || "Not added" }/>
                        </div>
                    }
                </div>
                <div className="col-9">
                     <button className="btn btn--primary">Save Changes</button>
                </div>
        </form>
    )
}