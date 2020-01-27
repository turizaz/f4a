const {Client} = require('pg');

const {
  POSTGRES_HOST,
  POSTGRES_USER,
  POSTGRES_DB,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
} = process.env;

const client = new Client({
  user: POSTGRES_USER,
  host: POSTGRES_HOST,
  database: POSTGRES_DB,
  password: POSTGRES_PASSWORD,
  port: POSTGRES_PORT,
});
client.connect().then((data) => {
  console.log(`connected db, ${POSTGRES_HOST}`)
}).catch((err) => {
  console.log('Connection error ', err);
});

export default client;
