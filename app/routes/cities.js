'use strict';

const Router = require('koa-router');
const cities = require('../controllers/cities');
const router = new Router({
  prefix: '/cities',
});

router.get('/', cities.get)
    .get('/getByName/:name', cities.getByName);

module.exports = router;
