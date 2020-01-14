import React from 'react';
import LoginWidget from './login-widget';
import {Link} from 'react-router-dom';
import './header.scss';

/**
 * Common header
 */
class Header extends React.Component {
  /**
   * Toggle main menu
   */
  toggleMenu = () => {
    const mainMenu = document.getElementById('main-menu-ul');
    mainMenu.style.visibility =
      mainMenu.style.visibility === 'hidden' || !mainMenu.style.visibility
        ? 'visible' : 'hidden';
  };
  closeMenu = () => {
    const mainMenu = document.getElementById('main-menu-ul');
    mainMenu.style.visibility = 'hidden';
  };
  /**
   * Render app general header
   * @return {string} - HTML markup for the component
   */
  render() {
    return (
      <nav className="main-menu">
        <div className="container">
          <div className="switcher" onClick={this.toggleMenu}>
            <i className="fas fa-bars"/>
          </div>
          <ul id="main-menu-ul" onClick={this.closeMenu}>
            <li>
              <Link to="/">Главная</Link>
            </li>
            <li>
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
