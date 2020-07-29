import * as Koa from 'koa'
import ServerUtils from './app/utils/server'
import {addSocketsToContext} from './app/sockets/init'
import passport from './app/libs/passport';
const app = new Koa();
app.use(passport.initialize())
addSocketsToContext(app);
ServerUtils.addMiddleware(app);
ServerUtils.addRoutes(app);
const server = ServerUtils.runServer(app);
ServerUtils.wrapSockets(server);
export default server

