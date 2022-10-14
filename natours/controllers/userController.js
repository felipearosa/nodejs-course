const AppError = require('../utils/appError');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');

const filterObj = (obj, ...fields) => {
  const finalObj = {};
  Object.keys(obj).forEach( el => {
    if(fields.includes(el)) finalObj[el] = obj[el]
  });

  return finalObj;
}

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'sucess',
    results: users.length,
    data:{
      users
    }
  })

});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'not implemented yet'
  })
};

exports.updateMe = catchAsync(async (req, res, next) => {
  if(req.body.password || req.body.passwordConfirm){
    return next(new AppError('Not the place for updating pw, try "/updateMyPassword"', 400));
  }

  const filteredBody = filterObj(req.body, 'name', 'email')

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'sucess',
    data:{
      user: updatedUser
    }
  })
});

exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'not implemented yet'
  })
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'not implemented yet'
  })
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'not implemented yet'
  })
};
