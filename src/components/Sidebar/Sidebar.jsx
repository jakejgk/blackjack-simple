import React, { useRef } from 'react';
import './Sidebar.css';

const Sidebar = ({ isSidebarOpen, numDecks, handleNumDecks, showBook, handleBook, deck, userChangeChips, handleChipsChange, handleChipsSubmit }) => {
  const sidebarClass = isSidebarOpen ? 'sidebar-open' : 'sidebar-close';

  return (
    <div className={sidebarClass}>
      <h2 style={{ textAlign: 'center' }}>Settings</h2>
      <ul>
        <li>
          <div className='num-deck-container'>
            <div className='deck-nums'>
              <div className='deck-count'>
                <p>{numDecks}</p>
                <label style={{fontSize: '16px'}}>Decks</label>
              </div>
              <div className='card-count'>
                <p>{deck.length}</p>
                <label style={{fontSize: '16px'}}>Cards</label>
              </div>
            </div>
            <div className='deck-btn-container'>
              <button id='add-deck-btn' onClick={handleNumDecks}>+1 Deck</button>
              <button id='sub-deck-btn' onClick={handleNumDecks}>-1 Deck</button>
            </div> 
          </div>
        </li>
        <li>
          <div className='book-container'>
            <p style={{ marginTop: '30px', marginBottom: '0px'}}>Show Book</p>
            <div className='book-btn-container'>
              <button id={showBook ? 'selected' : 'not-selected'} onClick={handleBook}>Yes</button>
              <button id={showBook ? 'not-selected' : 'selected'} onClick={handleBook}>No</button>
            </div>
          </div>
        </li>
        <li>
          <div className='chips-settings-container'>
            <p style={{ marginTop: '30px', marginBottom: '0px'}}>Set Chips</p>
            <div className='chips-btn-container'>
              <input value={userChangeChips} onChange={handleChipsChange}></input>
              <button id='set-chips-btn' onClick={handleChipsSubmit}>Set Chips</button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};
export default Sidebar;
