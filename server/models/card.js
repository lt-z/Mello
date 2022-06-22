const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardSchema = new Schema({
  title: {
    type: String,
    required: [true, 'The Card title is required'],
  },
  dueDate: { type: Date, default: null },
  labels: Array,
  description: { type: String, default: '' },
  listId: { type: Schema.Types.ObjectId, ref: 'List' },
  boardId: { type: Schema.Types.ObjectId, ref: 'Board' },
  position: { type: Number, default: 65535.0 },
  completed: { type: Boolean, default: false },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  actions: [{ type: Schema.Types.ObjectId, ref: 'Action' }],
  archived: { type: Boolean, default: false },
});

CardSchema.set('timestamps', true);
const Card = mongoose.model('Card', CardSchema);

module.exports = Card;
