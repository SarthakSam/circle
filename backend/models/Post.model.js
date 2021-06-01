const { Schema, model } = require('mongoose');

const PostSchema = new Schema({
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    images: [{ type: String }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    reactions: [{ type: Schema.Types.ObjectId, ref: 'Reaction' }]
});

const Post = model('post', PostSchema);

module.exports = { Post };