const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardSchema = new Schema({
  title: {
    type: String,
    required: [true, 'The Card title is required'],
  },
  dueDate: Date,
  labels: Array,
  description: String,
  listId: { type: Schema.Types.ObjectId, ref: 'List' },
  boardId: { type: Schema.Types.ObjectId, ref: 'Board' },
  position: Number,
  completed: Boolean,
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  actions: [{ type: Schema.Types.ObjectId, ref: 'Action' }], // TODO: What are actions?
});

CardSchema.set('timestamps', true);
const Card = mongoose.model('Card', CardSchema);

module.exports = Card;
