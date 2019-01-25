import React from 'react';
import './login-widget.scss';

/**
 * Login widget for header
 */
class LoginWidget extends React.Component {
  /**
   * Login widget for header with markup
   * @return {string} - html login widget for header
   */
  render() {
    return (
      <div className="form-row col-12 login-widget">
        <span>
          <a href="js:void()">Войти</a>
          <span> | </span>
          <a href="js:void()">Зарегистрироватся</a>
        </span>
      </div>
    );
  }
}

export default LoginWidget;
