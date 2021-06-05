function parseUserId(user) {
    return user.sub.split("|")[1];
}

function parseUserDetails(user) {
    return {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        profilePic: user.profilePic,
        backgroundPic: user.backgroundPic,
        emailVerified: user.emailVerified,
        friends: user.friends
    }
}

module.exports = { parseUserId, parseUserDetails };