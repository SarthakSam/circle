function parseUserId(user) {
    return user.sub.split("|")[1];
}

function parseUserDetails(user) {
    return {
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        profilePic: user.profilePic,
        backgroundPic: user.backgroundPic,
        emailVerified: user.emailVerified,
        friends: user.friends,
        headline: user.headline,
        gender: user.gender
    }
}

module.exports = { parseUserId, parseUserDetails };