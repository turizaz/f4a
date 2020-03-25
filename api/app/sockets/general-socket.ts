import * as socketIo from 'socket.io'
const generalSocket = socketIo({path: '/chat/general'});
export default generalSocket
