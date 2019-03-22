import React, {Component} from 'react';
import './chat-message.scss';
import PropTypes from 'prop-types';

/**
 * One chat message
 */
class ChatMessage extends Component {
  /**
   * @return {*}
   */
  render() {
    const {text, username, date} = this.props.message;
    return (
      <li className="chatMessage">
        <div className="message-data">
          <span className="message-data-name">{username}
          </span>
          <span className="message-data-time">{date}</span>
        </div>
        <div className="message my-message">{text}</div>
      </li>
    );
  }
}
ChatMessage.propTypes = {
  message: PropTypes.object.isRequired,
};
export default ChatMessage;
