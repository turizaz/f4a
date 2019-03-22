exports.seed = async function(knex, Promise) {
  await knex('games_players').del();
  await knex('games').del();
  await knex('_cities').del();
// Deletes ALL existing entries
  return knex('_cities')
      .then(function() {
        // Inserts seed entries
        return knex('_cities').insert([
          {city_id: 1, title_ru: 'Киев', country_id: 2, important: false},
          {city_id: 2, title_ru: 'Москва', country_id: 1, important: false},
        ]);
      });
};
