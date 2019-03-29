require('dotenv').load();
if (process.env.TRACE) {
  require('./libs/trace');
}
process.setMaxListeners(0);

const config = require('config');
const Koa = require('koa');
const app = new Koa();
const gameChat = require('./sockets/game-chat');
const generalSocket = require('./sockets/general-socket');
const compose = require('koa-compose');
const path = require('path');
const fs = require('fs');


app.use((ctx, next) => {
  ctx.ioGame = gameChat;
  ctx.ioGeneral = generalSocket;
  return next();
});
app.keys = config.get('secret');

const handlers = fs.readdirSync(path.join(__dirname, 'middlewares')).sort();
handlers.forEach((handler) => require('./middlewares/' + handler).init(app));

app.use(
    compose([
      require('./routes/user').routes(),
      require('./routes/cities').routes(),
      require('./routes/game').routes(),
      require('./routes/auth').routes(),
    ])
);
let server;
if ('test' !== process.env.NODE_ENV) {
  server = app.listen(config.get('port'));
} else {
  server = app.listen(config.get('port')+2);
}

generalSocket.attach(server, {pingTimeout: 60000});
gameChat.attach(server, {pingTimeout: 60000});
module.exports = server;
