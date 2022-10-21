const AppError = require('../utils/appError');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');

const filterObj = (obj, ...fields) => {
  const finalObj = {};
  Object.keys(obj).forEach( el => {
    if(fields.includes(el)) finalObj[el] = obj[el]
  });

  return finalObj;
}


exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Use signup'
  })
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id
  next();
}

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
    status: 'success',
    data:{
      user: updatedUser
    }
  })
});

exports.deleteMe = catchAsync(async(req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status:'success',
    data: null
  });
});

exports.getAllUsers = factory.getAll(User)
exports.getUser = factory.getOne(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
