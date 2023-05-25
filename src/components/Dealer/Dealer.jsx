import React from 'react';
import './Dealer.css';
import Card from '../Card/Card';

const Dealer = ({ dealerCards, gameStage, dealerTotal }) => {
  return (
    <div className='dealer-container'>
      <div className='total'>{gameStage == 'START' || 'INITIAL_DEAL' ? '0' :
                              (gameStage == 'PLAYER_TURN' ? '0' :
                              (dealerTotal <= 21 ? dealerTotal : 'Bust'))}</div>
      <div className='hand-container'>
        {dealerCards.length == 0 ? <><Card /><Card /></> : dealerCards.length == 1 ?
        <>
        <Card />
        {dealerCards.map((card, index) => {
          if (gameStage == 'INITIAL_DEAL' || 'PLAYER_TURN' && index == 0) {
            return <Card 
                      value={''}
                      suit={''}
                      key={index}
                  />
          } else {
            return <Card
                      value={card.value}
                      suit={card.suit}
                      key={index}
                  />
          }
          
        })}
      </>
      :
        dealerCards.map((card, index) => {
          if (gameStage == 'PLAYER_TURN' && index == 0) {
            return <Card 
                    value={''}
                    suit={''}
                    key={index}
                  />
          } else {
            return <Card 
                    value={card.value}
                    suit={card.suit}
                    key={index}
                  />
          }
          
        })}
      </div>
    </div>
  )
}

export default Dealer
