require('dotenv').load();

const gameSocket = require('socket.io')({
  path: '/chat/game',
});
gameSocket.on('connection', (socket) => {
  console.log('connected to game socket');
  socket.on('join', (room) => {
    console.log('joined', room);
    socket.join(room);
  });
});
module.exports = gameSocket;
