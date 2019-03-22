exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('_countries')
      .del()
      .then(function() {
        // Inserts seed entries
        return knex('_countries').insert([
          {
            country_id: 1,
            title_ru: 'Россия',
            title_ua: 'Росія',
          },
          {
            country_id: 2,
            title_ru: 'Украина',
            title_ua: 'Україна',
          },
        ]);
      });
};
