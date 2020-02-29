require('dotenv').config();

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
      extension: 'ts',
      tableName: 'knex-migrations',
      directory: '/app/app/db/migrations',
    },
    seeds: {
      directory: '/app/app/db/seed',
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
      extension: 'ts',
      tableName: 'knex-migrations',
      directory: __dirname + '/db/migrations',
    },
    seeds: {
      directory: __dirname + '/db/seed',
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
      extension: 'ts',
      tableName: 'knex-migrations',
      directory: __dirname + '/db/migrations',
    },
    seeds: {
      directory: __dirname + '/db/seed',
    },
  },
};
