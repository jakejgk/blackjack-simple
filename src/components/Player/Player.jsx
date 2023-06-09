import React from 'react';
import './Player.css';
import Card from '../Card/Card';

const Player = ({ playerCards, playerCardsSplit, gameStage, playerTotal, isSplit, splitFirstPlayerTotal, splitSecondPlayerTotal, isSplitFinished }) => {
  return (
    <div className='player-container'>
      <div className='hand-container'>
        {playerCards.length == 0 ? <><Card /><Card /></> : (!isSplit ? playerCards.length == 1 ?
        <>
          <Card />
          {playerCards.map((card, index) => {
            return <Card 
              value={card.value}
              suit={card.suit}
              key={index}
            />
          })}
        </>
        
        : 
        playerCards.map((card, index) => {
          return  <Card 
                    value={card.value}
                    suit={card.suit}
                    key={index}
                  />
        })
        :
        // use something like this to render each card while maintaining blank cards if not dealt yet: gameStage == 'INITIAL_DEAL' && playerCards.length < 2
        <div className='split-container'>
            <div className='column'>
              <div className={`player-cards-container ${isSplit ? 'split' : ''}`}>
                {playerCards.map((card, index) => {
                  return <Card 
                            value={card.value}
                            suit={card.suit}
                            key={index}
                  />
                })}
              </div>
            </div>
            <div className='column'>
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
        </div>
        )}
      </div>
      {isSplit ? 
      <div className='split-total'>
        <div style={{ marginRight: '140px', color: !isSplitFinished ? 'green' : ''}}>{splitFirstPlayerTotal}</div>
        <div style={{ marginLeft: '140px', color: isSplitFinished && gameStage === 'PLAYER_TURN' ? 'green' : ''}}>{splitSecondPlayerTotal}</div>
      </div> 
        : ''}
      <div className='total'>{isSplit ? '' : (gameStage == 'START' || 'INITIAL_DEAL' ? '0' : (playerTotal <= 21 ? (playerTotal == 21 ? (playerCards.length === 2 ? 'Blackjack!' : '21') : playerTotal) : 'Bust'))}</div>
    </div>
  )
}

export default Player