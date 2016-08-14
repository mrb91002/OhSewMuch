'use strict';

const bcrypt = require('bcrypt-as-promised');
const boom = require('boom');
const express = require('express');
const knex = require('../knex');
const { camelizeKeys } = require('humps');
const ev = require('express-validation');
const validate = require('../validations/token');
const jwt = require('jsonwebtoken');

const router = express.Router(); // eslint-disable-line new-cap

// To log a user in
router.post('/api/token', ev(validate.post), (req, res, next) => {
  const errMsg = 'User could not be logged in';
  const { userName, password } = req.body;
  const tokenTimeOut = 1000 * 60 * 60 * 3; // 3 hours in milliseconds
  let user;

  knex('customers')
    .where('user_name', userName)
    .first()
    .then((row) => {
      if (!row) {
        throw boom.unauthorized(errMsg);
      }

      user = camelizeKeys(row);

      return bcrypt.compare(password, user.hashedPassword);
    })
    .then(() => {
      const expiry = new Date(Date.now() + tokenTimeOut);
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: '3h'
      });

      res.cookie('accessToken', token, {
        httpOnly: true,
        expires: expiry,
        secure: router.get('env') === 'production'
      });

      res.cookie('loggedIn', true, {
        expires: expiry,
        secure: router.get('env') === 'production'
      });

      res.cookie('admin', user.admin, {
        expires: expiry,
        secure: router.get('env') === 'production'
      });

      res.sendStatus(200);
    })
    .catch(bcrypt.MISMATCH_ERROR, () => {
      throw boom.unauthorized(errMsg);
    })
    .catch((err) => {
      next(err);
    });
});

// To log a user out
router.delete('/api/token', (req, res) => {
  res.clearCookie('accessToken');
  res.clearCookie('loggedIn');
  res.clearCookie('admin');
  res.sendStatus(200);
});

module.exports = router;
