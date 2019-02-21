import React, {Component} from 'react';
import Header from './components/header';
import GameForm from './components/game-form';
import Login from './components/auth/login';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route} from 'react-router-dom';
import 'app.scss';
import Game from './components/game';
import Registration from './components/auth/registration';
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
      <div>
        <Header/>
        <div className="container main-content">
          <Route path="/" exact component={GameForm} />
          <Route path="/login" exact component={Login}/>
          <Route path="/game/:id" exact component={Game}/>
          <Route path="/registration" exact component={Registration}/>
        </div>
      </div>
    );
  }
}

export default App;
