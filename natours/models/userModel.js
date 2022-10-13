const mongoose = require('mongoose');
const validator = require('validator');
const bycript = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User needs a name'],
    trim: true
  },
  role: {
    type: String,
    enum: ['user', 'guide', 'lead-guide', 'admin'],
    default: 'user'
  },
  email: {
    type: String,
    unique: [true, 'User email must be unique'],
    required: [true, 'User needs an email'],
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, 'Needs to be a valid email']
  },
  photo: {
    type: String
  },
  password: {
    type: String,
    required: [true, 'User needs a password'],
    minLength: [8, 'Password needs at least 8 characters'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'User needs to confirm password'],
    validate: {
      validator: function(el){
        return el === this.password
      },
      message: 'Passwords must match'
    }
  },
  passwordChangedAt: Date
});

userSchema.pre('save', async function(next){
  if (!this.isModified('password')) return next();

  this.password = await bycript.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function(candidatePassword, userPassword){
  return await bycript.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function(JWTTimestamp){
  if(this.passwordChangedAt){
    const changedTimeStamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return changedTimeStamp > JWTTimestamp;
  }
  return false;
};


const User = mongoose.model('User', userSchema);

module.exports = User;
