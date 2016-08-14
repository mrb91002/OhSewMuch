'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('customers', (table) => {
    table.increments();
    table.timestamps(true, true);
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('phone', 20).notNullable();
    table.string('email').notNullable();
    table.string('user_name', 255).unique().notNullable();
    table.specificType('hashed_password', 'char(60)').nullable();
    table.string('address_line1').notNullable();
    table.string('address_line2').nullable();
    table.string('address_city').notNullable();
    table.string('address_state', 2).notNullable();
    table.string('address_zip', 10).notNullable();
    table.string('address_country', 2).notNullable();
    table.string('ship_first_name').notNullable();
    table.string('ship_last_name').notNullable();
    table.string('ship_address_line1').notNullable();
    table.string('ship_address_line2').nullable();
    table.string('ship_address_city').notNullable();
    table.string('ship_address_state', 2).notNullable();
    table.string('ship_address_zip', 10).notNullable();
    table.string('ship_address_country', 2).notNullable();
    table.dateTime('deleted').nullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('customers');
};
