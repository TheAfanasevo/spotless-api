/* Third-party packages */
const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Joi = require('joi');

/* User Schema */
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 255
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  isAdmin: Boolean,
});

/* A method to create Json Web Tokens */
userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'));
  return token;
} /* Cannot use arrow function as we use 'this' here */

/* User Model */
const User = mongoose.model('User', userSchema);

/* Input Validation Function */
function validateUser(user) {
  const schema = {
      username: Joi.string().min(5).max(50).required(),
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(1024).required()
  }
  return Joi.validate(user, schema);
};

/* Exports */
exports.User = User;
exports.validateUser = validateUser;

/* END */