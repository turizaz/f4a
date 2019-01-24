// process.env.NODE_CONFIG_DIR = './app/config';
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
const frontPageRoutes = require('./routes/frontpage');
const citiesRouter = require('./routes/cities');


app.use(userRouter.routes());
app.use(frontPageRoutes.routes());
app.use(citiesRouter.routes());

if ('test' !== process.env.NODE_ENV) {
  app.listen(config.get('port'));
}

module.exports = {
  app,
};
