import { strict as assert } from 'assert'
import knex from '../../libs/knex'

import app from '../../../'
import {MockedUser, MockedUserCredetials} from './mock.user'
const chai = require('chai')
const sinon = require('sinon')
const chaiHttp = require('chai-http')
import {encrypt} from '../../services/crypto'
import * as auth from '../../../app/services/auth'
chai.use(chaiHttp)
async function registerUser() {
    sinon.stub(auth, 'sendConfirmationEmail').callsFake(function fakeFn() {return true})

    await chai
        .request(app)
        .post('/auth/registration')
        .send(MockedUser)

    await chai
        .request(app)
        .get(`/auth/confirm-email/${encrypt(MockedUser.email)}`)
        .set('content-type', 'application/json')
}
describe('routes : auth', () => {
  beforeEach(() => {
    return knex.migrate
        .rollback()
        .then(() => {
          return knex.migrate.latest()
        })
        .then(() => {
          return knex.seed.run()
        })
  })
  afterEach(() => {
    sinon.restore()
    return knex.migrate.rollback()
  })

  it('should register a new user', async () => {
    sinon.stub(auth, 'sendConfirmationEmail').callsFake(function fakeFn() {return true})

    const res = await chai
                        .request(app)
                        .post('/auth/registration')
                        .send(MockedUser)
    assert.strictEqual(res.status, 200)
  })

  it('should login user and provide tokens', async () => {
      await registerUser()

      const res = await chai
                          .request(app)
                          .post(`/auth/login`)
                          .set('content-type', 'application/json')
                          .send(MockedUserCredetials)

      assert.strictEqual(res.headers['set-cookie'][0].includes('token=Bearer'), true)
      assert.strictEqual(res.headers['set-cookie'][1].includes('refreshToken='), true)
      assert.strictEqual(res.statusCode, 200)
  })

  it('should give credentials via refresh token only once', async () => {
      await registerUser()

      const loginRes = await chai
          .request(app)
          .post(`/auth/login`)
          .set('content-type', 'application/json')
          .send(MockedUserCredetials)

      const refreshToken = loginRes.headers['set-cookie'][1].split('refreshToken=')[1].split(';')[0]

      const res = await chai
          .request(app)
          .post(`/auth/refresh-token`)
          .send({refreshToken})
          .set('content-type', 'application/json')

      assert.strictEqual(res.headers['set-cookie'][0].includes('token=Bearer'), true)
      assert.strictEqual(res.headers['set-cookie'][1].includes('refreshToken='), true)
      assert.strictEqual(res.statusCode, 200)

      const secondRes = await chai
          .request(app)
          .post(`/auth/refresh-token`)
          .send({refreshToken})
          .set('content-type', 'application/json')

      assert.strictEqual(secondRes.headers['set-cookie'], undefined)
      assert.strictEqual(secondRes.statusCode, 403)
  })

  it.only('should update password on forgot password', async () => {
      await registerUser()
      const secondRes = await chai
          .request(app)
          .post(`/auth/forgot-password`)
          .send({email: MockedUserCredetials.email})
          .set('content-type', 'application/json')

      assert.strictEqual(secondRes.statusCode, 200)
  })
})
