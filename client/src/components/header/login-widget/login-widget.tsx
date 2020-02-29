import React from 'react'
import './login-widget.scss'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {logout} from '../../../ac/auth'
interface Props {
    auth: any,
    logout: any
}
/**
 * Login widget for header
 */
class LoginWidget extends React.Component<Props> {

  /**
   * Login widget for header with markup
   * @return {string} - html login widget for header
   */
  render() {
    const {auth, logout} = this.props
      console.log(auth)
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
    )
  }
}

export default connect((state: any) => {
  return {
    auth: state.auth,
  };
}, {logout})(LoginWidget)
