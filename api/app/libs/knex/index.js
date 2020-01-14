require('dotenv').config();

const {
  POSTGRES_HOST,
  POSTGRES_USER,
  POSTGRES_DB,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
} = process.env;
const knex = require('knex')({
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
    directory: __dirname + '/../../db/migrations',
    tableName: 'knex-migrations',
  },
  seeds: {
    directory: __dirname + '/../../db/seed',
  },
});
if ('test' !== process.env.NODE_ENV) {
  knex.migrate.latest();
  knex.seed.run().then((res) => res);
}
module.exports = knex;
