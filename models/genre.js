/* Third-party packages */
const mongoose = require('mongoose');
const Joi = require('joi');

/* Genre Schema */
const genreSchema = new mongoose.Schema({
  name:{ 
  type: String,
  required: true,
  minlength: 5,
  maxlength: 50
  }
});

/* Genre Model */
const Genre = mongoose.model('Genre', genreSchema);

/* Input Validation Function */
function validateGenre(genre) {
  const schema = {
      name: Joi.string().min(5).max(50).required()
  }
  return Joi.validate(genre, schema);
};

/* Exports */
exports.genreSchema = genreSchema;
exports.Genre = Genre;
exports.validateGenre = validateGenre;

/* END */