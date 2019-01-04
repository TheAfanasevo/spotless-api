/* App dependencies */
const express = require('express');
const router = express.Router();
/* Third party packages */
const bcrypt = require('bcrypt');
const _ = require('lodash');
const Joi = require('joi');
/* Classes, objects, functions */
const {User} = require('../models/user');
/* Custom middleware */
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');

/* ROUTERS */
router.post('/', [auth, validate(validateRequest)], async (req, res) => {
  let user = await User.findOne({email: req.body.email});
  if (!user) return res.status(400).send('Invalid email or password.');

  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if(!validPassword) return res.status(400).send('Invalid email or password.');

  const token = user.generateAuthToken();
  res.send(token);
});

/* Input Validation Function */
function validateRequest(req) {
  const schema = {
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(1024).required()
  }
  return Joi.validate(req, schema);
};

/* Exports */
module.exports = router;

/* END */