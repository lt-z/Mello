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
    const card = await Card.findById(id);
    res.json(card);
  } catch (err) {
    next(new HttpError('Invalid card id provided' + err, 404));
  }
};

const updateCard = async (req, res, next) => {
  try {
    const updatedCard = await Card.findByIdAndUpdate(
      req.params.id,
      { ...req.body.card, $push: { actions: req.action._id } },
      {
        new: true,
      }
    );

    res.json(updatedCard);
  } catch (e) {
    new HttpError('Updating card failed, please try again: ' + e, 500);
  }
};

const updateCardActions = async (req, res, next) => {
  try {
    const { dueDate, completed, listId, archived } = req.body.card;
    const card = await Card.findById(req.params.id);

    const actionDescription = action(
      dueDate,
      completed,
      listId,
      archived,
      card
    );
    const newAction = await Action.create({
      description: actionDescription,
      cardId: req.params.id,
    });
    req.action = newAction;
    next();
  } catch (e) {
    new HttpError('Updating card failed, please try again: ' + e, 500);
  }
};

const action = (dueDate, completed, listId, archived, card) => {
  if (dueDate && card.dueDate === null) {
    return 'Added a due date';
  }
  if (dueDate !== undefined && dueDate === null && card.dueDate) {
    return 'Removed the due date';
  }
  if (dueDate !== undefined && dueDate !== card.dueDate) {
    return 'Due date changed';
  }
  if (completed !== undefined && completed !== card.completed) {
    return 'Marked the due date complete';
  }
  if (listId !== undefined && listId !== card.listId) {
    return 'Added this card to my list';
  }
  if (archived !== undefined && !archived) {
    return 'Card was taken out of archive';
  }
  if (archived !== undefined && archived) {
    return 'Card was archived';
  }
  return '';
};

exports.createCard = createCard;
exports.getCard = getCard;
exports.updateCard = updateCard;
exports.updateCardActions = updateCardActions;
