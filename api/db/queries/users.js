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
/**
 * Update user
 * @param {{id:number, email:string, name: string, password: string}} user
 * @return {Knex.QueryBuilder}
 */
function updateUser(user) {
  user.password = hashPassword(user.password);
  return knex('users')
      .update(user)
      .where('id', user.id)
      .returning(['name', 'email']);
}
/**
 * @param {string} password
 * @return {string}
 */
function hashPassword(password) {
  if (!password) return null;
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, salt);
}

module.exports = {
  updateUser,
  getSingleUser,
  getSingleUserByEmail,
  addUser,
};
