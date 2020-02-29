// @ts-nocheck
import React from 'react';
import ReactDOM from 'react-dom';
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
ReactDOM.render(
    <BrowserRouter>
      <Provider store={store}>
        {/* eslint-disable */}
        <CityServiceProvider value={new CityService()}>
        <GameServiceProvider value={new GameService()}>
          <App />
        </GameServiceProvider>
        </CityServiceProvider>
        {/* eslint-enable */}
      </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);
