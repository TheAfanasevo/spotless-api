/* Third-party packages */
const mongoose = require('mongoose');
const Joi = require('joi');

/* Customer Model & Scheme */
const Customer = mongoose.model('Customer', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  isGold: {
    type: Boolean,
    required: true
  },
  phone: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  }
})
);

/* Input Validation Function */
function validateCustomer(customer) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    phone: Joi.string().min(5).max(50).required(),
    isGold: Joi.boolean()
  };
  return Joi.validate(customer, schema);
};

/* Exports */
exports.Customer = Customer;
exports.validateCustomer = validateCustomer;

/* END */