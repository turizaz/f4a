import axios from '../libs/axios'
import {AxiosPromise} from 'axios'
import io from 'socket.io-client'
const patch = require('socketio-wildcard')(io.Manager)

class GameService {

  private _gameSocket!: SocketIOClient.Socket;

  add(game: any): AxiosPromise<{status: number}> {
    game.date = game.date.format().split('+')[0]+'+0000'
    return axios.post(`/game`, game)
  }

  initChat(id: number): Promise<SocketIOClient.Socket> {
    return new Promise((resolve) => {
      this._gameSocket = io({path: `/chat/game`})
      patch(this._gameSocket)
      this._gameSocket.on('connect', () => {
        this._gameSocket.emit('join', `game${id}`, resolve(this._gameSocket))
      })
    })
  }

  destroyChat() {
    this._gameSocket.disconnect()
  }

  addChatMessage(message: any) {
    return axios.post(`/game/chat`, message)
  }

  getChatHistory(gameId: number) {
    return axios.get(`/game/chat/history/${gameId}`)
  }

  joinGame(gameId: number, playerNumber: number) {
    return axios.post(`/game/join`, {gameId, playerNumber})
  }
}
export default GameService
