import {encrypt} from '../../services/crypto'

const assert = require('assert')
import knex from '../../libs/knex'
import app from '../../../'
import {MockedUser, MockedUserCredetials} from './mock.user'
import * as auth from '../../services/auth'
const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const sinon = require('sinon')

describe('routes : games', () => {
    beforeEach(() => {
        return knex.migrate
            .rollback()
            .then(() => {
              return knex.migrate.latest();
            })
            .then(() => {
              return knex.seed.run();
            })
    })

    afterEach(() => {
        sinon.restore()
        return knex.migrate.rollback();
    })

    it('should not add game if not logged', async () => {
        const res = await chai
            .request(app)
            .post('/game')
            .send({
                additional: '',
                address: 'dummy address',
                city: 'Kiev',
                city_id: 1,
                date: '2019-02-09T22:22',
                players: 5,
            })
        assert.strictEqual(res.status, 403)
    })

    it('should add game if logged', async () => {

        sinon.stub(auth, 'sendConfirmationEmail').callsFake(function fakeFn() {return true})

        await chai
            .request(app)
            .post('/auth/registration')
            .send(MockedUser)

        await chai
            .request(app)
            .get(`/auth/confirm-email/${encrypt(MockedUser.email)}`)
            .set('content-type', 'application/json')

        const res = await chai
            .request(app)
            .post(`/auth/login`)
            .set('content-type', 'application/json')
            .send(MockedUserCredetials)

        const token = res.headers['set-cookie'][0]
        const refreshToken = res.headers['set-cookie'][1]

        const addGameRes = await chai
            .request(app)
            .post('/game')
            .set('Cookie', token+';'+refreshToken)
            .send({
                additional: '',
                address: 'dummy address',
                city: 'Kiev',
                city_id: 1,
                date: '2019-02-09T22:22',
                players: 5,
            })
        assert.strictEqual(addGameRes.status, 201)
    })

  it('should load game', async () => {
      sinon.stub(auth, 'sendConfirmationEmail').callsFake(function fakeFn() {return true})

      await chai
          .request(app)
          .post('/auth/registration')
          .send(MockedUser)

      await chai
          .request(app)
          .get(`/auth/confirm-email/${encrypt(MockedUser.email)}`)
          .set('content-type', 'application/json')

      const res = await chai
          .request(app)
          .post(`/auth/login`)
          .set('content-type', 'application/json')
          .send(MockedUserCredetials)

      const token = res.headers['set-cookie'][0]
      const refreshToken = res.headers['set-cookie'][1]

      await chai
          .request(app)
          .post('/game')
          .set('Cookie', token+';'+refreshToken)
          .send({
              additional: '',
              address: 'dummy address',
              city: 'Kiev',
              city_id: 1,
              date: '2019-02-09T22:22',
              players: 5,
          })

    const resGet = await chai
        .request(app)
        .get('/game/1')

    assert.strictEqual(resGet.body.status, 'forming');
  });
});
