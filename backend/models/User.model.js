const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
        firstname: { type: String, default: ""},
        lastname: { type: String, default: ""},
        email: { type: String, required: 'Email is mandatory', unique: 'A user with this email aready exists' },
        profilePic: { type: String },
        backgroundPic: { type: String},
        emailVerified: { type: Boolean, default: false },
        headline: String,
        friends: [ { type: Schema.Types.ObjectId, ref: 'User' } ]
}, { timestamps: true });

const User = model('user', UserSchema);

module.exports = { User };