import React from 'react';
import LoginWidget from './login-widget';
import SetCityWidget from './set-city-widget';
import './header.scss';

/**
 * Common header
 */
class Header extends React.Component {
  /**
   * Render app general header
   * @return {string} - HTML markup for the component
   */
  render() {
    return (
      <nav className="navbar" id="mainNav">
        <div className="container">
          <div className="col-4">
            <a className="slogan" href="/">Football 4 all</a>
          </div>
          <div className="col-4">
            <SetCityWidget/>
          </div>
          <div className="col-4">
            <LoginWidget/>
          </div>
        </div>
      </nav>
    );
  };
}

export default Header;
