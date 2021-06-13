const express = require('express'),
      router = express.Router(),
      { User } = require('../models/User.model'),
      { Friend } = require('../models/Friend.model'),
      isUserAuthenticated =  require('../middlewares/isJwtValid'),
      {parseUserId, parseUserDetails} = require('../utils/parse-functions');

router.get('/' , isUserAuthenticated, getUser, (req, res) => {
    res.status(200).json({ message: 'Success', user: parseUserDetails(req.userDetails) });
});

router.get('/search', isUserAuthenticated, async (req, res, next) => {
    const query = req.query.searchQuery;
    const regex = new RegExp(query, "gi");
    try {
         const users = await User.find( {$or:[{ "firstname" : {$regex: regex} },{ "lastname" : {$regex: regex} }]} ).select({ firstname: 1, lastname: 1, profilePic: 1 }).exec();
        // console.log(users);
        res.status(200).json({ message: "Success", users });
    } catch(err) {
        console.log(err);
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    const user = req.body;
    console.log(user);
    try {
        const newUser = User.create(user);
        if(newUser) {
            return res.status(201).json({ message: `Hi ${user.username}`, user: newUser });
        }
        res.status(500).json("Something went wrong.");
    } catch(err) {
        console.log(err);
        next(err);
    }
});

router.put('/', isUserAuthenticated, async (req, res, next) => {
    const updatedDetails = req.body;
    console.log(updatedDetails);
    try {
        const updatedUser = await User.findByIdAndUpdate( parseUserId(req.user), updatedDetails, {new: true});
        if(updatedUser) {
            console.log(updatedUser);
            return res.status(200).json({ message: 'Success', user: parseUserDetails(updatedUser) });
        }
        return res.status(500).json({ errorMessage: 'Unable to save user. Please try again' });
    } catch(err) {
        console.log(err);
        next(err);
    }
});

router.get('/:userId', isUserAuthenticated, async (req, res, next) => {
    return res.status(200).json({ user: parseUserDetails(req.currentUser), message: 'Success' });
    // console.log(req.params.userId);
    // try {
    //     const user = await User.findById(req.params.userId);
    //     if(user) {
    //         return res.status(200).json({ user: parseUserDetails(user), message: 'Success' });
    //     }
    //     res.status(500).json({ errorMessage: 'Unable to fetch user details' });
    // } catch(err) {
    //     console.log(err);
    //     next(err);
    // }
});

router.get('/:userId/suggestions', isUserAuthenticated, async (req, res, err) => {
    const user = req.params.userId;
    try {
        const friends = await Friend.find({  $and: [{ $or: [{user1: user}, {user2: user}] }, {status: "FRIENDS"} ] }).select("_id").exec();
        friends.push({_id: user });
        const suggestions = await User.find({ _id: { $nin: friends } }).select({ firstname: 1, lastname: 1, profilePic: 1 })
        res.status(200).json({ message: 'Success', suggestions });
    } catch (err) {
        console.log(err);
        next(err);
    }
});

router.param('userId', async (req, res, next, userId) => {
    try {
        const user = await User.findById(userId);
        if(user) {
            req.currentUser = user;
            return next();
        }
        res.status(500).json({ errorMessage: 'Unable to fetch user' });
    } catch(err) {
        console.log(err);
        next(err);
    }
});


async function getUser(req, res, next) {
    const userId = parseUserId(req.user);
    console.log(userId);
    try {
        const user = await User.findById(userId);
        if(!user) {
            return res.status(500).json({ errorMessage: 'Unable to fetch user' });
        }
        req.userDetails = user;
        console.log(user);
        next();
    } catch(err) {
        console.log(err);
        next(err);
    }
}

module.exports = router;