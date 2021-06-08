const urlMapping = {
    'fetchPosts': '/posts',
    'createPost': '/posts',
    'like': '/posts/:postId/like',
    'unlike': '/posts/:postId/unlike',
    'comment': '/posts/:postId/comments',
    'reply': '/posts/:postId/comments/:commentId/replies',
    'getCurrentUserDetails': '/users',
    'saveUserDetails': '/users',
    'getUserDetails': '/users/:userId'
}

type urlMappingTypes = 'fetchPosts' | 'createPost' | 'saveUserDetails' | 'getCurrentUserDetails' | 'like' | 'unlike' | 'comment' | 'reply' | 'getUserDetails';

export function getURL(urlMappingKey: urlMappingTypes, params: any = {}): string {
    return Object.keys(params).reduce( ( acc: string, cur: string ) => {
        return acc.replace(`:${cur}`, params[cur]);
    }, urlMapping[urlMappingKey]);
}