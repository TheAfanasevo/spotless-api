/* App dependencies */
const express = require('express');
const router = express.Router();
/* Third party middleware */
const bcrypt = require('bcrypt');
const _ = require('lodash');
/* Classes, objects, functions */
const {User, validateUser} = require('../models/user');
/* Custom middleware */
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');

/* ROUTERS */
/* GET ROUTERS */
router.get('/me', [auth, validate(validateUser)], async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user); /* To see currently logged user */
});

/* POST ROUTERS */
router.post('/', validate(validateUser), async (req, res) => {
  let user = await User.findOne({email: req.body.email});
  if (user) return res.status(400).send('User already registered.');

 /* Old implementation 
    user = new User({
    username: req.body.username,
    email: req.body.username,
    password: req.body.password
  }) */
  /* Using Lodash library to pick expected properties */
  user = new User(_.pick(req.body, ['username', 'email', 'password']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  
  await user.save();

  const token = user.generateAuthToken();
  res.header('x-auth-token', token).send(_.pick(user, ['_id', 'username', 'email']));
});

/* Exports */
module.exports = router;

/* END */