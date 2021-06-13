const express = require('express'),
      router = express.Router(),
      { User } = require('../models/User.model');

router.post('/', async (req, res, next) => {
    const user = req.body;
    console.log("logging this message for debugging", {user});
    try {
        const newUser = await User.create(user);
        if(newUser) {
            return res.status(201).json({ message: `Hello`, user: newUser });
        }
        res.status(500).json({ errorMessage: "Something went wrong." });
    } catch(err) {
        console.log(err);
        next(err);
    }
});

module.exports = router;