import gameSocket from './game-socket'
import generalSocket from './general-socket'

const addSocketsToContext = (app) => app.use((ctx, next) => {
  ctx.ioGame = gameSocket
  ctx.ioGeneral = generalSocket
  return next()
})

export {
  generalSocket,
  gameSocket,
  addSocketsToContext,
}
