const {Client} = require('pg');
const config = require('config');
const {user, host, database, password, port} = config.postgres;
const client = new Client({
  user,
  host,
  database,
  password,
  port,
});
client.connect().catch((err) => {
  console.log('Connection error ', err);
});
exports.init = (app) => app.use(async (ctx, next) => {
  ctx.pg = client;
  await next();
});
