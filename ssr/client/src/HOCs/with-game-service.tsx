import * as React from 'react'
import {GameServiceConsumer} from '../context/game-service-context'

const withGameService = (WrappedComponent: any) => {
  return function WithGameService(props: any) {
    return (
      <GameServiceConsumer>
        {(gameService) => {
          return <WrappedComponent {...props} gameService={gameService} />
        }}
      </GameServiceConsumer>
    )
  }
}
export default withGameService
