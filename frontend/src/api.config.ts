const urlMapping = {
    'fetchPosts': '/posts',
    'createPost': '/posts',
    'like': '/posts/:postId/like',
    'unlike': '/posts/:postId/unlike',
    'getUserDetails': '/users',
    'saveUserDetails': '/users'
}

type urlMappingTypes = 'fetchPosts' | 'createPost' | 'saveUserDetails' | 'getUserDetails' | 'like' | 'unlike';

export function getURL(urlMappingKey: urlMappingTypes, params: any = {}): string {
    return Object.keys(params).reduce( ( acc: string, cur: string ) => {
        return acc.replace(`:${cur}`, params[cur]);
    }, urlMapping[urlMappingKey]);
}