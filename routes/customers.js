/* App dependencies */
const express = require('express');
const router = express.Router();
/* Classes, objects, functions */
const { Customer, validateCustomer } = require('../models/customer');
/* Custom middleware */
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');

/* ROUTERS */
/* GET ROUTERS */
router.get('/', async (req, res) => {
  let customers = await Customer.find().sort('name').select('name');
  res.send(customers); //TODO: Create a view for this and display all customers as a list or table etc.
})

router.get('/:id', async (req, res) => {
  const customer = Customer.findById(req.params.id);

  if (!customer) return res.status(404).send('The customer with the given ID was not found.');
  res.send(customer); //TODO Create a view for the requested customer and display necessary info
});

/* POST ROUTERS */
router.post('/', [auth, validate(validateCustomer)], async (req, res) => {
  const customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold
  });

  await customer.save();

  res.send(customer); //TODO Create a form in a new page to which a 'Create Customer' button direct
});

/* PUT ROUTERS */
router.put('/:id', [auth, validate(validateCustomer)], async (req, res) => {
  const customer = await Customer.
    findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      phone: req.body.phone,
      isGold: req.body.isGold
    },
      { new: true });

  if (!customer) return res.status(404).send('The customer with the given ID was not found.');

  res.send(customer); //TODO Create a form for updating customer information. A button can direct to it.
});

/* DELETE ROUTERS */
router.delete('/:id', [auth, validate(validateCustomer)], async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);

  if (!customer) return res.status(404).send('The customer with the given ID was not found.');

  res.send(customer); //Delete customers clicking a single button.
});

/* Exports */
module.exports = router;

/* END */