const mongoose = require('mongoose');
const Card = require('../models/card');
const List = require('../models/list');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  text: {
    type: String,
    required: [true, 'Text is required'],
  },
  cardId: [{ type: Schema.Types.ObjectId, ref: 'Card' }],
});

Comment.set('timestamps', true);
const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
