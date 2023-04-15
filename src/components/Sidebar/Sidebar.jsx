import React, { useRef } from 'react';
import './Sidebar.css';

const Sidebar = ({ isSidebarOpen, numDecks, setNumDecks, handleNumDecks, inputRef, showBook, handleBook }) => {
  const sidebarClass = isSidebarOpen ? 'sidebar-open' : 'sidebar-close';

  return (
    <div className={sidebarClass}>
      <h2 style={{ textAlign: 'center' }}>Settings</h2>
      <ul>
        <li>
          <div className='num-deck-container'>
            <input type='number' onChange={e => setNumDecks(e.target.value)} ref={inputRef} />
            <button onClick={() => handleNumDecks(numDecks)}>Set Deck Count</button>
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
// className={`sidebar ${isSidebarOpen ? 'open' : ''}`}
export default Sidebar;
