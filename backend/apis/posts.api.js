const express = require('express'),
      router  = express.Router(),
      Post    = require('../models/Post.model').Post;


router.get('/', async ( req, res) => {
    try {
        const posts = await Post.find({});
        res.status(200).json({ message: 'Success', posts });
    } catch(err) {
        console.log(err);
        res.status(500).json({ errorMessage: 'Unable to fetch posts. Please try again.' });
    }
});

router.post('/', async (req, res) => {
    const post = req.body;
    try {
        const newPost = await Post.create(post);
        res.status(201).json({ message: 'Success', post: newPost });
    } catch(err) {
        console.log(err);
        res.status(500).json({ errorMessage: 'Unable to create post right now. Please try again.' });
    }
});

module.exports = router;