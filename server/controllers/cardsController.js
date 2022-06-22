const List = require('../models/list');
const Board = require('../models/board');
const Card = require('../models/card');
const Action = require('../models/action');
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

const updateCard = async (req, res, next) => {
  try {
    const { dueDate, completed, listId, archived, ...remaining } = req.body.card;
    console.log(req.body.card);
    console.log(remaining);

    const newAction = new Action({
      ...req.body.card,
      cardId: req.params.id,
    });
    console.log(remaining);

    const savedAction = await newAction.save();
    const card = await Card.findById(req.params.id);
    card.actions = card.actions.concat(savedAction)
    await card.save();

    res.json(card);
  } catch(e) {
    new HttpError('Updating card failed, please try again: ' + e, 500)
  }
}

exports.createCard = createCard;
exports.getCard = getCard;
exports.updateCard = updateCard;