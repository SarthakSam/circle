const express = require('express'),
      router = express.Router(),
      Friend = require('../models/Friend.model').Friend;

router.get('/:user1/friends', async (req, res, next) => {
    const user1 = req.params.user1;
    // returns friends of user1
    try {
        const friends = await Friend.find({ user1: user1, status: "FRIENDS" });
        res.status(200).json({ message: 'Success', friends });
    } catch (err) {
        console.log(err);
        next(err)
    }
});

router.post('/:user1/friends', async (req, res) => {
    const user1 = req.params.user1;
    const user2 = req.body.whom;
    // user1 sends friend request to user2
    // user2 confirms friendship
    try {
        const friends = await Friend.findOne({ user1: user1, user2: user2 }) || await Friend.findOne({ user1: user2, user2: user1 });
        if(friends == null) {
                const friends = await Friend.create({ user1, user2, status: "REQUESTED" });
                res.status(201).json({ mesage: "Friend request sent", status: "REQUESTED" });
        } else {
            if(friends.status === 'REQUESTED') {
                friends.status = "FRIENDS";
                await friends.save();
                return res.status(200).json({ message: 'Success', status: "FRIENDS" });
            // } else if( friends.status === 'DECLINED' ) {
            //     friends.status = "REQUESTED";
            } else {
                return res.status(200).json({ message: 'You are already friends', status: "FRIENDS" });
            }
        }
    } catch (err) {
        console.log(err);
        next(err)
    }
});

router.get('/:user1/friends/:user2', async (req, res ) => {
    const user1 = req.params.user1;
    const user2 = req.params.user2;

    // get status of friendship
    try {
        let friend = await Friend.findOne({ user1: user1, user2: user2 });
        if(friend) {
            return res.status(200).json({ message: 'Success', status: friend.status });
        }
        friend = await Friend.findOne({ user1: user2, user2: user1 });
        if(friend) {
            return res.status(200).json({ message: 'Success', status: friend.status === "REQUESTED"? "ACTION_REQUIRED" : friend.status });
        }
        return res.status(200).json({ message: 'Success', status: "NOT_FRIENDS" });
    } catch (err) {
        console.log(err);
        next(err);
    }
});


router.put('/:user1/friends/:user2', async (req, res ) => {
    const user1 = req.params.user1;
    const user2 = req.params.user2;
    const action = req.body.action;
    // user1 could change any aspect of friendship with user2 in this route like declining friend request, acepting friend request
    try {
        const friends = await Friend.findOne({ user1: user1, user2: user2 }) || await Friend.findOne({ user1: user2, user2: user1 });
        if(friends) {
            if( action === 'ACCEPT' )
                friends.status = "FRIENDS";
            else if(action === 'DECLINE')
                friends.status = "DECLINED"    
            friends.save();
           res.status(200).json({ message: 'Success', friends });
        }
    } catch (error) {
        console.log(err);
        next(err);
    }
});

router.delete('/:user1/friends/:user2', async (req, res) => {
    // user1  unfriending user2
    const user1 = req.params.user1;
    const user2 = req.params.user2;
    try {
        const friends = await Friend.findOne({ user1: user1, user2: user2 }) || await Friend.findOne({ user1: user2, user2: user1 });
        console.log(friends);
        if(friends) {
           await friends.delete();
           res.status(200).json({ message: 'Success', status: 'NOT_FRIENDS' });
        } else {
           res.status(500).json({ errorMesage: "Unable to process request" });
        }
    } catch (error) {
        console.log(err);
        next(err);
    }
});

module.exports = router;