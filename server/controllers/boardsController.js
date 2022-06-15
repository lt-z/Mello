const Board = require('../models/board');
const HttpError = require('../models/httpError');
const { validationResult } = require('express-validator');

const getBoards = (req, res, next) => {
  Board.find({}, 'title _id createdAt updatedAt').then((boards) => {
    res.json(boards);
  });
};

const getBoard = async (req, res, next) => {
  const { id } = req.params;
  try {
    const board = await Board.findById(id).populate('lists');
    res.json(board);
  } catch (err) {
    next(new HttpError('Invalid board id provided', 500));
  }
};

const createBoard = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    Board.create({
      title: req.body.board.title,
      lists: [],
    })
      .then((board) => {
        res.json({
          title: board.title,
          _id: board._id,
          createdAt: board.createdAt,
          updatedAt: board.updatedAt,
        });
      })
      .catch((err) =>
        next(new HttpError('Creating board failed, please try again', 500))
      );
  } else {
    return next(new HttpError('The input field is empty.', 404));
  }
};

exports.getBoards = getBoards;
exports.createBoard = createBoard;
exports.getBoard = getBoard;
