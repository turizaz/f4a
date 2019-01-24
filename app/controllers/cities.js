'use strict';
const _ = require('lodash');
module.exports = {
  async get(ctx) {
    const q = await ctx.pg.query('SELECT NOW()');
    console.log(q.rows[0]);
    ctx.body = q.rows[0];
  },
  getByName: async function(ctx) {
    const {name} = ctx.params;
    const cities =
      await ctx.pg.query(
          `SELECT 
            city.title_ru as city,
            city.region_ru as region,
            c.title_ru as country
            FROM _cities as city
            JOIN _countries as c on c.country_id = city.country_id
            WHERE city.title_ru LIKE $1
            OR city.title_ua LIKE $1
            GROUP BY c.country_id, region, city;
`,
          [_.upperFirst(name) + '%']);
    ctx.body = cities.rows;
  },
};
