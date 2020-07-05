import * as React from 'react';

const {
  Provider: GameServiceProvider,
  Consumer: GameServiceConsumer,
} = React.createContext(null);

export {GameServiceProvider, GameServiceConsumer};
