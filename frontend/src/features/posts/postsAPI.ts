import { IPost } from './posts.type';
// import axios from 'axios';
// import { getURL } from '../../api.config';
// import { IApiResponse } from '../../app.types';

// const postsData: IPost[] = [ {
//     _id: 'abcd',
//     author: 'Sarthak',
//     content: 'Lorem',
//     images: [],
//     comments: [],
//     reactions: {}
// },
// {
//     _id: 'abcde',
//     author: 'Sam',
//     content: 'wc ekv ecdm vrv',
//     images: [],
//     comments: [],
//     reactions: {}
// },
// {
//     _id: 'abcdf',
//     author: 'Surender',
//     content: ' fenekcelc feifnecece cenceoc',
//     images: [],
//     comments: [],
//     reactions: {}
// }   
// ]

// // export async function getPosts(): Promise< IApiResponse<IPost[]> > {
// //     return axios.get<IPost[]>( getURL('fetchPosts') );
//     // return new Promise<{ data: IPost[], message: string }>( (resolve, reject) => {
//     //     setTimeout( () => {
//     //         resolve( { data: postsData, message: 'Success' } );
//     //         // reject({ errorMessage: 'Something went wrong' });
//     //      }, 2000 );
//     // } );
// // }

// export function addPost(body: string) {
//     return axios.post( getURL('createPost'), { content: body } );
//     // return new Promise<{ data: string, message: string }>( (resolve, reject) => {
//     //     setTimeout( () => {
//     //         resolve( { data: body, message: 'Success' } );
//     //         // reject({ errorMessage: 'Something went wrong' });
//     //      }, 2000 );
//     // } );
// }
