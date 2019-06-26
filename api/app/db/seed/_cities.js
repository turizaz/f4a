exports.seed = async function(knex, Promise) {
  return knex('_cities')
      .then(function() {
        // Inserts seed entries
        return knex('_cities').insert([
          {city_id: 1, title_ru: 'Киев', country_id: 2, important: false},
        ])
      })
}
