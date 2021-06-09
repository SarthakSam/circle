import axios from "axios";
import { IApiResponse, IImage } from "../app.types";
// import { useAuth0 } from "@auth0/auth0-react";

export function imageUploader(images: File[]){
    // const promises = [];
    // const { getAccessTokenSilently } = useAuth0();
    // const authToken = await
    // let promises = new Array<Promise< IApiResponse<IImage> >>(0);
    return images.reduce((acc, image: File) => { 
        const formData = new FormData();
        formData.append('image', image);
        acc.push( axios.post('/uploads', formData, { headers: { "Content-Type": "multipart/form-data" } }) );
        return acc;
     }, new Array<any>(0) );
}