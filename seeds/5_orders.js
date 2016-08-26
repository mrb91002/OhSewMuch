
exports.seed = function(knex) {
  return knex('orders').del()
    .then(() => {
      return knex('orders').insert([{
        id:1,
        customer_id: 1,
        promo_id: 2,
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC'),
        ship_date: new Date('2016-06-26 14:26:16 UTC'),
        ship_type: 'UPS: 2-day',
        ship_first_name: "christine",
        ship_last_name: "Benavides",
        ship_address_line1: "10203 123rd st ave ne",
        ship_address_city: "somewheresville",
        ship_address_state: "AK",
        ship_address_zip: "12345",
        ship_address_country: "US"
      }, {
        id:2,
        customer_id: 2,
        promo_id: 1,
        created_at: new Date('2016-07-27 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC'),
        ship_type: 'UPS: 2-day',
        ship_first_name: "christine",
        ship_last_name: "Benavides",
        ship_address_line1: "10203 123rd st ave ne",
        ship_address_city: "somewheresville",
        ship_address_state: "AK",
        ship_address_zip: "12345",
        ship_address_country: "US"
      }, {
        id:3,
        customer_id: 2,
        promo_id: 3,
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC'),
        ship_type: 'UPS: 2-day',
        ship_first_name: "christine",
        ship_last_name: "Benavides",
        ship_address_line1: "10203 123rd st ave ne",
        ship_address_city: "somewheresville",
        ship_address_state: "AK",
        ship_address_zip: "12345",
        ship_address_country: "US"
      }, {
        id:4,
        customer_id: 3,
        promo_id: 2,
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC'),
        ship_type: 'UPS: 2-day',
        ship_first_name: "christine",
        ship_last_name: "Benavides",
        ship_address_line1: "10203 123rd st ave ne",
        ship_address_city: "somewheresville",
        ship_address_state: "AK",
        ship_address_zip: "12345",
        ship_address_country: "US"
      }, {
        id:5,
        customer_id: 3,
        promo_id: null,
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC'),
        cancelled: new Date('2016-06-26 14:26:16 UTC'),
        ship_type: 'UPS: 2-day',
        ship_first_name: "christine",
        ship_last_name: "Benavides",
        ship_address_line1: "10203 123rd st ave ne",
        ship_address_city: "somewheresville",
        ship_address_state: "AK",
        ship_address_zip: "12345",
        ship_address_country: "US"
      }, ]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('orders_id_seq', (SELECT MAX(id) FROM orders));"
      );
    });
};
