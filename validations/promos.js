'use strict';

const Joi = require('joi');

module.exports.post = {
  options: {
    allowUnknownBody: false
  },

  body: {
    productId: Joi.number()
      .label('Product ID')
      .integer()
      .min(1)
      .optional(),
    expiresAt: Joi.date()
      .label('Expires At')
      .timestamp()
      .required(),
    promoCode: Joi.string()
      .label('Promo Code')
      .trim()
      .length(10)
      .required(),
    discountRate: Joi.number()
      .label('Discount Rate')
      .precision(2)
      .positive()
  }
};

module.exports.delete = {
  options: {
    allowUnknownParams: false
  },

  params: {
    id: Joi.number()
      .label('Promo Id')
      .integer()
      .min(1)
      .required()
  }
};

module.exports.get = {
  options: {
    allowUnknownParams: false
  },

  params: {
    code: Joi.string()
      .label('Promo Code')
      .trim()
      .required()
  }
};
