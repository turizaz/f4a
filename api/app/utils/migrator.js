const fs = require('fs')
const dotenv = require('dotenv')
const envConfigProd = dotenv.parse(fs.readFileSync('../../.env.prod'))
const envConfigDev = dotenv.parse(fs.readFileSync('../../.env'))

const knexDev = require('knex')({
  client: 'pg',
  version: '11.1',
  connection: {
    host: 'localhost',
    user: envConfigDev.POSTGRES_USER,
    password: envConfigDev.POSTGRES_PASSWORD,
    database: envConfigDev.POSTGRES_DB,
    port: envConfigDev.POSTGRES_PORT,
  },
});

const knexProd = require('knex')({
  client: 'pg',
  version: '11.1',
  connection: {
    host: envConfigProd.POSTGRES_HOST,
    user: envConfigProd.POSTGRES_USER,
    password: envConfigProd.POSTGRES_PASSWORD,
    database: envConfigProd.POSTGRES_DB,
    port: envConfigProd.POSTGRES_PORT,
  },
});
(async function() {
  const totalRaw = await knexDev.table('_cities')
      .where({country_id: 2}).count({count: '*'}).then((res)=> res[0].count)
  const total = Math.ceil(totalRaw/100)

  for (let i = 0; i < total+1; i++) {
    await sleep(10000)
    const dev = await knexDev.table('_cities')
        .where({country_id: 2})
        .orderBy('city_id')
        .limit(100).offset(i*100).select()
    await knexProd.table('_cities').insert(dev)
    console.log('insert '+i)
  }
})()

/**
 * Sleep hack
 * @param {number} ms
 * @return {Promise<any>}
 */
function sleep(ms) {
  return new Promise((resolve)=>{
    setTimeout(resolve, ms)
  })
}
