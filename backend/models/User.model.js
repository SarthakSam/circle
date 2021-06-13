const mongoose = require('mongoose'),
{ Schema, model } = mongoose;

const UserSchema = new Schema({
        googleId: { type: String },
        firstname: { type: String, default: ""},
        lastname: { type: String, default: ""},
        email: { type: String, required: 'Email is mandatory', unique: 'A user with this email aready exists' },
        profilePic: { type: Object },
        backgroundPic: { type: Object},
        emailVerified: { type: Boolean, default: false },
        headline: String,
        gender: String
}, { timestamps: true });

const User = model('user', UserSchema);

module.exports = { User };