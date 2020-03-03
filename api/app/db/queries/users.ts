import * as Knex from 'knex'

const bcrypt = require('bcryptjs')
import knex from '../../libs/knex'
import {IUser} from './interfaces/Iusers'

function getSingleUser(id: string): Promise<IUser> {
  return knex('users')
      .select('*')
      .where({id: parseInt(id)})
      .first()
}

function confirmEmail(email: string): Knex.QueryBuilder {
  return knex('users')
      .where({email})
      .update('verified', true)
      .returning(['id', 'name', 'email'])
      .then(res=> res[0])
}

function getSingleUserByEmail(email: string): IUser {
  return knex('users')
      .select('*')
      .where({email})
      .then(res => res[0])
}

function addUser(user: IUser): Promise<IUser> {
  const hash = hashPassword(user.password)

  return knex('users')
      .insert({
        email: user.email,
        name: user.name,
        password: hash,
        verified: user.verified
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
