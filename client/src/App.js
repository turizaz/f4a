import React, {Component} from 'react';
import Header from './components/header';
import GameForm from './components/game-form';
import Login from './components/auth/login';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route} from 'react-router-dom';
import 'app.scss';
import Game from './components/game';
import About from './components/about';
import Registration from './components/auth/registration';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'

/**
 * Root of application
 */
class App extends Component {
  /**
   * Render app
   * @return {string} - HTML markup for the component
   */
  render() {
    return (
      <div className={this.props.location.id && 'city-picked'}>
        <Header/>
        <div className="container main-content">
          <Route path="/" exact component={GameForm} />
          <Route path="/about" exact component={About}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/game/:id" exact component={Game}/>
          <Route path="/registration" exact component={Registration}/>
        </div>
      </div>
    );
  }
}
App.propTypes = {
  location: PropTypes.object.isRequired
};

export default withRouter((connect)((state) => {
  return {
    location: state.location,
  };
}, null)(App));

