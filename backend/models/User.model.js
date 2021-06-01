const { Schema, model } = require('mongoose'),

const UserSchema = new Schema({
    username: { type: string, required: 'Username is mandatory', unique: 'Please choose a unique username'},
    email: { type: string },
    friends: [ { type: Schema.Types.objectId, ref: 'User' } ]
});

const User = model('user', UserSchema);

module.exports = { User };