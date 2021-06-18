
const express = require('express'),
      router  = express.Router(),
      { Notification } = require('../models/Notification.model');

router.get('/', async (req, res, next) => {
    const user = req.userId;
    try {
        const notifications = await Notification.find({ notificationFor: user }).populate('notificationBy', "firstname lastname profilePic");
        res.status(200).json({ message: 'Success', notifications });
    } catch (err) {
        console.log(err);
        next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    const updates = req.body;
    try {
        const notification = await Notification.findByIdAndUpdate(req.params.id, updates);
        res.status(200).json({ message: 'Success', notification });
    } catch (err) {
        console.log(err);
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const notification = await Notification.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Success', notification });
    } catch (err) {
        console.log(err);
        next(err);
    }
});

module.exports = router;