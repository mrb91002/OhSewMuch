'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('product_images', (table) => {
    table.increments();
    table.integer('product_id')
      .notNullable()
      .references('id')
      .inTable('products')
      .onDelete('CASCADE')
      .index();
    table.timestamps(true, true);
    table.integer('display_order').unsigned().notNullable();
    table.string('image_url').notNullable();
    table.string('alt_text', 50).notNullable().defaultTo('');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('product_images');
};
