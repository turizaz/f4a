// Update with your config settings.
require('dotenv').load();

const {
  POSTGRES_HOST,
  POSTGRES_USER,
  POSTGRES_DB,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
} = process.env;

module.exports = {

  development: {
    client: 'pg',
    version: '11.1',
    connection: {
      host: POSTGRES_HOST,
      user: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
      database: POSTGRES_DB,
      port: POSTGRES_PORT,
    },
    migrations: {
      tableName: 'knex-migrations',
      directory: __dirname + '/db/migrations',
    },
  },

  staging: {
    client: 'pg',
    version: '11.1',
    connection: {
      host: POSTGRES_HOST,
      user: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
      database: POSTGRES_DB,
      port: POSTGRES_PORT,
    },
    migrations: {
      tableName: 'knex-migrations',
      directory: __dirname + '/db/migrations',
    },
  },

  production: {
    client: 'pg',
    version: '11.1',
    connection: {
      host: POSTGRES_HOST,
      user: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
      database: POSTGRES_DB,
      port: POSTGRES_PORT,
    },
    migrations: {
      tableName: 'knex-migrations',
      directory: __dirname + '/db/migrations',
    },
  },
};
