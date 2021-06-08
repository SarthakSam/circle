// import { unwrapResult } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { FaCamera } from 'react-icons/fa';
import { useParams } from "react-router";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { ImageUpload } from "../../../shared-components/image-upload/ImageUpload";
// import { showNotification } from "../../meta-info/metaInfoSlice";
import { getUserDetails, saveUserDetails, selectVisitedUser } from "../usersSlice";
import styles from './Profile.module.css';
import { UserInfoForm } from "./user-info-form/UserInfoForm";

export function Profile() {
    const { userId } = useParams();
    let user = useAppSelector( selectVisitedUser );
    const dispatch = useAppDispatch();
    const [imageUploadFor, setImageUploadFor] = useState("none");
    const [changes, setChanges] = useState({});
    
    useEffect( () => {
        dispatch(getUserDetails(userId));
    }, [userId] );

    console.log(user);

    const uploadImages = async (pictures: File[]) => {
        console.log('uploading image')
        // try {
        //     const formData = new FormData();
        //     const key = imageUploadFor === 'profile'? 'profilePic' : 'backgroundPic';
    	// 	formData.append(key, pictures[0]);
        //     const resultAction = await dispatch(saveUserDetails(formData));
        //     unwrapResult(resultAction);
        //     showNotification({ type: 'SUCCESS', message: 'Image uploaded successfully' });
        // } catch(err) {
        //     showNotification({ type: 'ERROR', message: 'Image upload failed' });
        // }
    }

    return (
        <>
        {
            user &&  
            <div className="row">
                <section className={ `row ${styles.imagesSection}` }>
                    <div className={ `col-9 m-0 p-0 ${styles.imagesContainer}` }>
                        <img  src={ user?.backgroundPic || "/assets/background.png" } alt="" />
                        <div className={styles.profilePic}>
                            <img  src={ user?.profilePic || "/assets/male-user.jpg" } alt=""/>
                            <span tabIndex={1} className={ `badge badge--lg badge--round ${ styles.editProfilePicButton }` } onClick = { () => { setImageUploadFor("profile") } } >
                                <FaCamera fill="white" />
                            </span>
                        </div>
                        <button className = { styles.editCoverPicButton } onClick = { () => { setImageUploadFor("cover") } } > <FaCamera /> Edit Cover Photo</button>
                    </div>
                </section>
                <UserInfoForm user={user} />
            </div>
        }
        { imageUploadFor !== 'none' && <ImageUpload closePopup={ () => { setImageUploadFor("none") } } uploadImages = { uploadImages } singleImage={ true }/> }
        </>
    );
}