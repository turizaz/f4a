import React from 'react';
import './login-widget.scss';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from 'ac/auth';
/**
 * Login widget for header
 */
class LoginWidget extends React.Component {

  /**
   * Login widget for header with markup
   * @return {string} - html login widget for header
   */
  render() {
    const {auth, logout} = this.props;
    return auth.isAuthenticated ? (
      <li className="absolute-login-widget">
        {auth.user.name} <i onClick={logout} className="fas fa-sign-out-alt"/>
      </li>
    ) : (
      <span>
        <li>
          <Link to="/login">Войти</Link>
        </li>
        <li>
          <Link to="/registration">Зарегистрироватся</Link>
        </li>
      </span>
    );
  }
}

LoginWidget.propTypes = {
  auth: PropTypes.object,
  logout: PropTypes.func.isRequired,
};

export default connect((state) => {
  return {
    auth: state.auth,
  };
}, {logout})(LoginWidget);
