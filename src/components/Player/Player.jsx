import React from 'react';
import './Player.css';
import Card from '../Card/Card';

const Player = ({ playerCards, playerCardsSplit, gameStage, playerTotal, isSplit, splitFirstPlayerTotal, splitSecondPlayerTotal, isSplitFinished }) => {
  return (
    <div className='player-container'>
      <div className='hand-container'>
        {gameStage == 'START' ? <><Card /><Card /></> : (!isSplit ? playerCards.map((card, index) => {
          return <Card 
                    value={card.value}
                    suit={card.suit}
                    key={index}
                  />
        })
        : <div className='split-container'>
            <div className='column'>
              <div className='player-cards-container'>
                {playerCards.map((card, index) => {
                  return <Card 
                            value={card.value}
                            suit={card.suit}
                            key={index}
                  />
                })}
              </div>
              {/* <div id='split-total-left'>{isSplit ? splitFirstPlayerTotal : ''}</div> */}
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
              {/* <div id='split-total-right'>{isSplit ? splitSecondPlayerTotal : ''}</div> */}
            </div>
        </div>
        )}
      </div>
      {isSplit ? <div className='split-total'>
        <div style={{ marginLeft: '10px', color: !isSplitFinished ? 'green' : ''}}>{splitFirstPlayerTotal}</div>
        <div style={{ marginRight: '10px', color: !isSplitFinished ? '' : 'green'}}>{splitSecondPlayerTotal}</div>
        
      </div> 
        : ''}
      <div className='total'>{isSplit ? '' : (gameStage == 'START' ? '0' : (playerTotal <= 21 ? (playerTotal == 21 ? (playerCards.length === 2 ? 'Blackjack!' : '21') : playerTotal) : 'Bust'))}</div>
    </div>
  )
}

export default Player