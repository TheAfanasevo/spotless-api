/* App dependencies */
const express = require('express');
const router = express.Router();
/* Classes, objects, functions */
const { Movie, validateMovie } = require('../models/movie');
const { Genre } = require('../models/genre');
/* Custom middleware */
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');

/* ROUTERS */
/* GET ROUTERS */
router.get('/', async (req, res) => {
  const movies = await Movie.find().sort('name').select('-__v');
  res.send(movies); //TODO Create a view to display all available movies.
});

router.get('/:id', async (req, res) => {
  const movie = Movie.findById(req.params.id);

  if (!movie) return res.status(404).send('The movie with the given ID was not found.');
  res.send(movie);
});

/* POST ROUTERS */
router.post('/', [auth, validate(validateMovie)], async (req, res) => {
  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send('Invalid genre.');

  const movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name
      /* to exclude _v property and possible others
      we did't simply write genre: genre */
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  });

  await movie.save();

  res.send(movie);
});

/* PUT ROUTERS */
router.put('/:id', [auth, validate(validateMovie)], async (req, res) => {
  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send('Invalid genre.');

  const movie = await Movie.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  }, { new: true });

  if (!movie) return res.status(404).send('The movie with the given ID was not found.');

  res.send(movie);
});

/* DELETE ROUTERS */
router.delete('/:id', auth, async (req, res) => {
  const movie = Movie.findByIdAndRemove(req.body.id);

  if (!movie) return res.status(404).send('The movie with the given ID was not found.')

  res.send(movie);
});

/* Exports */
module.exports = router;

/* END */