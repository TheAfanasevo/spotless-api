/* Third-party packages */
const Joi = require('joi');
const mongoose = require('mongoose');
const moment = require('moment');

/* Rental Schema */
const rentalSchema = new mongoose.Schema({
  customer: { /* we create a new schema to take only essential properties for the rental database collection */
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
      },
      isGold: {
        type: Boolean,
        default: false
      },
      phone: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
      }
    }),
    required: true
  },

  movie: {
    type: new mongoose.Schema({
      title: { /* We only take two properties */
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
      },
      dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
      },
    }),
    required: true
  }, /* New data */
  dateOut: {
    type: Date,
    required: true,
    default: Date.now
  },
  dateReturned: {
    type: Date,
    /* Will be set later */
  },
  rentalFee: {
    type: Number,
    min: 0
  }
});

/* Static method to find the searched customer and movie object */
rentalSchema.statics.lookup = function (customerId, movieId) {
  return this.findOne({
    /* Sub-docs */
    'customer._id': customerId,
    'movie._id': movieId
  });
};

/* Method to set values of dateReturned and rentalFee*/
rentalSchema.methods.return = function () {
  this.dateReturned = new Date();

  const rentalDays = moment().diff(this.dateOut, 'days');
  this.rentalFee = rentalDays * this.movie.dailyRentalRate;
};

/* Rental Model */
const Rental = mongoose.model('Rental', rentalSchema);

function validateRental(rental) {
  const schema = {
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required()
  };

  return Joi.validate(rental, schema);
}

/* Exports */
exports.Rental = Rental;
exports.validateRental = validateRental;

/* END */