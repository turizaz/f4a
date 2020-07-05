
exports.up = (knex) => {
  return knex.raw(`
  UPDATE _cities SET title_ua = 'Маріуполь' WHERE title_ru = 'Мариуполь' and country_id = 2;
  UPDATE _cities SET title_ua = 'Чернігів' WHERE title_ru = 'Чернигов'  and country_id = 2;
  UPDATE _cities SET title_ua = 'Черкаси' WHERE title_ru = 'Черкассы'  and country_id = 2;
  UPDATE _cities SET title_ua = 'Харків' WHERE title_ru = 'Харьков'  and country_id = 2;
  UPDATE _cities SET title_ua = 'Севастополь' WHERE title_ru = 'Севастополь'  and country_id = 2;
  UPDATE _cities SET title_ua = 'Рівне' WHERE title_ru = 'Ровно'  and country_id = 2;
  UPDATE _cities SET title_ua = 'Полтава' WHERE title_ru = 'Полтава'  and country_id = 2;
  UPDATE _cities SET title_ua = 'Одеса' WHERE title_ru = 'Одесса'  and country_id = 2;
  UPDATE _cities SET title_ua = 'Миколаїв' WHERE title_ru = 'Николаев' and country_id = 2;
  UPDATE _cities SET title_ua = 'Львів' WHERE title_ru = 'Львов' and country_id = 2;
  UPDATE _cities SET title_ua = 'Луганськ' WHERE title_ru = 'Луганск' and country_id = 2;
  UPDATE _cities SET title_ua = 'Кривий Ріг' WHERE title_ru = 'Кривой Рог' and country_id = 2;
  UPDATE _cities SET title_ua = 'Київ' WHERE title_ru = 'Киев' and country_id = 2;
  UPDATE _cities SET title_ua = 'Запоріжжя' WHERE title_ru = 'Запорожье' and country_id = 2;
  UPDATE _cities SET title_ua = 'Житомир' WHERE title_ru = 'Житомир' and country_id = 2;
  UPDATE _cities SET title_ua = 'Донецьк' WHERE title_ru = 'Донецк' and country_id = 2;
  UPDATE _cities SET title_ua = 'Дніпро́', title_ru= 'Днепр'  WHERE title_ru = 'Днепропетровск' and country_id = 2;
  UPDATE _cities SET title_ua = 'Вінниця' WHERE title_ru = 'Винница' and country_id = 2;
  UPDATE _cities SET title_ua = 'Ірпінь' WHERE title_ru = 'Ирпень' and country_id = 2;
  UPDATE _cities SET title_ua = 'Чернівці' WHERE title_ru = 'Черновцы' and country_id = 2;
  UPDATE _cities SET title_ua = 'Луцьк' WHERE title_ru = 'Луцк' and country_id = 2;
  UPDATE _cities SET title_ua = 'Івано-Франківськ' WHERE title_ru = 'Ивано-Франковск' and country_id = 2;
  UPDATE _cities SET title_ua = 'Тернопіль' WHERE title_ru = 'Тернополь' and country_id = 2;
  `);
};

exports.down = (knex) => {
  return knex.raw(``)
};
