import axios from "axios";

export function imageUploader(images: File[]){
    return images.reduce((acc, image: File) => { 
        const formData = new FormData();
        formData.append('image', image);
        acc.push( axios.post('/uploads', formData, { headers: { "Content-Type": "multipart/form-data" } }) );
        return acc;
     }, new Array<any>(0) );
}