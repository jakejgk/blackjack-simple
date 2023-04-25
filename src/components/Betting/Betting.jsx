import React from 'react';
import './Betting.css';

const Betting = ({ currentBet, totalChips, handleBet, handleReset }) => {
  return (
    <div className='betting-container'>
      <div className='chips-container'>
        <button value='1' onClick={handleBet}>+1</button>
        <button value='5' onClick={handleBet}>+5</button>
        <button value='10' onClick={handleBet}>+10</button>
        <button value='25' onClick={handleBet}>+25</button>
        <button onClick={handleReset}>Reset Bet</button>
      </div>
      <div className="bet-nums">
        <div className='current-bet-container'>
            <p>{currentBet}</p>
            <label>Current Bet</label>
        </div>
        <div className='total-chips-container'>
          <p>{totalChips}</p>
          <label>Total Chips</label>
        </div>
      </div>
      <button value='rebet' id='rebet-btn' onClick={handleBet}>Rebet</button>
    </div>
  )
}

export default Betting
