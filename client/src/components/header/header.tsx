import React from 'react';
import LoginWidget from './login-widget';
import {Link} from 'react-router-dom';
import './header.scss';

class Header extends React.Component {

  /**
   * Render app general header
   * @return {string} - HTML markup for the component
   */
  render() {
    return (
      <nav className="main-menu shadow-1">
        <div className="container">
          <ul id="main-menu-ul">
            <li className={
              window.location.pathname === '/' ? 'active' : ''
            }>
              <Link to="/">Главная</Link>
            </li>
            <li className={
              window.location.pathname === '/about' ? 'active' : ''}>
              <Link to="/about">О сервисе</Link>
            </li>
          </ul>
          <LoginWidget/>
        </div>
      </nav>
    );
  }
}

export default Header;
