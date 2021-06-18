const { Notification } = require('../models/Notification.model');

module.exports =  async function ({ notificationFor, type, extraInfo, notificationBy }) {
    try {
        const notification = await Notification.create({ notificationFor, type, extraInfo, notificationBy});
        console.log(notification);
    } catch(err) {
        console.log(err);
    }
}
