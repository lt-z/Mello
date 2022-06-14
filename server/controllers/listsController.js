const List = require('../models/list');
const HttpError = require('../models/httpError');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const getLists = (req, res, next) => {
  List.find({}, 'title _id createdAt updatedAt').then((lists) => {
    res.json(lists);
  });
};

const createList = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    List.create({
      title: req.body.list.title,
      boardId: req.body.boardId,
    })
      .then((list) => {
        res.json({
          _id: list._id,
          title: list.title,
          boardId: list.boardId,
          createdAt: list.createdAt,
          updatedAt: list.updatedAt,
          position: list.position,
        });
      })
      .catch((err) =>
        next(
          new HttpError('Creating list failed, please try again: ' + err, 500)
        )
      );
  } else {
    return next(new HttpError('The input field is empty.', 422));
  }
};

exports.getLists = getLists;
exports.createList = createList;
