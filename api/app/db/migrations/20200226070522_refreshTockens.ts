
exports.up = function(knex) {
  return knex.raw(`
    create table refresh_tokens
    ( 
      id text,
      user_id text,
      timestamp timestamp NOT NULL DEFAULT NOW()
    );
    
    CREATE FUNCTION ttl_refresh_tokens() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
      BEGIN
        DELETE FROM refresh_tokens WHERE timestamp < NOW() - INTERVAL '7 days';
        RETURN NEW;
      END;
    $$;
    
    CREATE TRIGGER ttl_refresh_tokens_trigger
    AFTER INSERT ON refresh_tokens
    EXECUTE PROCEDURE ttl_refresh_tokens();
  `);
};

exports.down = function(knex) {
  return knex.raw(`
  DROP TRIGGER ttl_refresh_tokens_trigger on refresh_tokens;
  DROP FUNCTION ttl_refresh_tokens;
  DROP TABLE refresh_tokens;
  `)
};
