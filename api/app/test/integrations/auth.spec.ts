import { strict as assert } from 'assert'
import knex from '../../libs/knex'

import app from '../../../'
const chai = require('chai');
// import chai, {should} from 'chai'
const chaiHttp = require('chai-http')
chai.use(chaiHttp);

describe('routes : auth', () => {
  before(() => {
    return knex.migrate
        .rollback()
        .then(() => {
          return knex.migrate.latest();
        })
        .then(() => {
          return knex.seed.run();
        });
  });
  after(() => {
    return knex.migrate.rollback();
  });
  it('should register a new user', (done) => {
    chai
        .request(app)
        .post('/auth/registration')
        .send({
          name: 'michael',
          email: 'herman',
          password: 'herman',
        })
        .end((err, res) => {
          chai.should().not.exist(err);
          assert.strictEqual(res.status, 201);
          done();
        });
  });
  it('should login a user', (done) => {
    chai
        .request(app)
        .post('/auth/login-jwt')
        .set('content-type', 'application/json')
        .send({
          email: 'user@email.com',
          password: 'user-password',
        })
        .end((err, res) => {
          assert.strictEqual(res.status, 200);
          done();
        });
  });
});
