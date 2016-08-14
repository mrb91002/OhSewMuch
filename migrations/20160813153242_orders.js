'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('orders', (table) => {
    table.increments();
    table.integer('customer_id')
      .notNullable()
      .references('id')
      .inTable('customers')
      .onDelete('CASCADE')
      .index();
    table.integer('promo_id')
      .nullable()
      .references('id')
      .inTable('promos')
      .onDelete('CASCADE')
      .index();
    table.timestamps(true, true);
    table.dateTime('cancelled').nullable();
    table.string('ship_type').notNullable();
    table.dateTime('ship_date').nullable();
    table.string('ship_first_name').notNullable();
    table.string('ship_last_name').notNullable();
    table.string('ship_address_line1').notNullable();
    table.string('ship_address_line2').nullable();
    table.string('ship_address_city').notNullable();
    table.string('ship_address_state', 2).notNullable();
    table.string('ship_address_zip', 10).notNullable();
    table.string('ship_address_country', 2).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('orders');
};
