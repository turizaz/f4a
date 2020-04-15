
exports.up = (knex) => {
  return knex.raw(`
  alter table users drop column email;
  alter table users drop column password;
  DO $$
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'registration_strategies') THEN
            CREATE TYPE registration_strategies AS ENUM ('local', 'google');
        END IF;
    END
  $$;
  alter table users add column method registration_strategies;
  alter table users add column local jsonb;
  alter table users add column google jsonb;
  `);
};

exports.down = (knex) => {
  return knex.raw(``)
};
