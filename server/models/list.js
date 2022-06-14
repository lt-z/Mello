const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListSchema = new Schema({
  title: {
    type: String,
    required: [true, 'The List title is required'],
  },
  position: Number,
  cards: [{ type: Schema.Types.ObjectId, ref: 'Card' }],
  boardId: { type: Schema.Types.ObjectId, ref: 'Board' },
});

ListSchema.set('timestamps', true);
const List = mongoose.model('List', ListSchema);

module.exports = List;
