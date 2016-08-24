'use strict'

const Joi = require('joi');

module.exports.post = {
  options : {
    allowUnknownBody: false,
  },

  body: {
    nonce: Joi.string()
      .label('Nonce')
      .trim()
      .required(),
    amount: Joi.number()
      .label('Amout')
      .min(0.01)
      .required()
  }
};
