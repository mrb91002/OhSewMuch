'use strict'

const Joi = require('joi');

module.exports.post = {
  options : {
    allowUnknownBody: false,
  },

  body: {
    customerId: Joi.number()
      .label('Customer ID')
      .integer()
      .min(1)
      .optional(),
    promoId: Joi.number()
      .label('Promo ID')
      .integer()
      .min(1)
      .optional(),
    shipType: Joi.string()
      .label('Shipping Type')
      .trim()
      .max(255)
      .required(),
    products: Joi.array()
      .label('Products')
      .required()
  }
};

// table.increments();
// table.integer('customer_id')
//   .notNullable()
//   .references('id')
//   .inTable('customers')
//   .onDelete('CASCADE')
//   .index();
// table.integer('promo_id')
//   .nullable()
//   .references('id')
//   .inTable('promos')
//   .onDelete('CASCADE')
//   .index();
// table.timestamps(true, true);
// table.dateTime('cancelled').nullable();
// table.string('ship_type').notNullable();
// table.dateTime('ship_date').nullable();
// table.string('ship_first_name').notNullable();
// table.string('ship_last_name').notNullable();
// table.string('ship_address_line1').notNullable();
// table.string('ship_address_line2').nullable();
// table.string('ship_address_city').notNullable();
// table.string('ship_address_state', 2).notNullable();
// table.string('ship_address_zip', 10).notNullable();
// table.string('ship_address_country', 2).notNullable();

// module.exports.delete = {
  // options : {
  //   allowUnknownParams: false,
  // },
  //
  // params: {
  //   id: Joi.number()
  //     .label('Promo Id')
  //     .integer()
  //     .min(1)
  //     .required()
  // },
// };

module.exports.get = {
  cookies: {
    token: Joi.object().keys({
      userId: Joi.number()
        .label('Customer ID')
        .integer()
        .min(1)
        .required()
    })
  }
};
