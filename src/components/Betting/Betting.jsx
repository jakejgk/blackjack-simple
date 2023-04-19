import React from 'react';
import './Betting.css';

const Betting = ({ currentBet, totalChips, handleBet, handleReset }) => {
  return (
    <div>
      <div className='chips-container'>
        <button value='1' onClick={handleBet}>+1</button>
        <button value='5' onClick={handleBet}>+5</button>
        <button value='10' onClick={handleBet}>+10</button>
        <button value='25' onClick={handleBet}>+25</button>
        <button value='rebet' id='rebet-btn' onClick={handleBet}>Rebet</button>
      </div>
      <div className="bet-nums">
        <div className='container-1'>
          <div className='container-1a'>
            <div className='current'>
              <p>{currentBet}</p>
              <label style={{fontSize: '16px'}}>Current Bet</label>
            </div>
            <div className='total'>
              <p>{totalChips}</p>
              <label style={{fontSize: '16px'}}>Total Chips</label>
            </div>
          </div>
          <div className='container-1b'>
            <button onClick={handleReset}>Reset Bet</button>
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default Betting
