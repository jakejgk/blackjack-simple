import React from 'react';
import './Player.css';
import Card from '../Card/Card';

const Player = ({ playerCards, gameStage, playerTotal }) => {
  return (
    <div className='player-container'>
      <div className='hand-container'>
        {gameStage == 'INITIAL_DEAL' ? <><Card /><Card /></> : playerCards.map((card, index) => {
          return <Card 
                    value={card.value}
                    suit={card.suit}
                    key={index}
                  />
        })}
      </div>
      <div className='total'>{gameStage == 'INITIAL_DEAL' ? '0' : (playerTotal <= 21 ? (playerTotal == 21 ? (playerCards.length === 2 ? 'Blackjack!' : '21') : playerTotal) : 'Bust')}</div>
    </div>
  )
}

export default Player