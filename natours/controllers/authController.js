const { promisify } = require('util')
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const jwt = require('jsonwebtoken');
const AppError = require('./../utils/appError');
const sendEmail = require('./../utils/email');


const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES
    })
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    passwordChangedAt: req.body.passwordChangedAt
  });

  const token = signToken(newUser._id)

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
    return next(new AppError('You need to have a valid email and pw!', 400));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))){
    return next(new AppError('Incorrect email or pw!', 401));
  }

  const token = signToken(user._id);
  res.status(200).json({
    status: 'sucess',
    token
  })
});


exports.protect = catchAsync(async (req, res, next) => {
  let token;

  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    token = req.headers.authorization.split(' ')[1];
  }

  if(!token){
    return next(new AppError('You have to login to have access!', 401))
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);
  if(!currentUser){
    return next(new AppError('This user has been deleted.', 401));
  }

  if(currentUser.changedPasswordAfter(decoded.iat)){
    return next(new AppError('The password was changed, please login again.', 401))
  }


  req.user = currentUser;
  next();
})

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if(!roles.includes(req.user.role)){
      return next(new AppError("You don't have permission for that", 403));
    }
    next();
  }
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if(!user){
    return next(new AppError('No user with this e-mail', 404));
  }

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetURL = `${req.protocol}://${req.get('host')}/api/v1/resetPassword/${resetToken}`;

  const message = `Forgot password? Go to ${resetURL}`;

  try{
    await sendEmail({
      email: user.email,
      subject: 'This is the subject for your reset pw',
      message
    })

    res.status(200).json({
      status: 'sucess',
      message: 'Token sent to email'
    })
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires= undefined;
    await user.save({ validateBeforeSave: false })

    next(new AppError('There was an error, try again later.', 500))
  }


  next();
});


exports.resetPassword = (req, res, next) => {
  next();
}
