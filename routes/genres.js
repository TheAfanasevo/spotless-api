/* App dependencies */
const express = require('express');
const router = express.Router();
/* Classes, objects, functions */
const { Genre, validateGenre } = require('../models/genre');
/* Custom middleware */
const validateObjectId = require('../middleware/validateObjectId');
const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');

/* ROUTERS */
/* GET ROUTERS */
router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

router.get('/:id', validateObjectId, async (req, res) => {
    const genre = await Genre.findById(req.params.id);

    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    res.send(genre);
});

/* POST ROUTERS */
router.post('/', [auth, validate(validateGenre)], async (req, res) => {
    let genre = new Genre({ name: req.body.name });
    await genre.save();

    res.send(genre);
});

/* PUT ROUTERS */
router.put('/:id', [auth, validateObjectId, validate(validateGenre)], async (req, res) => {
    const genre = await Genre.
        findByIdAndUpdate(req.params.id, { name: req.body.name },
            { new: true });

    if (!genre) return res.status(404).send('The genre with the given ID was not found.');

    res.send(genre);
});

/* DELETE ROUTERS */
router.delete('/:id', [auth, admin, validateObjectId], async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);

    if (!genre) return res.status(404).send('The genre with the given ID was not found.');

    res.send(genre);
});

/* Exports */
module.exports = router;

/* END */