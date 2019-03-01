exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('_cities')
      .del()
      .then(function() {
        // Inserts seed entries
        return knex('_cities').insert([
          {city_id: 1, title_ru: 'Киев', country_id: 2, important: false},
          {city_id: 2, title_ru: 'Москва', country_id: 1, important: false},
        ]);
      });
};
