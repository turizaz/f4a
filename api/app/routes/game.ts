import * as Router from 'koa-router'
import game from '../controllers/game'
import authMiddleware from '../middleware/auth'
const router = new Router({prefix: '/game'});

router.post('/', authMiddleware, game.add);
router.post('/join', authMiddleware, game.join);
router.get('/:id', game.get);
router.get('/city/:id', game.list);

router.post('/chat', authMiddleware, game.addChatMessage);
router.get('/chat/history/:gameId', game.getChatHistory);

module.exports = router;
