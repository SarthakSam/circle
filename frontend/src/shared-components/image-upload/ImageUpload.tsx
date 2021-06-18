import { MouseEventHandler, useState } from "react";
import { Popup } from "../popup/Popup";
import styles from './ImageUpload.module.css';
import ImageUploader from 'react-images-upload';

export function ImageUpload( { closePopup, uploadImages, singleImage = false }: { closePopup: MouseEventHandler<HTMLSpanElement>, uploadImages: Function, singleImage?: boolean } ) {

    const [pictures, setPictures] = useState<File[]>([]);
    const upload = () => {
        uploadImages(pictures);
    }

    const onDrop = (pictureFiles: File[], pictureDataURLs: any) => {
        setPictures(pictureFiles)
    }

    return (
        
        <Popup title = "Upload Image" closePopup={ closePopup }> 
            <ImageUploader
                    withIcon={true}
                    buttonText='Choose images'
                    onChange={onDrop}
                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                    maxFileSize={5242880}
                    withPreview={true}
                    singleImage={ singleImage }
                />
            <div className="row">
                    <button className={ `btn btn--outline btn--primary ${ styles.uploadButton } `} onClick = { upload } >Upload</button>
            </div>
        </Popup> 
        // <form onSubmit = { submit } className="row">
        //     <label htmlFor="imageUpload" className={ `col-12 ${styles.selectImageButton}` }> 
        //         <FaImage /> Select Image
        //     </label>
        //     <input type="file" id="imageUpload" style={{ display: "none" }} />
        // </form>
    );
}