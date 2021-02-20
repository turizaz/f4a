import * as React from 'react';
import LoginWidget from './login-widget';
import {Link} from 'react-router-dom';
import './header.scss';
import * as translate from "react-i18next";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
interface Props {
  t:any
}
class Header extends React.Component<Props> {
  componentDidMount(): void {
    console.log("HEADER MOUNT")
  }

  state = {mobileMenuShowed: false}
  toggleMenu() {
    this.setState({mobileMenuShowed: !this.state.mobileMenuShowed})
  }
  hideMenu() {
    this.setState({mobileMenuShowed: false})
  }
  /**
   * Render app general header
   * @return {string} - HTML markup for the component
   */
  render() {
    const {t} = this.props
    return (
      <nav className="main-menu">
        <div className="container">
          <div className='mobile-only'>
             <div className='mobile-menu'>
              <FontAwesomeIcon onClick={this.toggleMenu.bind(this)} icon={faBars} size='2x'/>
               {this.state.mobileMenuShowed && <div className='mobile-menu-items'>
                <ul className='shadow-2'>
                  <li onClick={this.hideMenu.bind(this)}><Link to="/"
                  >{t('Главная')}</Link></li>
                  <li onClick={this.hideMenu.bind(this)}><Link to="/about"
                  >{t('О сервисе')}</Link></li>
                  <li onClick={this.hideMenu.bind(this)}><Link to="/create-game"
                  >{t('Создать игру')}</Link></li>
                </ul>
              </div>}
            </div>
          </div>
          <ul id="main-menu-ul" className='desktop-only'>
            <li className={
              window.location.pathname === '/' ? 'active' : ''
            }>
              <Link to="/">{t('Главная')} !</Link>
            </li>
            <li onClick={this.hideMenu.bind(this)} className={window.location.pathname === '/about' ? 'active' : ''}>
              <Link to="/about"
            >{t('О сервисе')}</Link></li>
            <li className={window.location.pathname === '/create-game' ? 'active' : ''}>
              <Link to="/create-game"
                    >{t('Создать игру')}</Link></li>
          </ul>
          <LoginWidget/>
        </div>
      </nav>
    );
  }
}

// @ts-ignore
export default translate.withNamespaces()(Header);
