'use strict';

exports.seed = function(knex) {
  return knex('customers').del()
    .then(() => {
      return knex('customers').insert([{
        id: 1,
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC'),
        first_name: 'Christine',
        last_name: 'Benavides',
        phone: '4258821234',
        email: 'mrb91002@gmail.com',
        user_name: 'ohsewmuch',

        // eslint-disable-next-line max-len
        hashed_password: '$2a$12$B/am5U44mBPr7HA1xfcdsOCC0hvxoaLBsy/Tj3rbPIN5ADL0zj1vK',
        admin: true,
        address_line1: '10203 123rd st ave ne',
        address_city: 'somewheresville',
        address_state: 'WA',
        address_zip: '12345',
        address_country: 'US',
        ship_first_name: 'christine',
        ship_last_name: 'Benavides',
        ship_address_line1: '10203 123rd st ave ne',
        ship_address_city: 'somewheresville',
        ship_address_state: 'WA',
        ship_address_zip: '12345',
        ship_address_country: 'US'
      }, {
        id: 2,
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC'),
        first_name: 'guest',
        last_name: 'user',
        phone: '4238851264',
        email: 'guestasdfasdf@gmail.com',
        user_name: 'guest1',

        // eslint-disable-next-line max-len
        hashed_password: '$2a$12$BVsODe/K.En9Fhj/uOySNeFCN7Rfv7wfUZnBKX24Gj7sEx3B.xkyu',
        admin: false,
        address_line1: '40506 456rd blvd se',
        address_city: 'elsewheresville',
        address_state: 'WA',
        address_zip: '54321',
        address_country: 'US',
        ship_first_name: 'guest',
        ship_last_name: 'user',
        ship_address_line1: '40506 456rd blvd se',
        ship_address_city: 'elsewheresville',
        ship_address_state: 'WA',
        ship_address_zip: '54321',
        ship_address_country: 'US'
      }, {
        id: 3,
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC'),
        first_name: 'Good',
        last_name: 'Address',
        phone: '4258821234',
        email: 'mrb91002@gmail.com',
        user_name: 'ohsewmuch',

        // eslint-disable-next-line max-len
        hashed_password: '$2a$12$B/am5U44mBPr7HA1xfcdsOCC0hvxoaLBsy/Tj3rbPIN5ADL0zj1vK',
        admin: true,
        address_line1: '6905 237th Ave NE',
        address_city: 'Redmond',
        address_state: 'WA',
        address_zip: '98053',
        address_country: 'US',
        ship_first_name: 'Good',
        ship_last_name: 'Address',
        ship_address_line1: '6905 237th Ave NE',
        ship_address_city: 'Redmond',
        ship_address_state: 'WA',
        ship_address_zip: '98053',
        ship_address_country: 'US'
      }, {
        id: 4,
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC'),
        first_name: '',
        last_name: '',
        phone: '4258821234',
        email: 'mrb91002@gmail.com',
        user_name: 'ohsewmuch',
        hashed_password: '',
        admin: true,
        address_line1: '6905 237th Ave NE',
        address_city: 'Redmond',
        address_state: 'WA',
        address_zip: '98053',
        address_country: 'US',
        ship_first_name: 'Good',
        ship_last_name: 'Address',
        ship_address_line1: '6905 237th Ave NE',
        ship_address_city: 'Redmond',
        ship_address_state: 'WA',
        ship_address_zip: '98053',
        ship_address_country: 'US'
      }, {
        id: 5,
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC'),
        first_name: 'cLiEnT5',
        last_name: 'ClIeNt5',
        phone: '4258821234',
        email: 'mrb91002@gmail.com',
        user_name: 'ohsewmuch',

        // eslint-disable-next-line max-len
        hashed_password: '$2a$12$B/am5U44mBPr7HA1xfcdsOCC0hvxoaLBsy/Tj3rbPIN5ADL0zj1vK',
        admin: true,
        address_line1: '6905 237th Ave NE',
        address_city: 'Redmond',
        address_state: 'WA',
        address_zip: '98053',
        address_country: 'US',
        ship_first_name: 'Good',
        ship_last_name: 'Address',
        ship_address_line1: '6905 237th Ave NE',
        ship_address_city: 'Redmond',
        ship_address_state: 'WA',
        ship_address_zip: '98053',
        ship_address_country: 'US'
      }]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('customers_id_seq', (SELECT MAX(id) FROM customers));"
      );
    });
};
