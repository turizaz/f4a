import * as Router from 'koa-router'
// const game = require('../controllers/game')
import game from '../controllers/game'
const router = new Router({
  prefix: '/game',
});

router.post('/', game.add)
router.post('/join', game.join)
router.get('/:id', game.get)
router.get('/city/:id', game.list)

router.post('/chat', game.addChatMessage)
router.get('/chat/history/:gameId', game.getChatHistory)

module.exports = router
