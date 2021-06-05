const urlMapping = {
    'fetchPosts': '/posts',
    'createPost': '/posts',
    'saveUserDetails': '/users'
}

type urlMappingTypes = 'fetchPosts' | 'createPost' | 'saveUserDetails';

export function getURL(urlMappingKey: urlMappingTypes, params: any = {}): string {
    return Object.keys(params).reduce( ( acc: string, cur: string ) => {
        return acc.replace(`:${cur}`, params[cur]);
    }, urlMapping[urlMappingKey]);
}