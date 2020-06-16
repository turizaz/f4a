import React from 'react';
import LoginWidget from './login-widget';
import {Link} from 'react-router-dom';
import './header.scss';
import {withNamespaces} from "react-i18next";
interface Props {
  t:any
}
class Header extends React.Component<Props> {

  /**
   * Render app general header
   * @return {string} - HTML markup for the component
   */
  render() {
    const {t} = this.props
    return (
      <nav className="main-menu shadow-1">
        <div className="container">
          <ul id="main-menu-ul">
            <li className={
              window.location.pathname === '/' ? 'active' : ''
            }>
              <Link to="/">{t('Главная')}</Link>
            </li>
            <li className={
              window.location.pathname === '/about' ? 'active for-desktop-only' : 'for-desktop-only'}>
              <Link to="/about">{t('О сервисе')}</Link>
            </li>
          </ul>
          <LoginWidget/>
        </div>
      </nav>
    );
  }
}

// @ts-ignore
export default withNamespaces()(Header);
