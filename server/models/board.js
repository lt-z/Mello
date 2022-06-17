const mongoose = require('mongoose');
const Card = require('../models/card');
const List = require('../models/list');
const Schema = mongoose.Schema;

const BoardSchema = new Schema({
  title: {
    type: String,
    required: [true, 'The Board title is required'],
  },
  lists: [{ type: Schema.Types.ObjectId, ref: 'List' }],
});

BoardSchema.set('timestamps', true);
const Board = mongoose.model('Board', BoardSchema);

module.exports = Board;
