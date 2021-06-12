const urlMapping = {
    'fetchPosts': '/posts',
    'createPost': '/posts',
    'like': '/posts/:postId/like',
    'unlike': '/posts/:postId/unlike',
    'comment': '/posts/:postId/comments',
    'reply': '/posts/:postId/comments/:commentId/replies',
    'getCurrentUserDetails': '/users',
    'saveUserDetails': '/users',
    'getUserDetails': '/users/:userId',
    'searchUsers': '/users/search?searchQuery=:query',
    'getFriendshipStatus': '/users/:user1/friends/:user2',
    'addFriend': '/users/:user1/friends',
    'removeFriend': '/users/:user1/friends/:user2',
    'friendSuggestions': '/users/:user/suggestions',
    'getNotifications': '/notifications',
    'updateNotification': '/notification/:id'
}

type urlMappingTypes = 'fetchPosts' | 'createPost' | 'saveUserDetails' | 'getCurrentUserDetails' | 'like' | 'unlike' | 'comment' | 'reply' | 'getUserDetails' | 'searchUsers' | 'getFriendshipStatus' | 'addFriend' | 'removeFriend' | 'friendSuggestions' | 'getNotifications' | 'updateNotification';

export function getURL(urlMappingKey: urlMappingTypes, params: any = {}): string {
    return Object.keys(params).reduce( ( acc: string, cur: string ) => {
        return acc.replace(`:${cur}`, params[cur]);
    }, urlMapping[urlMappingKey]);
}