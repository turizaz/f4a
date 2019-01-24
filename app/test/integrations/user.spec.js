const assert = require('assert');
const app = require('../../../app/index').app;
const supertest = require('supertest');
const uniqueHash = Math.random().toString(36).substr(2, 9);

describe('testing users', function () {
    describe('API', async () => {

        let userId;

        const throwIfError = (err, res) => {
            if (err) throw err
        }

        before((done) => {
            server = app.listen(8888, done)
        });

        after((done) => {
            server.close(done)

        });

        beforeEach(async () => {
            request = supertest(server)
        });

        it('should create user', async () => {
            const res = await request
                .post(`/users`)
                .send({"name": uniqueHash, "email": "test@gmail.com"})
                .set('Content-type', 'application/json')
            ;
            userId = res.body.id;
            return assert.equal(201, res.status);
        });

        it('should returns JSON for existing user', async () => {
            const res = await request.get(`/users/${userId}`);
            return assert.equal(200, res.status);
        });

        it('should update user', async () => {
            const newName = 'changedName';
            const res = await request
                .patch(`/users/${userId}`)
                .send({'name': newName})
                .set('Content-type', 'application/json');
            const checkChanged = await request.get(`/users/${userId}`);
            assert.equal(checkChanged.body.name, newName);
            return assert.equal(res.status, 200);
        });

        it('should delete user', async () => {
            const res = await request.delete(`/users/${userId}`);
            return assert.equal(200, res.status);
        });

    });
});