import React, { useRef } from 'react';
import './Sidebar.css';

const Sidebar = ({ isSidebarOpen, numDecks, setNumDecks, handleNumDecks, showBook, handleBook, deck }) => {
  const sidebarClass = isSidebarOpen ? 'sidebar-open' : 'sidebar-close';

  return (
    <div className={sidebarClass}>
      <h2 style={{ textAlign: 'center' }}>Settings</h2>
      <ul>
        <li>
          <div className='num-deck-container'>
            {/* <input type='number' onChange={e => setNumDecks(e.target.value)} ref={inputRef} />
            <button onClick={() => handleNumDecks(numDecks)}>Set Deck Count</button> */}
            <div className='deck-numbers'>
              <div className='deck-count'>
                <p>{numDecks}</p>
                <label style={{fontSize: '16px'}}>Decks</label>
              </div>
              <div className='card-count'>
                <p>{deck.length}</p>
                <label style={{fontSize: '16px'}}>Cards</label>
              </div>
            </div>
            <div>
              <button id='add-deck-btn' onClick={handleNumDecks}>+1 Deck</button>
              <button id='sub-deck-btn' onClick={handleNumDecks}>-1 Deck</button>
            </div> 
          </div>
        </li>
        <li>
          <div className='book-container'>
            <p style={{ marginTop: '30px', marginBottom: '0px'}}>Show Book</p>
            <div className='book-btn-container'>
              <button id={showBook ? 'selected' : ''} onClick={handleBook}>Yes</button>
              <button id={showBook ? '' : 'selected'} onClick={handleBook}>No</button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};
export default Sidebar;
