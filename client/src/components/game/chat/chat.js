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
  socket = null;
  /**
   * Init
   */
  async componentDidMount() {
    const {gameService, gameId, addChatMessage, loadChatHistory} = this.props;
    this.socket = await gameService.initChat(gameId);
    this.socket.on('*', (message)=> {
      switch (message.data[0]) {
        case 'GAME_CHAT_MESSAGE_HISTORY':
          loadChatHistory(message.data[1]);
          break;
        case 'GAME_CHAT_MESSAGE_ADDED':
          console.log('d', message.data[1])
          addChatMessage(message.data[1]);
          break;
        default:
          break;
      }
    });
    await gameService.getChatHistory(gameId);
  }

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
    const {gameService, gameId} = this.props;
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
        <form>
          <ul>
            {gameChat.entities.valueSeq().map(
                (it) => {
                  return <ChatMessage key={it.id} item={it} />;
                }
            )}
          </ul>
          <div className="form-group">
            <textarea
              onChange={this.onChange}
              className="form-control"
              name="message"
              id="message"
              placeholder="Чат"
              rows="3"
              onKeyUp={this.sendMessage}
            />
          </div>
        </form>
      </div>
    );
  }
}
Chat.propTypes = {
  addChatMessage: PropTypes.func.isRequired,
  gameId: PropTypes.string.isRequired,
  gameService: PropTypes.object.isRequired,
};
export default connect((state) => {
  return {
    gameChat: state.gameChat,
  };
}, {addChatMessage, loadChatHistory})(withGameService(Chat));
