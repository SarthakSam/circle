const {User} = require('../models/User.model');

async function parseUserId(req, res, next) {
    console.log(req.user);
    let user = req.user;
    const userInfo = user.sub.split("|");
    if(userInfo[0] === "auth0") {
        req.userId = userInfo[1];
        return next();
    }
    try {
        user = await User.findOne({ googleId: userInfo[1] });  
        if(user) {
            req.userId = user._id;
            return next();    
        }
        return res.status(500).json({ message: "Unable to find user" });
    } catch(err) {
        console.log(err);
        next(err);
        // res.status(500).json({ errorMessage: err })
    }
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
        headline: user.headline,
        gender: user.gender
    }
}

module.exports = { parseUserId, parseUserDetails };