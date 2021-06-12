const { Schema, model } = require('mongoose');

const NotificationSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "user", required: true, index: true },
    type: { type: String, required: true },
    isRead: { type: Boolean, required: false },
    // message: { type: String, required: true },
    extraInfo: { type: Schema.Types.Mixed }
}, { timestamps: true });

const Notification = model("notification", NotificationSchema);

module.exports = { Notification };