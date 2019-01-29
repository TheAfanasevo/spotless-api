/* App dependencies */
const express = require('express');
const router = express.Router();
/* Third-party packages */
const Joi = require('joi');
/* Classes, objects, functions */
const { Rental } = require('../models/rental');
const { Movie } = require('../models/movie');
/* Custom middleware */
const validate = require('../middleware/validate');
const auth = require('../middleware/auth');

/* ROUTERS */
/* POST ROUTERS */
router.post('/', [auth, validate(validateReturn)], async (req, res) => {
  const rental = await Rental.lookup(req.body.customerId, req.body.movieId);
  if (!rental) return res.status(404).send('Rental not found.');

  if (rental.dateReturned) return res.status(400).send('Return already processed.');

  rental.return();
  await rental.save();

  await Movie.update({ _id: rental.movie._id }, {
    $inc: { numberInStock: 1 }
  });


  return res.send(rental); /* No need to set status to 200 as express does it by default */

  /* Deleted as we imported our auth middleware to check this
  res.status(401).send('Unauthorized'); */
});

/* Input Validation Function */
function validateReturn(req) {
  const schema = {
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required()
  }
  return Joi.validate(req, schema);
};

/* Exports */
module.exports = router;

/* END */