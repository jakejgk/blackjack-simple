import React from 'react'
import './Card.css'

const Card = ({ value, suit }) => {

  let icon;

  switch (suit) {
    case 'spades':
      icon = '♠'
      break;
    case 'clubs':
      icon = '♣'
      break;
    case 'hearts':
      icon = '♥'
      break;
    case 'diamonds':
      icon= '♦'
  }


  return (
    <div className='card-container'>
      <span className='value top'>{value}</span>
      <span className='suit'>{icon}</span>
      <span className='value bottom'>{value}</span>
    </div>
  )
}

export default Card
