require('dotenv').load();

const gameSocket = require('socket.io')({
  path: '/chat/game',
});
gameSocket.on('connection', (socket) => {
  socket.on('join', (room) => {
    console.log('joined', room);
    socket.join(room);
  });
});
module.exports = gameSocket;
