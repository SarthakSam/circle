import { unwrapResult } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { FaCamera } from 'react-icons/fa';
import { useParams } from "react-router";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { ImageUpload } from "../../../shared-components/image-upload/ImageUpload";
import { imageUploader } from "../../../utils/imageUploader";
import { showNotification } from "../../meta-info/metaInfoSlice";
import { getFriendshipStatus, getUserDetails, saveUserDetails, selectCurrentUser, selectFriendShipStatus, setFriendShipStatus, selectVisitedUser, setVisitedUser } from "../usersSlice";
import styles from './Profile.module.css';
import { UserInfoForm } from "./user-info-form/UserInfoForm";

export function Profile() {
    const { userId } = useParams();
    let user = useAppSelector( selectVisitedUser );
    const dispatch = useAppDispatch();
    const [imageUploadFor, setImageUploadFor] = useState< "none" | "profile" | "cover" >("none");
    const currentUser = useAppSelector( selectCurrentUser );
    const friendshipStatus = useAppSelector( selectFriendShipStatus );
    
    useEffect( () => {
        dispatch(getUserDetails(userId));
        dispatch( getFriendshipStatus(userId) );
        return () => {
            dispatch( setVisitedUser({ user: null}) );
            dispatch( setFriendShipStatus({ status: 'SAME_USER' }) );
        }
    }, [userId, dispatch] );

    const uploadImages = async (pictures: File[]) => {
        const key = imageUploadFor === 'profile'? "profilePic" : "backgroundPic";
        try {
            const response = await Promise.all( imageUploader(pictures) );
            const result = await dispatch( saveUserDetails( { [key]: response[0].data.image } ) );
            unwrapResult(result);
            setImageUploadFor("none");
            dispatch( showNotification({ type: 'SUCCESS', message: 'Image uploaded successfully' }) );
        } catch(err) {
            dispatch( showNotification({ type: 'ERROR', message: 'Image upload failed' }) );
        }
    }

    return (
        <>
        {
            user &&  
            <div className="row">
                <section className={ `row ${styles.imagesSection}` }>
                    <div className={ `col-9 m-0 p-0 ${styles.imagesContainer}` }>
                        <img  src={ user?.backgroundPic?.url || "/assets/background.png" } alt="" />
                        <div className={styles.profilePic}>
                            <img  src={ user?.profilePic?.url || "/assets/male-user.jpg" } alt=""/>
                            {
                                currentUser._id === user._id &&
                            <span tabIndex={1} className={ `badge badge--lg badge--round ${ styles.editProfilePicButton }` } onClick = { () => { setImageUploadFor("profile") } } >
                                <FaCamera fill="white" />
                            </span>
                            }
                        </div>
                        {
                            currentUser._id === user._id &&
                            <button className = { styles.editCoverPicButton } onClick = { () => { setImageUploadFor("cover") } } > <FaCamera /> Edit Cover Photo</button>
                        }
                    </div>
                </section>
                <UserInfoForm user={user} currentUser = {currentUser} friendshipStatus={ friendshipStatus } />
            </div>
        }
        { imageUploadFor !== 'none' && <ImageUpload closePopup={ () => { setImageUploadFor("none") } } uploadImages = { uploadImages } singleImage={ true }/> }
        </>
    );
}