import * as Knex from 'knex'
import * as bcrypt from 'bcryptjs'
import knex from '../../libs/knex'
import {IGoogleUser, IUser} from './interfaces/Iusers'
import {ALREADY_EXISTS} from '../../templates/errors';

function getSingleUser(id: string): Promise<IUser> {
  return knex('users')
      .select('*')
      .where({id: parseInt(id, 10)})
      .first()
}

function confirmEmail(email: string): Promise<IUser> {
    return knex.raw(`
        update users set
        local = local || '{"verified": true}'::jsonb
        where local->>'email'=?
        returning id, local, type
        ;
    `, [email]).then(({rows})=> rows[0]);
}

function getGoogleUserByEmail(email: string): IUser {
    return knex('users')
        .select('*')
        .whereRaw(`google->>'email'=?`, [email])
        .then(res => res[0])
}
function storeGoogleUser(user: IGoogleUser) {
    return knex('users')
        .insert({
            type: 'google',
            verified: true,
            google:
                {
                    email: user.email,
                    name: user.name,
                },
        })
        .returning(['id', 'google', 'type'])
        .then((res)=> res[0]);
}
function getSingleUserByEmail(email: string): IUser {
  return knex('users')
      .select('*')
      .whereRaw(`local->>'email'=?`, [email])
      .then(res => res[0])
}

async function addLocalUser(user: {name: string, email: string, password: string, verified?: boolean}): Promise<IUser> {
    const u = await getSingleUserByEmail(user.email);
    if (u) {
        throw ALREADY_EXISTS
    }
    const hash = hashPassword(user.password)
    return knex('users')
      .insert({
          type: 'local',
          local:
              {
                  email: user.email,
                  name: user.name,
                  password: hash,
                  verified: user.verified || null
              },
      })
      .returning(['id', 'local'])
      .then((res)=> res[0]);
}
function updateLocalPassword(id, password) {
    return knex.raw(`
            update users set
            local = local || '{"password": "${hashPassword(password)}"}'::jsonb
            where id=?
    `, [id])
}
function updateUser(user: IUser): Knex.QueryBuilder {
  user.local.password = hashPassword(user.local.password);
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
  getGoogleUserByEmail,
  storeGoogleUser,
  getSingleUser,
  getSingleUserByEmail,
  addLocalUser,
  confirmEmail,
  updateLocalPassword
};
