const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User needs a name'],
    trim: true
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
    minLength: [8, 'Password needs at least 8 characters']
  },
  passwordConfirm: {
    type: String,
    required: [true, 'User needs to confirm password']
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
