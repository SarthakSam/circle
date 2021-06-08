const { Schema, model } = require('mongoose'),
        Populate = require('../utils/populate');

const CommentSchema = new Schema({
    content: { type: String, required: 'Comment cannot be blank' },
    author: { type: Schema.Types.ObjectId, ref: 'user' },
    comments: [{ type: Schema.Types.ObjectId, ref: 'comment' }]
}, { timestamps: true });

CommentSchema
    .pre('findOne', Populate('author', 'firstname', 'lastname', 'profilePic',  'headline'))
    .pre('find', Populate('author', 'firstname', 'lastname', 'profilePic',  'headline'))
    .pre('findOne', Populate('comments'))
    .pre('find', Populate('comments'));

const Comment = model('comment', CommentSchema);

module.exports = { Comment };