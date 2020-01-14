/* eslint-disable no-invalid-this */
import React, {Component} from 'react';
import './chat.scss';
import ChatMessage from './chat-message';
import {connect} from 'react-redux';
import {addChatMessage, loadChatHistory} from 'ac/games';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {withGameService} from 'hoc-helpers';
/**
 * Game chat
 */
class Chat extends Component {
  /**
   * Init, handle socket messages
   */
  async componentDidMount() {
    const {gameService, gameId} = this.props;
    await this.maintainSocketMessages(await gameService.initChat(gameId));
    await gameService.getChatHistory(gameId);
  }
  /**
   * @param {object} socket
   * @return {Promise<void>}
   */
  maintainSocketMessages = async (socket) => {
    const {addChatMessage, loadChatHistory} = this.props;
    socket.on('*', (message)=> {
      switch (message.data[0]) {
        case 'GAME_CHAT_MESSAGE_HISTORY':
          loadChatHistory(message.data[1]);
          break;
        case 'GAME_CHAT_MESSAGE_ADDED':
          addChatMessage(message.data[1]);
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
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  /**
   * @param {Event} e
   */
  sendMessage = (e) => {
    if (e.key === 'Enter') {
      e.target.value = '';
      this.submit();
    }
  };
  /**
   * Submit chat message
   */
  async submit() {
    document.getElementById('message').value = '';
    const {gameService, gameId} = this.props;
    const {message} = _.pick(this.state, ['message']);
    if (!message) {
      alert('Нет смысла отправлять пустое сообщение');
      return;
    }
    await gameService.addChatMessage({
      ..._.pick(this.state, ['message']),
      gameId,
    });
  }
  /**
   * Render game chat
   * @return {*}
   */
  render() {
    const {gameChat} = this.props;
    return (
      <div className="chat">
        <hr/>
        <div className="form-group padding-0">
          <textarea
            onChange={this.onChange}
            className="form-control"
            name="message"
            id="message"
            placeholder="Чат"
            rows="3"
            onKeyUp={this.sendMessage}
          />
          <br/>
          <button
            className="btn submit-btn mb-2"
            onClick={this.submit.bind(this)}>Послать сообщение</button>
        </div>
        <form>
          <ul>
            {gameChat.entities.valueSeq().map(
                (it) => {
                  return <ChatMessage key={it.id} message={it} />;
                }
            )}
          </ul>
        </form>
      </div>
    );
  }
}
Chat.propTypes = {
  addChatMessage: PropTypes.func.isRequired,
  gameId: PropTypes.string.isRequired,
  loadChatHistory: PropTypes.func.isRequired,
  gameService: PropTypes.object.isRequired,
  gameChat: PropTypes.object.isRequired,
};
export default connect((state) => {
  return {
    gameChat: state.gameChat,
  };
}, {addChatMessage, loadChatHistory})(withGameService(Chat));
