'use strict';

const Joi = require('joi');

// The string must contain at least 1 lowercase alphabetical character
// The string must contain at least 1 uppercase alphabetical character
// The string must contain at least 1 numeric character
// The string must contain at least one special character: ! @ # $ % ^ & *
// The string must be eight characters or longer
const pw = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

// req.body: firstName, lastName, phone, email, [userName], [password], addressLine1, [addressLine2], addressCity, addressState, addressZip, addressCountry, shipFirstName, shipLastName, shipAddressLine1, [shipAddressLine2], shipAddressCity, shipAddressState, shipAddressZip, shipAddressCountry
module.exports.post = {
  options : {
    allowUnknownBody: false,
  },

  body: {
    firstName: Joi.string()
      .label('First Name')
      .max(255)
      .trim()
      .required(),
    lastName: Joi.string()
      .label('Last Name')
      .max(255)
      .trim()
      .required(),
    phone: Joi.string()
      .label('Phone')
      .min(7)
      .max(20)
      .trim()
      .optional(),
    email: Joi.string()
      .label('Email')
      .email()
      .min(6)
      .max(255)
      .trim()
      .required(),
    userName: Joi.string()
      .label('User Name')
      .min(6)
      .max(255)
      .trim()
      .optional(),
    password: Joi.string()
      .label('Password')
      .regex(pw, 'Strong Password')
      .min(8)
      .max(255)
      .trim()
      .optional(),
    addressLine1: Joi.string()
      .label('Address Line 1')
      .max(255)
      .trim()
      .required(),
    addressLine2: Joi.string()
      .label('Address Line 2')
      .max(255)
      .trim()
      .optional(),
    addressCity: Joi.string()
      .label('City')
      .max(255)
      .trim()
      .required(),
    addressState: Joi.string()
      .label('State')
      .min(2)
      .max(2)
      .trim()
      .required(),
    addressZip: Joi.string()
      .label('Zip')
      .min(5)
      .max(10)
      .trim()
      .required(),
    addressCountry: Joi.string()
      .label('Country')
      .max(2)
      .min(2)
      .trim()
      .required(),
    shipFirstName: Joi.string()
      .label('First Name')
      .max(255)
      .trim()
      .optional(),
    shipLastName: Joi.string()
      .label('Last Name')
      .max(255)
      .trim()
      .optional(),
    shipAddressLine1: Joi.string()
      .label('Address Line 1')
      .max(255)
      .trim()
      .optional(),
    shipAddressLine2: Joi.string()
      .label('Address Line 2')
      .max(255)
      .trim()
      .optional(),
    shipAddressCity: Joi.string()
      .label('City')
      .max(255)
      .trim()
      .optional(),
    shipAddressState: Joi.string()
      .label('State')
      .max(2)
      .min(2)
      .trim()
      .optional(),
    shipAddressZip: Joi.string()
      .label('Zip')
      .max(10)
      .min(10)
      .trim()
      .optional(),
    shipAddressCountry: Joi.string()
      .label('Country')
      .max(2)
      .min(2)
      .trim()
      .optional()
  }
};

