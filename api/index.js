// process.env.NODE_CONFIG_DIR = './app/config';
require('dotenv').load();
if (process.env.TRACE) {
  require('./libs/trace');
}
process.setMaxListeners(0);

const config = require('config');
const Koa = require('koa');
const app = new Koa();
const gameChat = require('./sockets/game-chat');
const generalSocket = require('./sockets/general-socket')

app.use((ctx, next) => {
  ctx.ioGame = gameChat;
  ctx.ioGeneral = generalSocket;
  return next();
});
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

let server;
if ('test' !== process.env.NODE_ENV) {
  server = app.listen(config.get('port'));
} else {
  server = app.listen(config.get('port')+2);
}

generalSocket.attach(server, {pingTimeout: 60000});
gameChat.attach(server, {pingTimeout: 60000});

module.exports = server;
