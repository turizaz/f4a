import React from 'react';
import LoginWidget from './login-widget';
import SetCityWidget from '../common/set-city-widget';
import {Link} from 'react-router-dom';
import './header.scss';

/**
 * Common header
 */
class Header extends React.Component {
  t = (
    <nav className="navbar" id="mainNav">
      <div className="container">
        <div className="col-4">
          <Link className="slogan" to="/">
            Football 4 all
          </Link>
        </div>
        <div className="col-4">
          <SetCityWidget />
        </div>
        <div className="col-4">
          <LoginWidget />
        </div>
      </div>
    </nav>
  );
  /**
   * Render app general header
   * @return {string} - HTML markup for the component
   */
  render() {
    return (
      <nav className="main-menu">
        <div className="container">
          <ul>
            <li>
              <Link to="/">Главная</Link>
            </li>
            <LoginWidget/>
            <li>
              <Link to="/about">О сервисе</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
