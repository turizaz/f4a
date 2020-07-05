import * as React from 'react'
import './login-widget.scss'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {logout} from '../../../ac/auth'
import Locales from "../../locales"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser, faSignInAlt} from "@fortawesome/free-solid-svg-icons";
import {withNamespaces} from "react-i18next";
interface Props {
    auth: any,
    logout: any,
    t: any
}

class LoginWidget extends React.Component<Props> {

  render() {
    const {auth, logout, t} = this.props

    return (
      <div className="absolute-login-widget">
          <div>
              {auth.isAuthenticated ? auth.user.name: ''}
              {/*<FontAwesomeIcon icon={faUser} className='user-icon'/>*/}
              { auth.isAuthenticated ? <a onClick={logout} href='#' className='sign-out'>
                  <FontAwesomeIcon icon={faSignInAlt}/>
              </a> :
              <Link to="/login" className='sign-out'>
                  {t('Авторизация')} <FontAwesomeIcon icon={faSignInAlt}/>
              </Link>}
          </div>
      </div>
    );

    // return auth.isAuthenticated ? (
    //   <div className="absolute-login-widget">
    //       <div>
    //           {auth.user.name}
    //       </div>
    //       <FontAwesomeIcon icon={faUser}/>
    //       <Link to="/logout">
    //           <FontAwesomeIcon icon={faSignInAlt}/>
    //       </Link>
    //       <i onClick={logout} className="fas fa-sign-out-alt"/>
    //   </div>
    // ) : (
    //   <div className="absolute-login-widget">
    //     <div>
    //         <FontAwesomeIcon icon={faUser}/>
    //         <Link to="/login">
    //             <FontAwesomeIcon icon={faSignInAlt}/>
    //         </Link>
    //     </div>
    //   </div>
    // )
  }
}


export default connect((state: any) => {
  return {
    auth: state.auth,
  };
    // @ts-ignore
}, {logout})(withNamespaces()(LoginWidget))
