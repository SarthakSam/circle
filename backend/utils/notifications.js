const { Notification } = require('../models/Notification.model');

module.exports =  async function ({ user, type, extraInfo }) {
    try {
        const notification = await Notification.create({ user, type, extraInfo});
        console.log(notification);
    } catch(err) {
        console.log(err);
    }
}
