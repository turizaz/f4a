const gameChat = require('./game-chat')
const generalSocket = require('./general-socket')

exports.init = (app) => app.use((ctx, next) => {
  ctx.ioGame = gameChat
  ctx.ioGeneral = generalSocket
  return next()
})

export {
  generalSocket,
  gameChat,
}
