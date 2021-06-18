import { unwrapResult } from '@reduxjs/toolkit';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppDispatch } from '../../../../app/hooks';
import { showNotification } from '../../../meta-info/metaInfoSlice';
import { IFriendshipStatus, IUser } from '../../users.types';
import { addFriend, saveUserDetails, removeFriend } from '../../usersSlice';
import styles from './UserInfoForm.module.css';


export function UserInfoForm( { user, currentUser, friendshipStatus }: {user: IUser, currentUser: IUser, friendshipStatus: IFriendshipStatus} ) {
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

    const sendOrAcceptFriendRequest = async () => {
        const message = friendshipStatus === 'NOT_FRIENDS'? 'Friend request sent' : 'Friend request accepted successfully';
        try {
            const resultAction = await dispatch(addFriend({ user1: currentUser._id!, user2: user._id! }));
            unwrapResult(resultAction);
            dispatch(showNotification({ type: 'SUCCESS', message }));
        } catch(err) {
            dispatch( showNotification({ type: 'ERROR', message: 'Unable to make changes' }) );
        }
    }

    const cancelOrDeclineRequest = async () => {
        const message = friendshipStatus === 'FRIENDS'? 'Unfriended user' : 'Friend request declined successfully';
        try {
            const resultAction = await dispatch(removeFriend({ user1: currentUser._id!, user2: user._id! }));
            unwrapResult(resultAction);
            dispatch(showNotification({ type: 'SUCCESS', message }));
        } catch(err) {
            dispatch( showNotification({ type: 'ERROR', message: 'Unable to make changes' }) );
        }
    }

    const canSubmitForm = () => {
        return !(userInfo.firstname && userInfo.lastname);
    }

    return (
        <form className={ `row ${styles.userInfoForm}` } onSubmit = { saveChanges } >           
                <div className="col-8 col-lg-10 col-sm-12" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h2> User Details </h2>
                    <div>
                        {
                            friendshipStatus === 'NOT_FRIENDS' &&
                            <button type="button" className="btn btn--purple" onClick = { sendOrAcceptFriendRequest } >Add as Friend</button>
                        }
                        {
                            friendshipStatus === 'REQUESTED' &&
                            <button type="button" className="btn btn--danger" onClick = { cancelOrDeclineRequest } >Cancel Request</button>
                        }
                        {
                            friendshipStatus === 'ACTION_REQUIRED' &&
                            <>
                                <button type="button" className="btn btn--purple" onClick = { sendOrAcceptFriendRequest } >Accept Request</button>
                                <button type="button" className="btn btn--danger" onClick = { cancelOrDeclineRequest } >Decline Request</button>
                            </>
                        }
                        {
                            friendshipStatus === 'FRIENDS' &&
                            <>
                                <button type="button" className="btn btn--danger" onClick = { cancelOrDeclineRequest } >Unfriend</button>
                            </>
                        }
                    </div>
                </div>
                <div className = "col-8 col-lg-10 col-sm-12">
                    <label htmlFor="firstname">First Name</label>
                    <div className={ `input input--fluid ${ userInfo._id !== currentUser._id? styles.uneditable : '' }`}>
                        <input type="text" name="firstname" disabled = { userInfo._id !== currentUser._id } id="firstname" value={ userInfo.firstname } onChange = { (e: ChangeEvent<HTMLInputElement>) => { onChange('firstname', e.target.value) } }/>
                    </div>
                </div>
                
                <div className = "col-8 col-lg-10 col-sm-12">
                    <label htmlFor="lastname">Last Name</label>
                    <div className={ `input input--fluid ${ userInfo._id !== currentUser._id? styles.uneditable : '' }`}>
                        <input type="text" name="lastname" disabled = { userInfo._id !== currentUser._id } id="lastname" value={ userInfo.lastname } onChange = { (e: ChangeEvent<HTMLInputElement>) => { onChange('lastname', e.target.value) } } />
                    </div>
                </div>

                <div className = "col-8 col-lg-10 col-sm-12">
                    <label htmlFor="headline">Headline</label>
                    <div className={ `input input--fluid ${ userInfo._id !== currentUser._id? styles.uneditable : '' }`}>
                        <input type="text" name="headline" disabled = { userInfo._id !== currentUser._id } id="headline" placeholder="Not added" value={ userInfo.headline } onChange = { (e: ChangeEvent<HTMLInputElement>) => { onChange('headline', e.target.value) } }/>
                    </div>
                </div>

                <div className = "col-8 col-lg-10 col-sm-12">
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
                {
                     userInfo._id === currentUser._id && 
                    <div className="col-8 col-lg-10 col-sm-12">
                        <button className="btn btn--primary" disabled={ canSubmitForm() } >Save Changes</button>
                    </div>
                }
        </form>
    )
}