const assert = require('assert');
//process.env.NODE_ENV = 'test';
const knex = require('../../libs/knex');
const app = require('../../../app');

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const supertest = require('supertest');
const uniqueHash = Math.random()
    .toString(36)
    .substr(2, 9);

describe('routes : auth', () => {

  beforeEach(() => {
    return knex.migrate.rollback().then(() => {
      return knex.migrate.latest();
    });
  });

  afterEach(() => {
    return knex.migrate.rollback();
  });

  describe('POST /auth/registration', () => {
    it('should register a new user', (done) => {
      chai
          .request(app)
          .post('/auth/registration')
          .send({
            username: 'michael',
            password: 'herman',
          })
          .end((err, res) => {
            should.not.exist(err);
            assert.strictEqual(res.status, 201);
            done();
          });
    });
  });
});

// describe('testing users', function() {
//   describe('API', async () => {
//     let userId;
//
//     const throwIfError = (err, res) => {
//       if (err) throw err;
//     };
//
//     before((done) => {
//       server = app.listen({port: 8888}, done);
//     });
//
//     after((done) => {
//       server.close(done);
//     });
//
//     beforeEach(async () => {
//       request = supertest(server);
//     });
//
//     it.only('should create user', async () => {
//       const res = await request
//           .post(`/users`)
//           .send({name: uniqueHash, email: 'test@gmail.com'})
//           .set('Content-type', 'application/json');
//       userId = res.body.id;
//
//       console.log(res);
//       return assert.equal(res.status, 201);
//     });
//
//     it('should returns JSON for existing user', async () => {
//       const res = await request.get(`/users/${userId}`);
//       return assert.equal(200, res.status);
//     });
//
//     it('should update user', async () => {
//       const newName = 'changedName';
//       const res = await request
//           .patch(`/users/${userId}`)
//           .send({name: newName})
//           .set('Content-type', 'application/json');
//       const checkChanged = await request.get(`/users/${userId}`);
//       assert.equal(checkChanged.body.name, newName);
//       return assert.equal(res.status, 200);
//     });
//
//     it('should delete user', async () => {
//       const res = await request.delete(`/users/${userId}`);
//       return assert.equal(200, res.status);
//     });
//   });
// });
