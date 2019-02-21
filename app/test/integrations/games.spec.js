const assert = require('assert');
const knex = require('../../libs/knex');
const app = require('../../../app');
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
describe('routes : games', () => {
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
  it('should add new game', (done) => {
    chai
        .request(app)
        .post('/game')
        .set(
            'Authorization',
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1' +
            'haWwiOiJ0ZXN0QGdtYWlsLmNvbSIsImlhdCI6MTU0OTUzNDk0N30.kQ8jgU' +
            'cehChy0CYcoJCiOGIPubRGllrvDGeRgcfDCK4'
        )
        .send({
          additional: '',
          address: 'Котляревського 65, 44',
          city: 'Kiev',
          city_id: 1,
          date: '2019-02-09T22:22',
          lat: 50.431782,
          long: 30.516382,
          players: 5,
        })
        .end((err, res) => {
          should.not.exist(err);
          assert.strictEqual(res.status, 201);
          done();
        });
  });
  it('should load game', (done) => {
    chai
        .request(app)
        .get('/game/1')
        .end((err, res) => {
          assert.strictEqual(res.body.status, 'forming');
          done();
        });
  });
});
