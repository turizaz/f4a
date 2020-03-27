import config from '../config'
import * as fs from 'fs'
import * as path from 'path'
import * as dotEnv from 'dotenv'
import * as compose from 'koa-compose'
import {gameSocket, generalSocket} from '../sockets/init';
class Server {
    static addMiddleware(app): void {
        const handlers = fs.readdirSync(path.join(__dirname, './../middleware/default/')).sort();
        handlers.forEach((handler) => require('./../middleware/default/' + handler).init(app));
    }
    static runServer(env, koaApp) {
        return 'test' !== env ? koaApp.listen(config.port) : koaApp.listen(config.port+2)
    }
    static loadConfig(): void {
        if (config.env === 'development') {
            dotEnv.config()
        }
    }
    static addRoutes(app): void {
        const routes = [];
        fs.readdirSync(path.join(__dirname, './../routes')).forEach((middlewarePath) => {
            routes.push(require('./../routes/'+middlewarePath).routes())
        });
        app.use(compose(routes));
    }
    static wrapSockets(server) {
        generalSocket.attach(server, {pingTimeout: 60000});
        gameSocket.attach(server, {pingTimeout: 60000});
    }
}
export default Server


