'use strict';

const axios = require('axios');
const boom = require('boom');
const express = require('express');
const { camelizeKeys } = require('humps');
const ev = require('express-validation');
const uuid = require('node-uuid');
const val = require('../validations/payment');

const router = express.Router(); // eslint-disable-line new-cap

// To process a payment with a nonce
router.post('/payment', ev(val.post), (req, res, next) => {

  const { nonce } = req.body;
  const amount = Number.parseInt(req.body.amount * 100);

  // Test token
  const token = 'sq0atb-YNNIgBEgcqBGnmR8oU9Rbg';

  // Real token
  // const token = 'sq0atp-d6Zo5UF4W4mjQGnh3Lz2Sw';

  // Test location Id
  const locationId = 'CBASEGRXhR1JcqVD96HhnKcbMr4';

  // Real location Id
  // const locationId = '9K81Q6PDVQM0Q';

  // Transaction url: POST /v2/locations/{location_id}/transactions
  const url = `https://connect.squareup.com/v2/locations/${locationId}/transactions`;

  // Generate one per transaction!
  const idempotency_key = uuid.v1();

  // Required params:
  // card_nonce
  // idempotency_key

  // "amount_money": {
  //   "amount": 5000,
  //   "currency": "USD"
  // }

  const objToSquare = {
    card_nonce: nonce,
    idempotency_key,
    amount_money: {
      amount,
      currency: 'USD'
    }
  };

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



  // Chargeback protection params:
  // buyer_email_address
  // "shipping_address": {
  //   "address_line_1": "123 Main St",
  //   "locality": "San Francisco",
  //   "administrative_district_level_1": "CA",
  //   "postal_code": "94114",
  //   "country": "US"
  // }

  // reference_id could be our internal order_id number
  const sample =  {
    "idempotency_key": uuid.v4(),
    "shipping_address": {
      "address_line_1": "6821 S Gove St",
      "locality": "Tacoma",
      "administrative_district_level_1": "WA",
      "postal_code": "98409",
      "country": "US"
    },
    "billing_address": {
      "address_line_1": "6821 S Gove St",
      "address_line_2": "",
      "administrative_district_level_1": "WA",
      "locality": "Tacoma",
      "postal_code": "98409",
      "country": "US"
    },
    "amount_money": {
      "amount": 5,
      "currency": "USD"
    },
    "card_nonce": "card_nonce_from_square_123",
    "reference_id": "some optional reference id",
    "note": "some optional note",
    "delay_capture": false
  }

  // axios.get('https://connect.squareup.com/v2/locations', {
  //   headers: {
  //     Authorization: 'Bearer ' + token
  //     // Accept: 'application/json',
  //     // 'Content-Type': 'application/json'
  //   }
  // })
  // .then((squareRes) => {
  //   res.send(squareRes.data);
  //   // console.log(squareRes.data);
  //   // console.log();
  // })
  // .catch((err) => {
  //   console.log(err);
  // });

  const config = {
    headers: {
      Authorization: 'Bearer ' + token
      // Accept: 'application/json',
      // 'Content-Type': 'application/json'
    }
  };

  axios.post(url, objToSquare, config)
  .then((squareRes) => {
    res.send(squareRes.data);
    console.log(squareRes.data);
    // console.log();
  })
  .catch((err) => {
    console.log(err.response.data);
  });


//   baseURL: 'https://some-domain.com/api/',
//   timeout: 1000,
//   headers: {'X-Custom-Header': 'foobar'}
// });

  // res.send(req.body);

});

module.exports = router;
