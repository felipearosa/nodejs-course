const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const jwt = require('jsonwebtoken');
const AppError = require('./../utils/appError')

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm
  });

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES
  })

  res.status(201).json({
    status: 'sucess',
    token,
    data: {
      user: newUser
    }
  })
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if(!email || !password){
    return next(new AppError('You need to have a valid email and pw!', 400))
  }

  // const user = User.findOne({ email });



  const token = '';
  res.status(200).json({
    status: 'sucess',
    token
  })
});
