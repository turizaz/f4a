'use strict';

const Router = require('koa-router');
const game = require('../controllers/game');
const router = new Router({
  prefix: '/game',
});

router.post('/', game.add);

module.exports = router;
