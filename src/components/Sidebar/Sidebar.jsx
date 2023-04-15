import React, { useRef } from 'react';
import './Sidebar.css';

const Sidebar = ({ isSidebarOpen, numDecks, setNumDecks, handleNumDecks, inputRef }) => {
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
        <li>Settings</li>
        <li>About</li>
      </ul>
    </div>
  );
};

export default Sidebar;