module.exports.patch = {
  options : {
    allowUnknownBody: false,
  },

  body: {
    firstName: Joi.string()
      .label('First Name')
      .max(255)
      .trim()
      .optional(),
    lastName: Joi.string()
      .label('Last Name')
      .max(255)
      .trim()
      .optional(),
    phone: Joi.string()
      .label('Phone')
      .min(7)
      .max(20)
      .trim()
      .optional(),
    email: Joi.string()
      .label('Email')
      .email()
      .min(6)
      .max(255)
      .trim()
      .optional(),
    userName: Joi.string()
      .label('User Name')
      .min(6)
      .max(255)
      .trim()
      .optional(),
    password: Joi.string()
      .label('Password')
      .regex(pw, 'Strong Password')
      .min(8)
      .max(255)
      .trim()
      .optional(),
    addressLine1: Joi.string()
      .label('Address Line 1')
      .max(255)
      .trim()
      .optional(),
    addressLine2: Joi.string()
      .label('Address Line 2')
      .max(255)
      .trim()
      .optional(),
    addressCity: Joi.string()
      .label('City')
      .max(255)
      .trim()
      .optional(),
    addressState: Joi.string()
      .label('State')
      .max(2)
      .min(2)
      .trim()
      .optional(),
    addressZip: Joi.string()
      .label('Zip')
      .max(10)
      .min(10)
      .trim()
      .optional(),
    addressCountry: Joi.string()
      .label('Country')
      .max(2)
      .min(2)
      .trim()
      .optional(),
    shipFirstName: Joi.string()
      .label('First Name')
      .max(255)
      .trim()
      .optional(),
    shipLastName: Joi.string()
      .label('Last Name')
      .max(255)
      .trim()
      .optional(),
    shipAddressLine1: Joi.string()
      .label('Address Line 1')
      .max(255)
      .trim()
      .optional(),
    shipAddressLine2: Joi.string()
      .label('Address Line 2')
      .max(255)
      .trim()
      .optional(),
    shipAddressCity: Joi.string()
      .label('City')
      .max(255)
      .trim()
      .optional(),
    shipAddressState: Joi.string()
      .label('State')
      .max(2)
      .min(2)
      .trim()
      .optional(),
    shipAddressZip: Joi.string()
      .label('Zip')
      .max(10)
      .min(10)
      .trim()
      .optional(),
    shipAddressCountry: Joi.string()
      .label('Country')
      .max(2)
      .min(2)
      .trim()
      .optional()
  }
};

module.exports.patchAdmin = {
  options : {
    allowUnknownBody: false,
  },

  params: {
    id: Joi.number()
      .label('id')
      .integer()
      .min(1)
      .required()
  },

  body: {
    firstName: Joi.string()
      .label('First Name')
      .max(255)
      .trim()
      .optional(),
    lastName: Joi.string()
      .label('Last Name')
      .max(255)
      .trim()
      .optional(),
    phone: Joi.string()
      .label('Phone')
      .min(7)
      .max(20)
      .trim()
      .optional(),
    email: Joi.string()
      .label('Email')
      .email()
      .min(6)
      .max(255)
      .trim()
      .optional(),
    userName: Joi.string()
      .label('User Name')
      .min(6)
      .max(255)
      .trim()
      .optional(),
    password: Joi.string()
      .label('Password')
      .regex(pw, 'Strong Password')
      .min(8)
      .max(255)
      .trim()
      .optional(),
    addressLine1: Joi.string()
      .label('Address Line 1')
      .max(255)
      .trim()
      .optional(),
    addressLine2: Joi.string()
      .label('Address Line 2')
      .max(255)
      .trim()
      .optional(),
    addressCity: Joi.string()
      .label('City')
      .max(255)
      .trim()
      .optional(),
    addressState: Joi.string()
      .label('State')
      .max(2)
      .min(2)
      .trim()
      .optional(),
    addressZip: Joi.string()
      .label('Zip')
      .max(10)
      .min(10)
      .trim()
      .optional(),
    addressCountry: Joi.string()
      .label('Country')
      .max(2)
      .min(2)
      .trim()
      .optional(),
    shipFirstName: Joi.string()
      .label('First Name')
      .max(255)
      .trim()
      .optional(),
    shipLastName: Joi.string()
      .label('Last Name')
      .max(255)
      .trim()
      .optional(),
    shipAddressLine1: Joi.string()
      .label('Address Line 1')
      .max(255)
      .trim()
      .optional(),
    shipAddressLine2: Joi.string()
      .label('Address Line 2')
      .max(255)
      .trim()
      .optional(),
    shipAddressCity: Joi.string()
      .label('City')
      .max(255)
      .trim()
      .optional(),
    shipAddressState: Joi.string()
      .label('State')
      .max(2)
      .min(2)
      .trim()
      .optional(),
    shipAddressZip: Joi.string()
      .label('Zip')
      .max(10)
      .min(10)
      .trim()
      .optional(),
    shipAddressCountry: Joi.string()
      .label('Country')
      .max(2)
      .min(2)
      .trim()
      .optional(),
    deleted: Joi.date()
      .label('Deleted')
      .allow('null')
      .allow(null)
      .timestamp()
      .optional(),
    admin: Joi.boolean()
      .label('Admin')
      .optional()
  }
};
