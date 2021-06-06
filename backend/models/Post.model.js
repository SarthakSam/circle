const { Schema, model } = require('mongoose');

const PostSchema = new Schema({
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    images: [{ type: String }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'comment', required: true }],
    reactions: [{ type: Schema.Types.ObjectId, ref: 'reaction' }]
}, { timestamps: true });

const Post = model('post', PostSchema);

module.exports = { Post };