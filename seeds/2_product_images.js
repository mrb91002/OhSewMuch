
exports.seed = function(knex) {
  return knex('product_images').del()
    .then(() => {
      return knex('product_images').insert([{
        id:1,
        product_id: 1,
        display_order:1,
        image_url: 'http://imgur.com/L0zewnX',
        alt_text: 'Rainbow Monster Tooth Fairy Pillows',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id:2,
        product_id: 1,
        display_order:2,
        image_url: 'http://imgur.com/R0Pxxyi',
        alt_text: 'Pink Monster Tooth Fairy Pillow',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id:3,
        product_id: 1,
        display_order:3,
        image_url: 'http://imgur.com/tFlw9eh',
        alt_text: 'Red Monster Tooth Fairy Pillow',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id:4,
        product_id: 1,
        display_order:4,
        image_url: 'http://imgur.com/ytawuLu',
        alt_text: 'Orange Monster Tooth Fairy Pillow',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id:5,
        product_id: 1,
        display_order:5,
        image_url: 'http://imgur.com/vsCsyP8',
        alt_text: 'Yellow Monster Tooth Fairy Pillow',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id:6,
        product_id: 1,
        display_order:6,
        image_url: 'http://imgur.com/VJkoBMm',
        alt_text: 'Blue Monster Tooth Fairy Pillow',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id:7,
        product_id: 1,
        display_order:7,
        image_url: 'http://imgur.com/QNVdVKG',
        alt_text: 'purple Monster Tooth Fairy Pillow',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id:8,
        product_id: 2,
        display_order:1,
        image_url: 'http://imgur.com/J1ZAB0C',
        alt_text: 'Rainbow Dinosaur Tail Costume',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id:9,
        product_id: 2,
        display_order:2,
        image_url: 'http://imgur.com/PdlPMlM',
        alt_text: 'Green Dinosaur Tail Costume',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id:10,
        product_id: 2,
        display_order:3,
        image_url: 'http://imgur.com/UEeiJcb',
        alt_text: 'Orange Dinosaur Tail Costume',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id:11,
        product_id: 2,
        display_order:4,
        image_url: 'http://imgur.com/bJ6g7or',
        alt_text: 'Pink Dinosaur Tail Costume',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id:12,
        product_id: 2,
        display_order:5,
        image_url: 'http://imgur.com/bE5TneW',
        alt_text: 'Red Dinosaur Tail Costume',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id:13,
        product_id: 2,
        display_order:6,
        image_url: 'http://imgur.com/3UAL3xv',
        alt_text: 'Purple Dinosaur Tail Costume',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id:14,
        product_id: 2,
        display_order:7,
        image_url: 'http://imgur.com/UCX04Or',
        alt_text: 'Blue Dinosaur Tail Costume',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id:15,
        product_id: 2,
        display_order:8,
        image_url: 'http://imgur.com/KMB6kpW',
        alt_text: 'Black Dinosaur Tail Costume',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id:16,
        product_id: 3,
        display_order:1,
        image_url: 'http://imgur.com/CatOLql',
        alt_text: 'Rainbow Baby Dinosaur Tail Costumes',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id:17,
        product_id: 3,
        display_order:2,
        image_url: 'http://imgur.com/KkSENJs',
        alt_text: 'Orange Baby Dinosaur Tail Costume',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id:18,
        product_id: 3,
        display_order:3,
        image_url: 'http://imgur.com/vRs3Ci1',
        alt_text: 'Red Baby Dinosaur Tail Costume',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id:19,
        product_id: 3,
        display_order:4,
        image_url: 'http://imgur.com/j0ucgK5',
        alt_text: 'Purple Baby Dinosaur Tail Costume',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id:20,
        product_id: 3,
        display_order:5,
        image_url: 'http://imgur.com/bDdNK7a',
        alt_text: 'Blue Baby Dinosaur Tail Costume',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id:21,
        product_id: 3,
        display_order:6,
        image_url: 'http://imgur.com/MUfhwPp',
        alt_text: 'black Baby Dinosaur Tail Costume',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id:22,
        product_id: 4,
        display_order:1,
        image_url: 'http://imgur.com/QjkVs67',
        alt_text: 'Adventure Dinosaur Tail Costume',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id:23,
        product_id: 4,
        display_order:2,
        image_url: 'http://imgur.com/hpbqXCx',
        alt_text: 'Adventure Dinosaur Tail Costume Verticle',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id:24,
        product_id: 5,
        display_order:1,
        image_url: 'http://imgur.com/C7MJhpU',
        alt_text: 'Kids Monster Art Apron',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id:25,
        product_id: 6,
        display_order:1,
        image_url: 'http://imgur.com/9E1wKyA',
        alt_text: 'Small Girls Cupcake Apron',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id:26,
        product_id: 7,
        display_order:1,
        image_url: 'http://imgur.com/eBI9eEe',
        alt_text: 'Small Shark Apron',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id:27,
        product_id: 8,
        display_order:1,
        image_url: 'http://imgur.com/8Uo22K6',
        alt_text: 'Rainbow Vinyl Monster Bibs',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id:28,
        product_id: 8,
        display_order:2,
        image_url: 'http://imgur.com/ZklvCgG',
        alt_text: 'Pink Vinyl Monster Bib',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
       }, {
        id:29,
        product_id: 8,
        display_order:3,
        image_url: 'http://imgur.com/Y9O41jv',
        alt_text: 'Red Vinyl Monster Bib',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
       }, {
        id:30,
        product_id: 8,
        display_order:4,
        image_url: 'http://imgur.com/YMt3Q6Y',
        alt_text: 'Green Vinyl Monster Bib',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
       }, {
        id:31,
        product_id: 8,
        display_order:5,
        image_url: 'http://imgur.com/b1uIGA1',
        alt_text: 'Blue Vinyl Monster Bib',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
       }, {
        id:32,
        product_id: 9,
        display_order:1,
        image_url: 'http://imgur.com/VtwGpkX',
        alt_text: 'Superman Batman Cape both sides',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
       }, {
        id:33,
        product_id: 9,
        display_order:2,
        image_url: 'http://imgur.com/BaOjmrd',
        alt_text: 'Superman Batman Cape Superman Side',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
       }, {
        id:34,
        product_id: 9,
        display_order:3,
        image_url: 'http://imgur.com/j1mW8uj',
        alt_text: 'Superman Batman Cape Batman Side',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
       }]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('product_images_id_seq', (SELECT MAX(id) FROM product_images));"
      );
    });
};
