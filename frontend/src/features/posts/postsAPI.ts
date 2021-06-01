import { IPost } from './posts.type';

const postsData: IPost[] = [ {
    _id: 'abcd',
    author: 'Sarthak',
    content: 'Lorem',
    images: [],
    comments: [],
    reactions: {}
},
{
    _id: 'abcde',
    author: 'Sam',
    content: 'wc ekv ecdm vrv',
    images: [],
    comments: [],
    reactions: {}
},
{
    _id: 'abcdf',
    author: 'Surender',
    content: ' fenekcelc feifnecece cenceoc',
    images: [],
    comments: [],
    reactions: {}
}   
]

export function getPosts() {
    return new Promise<{ data: IPost[], message: string }>( (resolve, reject) => {
        setTimeout( () => {
            // resolve( { data: postsData, message: 'Success' } );
            reject({ errorMessage: 'Something went wrong' });
         }, 2000 );
    } );
}