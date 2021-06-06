const express = require('express'),
      router  = express.Router(),
      Post    = require('../models/Post.model').Post,
      Reaction    = require('../models/Reaction.model').Reaction,
      { parseUserId } = require('../utils/parse-functions');


router.get('/', async ( req, res) => {
    try {
        const posts = await Post.find({}).populate('author', 'firstname lastname profilePic' ).populate("reactions");
        res.status(200).json({ message: 'Success', posts });
    } catch(err) {
        console.log(err);
        res.status(500).json({ errorMessage: 'Unable to fetch posts. Please try again.' });
    }
});

router.post('/', async (req, res) => {
    const post = req.body;
    post.author = parseUserId(req.user);
    try {
        const newPost = (await Post.create(post))
        await newPost.execPopulate('author', 'firstname lastname profilePic');
        res.status(201).json({ message: 'Success', post: newPost });
    } catch(err) {
        console.log(err);
        res.status(500).json({ errorMessage: 'Unable to create post right now. Please try again.' });
    }
});

router.post('/:postId/like', async (req, res) => {
    const post = req.post;
    try {
        const reaction = await Reaction.create({ reactedBy: parseUserId(req.user), type: 'LIKE' });
        post.reactions.push( reaction );
        await post.save();
        res.status(201).json({ message: 'Success', reaction });
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.post('/:postId/unlike', async (req, res) => {
    const post = req.post;
    const userId = parseUserId(req.user);
    try {
        const reaction = post.reactions.find(reaction => reaction.reactedBy.equals(userId));
        post.reactions.filter( reaction => !reaction.reactedBy.equals(userId) );
        await post.save();
        res.status(201).json({ message: 'Success', reaction });
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.param('postId', async (req, res, next, postId) => {
    try {
        const post = await Post.findById(postId);
        if(post) {
            req.post = post;
            return next();
        }
        res.status(500).json({ errorMessage: 'Unable to fetch post' });
    } catch(err) {
        console.log(err);
        next(err);
    }
});

module.exports = router;