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
    return (
      <div className="form-row col-12 login-widget">
        {!auth.isAuthenticated ? (
          <div>
            <span>
              <Link to="/login">Войти</Link>
            </span>
            <span> | </span>
            <span>
              <Link to="/registration">Зарегистрироватся</Link>
            </span>
          </div>
        ) : (
          <div onClick={logout}>
            <span>{auth.user.name}</span> <span> | Выйти</span>
          </div>
        )}
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
