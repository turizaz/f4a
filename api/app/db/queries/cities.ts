import knex from '../../libs/knex'
import { _ } from 'lodash'
import {ICity} from './Icities';

// Get list of cities for search
async function getByName(name: string): Promise<ICity[]> {
    const uppercaseCity: string = _.upperFirst(name);
    const cities =
        await knex.raw(
            `
            SELECT city.title_ru  as name,
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
               OR city.title_ua LIKE :cityLike
            ORDER BY priority DESC, c.country_id ASC;
        `,
            {
                cityLike: uppercaseCity + '%',
                city: uppercaseCity
            });
    console.log(cities.rows);
    return cities.rows;
}

export {
    getByName,
};
