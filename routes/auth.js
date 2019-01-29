/* App dependencies */
const express = require('express');
const router = express.Router();
/* Third party packages */
const bcrypt = require('bcrypt');
const _ = require('lodash');
const Joi = require('joi');
/* Classes, objects, functions */
const { User } = require('../models/user');
/* Custom middleware */
const validate = require('../middleware/validate');

/* ROUTERS */
router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', validate(validateRequest), async (req, res) => { //TODO: adding token here? NO  
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid email or password.');

  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if (!validPassword) return res.status(400).send('Invalid email or password.');

  const token = user.generateAuthToken();
  res.send(token); /*me.pug can be rendered instead*/
});

/* Input Validation Function */
function validateRequest(req) {
  const schema = {
    username: Joi.string().max(50),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required()
  };
  console.log('request body', req);
  return Joi.validate(req, schema);
};

/* Exports */
module.exports = router;

/* END */