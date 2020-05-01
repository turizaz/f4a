import * as socketIo from 'socket.io'
const generalSocket = socketIo({path: '/chat/general'});
generalSocket.joinGame = (playersInGame) => {
    if (playersInGame) {
        generalSocket.emit('PLAYER_JOINED', playersInGame);
    }
}
export default generalSocket
