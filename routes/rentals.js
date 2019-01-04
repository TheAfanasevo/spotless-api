/* App dependencies */
const express = require ('express');
const router = express.Router();
const mongoose = require('mongoose');
/* Third-party packages */
const Fawn = require('fawn');
/* Classes, objects, functions*/
const {Rental, validateRental} = require('../models/rental');
const {Movie} = require('../models/movie');
const {Customer} = require('../models/customer');
/* Custom middleware */
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');

/* Initials */
Fawn.init(mongoose);

/* ROUTERS */
/* GET ROUTERS */
router.get('/', async (req, res) => {
  const rentals = await Rental.find().sort('-dateOut');
  res.send(rentals);
});

router.get('/:id', async (req, res) => {
  const rental = await Rental.findById(req.params.id);

  if (!rental) return res.status(404).send('The rental with the given ID was not found.');

  res.send(rental);
});

/* POST ROUTERS */
router.post('/', [auth, validate(validateRental)], async (req, res) => {
  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send('Invalid customer.');

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send('Invalid movie.');

  if (movie.numberInstock === 0) return res.status(400).send('Movie is out of stock.');

  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate
    }
  });

  try {
  // /* Fawn used to perform transaction - multiple taskas */
  new Fawn.Task() /* collection name first */
    .save('rentals', rental)
    .update('movies', { _id: movie._id}, {
      $inc: { numberInStock: -1}
    })
    .run();

  res.send(rental);
  }
  catch(ex) {
    res.status(500).send('Internal server error.');
  }
});

/* Exports */
module.exports = router;

/* END */