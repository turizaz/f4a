import * as socketIo from 'socket.io'
const gameSocket = socketIo({path: '/chat/game'});
gameSocket.on('connection', (socket) => {
  socket.on('join', (room) => {
    process.stdout.write(`connected to room - ${room}`);
    socket.join(room)
  })
});
export default gameSocket
