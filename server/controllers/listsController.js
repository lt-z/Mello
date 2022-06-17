const List = require('../models/list');
const Board = require('../models/board');

const HttpError = require('../models/httpError');
const { validationResult } = require('express-validator');

const createList = async (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    const newList = new List({
      title: req.body.list.title,
      boardId: req.body.boardId,
      cards: [],
    });
    try {
      const savedList = await newList.save();
      const board = await Board.findById(req.body.boardId);
      board.lists = board.lists.concat(savedList._id);
      await board.save();
      console.log(savedList);
      res.json({
        _id: savedList._id,
        title: savedList.title,
        boardId: savedList.boardId,
        createdAt: savedList.createdAt,
        updatedAt: savedList.updatedAt,
        position: savedList.position,
      });
    } catch (err) {
      new HttpError('Creating list failed, please try again: ' + err, 500);
    }
  } else {
    return next(new HttpError('The input field is empty.', 422));
  }
};

const updateList = async (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    try {
      const currList = await List.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      await currList.save();

      // res.json({cards, ...currList})
      res.json({
        _id: currList._id,
        title: currList.title,
        boardId: currList.boardId,
        createdAt: currList.createdAt,
        updatedAt: currList.updatedAt,
        position: currList.position,
      });
    } catch (err) {
      next(new HttpError('Error: ' + err, 500));
    }
  } else {
    return next(new HttpError('The title field is empty.', 422));
  }
};

exports.createList = createList;
exports.updateList = updateList;
