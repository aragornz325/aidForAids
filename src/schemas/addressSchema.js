const joi = require("joi");

const street = joi.string().min(3).max(25);
const number = joi.number().min(1);
const city = joi.string().min(3).max(25);
const postalCode = joi.number().min(1);
const state = joi.string().min(3).max(25);
const country = joi.string().min(3).max(25);

const createAddressSchema = joi.object({
  street: street.required(),
  number: number.required(),
  city: city.required(),
  postalCode: postalCode.required(),
  state: state.required(),
  country: country.required(),
});

const updateAddressSchema = joi.object({
  street: street,
  number: number,
  city: city,
  postalCode: postalCode,
  state: state,
  country: country,
});

module.exports = {
  createAddressSchema,
  updateAddressSchema,
};
