const gameSocket = require('./game-socket')
const generalSocket = require('./general-socket')

const sockets = (app) => app.use((ctx, next) => {
  ctx.ioGame = gameSocket
  ctx.ioGeneral = generalSocket
  return next()
})

export {
  generalSocket,
  gameSocket,
  sockets,
}
