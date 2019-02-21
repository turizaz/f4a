import React, {Component} from 'react';
import './chat-message.scss';

/**
 * One chat message
 */
class ChatMessage extends Component {
  /**
   * @return {*}
   */
  render() {
    const {text, username, date, id} = this.props.item;
    return (
      <li className="chatMessage">
        <div className="message-data">
          <span className="message-data-name">
            <i className="fa fa-circle online" />{username}
          </span>
          <span className="message-data-time">{date}</span>
        </div>
        <div className="message my-message">{text}</div>
      </li>
    );
  }
}

export default ChatMessage;
