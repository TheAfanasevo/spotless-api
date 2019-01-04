/* Third-party packages */
const mongoose = require('mongoose');
const Joi = require('joi');
/* Classes, objects, functions */
const {genreSchema} = require('./genre');

/* Movie Model & Schema */
const Movie = mongoose.model('Movie', new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255
  },
  genre: {
    type: genreSchema,
    required: true
  },
  numberInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 255
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0,
    max: 255
  }
}));

/* Input Validation Function */
function validateMovie(movie) {
  const schema = {
      title: Joi.string().min(5).max(50).required(),
      genreId: Joi.objectId().required(), /* id only */
      numberInStock: Joi.number().min(0).required(),
      dailyRentalRate: Joi.number().min(0).required()
  };
  return Joi.validate(movie, schema);
};

/* Exports */
exports.Movie = Movie;
exports.validateMovie = validateMovie;

/* END */