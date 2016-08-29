'use strict';

const Joi = require('joi');

module.exports.post = {
  options: {
    allowUnknownBody: false
  },

  body: {
    amount: Joi.number()
    .label('Amout')
    .min(1.01)
    .required(),
    nonce: Joi.string()
      .label('Nonce')
      .trim()
      .required()
  }
};
