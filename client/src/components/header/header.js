import React from 'react';
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
            <div className="form-row col-12 city-widget">
              <span className="city-name col-6">Город : </span>
              <div className="col-6">
                <input type="text" className="form-control"/>
              </div>
            </div>
          </div>
          <div className="col-4 end">
            <div className="form-row col-12 login-widget">
              <span className="city-name col-3">Войти</span>
            </div>
          </div>
        </div>
      </nav>
    );
  };
}

export default Header;
