'use strict';

const Joi = require('joi');

module.exports.post = {
  body: {
    userName: Joi.string()
      .min(3)
      .max(255)
      .label('User Name')
      .trim()
      .required(),
    password: Joi.string()
      .label('Password')
      .min(8)
      .trim()
      .required()
  }
};
