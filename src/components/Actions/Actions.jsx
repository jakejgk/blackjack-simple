import React from 'react';
import './Actions.css';

const Actions = ({ hit, stand, newGame, newNewGame, double, split, isSplitAvailable, isSplit, handleBet, gameStage}) => {
  return (
    <div className='buttons'>
      {gameStage === 'START' ? <button onClick={newGame}>Start New Game</button> 
      : gameStage === 'INITIAL_DEAL' ? <button id='dealer-turn-btn'>Play Again</button> : (gameStage === 'PLAYER_TURN' ? (!isSplitAvailable ? <>
      <button onClick={hit}>Hit</button>
      <button onClick={stand}>Stand</button>
      <button onClick={double}>Double</button>
      </> :
      (
        isSplit ? <>
          <button onClick={hit}>Hit</button>
          <button onClick={stand}>Stand</button>
          <button onClick={double}>Double</button>
        </> : 
        <>
        <button onClick={hit}>Hit</button>
        <button onClick={stand}>Stand</button>
        <button onClick={double}>Double</button>
        <button onClick={split}>Split</button>
      </>
      )
      ) 
      : (gameStage === 'DEALER_TURN' ? <button id='dealer-turn-btn'>Play Again</button> 
      : (gameStage === 'GAME_OVER' ?  <><button onClick={newNewGame}>Play Again</button><button value='rebet' id='rebet-btn' onClick={handleBet}>Rebet</button></> : '')))}

      {/*  */}
    </div>
  )
}

export default Actions
