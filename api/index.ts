import * as Koa from 'koa'
import ServerUtils from './app/utils/server'
import config from './app/config'
import {addSocketsToContext} from './app/sockets/init'

const app = new Koa();
ServerUtils.loadConfig();
addSocketsToContext(app);
ServerUtils.addMiddleware(app);
ServerUtils.addRoutes(app);
const server = ServerUtils.runServer(config.env, app);
ServerUtils.wrapSockets(server);
export default server
