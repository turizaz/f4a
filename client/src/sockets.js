import io from 'socket.io-client';
import store from 'store';
import {GAME_ADDED, PLAYER_JOINED} from './constants';
import {gameAdded, playerJoined} from './ac/games';
const patch = require('socketio-wildcard')(io.Manager);
const gameSocket =
  io(process.env.REACT_APP_API_PATH, {path: '/chat/game'});
const generalSocket =
  io(process.env.REACT_APP_API_PATH, {path: '/chat/general'});
patch(generalSocket);
patch(gameSocket);

/**
 * Common sockets func
 */
function sockets() {
  console.log(generalSocket);
  generalSocket.on('connect', ()=> {
    console.log('c');
  });
  generalSocket.on('*', function(message) {
    console.log(message);
    switch (message.data[0]) {
      case GAME_ADDED:
        store.dispatch(gameAdded(message.data[1]));
        break;
      case PLAYER_JOINED:
        console.log('pl joined');
        const {gameId, players} = message.data[1];
        store.dispatch(playerJoined(gameId, players));
        break;
      default:
        console.log('unknown action');
        break;
    }
  });
}
export {sockets, gameSocket, generalSocket};