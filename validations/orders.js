'use strict';

const Joi = require('joi');

module.exports.get = {
  cookies: {
    token: Joi.object().keys({
      userId: Joi.number()
      .label('Customer ID')
      .integer()
      .min(1)
      .required()
    })
  }
};

module.exports.post = {
  options: {
    allowUnknownBody: false
  },

  body: {
    customerId: Joi.number()
      .label('Customer ID')
      .integer()
      .min(1)
      .optional(),
    promoId: Joi.number()
      .label('Promo ID')
      .integer()
      .min(1)
      .optional(),
    shipType: Joi.string()
      .label('Shipping Type')
      .trim()
      .max(255)
      .required(),
    products: Joi.array()
      .label('Products')
      .required()
  }
};

module.exports.delete = {
  options: {
    allowUnknownParams: false,
    allowUnknownBody: false
  },

  params: {
    id: Joi.number()
      .label('Order Id')
      .integer()
      .min(1)
      .required()
  }
};
