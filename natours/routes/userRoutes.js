const express = require('express');

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'not implemented yet'
  })
};

const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'not implemented yet'
  })
};

const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'not implemented yet'
  })
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'not implemented yet'
  })
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'not implemented yet'
  })
};

const userRouter = express.Router();

userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);
