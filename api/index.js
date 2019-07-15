import Koa from 'koa'
import config from './app/config'
import fs from 'fs'
import path from 'path'
import compose from 'koa-compose'

const app = new Koa()

if (process.env.NODE_ENV === 'development') {
  console.info('development config has been used')
  require('dotenv').config()
}
require('./app/sockets/init').init(app)
import {generalSocket, gameChat} from './app/sockets/init'
app.keys = config.secret
const handlers = fs.readdirSync(path.join(__dirname, 'app/middlewares')).sort()
handlers.forEach((handler) => require('./app/middlewares/' + handler).init(app))

const routes = []
fs.readdirSync(path.join(__dirname, 'app/routes')).forEach((path) => {
  routes.push(require('./app/routes/'+path).routes())
})
app.use(compose(routes))

const server = runServer(process.env.NODE_ENV, app)

generalSocket.attach(server, {pingTimeout: 60000})
gameChat.attach(server, {pingTimeout: 60000})
module.exports = server

/**
 * @param {string} env
 * @param {object} app
 * @return {*}
 */
function runServer(env, app) {
  if ('test' !== env) {
    return app.listen(config.port)
  } else {
    return app.listen(config.port+2)
  }
}
