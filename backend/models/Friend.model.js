const { Schema, model } = require('mongoose');

const FriendSchema = new Schema({
    user1: { type: Schema.Types.ObjectId, ref: "user", required: true },
    user2: { type: Schema.Types.ObjectId, ref: "user", required: true },
    status: { type: String, required: true }  // FRIENDS, REQUESTED, DECLINED
}, { timestamps: true });

FriendSchema.index({ user1: 1, user2: 1}, { unique: true });

const Friend = model("friend", FriendSchema);

module.exports = { Friend };