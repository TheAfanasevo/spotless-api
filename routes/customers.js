/* App dependencies */
const express = require('express');
const router = express.Router();
/* Classes, objects, functions */
const {Customer, validateCustomer} = require('../models/customer');
/* Custom middleware */
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');

/* ROUTERS */
/* GET ROUTERS */
router.get('/', async (req, res) => {
  let customers = await Customer.find().sort('name');
  res.send(customers);
})

router.get('/:id', async (req, res) => {
  const customer = Customer.findById(req.params.id);

  if (!customer) return res.status(404).send('The customer with the given ID was not found.');
  res.send(customer);
});

/* POST ROUTERS */
router.post('/', [auth, validate(validateCustomer)], async (req, res) => {
  const customer = new Customer({ 
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold  
    });

  await customer.save();

  res.send(customer);
});

/* PUT ROUTERS */
router.put('/:id', [auth, validate(validateCustomer)], async (req, res) => {
  const customer = await Customer.
  findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold}, 
  {new: true});
  
  if (!customer) return res.status(404).send('The customer with the given ID was not found.');

  res.send(customer);
});

/* DELETE ROUTERS */
router.delete('/:id', [auth, validate(validateCustomer)], async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);
  
  if (!customer) return res.status(404).send('The customer with the given ID was not found.');

  res.send(customer);
});

/* Exports */
module.exports = router;

/* END */