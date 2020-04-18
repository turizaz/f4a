import config from '../config'
import * as fs from 'fs'
import * as path from 'path'
import * as compose from 'koa-compose'
import cookie from 'koa-cookie'
import {gameSocket, generalSocket} from '../sockets/init'

class Server {
    static addMiddleware(app): void {
        const handlers = fs.readdirSync(path.join(__dirname, './../middleware/default/')).sort();
        handlers.forEach((handler) => require('./../middleware/default/' + handler).init(app));
    }
    static runServer(koaApp) {
        return 'test' !== config.env ? koaApp.listen(config.PORT) : koaApp.listen(config.PORT+2)
    }
    static addRoutes(app): void {
        const routes = [];
        app.use(cookie())
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


