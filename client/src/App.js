import React, {Component} from 'react';
import Header from './components/header';
import GameForm from './components/game-form';
import Login from './components/auth/login';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route} from 'react-router-dom';
import 'app.scss';

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
        </div>
      </div>
    );
  }
}

export default App;
