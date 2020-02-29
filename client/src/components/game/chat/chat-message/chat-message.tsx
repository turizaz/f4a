import React, {Component} from 'react';
import './chat-message.scss';

interface Props {
    message: {text: string, username: string, date: any}
}

/**
 * One chat message
 */
class ChatMessage extends Component<Props> {
  /**
   * @return {JSX}
   */
  render() {
    const {text, username, date} = this.props.message
    return (
      <li className="chatMessage">
        <div className="message-data">
          <span className="message-data-name">{username}
          </span>
          <span className="message-data-time">
            {new Date(date).toISOString().slice(0, 16).replace('T', ' ')}
          </span>
        </div>
        <div className="message my-message shadow-0">{text}</div>
      </li>
    );
  }
}

export default ChatMessage
