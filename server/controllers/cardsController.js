const List = require('../models/list');
const Board = require('../models/board');
const Card = require('../models/card');
const HttpError = require('../models/httpError');
const { validationResult } = require('express-validator');

const createCard = async (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    try {
      const list = await List.findById(req.body.listId);
      const newCard = new Card({
        title: req.body.card.title,
        listId: req.body.listId,
        boardId: list.boardId,
      });
      const savedCard = await newCard.save();
      list.cards = list.cards.concat(savedCard._id);
      await list.save();
      res.json(savedCard);
      res.status(201).end();
    } catch (err) {
      new HttpError('Creating card failed, please try again: ' + err, 500);
    }
  } else {
    return next(new HttpError('The input field is empty.', 422));
  }
};

const getCard = async (req, res, next) => {
  const { id } = req.params;
  try {
    const card = await Card.findById(id); // TODO: .populate('actions');
    res.json(card);
  } catch (err) {
    next(new HttpError('Invalid card id provided' + err, 404));
  }
};

exports.createCard = createCard;
exports.getCard = getCard;
