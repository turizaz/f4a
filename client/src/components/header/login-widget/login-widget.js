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
    console.log(auth);
    return (
      <div className="form-row col-12 login-widget">
        {!auth.user.email ? (
          <div>
            <span>
              <Link to="/login">Войти {auth.user.email}</Link>
            </span>
            <span> | </span>
            <span>
              <Link to="/register">Зарегистрироватся</Link>
            </span>
          </div>
        ) : (
          <div onClick={logout}>
            <span>{auth.user.email}</span> <span> | Выйти</span>
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
