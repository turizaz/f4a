// process.env.NODE_CONFIG_DIR = './app/config';
require('dotenv').load();
if (process.env.TRACE) {
  require('./libs/trace');
}
const config = require('config');
const Koa = require('koa');
const app = new Koa();
app.keys = config.get('secret');

const path = require('path');
const fs = require('fs');

const handlers = fs.readdirSync(path.join(__dirname, 'middlewares')).sort();
handlers.forEach((handler) => require('./middlewares/' + handler).init(app));

const userRouter = require('./routes/user');
const citiesRouter = require('./routes/cities');
const gameRouter = require('./routes/game');
const authRoutes = require('./routes/auth');

app.use(userRouter.routes());
app.use(citiesRouter.routes());
app.use(authRoutes.routes());
app.use(gameRouter.routes());

if ('test' !== process.env.NODE_ENV) {
  module.exports = app.listen(config.get('port'));
} else {
  module.exports = app.listen(config.get('port')+2);
}


