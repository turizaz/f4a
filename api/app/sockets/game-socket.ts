const gameSocket = require('socket.io')({
  path: '/chat/game',
});
gameSocket.on('connection', (socket) => {
  console.log('connected to game socket'+ process.pid);
  socket.on('join', (room) => {
    console.info('game socket | joined', room);
    socket.join(room);
  });
});
module.exports = gameSocket;
