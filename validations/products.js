'use strict'

const Joi = require('joi');

module.exports.post = {
  body: {
    category: Joi.sting()
    .label('Category')
    .max(255)
    .trim()
    .required(),
  price: Joi.number()
    .label('Price')
    .min(0),
    .required(),
  name: Joi.string()
    .label('Name')
    .max(255)
    .trim()
    .required(),
  description: Joi.string()
    .label('Description')
    .trim()
    .required(),
  units_in_stock: Joi.number()
    .label('Units in stock')
    .integer()
    .optional()
  }
};


module.exports.patch = {
  body: {
    category: Joi.sting()
    .label('Category')
    .max(255)
    .trim()
    .optional(),
  price: Joi.number()
    .label('Price')
    .min(0),
    .optional(),
  name: Joi.string()
    .label('Name')
    .max(255)
    .trim()
    .optional(),
  description: Joi.string()
    .label('Description')
    .trim()
    .optional(),
  units_in_stock: Joi.number()
    .label('Units in stock')
    .integer()
    .optional()
  }
};
