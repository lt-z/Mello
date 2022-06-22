const mongoose = require('mongoose');
const Card = require('../models/card');
const List = require('../models/list');
const Schema = mongoose.Schema;

const ActionSchema = new Schema({
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  cardId: { type: Schema.Types.ObjectId, ref: 'Card'},
});

ActionSchema.set('timestamps', true);
const Action = mongoose.model('Action', ActionSchema);

module.exports = Action;
