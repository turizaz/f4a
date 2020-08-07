import knex from '../../libs/knex'
import { _ } from 'lodash'
import {ICity} from './interfaces/Icities';

async function getByName(name: string): Promise<ICity[]> {
    const uppercaseCity: string = _.upperFirst(name);
    const cities =
        await knex.raw(
            `
            SELECT * FROM (SELECT DISTINCT on (id) * FROM (SELECT city.title_ru  as name,
                   city.city_id as id,
                   city.region_ru as region,
                   c.title_ru     as country,
                   case
                     when city.title_ru = :city and city.region_ru IS NULL then 2
                     when city.title_ru = :city then 1
                     when city.region_ru IS NULL then 1
                     else 0
                   end  as priority
            FROM (select * from _cities c where c.country_id < 20) as city
                   JOIN _countries as c on c.country_id = city.country_id
            WHERE
                  city.title_ru LIKE :cityLike
            UNION DISTINCT
            SELECT city.title_ua  as name,
                   city.city_id as id,
                   city.region_ua as region,
                   c.title_ua     as country,
                   case
                     when city.title_ua = :city and city.title_ua IS NULL then 2
                     when city.title_ua = :city then 1
                     when city.title_ua IS NULL then 1
                     else 0
                   end  as priority
            FROM (select * from _cities c where c.country_id < 20) as city
                   JOIN _countries as c on c.country_id = city.country_id
            WHERE city.title_ua LIKE :cityLike) as cc) as dd
            ORDER BY dd.priority DESC, dd.name ASC;
        `,
            {
                cityLike: `${uppercaseCity}%`,
                city: uppercaseCity
            });
    return cities.rows;
}

export {
    getByName,
};
