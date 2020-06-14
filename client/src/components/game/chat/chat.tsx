/* eslint-disable no-invalid-this */
import React, {Component} from 'react';
import './chat.scss';
import ChatMessage from './chat-message';
import {connect} from 'react-redux';
import {addChatMessage, loadChatHistory} from '../../../ac/games';
import _ from 'lodash';
import {withGameService} from '../../../HOCs';
import {withNamespaces} from "react-i18next";

interface Props {
  gameId: any,
  addChatMessage: any,
  loadChatHistory: any,
  gameService: any,
  gameChat: any,
  t: any
}

/**
 * Game chat
 */
class Chat extends Component<Props> {
  /**
   * Init, handle socket messages
   */
  async componentDidMount() {
    const {gameService, gameId} = this.props
    await this.maintainSocketMessages(await gameService.initChat(gameId))
    await gameService.getChatHistory(gameId)
  }
  componentWillUnmount(): void {
    const {gameService} = this.props
    gameService.destroyChat()
  }

  /**
   * @param {object} socket
   * @return {Promise<void>}
   */
  maintainSocketMessages = async (socket: any) => {
    const {addChatMessage, loadChatHistory} = this.props;
    socket.on('*', (message: any)=> {
      console.log(message)
      switch (message.data[0]) {
        case 'GAME_CHAT_MESSAGE_HISTORY':
          loadChatHistory(message.data[1])
          break;
        case 'GAME_CHAT_MESSAGE_ADDED':
          addChatMessage(message.data[1])
          break;
        default:
          break;
      }
    });
  };
  /**
   * @type {{message: null}}
   */
  state = {
    message: null,
  };
  /**
   * Handle all simple text inputs
   * @param {object} e
   * @return {void}
   */
  onChange = (e: any) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  /**
   * @param {Event} e
   */
  sendMessage = async (e: any) => {
    if (e.keyCode !== 13) {
      return
    }
    if (e.target.value.trim() === '') {
      return
    }
    await this.submit()
  };
  /**
   * Submit chat message
   */
  async submit() {
    // @ts-ignore
    document.getElementById('message').value = null
    const {gameService, gameId, t} = this.props;
    const {message} = _.pick(this.state, ['message']);
    if (!message) {
      alert('Нет смысла отправлять пустое сообщение');
      return;
    }
    try {
      await gameService.addChatMessage({
        ..._.pick(this.state, ['message']),
        gameId,
      });
      this.setState({
        message: null,
      });
    } catch (error) {
      if (error.response.status > 400 && error.response.status < 500) {
        alert(t('Залогинтесь, для того чтобы послать сообщение в чат'));
      }
    }
  }

  render() {
    const {gameChat, t} = this.props;
    return (
      <div className="chat">
        <hr/>
        <div className="form-group">
          <textarea
            onChange={this.onChange}
            className="form-control"
            name="message"
            id="message"
            onKeyUp={this.sendMessage}
          />
          <br/>
          <button
            className="btn submit-btn mb-2 shadow-0"
            onClick={this.submit.bind(this)}>{t('Послать сообщение')}</button>
        </div>
        <form>
          <ul>
            {gameChat.entities.valueSeq().map(
                (it: any) => {
                  return <ChatMessage key={it.id} message={it} />
                }
            )}
          </ul>
        </form>
      </div>
    );
  }
}


export default connect((state: any) => {
  return {
    gameChat: state.gameChat,
  };
  // @ts-ignore
}, {addChatMessage, loadChatHistory})(withGameService(withNamespaces()(Chat)));
