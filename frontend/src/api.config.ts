const urlMapping = {
    'fetchPosts': '/posts',
    'createPost': '/posts',
    'like': '/posts/:postId/like',
    'unlike': '/posts/:postId/unlike',
    'comment': '/posts/:postId/comments',
    'reply': '/posts/:postId/comments/:commentId/replies',
    'getUserDetails': '/users',
    'saveUserDetails': '/users'
}

type urlMappingTypes = 'fetchPosts' | 'createPost' | 'saveUserDetails' | 'getUserDetails' | 'like' | 'unlike' | 'comment' | 'reply';

export function getURL(urlMappingKey: urlMappingTypes, params: any = {}): string {
    return Object.keys(params).reduce( ( acc: string, cur: string ) => {
        return acc.replace(`:${cur}`, params[cur]);
    }, urlMapping[urlMappingKey]);
}