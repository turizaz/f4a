const assert = require('assert');
const knex = require('../../libs/knex');
const app = require('../../../app');
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
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
          should.not.exist(err);
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
          email: 'user-email',
          password: 'user-password',
        })
        .end((err, res) => {
          assert.strictEqual(res.status, 200);
          assert.ok(res.body.token);
          done();
        });
  });
  // todo move to users
  it('should update user', (done) => {
    chai
        .request(app)
        .patch(`/users/1`)
        .send({name: 'new-name', email: 'new-email'})
        .set('Content-type', 'application/json')
        .end((err, res) => {
          assert.strictEqual(res.status, 200);
          assert.strictEqual(res.body.name, 'new-name');
          done();
        });
  });
});
