const { Schema, model } = require('mongoose'),

const CommentSchema = new Schema({
    content: string,
    author: { type: Schema.Types.ObjectId, ref: 'User' },
});

const Comment = model('comment', CommentSchema);

module.exports = { Comment };