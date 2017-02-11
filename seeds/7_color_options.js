
exports.seed = function(knex, Promise) {
  return knex('color_options').del()
    .then(function () {
      return knex('color_options').insert([{
        id: 1,
        product_id: 1,
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC'),
        display_order: 1,
        color: 'red'
      }, {
        id: 2,
        product_id: 1,
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC'),
        display_order: 3,
        color: 'green'
      }, {
        id: 3,
        product_id: 1,
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC'),
        display_order: 2,
        color: 'blue'
      }, {
        id: 4,
        product_id: 1,
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC'),
        display_order: 4,
        color: 'purple'
      }, {
        id: 5,
        product_id: 2,
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC'),
        display_order: 1,
        color: 'Red tail with green spikes'
      }, {
        id: 6,
        product_id: 2,
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC'),
        display_order: 3,
        color: 'Purple tail with rainbow spikes'
      }, {
        id: 7,
        product_id: 2,
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC'),
        display_order: 2,
        color: 'Blue tail with orange spikes'
      }, {
        id: 8,
        product_id: 2,
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC'),
        display_order: 4,
        color: 'Black tail with red spikes'
      }

      ]);
    })
    .then(() => {
      // eslint-disable-next-line max-len
      return knex.raw("SELECT setval('color_options_id_seq', (SELECT MAX(id) FROM color_options));"
      );
    });
};
