'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/ohsewmuch_dev'
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/ohsewmuch_test'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
