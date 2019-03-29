exports.up = function(knex, Promise) {
  return knex.raw(`
    CREATE TABLE IF NOT EXISTS _countries(
    country_id integer NOT NULL,
    title_ru character varying(60),
    title_ua character varying(60),
    title_be character varying(60),
    title_en character varying(60),
    title_es character varying(60),
    title_pt character varying(60),
    title_de character varying(60),
    title_fr character varying(60),
    title_it character varying(60),
    title_pl character varying(60),
    title_ja character varying(60),
    title_lt character varying(60),
    title_lv character varying(60),
    title_cz character varying(60),
    CONSTRAINT pk_country_cid PRIMARY KEY (country_id)
  
  );
  
  CREATE TABLE IF NOT EXISTS _regions(
    region_id integer NOT NULL,
    country_id integer NOT NULL,
    title_ru character varying(150),
    title_ua character varying(150),
    title_be character varying(150),
    title_en character varying(150),
    title_es character varying(150),
    title_pt character varying(150),
    title_de character varying(150),
    title_fr character varying(150),
    title_it character varying(150),
    title_pl character varying(150),
    title_ja character varying(150),
    title_lt character varying(150),
    title_lv character varying(150),
    title_cz character varying(150),
    CONSTRAINT pk_region_rid PRIMARY KEY (region_id)
  
  );
  
  CREATE TABLE IF NOT EXISTS _cities
  (
    city_id    integer NOT NULL,
    country_id integer NOT NULL,
    important  boolean NOT NULL,
    region_id  integer,

    title_ru   character varying(150),
    area_ru    character varying(150),
    region_ru  character varying(150),

    title_ua   character varying(150),
    area_ua    character varying(150),
    region_ua  character varying(150),

    title_be   character varying(150),
    area_be    character varying(150),
    region_be  character varying(150),

    title_en   character varying(150),
    area_en    character varying(150),
    region_en  character varying(150),

    title_es   character varying(150),
    area_es    character varying(150),
    region_es  character varying(150),

    title_pt   character varying(150),
    area_pt    character varying(150),
    region_pt  character varying(150),

    title_de   character varying(150),
    area_de    character varying(150),
    region_de  character varying(150),

    title_fr   character varying(150),
    area_fr    character varying(150),
    region_fr  character varying(150),

    title_it   character varying(150),
    area_it    character varying(150),
    region_it  character varying(150),

    title_pl   character varying(150),
    area_pl    character varying(150),
    region_pl  character varying(150),

    title_ja   character varying(150),
    area_ja    character varying(150),
    region_ja  character varying(150),

    title_lt   character varying(150),
    area_lt    character varying(150),
    region_lt  character varying(150),

    title_lv   character varying(150),
    area_lv    character varying(150),
    region_lv  character varying(150),

    title_cz   character varying(150),
    area_cz    character varying(150),
    region_cz  character varying(150),

    CONSTRAINT pk_city_cid PRIMARY KEY (city_id)
  );
  `);
};
exports.down = function(knex, Promise) {
  return knex.raw(`
      drop table if exists _countries;
      drop table if exists _regions;
      drop table if exists _cities;
  `);
};
