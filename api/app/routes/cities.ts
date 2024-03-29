import * as Router from 'koa-router'
import cities from '../controllers/cities'
const router = new Router({prefix: '/cities'});

router.get('/showenv', cities.showEnv)
router.get('/getByName/:name', cities.getByName);

module.exports = router;
