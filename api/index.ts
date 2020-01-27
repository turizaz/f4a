console.log("START")
import * as Koa from 'koa'
import config from './app/config'
import * as fs from 'fs'
import * as path from 'path'
import * as compose from 'koa-compose'
const app = new Koa()

if (process.env.NODE_ENV === 'development') {
  console.info('development config used')
  require('dotenv').config()
}

import {generalSocket, gameSocket, sockets} from './app/sockets/init'
sockets(app)

app.keys = config.secret

const handlers = fs.readdirSync(path.join(__dirname, 'app/middlewares')).sort()
handlers.forEach((handler) => require('./app/middlewares/' + handler).init(app))

//
// const routes = []
// fs.readdirSync(path.join(__dirname, 'app/routes')).forEach((path) => {
//   routes.push(require('./app/routes/'+path).routes())
// })
// console.log(routes)
// console.log(JSON.stringify(compose(routes)))
// app.use(routes)

import cities from './app/routes/cities'
console.log(cities)
const routes = []
routes.push(cities.routes())
console.log(JSON.stringify(compose(routes)), cities.routes().router);
app.use(compose(routes));

const server = runServer(process.env.NODE_ENV, app)

server.on('error', (err)=> {
  console.log('server crushed')
})

generalSocket.attach(server, {pingTimeout: 60000})
gameSocket.attach(server, {pingTimeout: 60000})
module.exports = server

process.on('unhandledRejection', (error) => {
  console.error('unhandledRejection', error+Date().toString())
})

function runServer(env, app) {
  return 'test' !== env ? app.listen(config.port) : app.listen(config.port+2)
}
