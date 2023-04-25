import React from 'react';
import './Player.css';
import Card from '../Card/Card';

const Player = ({ playerCards, playerCardsSplit, gameStage, playerTotal, isSplit, splitFirstPlayerTotal, splitSecondPlayerTotal }) => {
  return (
    <div className='player-container'>
      <div className='hand-container'>
        {gameStage == 'INITIAL_DEAL' ? <><Card /><Card /></> : (!isSplit ? playerCards.map((card, index) => {
          return <Card 
                    value={card.value}
                    suit={card.suit}
                    key={index}
                  />
        })
        : <div className='split-container'>
            <div className='player-cards-container'>
              {playerCards.map((card, index) => {
                return <Card 
                          value={card.value}
                          suit={card.suit}
                          key={index}
                />
              })}
            </div>
            <div className='split-cards-container'>
              {playerCardsSplit.map((card, index) => {
                return <Card 
                          value={card.value}
                          suit={card.suit}
                          key={index}
                />
              })}
            </div>

        </div>
        )}
      </div>
      <div className='total'>{isSplit ? '' : (gameStage == 'INITIAL_DEAL' ? '0' : (playerTotal <= 21 ? (playerTotal == 21 ? (playerCards.length === 2 ? 'Blackjack!' : '21') : playerTotal) : 'Bust'))}</div>
      <div className='split-total'>{splitFirstPlayerTotal}</div>
      <div className='split-total'>{splitSecondPlayerTotal}</div>
    </div>
  )
}

export default Player