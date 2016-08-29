'use strict';

const { decamelizeKeys } = require('humps');
const axios = require('axios');
const express = require('express');
const ev = require('express-validation');
const router = express.Router(); // eslint-disable-line new-cap
const uuid = require('node-uuid');
const val = require('../validations/payment');

// To process a payment with a nonce
router.post('/payment', ev(val.post), (req, res, next) => {
  const { nonce } = req.body;
  const amount = Number.parseInt(req.body.amount * 100);
  const token = process.env.SQUARE_TOKEN; // Square Token
  const locationId = process.env.SQUARE_LOCID; // location Id
  const urlPrefix = 'https://connect.squareup.com/v2/locations/';
  const url = `${urlPrefix}${locationId}/transactions`;
  const idempotencyKey = uuid.v1(); // Generate one per transaction!

  // Required params:
  // card_nonce
  // idempotency_key

  // "amount_money": {
  //   "amount": 5000,
  //   "currency": "USD"
  // }

  // Chargeback protection params:
  // buyer_email_address
  // "shipping_address": {
  //   "address_line_1": "123 Main St",
  //   "locality": "San Francisco",
  //   "administrative_district_level_1": "CA",
  //   "postal_code": "94114",
  //   "country": "US"
  // }

  // Sample full request body
  //   {
  //   "idempotency_key": "74ae1696-b1e3-4328-af6d-f1e04d947a13",
  //   "shipping_address": {
  //     "address_line_1": "123 Main St",
  //     "locality": "San Francisco",
  //     "administrative_district_level_1": "CA",
  //     "postal_code": "94114",
  //     "country": "US"
  //   },
  //   "billing_address": {
  //     "address_line_1": "500 Electric Ave",
  //     "address_line_2": "Suite 600",
  //     "administrative_district_level_1": "NY",
  //     "locality": "New York",
  //     "postal_code": "10003",
  //     "country": "US"
  //   },
  //   "amount_money": {
  //     "amount": 5000,
  //     "currency": "USD"
  //   },
  //   "card_nonce": "card_nonce_from_square_123",
  //   "reference_id": "some optional reference id",
  //   "note": "some optional note",
  //   "delay_capture": false
  // }

  // reference_id could be our internal order_id number
  const objToSquare = {
    cardNonce: nonce,
    idempotencyKey,
    amountMoney: {
      amount,
      currency: 'USD'
    }
  };

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  axios.post(url, decamelizeKeys(objToSquare), config)
  .then((squareRes) => {
    res.send(squareRes.data);
  })
  .catch((err) => {
    next(err.response);
  });
});

module.exports = router;
