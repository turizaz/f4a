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
      <div className="absolute-login-widget">
        {auth.user.name} <i onClick={logout} className="fas fa-sign-out-alt"/>
      </div>
    ) : (
      <div className="absolute-login-widget">
        <div>
          <Link to="/login">Войти</Link>
        </div>
        <div>
          <Link to="/registration">Зарегистрироватся</Link>
        </div>
      </div>
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
