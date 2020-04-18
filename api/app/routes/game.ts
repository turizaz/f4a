import * as Router from 'koa-router'
import game from '../controllers/game'
const router = new Router({prefix: '/game'});
import passport from '../libs/passport'
const passportMiddleware = passport.authenticate(['jwt', 'jwt-refresh'], {session: false})

router.post('/', passportMiddleware, game.add);
router.post('/join', passportMiddleware, game.join);
router.get('/:id', game.get);
router.get('/city/:id', game.list);

router.post('/chat', passportMiddleware, game.addChatMessage);
router.get('/chat/history/:gameId', game.getChatHistory);

module.exports = router;
