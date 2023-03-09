const joi = require("joi");

const code = joi.string().min(3).max(10);
const name = joi.string().min(3).max(25);
const price = joi.number();
const stock = joi.number().min(1);
const author = joi.string().min(3).max(25);
const isbn = joi.string().min(3).max(25);

const createProductSchema = joi.object({
  code: code.required(),
  name: name.required(),
  price: price.required(),
  stock: stock.required(),
  author: author.required(),
  isbn: isbn.required(),
});

const updateProductSchema = joi.object({
  code: code,
  name: name,
  price: price,
  stock: stock,
  isbn: isbn,
});

module.exports = {
  createProductSchema,
  updateProductSchema,
};
