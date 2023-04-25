import React from 'react';
import './Actions.css';

const Actions = ({ hit, stand, newGame, double, gameStage}) => {
  return (
    <div className='buttons'>
      {gameStage === 'INITIAL_DEAL' ? <button onClick={newGame}>Start New Game</button> 
      : (gameStage === 'PLAYER_TURN' ? <>
      <button onClick={hit}>Hit</button>
      <button onClick={stand}>Stand</button>
      <button onClick={double}>Double</button>
      </> 
      : (gameStage === 'DEALER_TURN' ? <button id='dealer-turn-btn'>Play Again</button> 
      : (gameStage === 'GAME_OVER' ?  <button onClick={newGame}>Play Again</button> : '')))}

      {/*  */}
    </div>
  )
}

export default Actions
