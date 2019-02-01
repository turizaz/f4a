import React from 'react';
import {GameServiceConsumer} from 'context/game-service-context';

const withGameService = (WrappedComponent) => {
  return function WithGameService(props) {
    return (
      <GameServiceConsumer>
        {(gameService) => {
          return <WrappedComponent {...props} gameService={gameService} />;
        }}
      </GameServiceConsumer>
    );
  };
};
export default withGameService;
