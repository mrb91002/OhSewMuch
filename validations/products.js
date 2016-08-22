'use strict'

const Joi = require('joi');

module.exports.post = {
  options: {
    allowUnknownBody: false,
  },

  body: {
    category: Joi.string()
    .label('Category')
    .max(255)
    .trim()
    .required(),
  price: Joi.number()
    .label('Price')
    .min(0)
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
  dimensions: Joi.string()
    .label('Dimensions')
    .trim()
    .optional(),
  units_in_stock: Joi.number()
    .label('Units in stock')
    .integer()
    .optional(),
  images: Joi.array()
    .label('Images')
    .required()
  }
};

module.exports.patch = {
  options: {
    allowUnknownBody: false,
  },

  params: {
    id: Joi.number()
      .label('Product ID')
      .integer()
      .min(1)
      .required()
  },

  body: {
    category: Joi.string()
      .label('Category')
      .max(255)
      .trim()
      .optional(),
    price: Joi.number()
      .label('Price')
      .min(0)
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
    dimensions: Joi.string()
      .label('Dimensions')
      .trim()
      .optional(),
    units_in_stock: Joi.number()
      .label('Units in stock')
      .integer()
      .optional(),
    images: Joi.array()
      .label('Images')
      .required()
  }
};
