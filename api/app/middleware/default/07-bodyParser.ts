import * as bodyParser from 'koa-bodyparser'
exports.init = (app) => app.use(bodyParser({
  jsonLimit: '56kb',
}));
