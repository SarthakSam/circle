const express = require('express'),
      router = express.Router(),
      { User } = require('../models/User.model'),
      {parseUserId, parseUserDetails} = require('../utils/parse-functions');

router.get('/' , getUser, (req, res) => {
    res.status(200).json({ message: 'Success', user: parseUserDetails(req.userDetails) });
});

// router.post('/users', async (req, res, next) => {
//     const user = req.body;
//     try {
//         const newUser = User.create(user);
//         if(newUser) {
//             return res.status(201).json({ message: `Hi ${user.username}`, user: newUser });
//         }
//         res.status(500).json("Something went wrong.");
//     } catch(err) {
//         console.log(err);
//         next(err);
//     }
// });

router.put('/', async (req, res) => {
    const updatedDetails = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate( parseUserId(req.user), updatedDetails, {new: true});
        if(updatedUser) {
            return res.status(200).json({ message: 'Success', user: parseUserDetails(updatedUser) });
        }
        return res.status(500).json({ errorMessage: 'Unable to save user. Please try again' });
    } catch(err) {
        console.log(err);
        next(err);
    }
});

async function getUser(req, res, next) {
    const userId = req.user.sub.split("|")[1];
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