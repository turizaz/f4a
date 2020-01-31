import * as Router from 'koa-router'
const cities = require('../controllers/cities');
const router = new Router({
  prefix: '/cities',
});

router.get('/getByName/:name', cities.getByName);

module.exports = router;
