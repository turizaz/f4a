import React, {Component} from 'react';
import Header from './components/header';
import GameForm from './components/game-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.scss';

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
        <div className="container">
          <GameForm/>
        </div>
      </div>
    );
  }
}

export default App;
