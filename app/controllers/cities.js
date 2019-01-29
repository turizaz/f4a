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
    const uppercaseCity = _.upperFirst(name);
    const cities =
      await ctx.pg.query(
          `
            SELECT city.title_ru  as name,
                   city.city_id as id,
                   city.region_ru as region,
                   c.title_ru     as country,
                   case
                     when city.title_ru = $2 and city.region_ru IS NULL then 2
                     when city.title_ru = $2 then 1
                     when city.region_ru IS NULL then 1
                     else 0
                   end  as priority
            FROM (select * from _cities c where c.country_id < 20) as city
                   JOIN _countries as c on c.country_id = city.country_id
            WHERE c.country_id = 1
              AND
                  city.title_ru LIKE $1
               OR city.title_ua LIKE $1
            ORDER BY priority DESC, c.country_id ASC;
        `,
          [uppercaseCity + '%', uppercaseCity]);
    ctx.body = cities.rows;
  },
};
