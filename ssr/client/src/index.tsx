// @ts-nocheck
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import App from './App';
import store from './store';
import CityService from './services/city';
import {CityServiceProvider} from './context/city-service-context';
import {GameServiceProvider} from './context/game-service-context';
import GameService from './services/game';
import {sockets} from './sockets';
sockets();
ReactDOM.hydrate(
    <BrowserRouter>
      <Provider store={store}>
        <CityServiceProvider value={new CityService()}>
        <GameServiceProvider value={new GameService()}>
          <App />
        </GameServiceProvider>
        </CityServiceProvider>
      </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);
