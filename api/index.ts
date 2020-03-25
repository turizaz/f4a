import * as Koa from 'koa'
import config from './app/config'
import * as fs from 'fs'
import * as path from 'path'
import * as compose from 'koa-compose'
import * as dotEnv from 'dotenv'
import {generalSocket, gameSocket, addSocketsToContext} from './app/sockets/init'

const app = new Koa();
loadConfig();
addSocketsToContext(app);
addMiddleware();
addRoutes();
const server = runServer(process.env.NODE_ENV, app);
wrapSockets();
export default server


function runServer(env, koaApp) {
  return 'test' !== env ? koaApp.listen(config.port) : koaApp.listen(config.port+2)
}
function addMiddleware(): void {
  app.keys = config.secret;
  const handlers = fs.readdirSync(path.join(__dirname, 'app/middlewares/default')).sort();
  handlers.forEach((handler) => require('./app/middlewares/default/' + handler).init(app));
}
function addRoutes(): void {
  const routes = [];
  fs.readdirSync(path.join(__dirname, 'app/routes')).forEach((middlewarePath) => {
    routes.push(require('./app/routes/'+middlewarePath).routes())
  });
  app.use(compose(routes));
}
function loadConfig(): void {
  if (process.env.NODE_ENV === 'development') {
    dotEnv.config()
  }
}
function wrapSockets() {
  generalSocket.attach(server, {pingTimeout: 60000});
  gameSocket.attach(server, {pingTimeout: 60000});
}
process.on('unhandledRejection', (error) => {
  console.error('unhandledRejection', error+Date().toString())
});
