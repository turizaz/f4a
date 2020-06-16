import config from '../../config'

const {
  POSTGRES_HOST,
  POSTGRES_USER,
  POSTGRES_DB,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
} = config;
// tslint:disable-next-line
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
  pool: {
    min: 2,
    max: 6,
    createTimeoutMillis: 3000,
    acquireTimeoutMillis: 30000,
    idleTimeoutMillis: 30000,
    reapIntervalMillis: 1000,
    createRetryIntervalMillis: 100,
    propagateCreateError: false // <- default is true, set to false
  },
  migrations: {
    directory: __dirname + '/../../db/migrations',
    tableName: 'knex-migrations',
  },
  seeds: {
    directory: __dirname + '/../../db/seed',
  },
});
export default knex;
