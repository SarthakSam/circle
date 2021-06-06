const { Schema, model } = require('mongoose');

const ReactionSchema = new Schema({
    reactedBy: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    type: { type: String, required: true }
}, { timestamps: true });

const Reaction = model('reaction', ReactionSchema);

module.exports = { Reaction };