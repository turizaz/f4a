const bcrypt = require('bcryptjs');
const knex = require('../../libs/knex');

/**
 * Geter for user
 * @param {string} id
 * @return {Knex.QueryBuilder}
 */
function getSingleUser(id) {
  return knex('users')
      .select('*')
      .where({id: parseInt(id)});
}

/**
 * @param {string} email
 * @return {Knex.QueryBuilder}
 */
function getSingleUserByEmail(email) {
  return knex('users')
      .select('*')
      .where({email});
}


/**
 * Method for add user
 * @param {{username, email, password}} user
 * @return {Knex.QueryBuilder}
 */
function addUser(user) {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(user.password, salt);
  return knex('users')
      .insert({
        email: user.email,
        name: user.name,
        password: hash,
      })
      .returning(['name', 'email']);
}

module.exports = {
  getSingleUser,
  getSingleUserByEmail,
  addUser,
};
