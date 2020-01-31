import * as Knex from 'knex'

const bcrypt = require('bcryptjs')
import knex from '../../libs/knex'
import {IUser} from './Iusers'

function getSingleUser(id: string): Knex.QueryBuilder {
  return knex('users')
      .select('*')
      .where({id: parseInt(id)});
}

function confirmEmail(email: string): Knex.QueryBuilder {
  return knex('users')
      .where({email})
      .update('verified', true)
      .returning(['id', 'name', 'email']);
}

function getSingleUserByEmail(email: string): Knex.QueryBuilder {
  return knex('users')
      .select('*')
      .where({email});
}

function addUser(user: IUser): Knex.QueryBuilder {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(user.password, salt);
  return knex('users')
      .insert({
        email: user.email,
        name: user.name,
        password: hash,
      })
      .returning(['name', 'email', 'id'])
      .then((res)=> res[0]);
}

function updateUser(user: IUser): Knex.QueryBuilder {
  user.password = hashPassword(user.password);
  return knex('users')
      .update(user)
      .where('id', user.id)
      .returning(['name', 'email']);
}

function hashPassword(password: string): string {
  if (!password) return null;
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, salt);
}

export {
  updateUser,
  getSingleUser,
  getSingleUserByEmail,
  addUser,
  confirmEmail,
};
