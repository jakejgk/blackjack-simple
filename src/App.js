import './App.css';
import { useState, useEffect, useRef } from 'react';
import deckData from './deck.json';
import _, { delay, range } from 'lodash';
import Dealer from './components/Dealer/Dealer';
import Player from './components/Player/Player';
import Sidebar from './components/Sidebar/Sidebar';
import Betting from './components/Betting/Betting';
import { cardValue, book } from './functions.js';

function App() {

  const GameStage = {
    INITIAL_DEAL: 'INITIAL_DEAL',
    PLAYER_TURN: 'PLAYER_TURN',
    DEALER_TURN: 'DEALER_TURN',
    GAME_OVER: 'GAME_OVER'
  }

  const [deck, setDeck] = useState(_.shuffle(deckData))
  const [gameStage, setGameStage] = useState(GameStage.INITIAL_DEAL)
  const [dealerCards, setDealerCards] = useState([])
  const [dealerTotal, setDealerTotal] = useState('')
  const [dealerSubtracted, setDealerSubtracted] = useState(0)
  const [playerCards, setPlayerCards] = useState([])
  const [playerTotal, setPlayerTotal] = useState('')
  const [playerSubtracted, setPlayerSubtracted] = useState(0)
  const [outcome, setOutcome] = useState('')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [showBook, setShowBook] = useState(true)
  const [bookAdvice, setBookAdvice] = useState('')
  const [currentBet, setCurrentBet] = useState(0)
  const [recentBet, setRecentBet] = useState(0)
  const [totalChips, setTotalChips] = useState(100)

  // deals 4 cards (stored in playerCards and dealerCards state) and sets GameStage to PLAYER_TURN
  function newGame() {
    if (deck.length > 0) {
      if (gameStage !== 'INITIAL_DEAL') {
        setGameStage(GameStage.INITIAL_DEAL)
        setPlayerSubtracted(0)
        setDealerSubtracted(0)
        setOutcome('')
      }
      let who = 'player'
      let playerInitial = [];
      let playerNum = 0;
      let dealerInitial = [];
      let dealerNum = 0;
      setLastBet(currentBet)
      for (let i = 0; i < 4; i++) {
        let card = deck.pop()
        let val = cardValue(card.value)
        if (who == 'player') {
          who = 'dealer'
          playerInitial.push(card)
          playerNum += parseInt(val)
        } else {
          who = 'player'
          dealerInitial.push(card)
          dealerNum += parseInt(val)
        }
      }
      // if first 2 player cards are both aces
      if (playerInitial.slice(0, 2).filter(card => card.value === 'A').length === 2) {
        setPlayerTotal(12)
        setPlayerSubtracted(prevPlayerSubtracted => prevPlayerSubtracted + 1)
      } else {
        setPlayerTotal(playerNum)
      }
      // if first 2 dealer cards are both aces
      if (dealerInitial.slice(0, 2).filter(card => card.value === 'A').length === 2) {
        setDealerTotal(12)
        setDealerSubtracted(prevDealerSubtracted => prevDealerSubtracted + 1)
      } else {
        setDealerTotal(dealerNum)
      }
      setPlayerCards(playerInitial)
      setDealerCards(dealerInitial)
      setGameStage(() => GameStage.PLAYER_TURN)
    } else {alert('No cards left')}
  }
  
  // deals a card to player
  function playerDeal() {
    let playerNum = 0;
    let card = deck.pop()
    let val = parseInt(cardValue(card.value))
    // if player turn and if playerTotal + new card is greater than 21
    if (gameStage == 'PLAYER_TURN' && playerTotal + val > 21) {
      // if recent card is an ace, make val 1
      if (val == 11) {
        val = 1
        setPlayerSubtracted(prevPlayerSubtracted => prevPlayerSubtracted + 1)
      // if recent card not ace and there are aces in hand still counting as 11
      } else if (playerCards.filter(card => card.value == 'A').length > playerSubtracted) {
        val -= 10;
        setPlayerSubtracted(prevPlayerSubtracted => prevPlayerSubtracted + 1)
      } else (
        setGameStage(GameStage.GAME_OVER)
      )
    } 
    playerNum = val
    setPlayerTotal(() => playerTotal + playerNum)
    setPlayerCards(() => [...playerCards, card])
  }
  
  // deals a card to dealer
  function dealerDeal() {
    let dealerNum = 0;
    let card = deck.pop()
    let val = parseInt(cardValue(card.value))
    // if dealer turn and if dealerTotal + new card is greater than 21
    if (gameStage === 'DEALER_TURN' && dealerTotal + val > 21) {
      // if recent card is an ace, make val 1
      if (val == 11) {
        val -= 10
        setDealerSubtracted(prevDealerSubtracted => prevDealerSubtracted + 1)
        // if recent card not ace and there are aces in hand still counting as 11
      } else if (dealerCards.filter(card => card.value === 'A').length > dealerSubtracted) {
        console.log('fired')
        val -= 10
        setDealerSubtracted(prevDealerSubtracted => prevDealerSubtracted + 1)
      }
    }
    dealerNum = val
    setDealerCards(prevDealerCards => [...prevDealerCards, card])
    setDealerTotal(prevDealerTotal => prevDealerTotal + dealerNum)

    // end game if dealer goes above 17
    if (dealerTotal + dealerNum >= 17 && gameStage == 'DEALER_TURN') {
      setGameStage(GameStage.GAME_OVER)
      if (dealerTotal < 21 && playerTotal > dealerTotal) {
        setTotalChips(totalChips + currentBet + currentBet)
      }
      setCurrentBet(0)
    }
  }

  // interval for dealer deal
  let intervalID;
  useEffect(() => {
    if (gameStage == 'DEALER_TURN') {
      setTimeout(() => {
        dealerDeal()
      }, '1000');
    }
  }, [gameStage, dealerCards])

  function hit() {
    if (playerTotal < 21) {
      playerDeal()
    }
  }

  function stand() {
    if (dealerTotal >= 17 && dealerCards.length == 2) {
      if (dealerTotal === 17 && dealerCards.filter(card => card.value === 'A').length == 1) {
        setGameStage(GameStage.DEALER_TURN)
      } else {
        setGameStage(GameStage.GAME_OVER)
      }
    } else {
      setGameStage(GameStage.DEALER_TURN)
    }
  }

  // ends game if player has blackjack
  useEffect(() => {
    if (playerTotal === 21 && playerCards.length === 2) {
      setGameStage(GameStage.GAME_OVER)
      // change this number
      setTotalChips(totalChips + currentBet + currentBet + currentBet )
      setCurrentBet(0)
    }
  }, [playerTotal])

  // determines winner
  function determineWinner() {
    if (playerTotal > 21) {
      setOutcome('Lose')
      setCurrentBet(0)
    } else if (dealerTotal > 21 || playerTotal > dealerTotal) {
      setOutcome('Win')
      setCurrentBet(0)
      setTotalChips(totalChips + currentBet + currentBet)
    } else if (playerTotal === dealerTotal){
      setOutcome('Tie')
      setCurrentBet(0)
      setTotalChips(totalChips + currentBet)
    } else {
      setOutcome('Lose')
      setCurrentBet(0)
    }
  }

  // determines winner
  useEffect(() => {
    if (gameStage === GameStage.GAME_OVER) {
      determineWinner()
    }
  }, [gameStage])

  // sets color to green or red depending on winner
  let winnerColor;
  if (outcome === 'Win') {
    winnerColor = 'green'
  } else if (outcome === 'Lose') {
    winnerColor = 'red'
  }

  // handles multiple decks
  const [numDecks, setNumDecks] = useState(1)
  let multipleDecks = []
  function handleNumDecks(e) {
    if (e.target.id === 'add-deck-btn') {
      for (let i = 0; i < numDecks + 1; i++) {
        for (let l = 0; l < deckData.length; l++) {
          multipleDecks.push(deckData[l]);
        }
      }
      setNumDecks(prevNumDecks => prevNumDecks + 1)
    } else {
      for (let i = 0; i < numDecks - 1; i++) {
        for (let l = 0; l < deckData.length; l++) {
          multipleDecks.push(deckData[l]);
        }
      }
      setNumDecks(prevNumDecks => prevNumDecks - 1)
    }
    setDeck(_.shuffle(multipleDecks))
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setIsActive(!isActive)
  }

  // show book move or not
  function handleBook(e) {
    if (e.target.id === '') {
      setShowBook(!showBook)
    }
  }

  // triggers book advice on each card dealt to player
  let dealerNum;
  useEffect(() => {
    setBookAdvice(book(gameStage, playerCards, playerTotal, dealerCards))
  }, [playerCards])

  // for sidebar
  const [isActive, setIsActive] = useState(false)

  // handles bet on click
  const [lastBet, setLastBet] = useState(0)
  function handleBet(e) {
    console.log(typeof(lastBet))
    // bet = bet amount on button
    let bet = e.target.value
    if (gameStage === GameStage.INITIAL_DEAL || gameStage === GameStage.GAME_OVER) {
      if (totalChips > 0) {
        if (e.target.id === 'rebet-id' && lastBet !== 0) {
          setCurrentBet(lastBet)
        } else {
          // figure this out
          setCurrentBet(currentBet + parseInt(bet))
          setTotalChips(totalChips - bet)
          setRecentBet(bet)
        }
      } 
    } else {alert('No chips left')}
  }

  // resets current bet to 0 and total chips back to what it was before editing current bet
  function handleReset() {
    setCurrentBet(0)
    setTotalChips(totalChips + currentBet)
  }

  // chips change in sidebar
  const [userChangeChips, setUserChangeChips] = useState('')
  function handleChipsChange(e) {
    setUserChangeChips(e.target.value)
  }

  // onClick button in sidebar to set total chips to amount in input
  function handleChipsSubmit(e) {
    e.preventDefault()
    handleReset()
    setTotalChips(userChangeChips)
    setUserChangeChips('')
  }

  return (
    <div className="App">
      {!isSidebarOpen ? <button className={`hamburger ${isActive ? 'active' : ''}`} onClick={toggleSidebar}>
        <span className='line'></span>
        <span className='line'></span>
        <span className='line'></span>
      </button> :
      ''}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <button className='close' onClick={toggleSidebar}>X</button>
        <Sidebar 
          isSidebarOpen={isSidebarOpen}
          numDecks={numDecks}
          setNumDecks={setNumDecks}
          handleNumDecks={handleNumDecks}
          showBook={showBook}
          handleBook={handleBook}
          deck={deck}
          userChangeChips={userChangeChips}
          handleChipsChange={handleChipsChange}
          handleChipsSubmit={handleChipsSubmit}
        />
      </div>
      <Dealer 
        dealerCards={dealerCards}
        dealerTotal={dealerTotal}
        gameStage={gameStage}
      />
      <Player 
        playerCards={playerCards}
        playerTotal={playerTotal}
        gameStage={gameStage}
      />
      <div style={{ height: '30px' }}>
        {gameStage === GameStage.PLAYER_TURN ? (showBook ? bookAdvice : '') : (gameStage === GameStage.GAME_OVER ? <p className='winner' style={{color: winnerColor}}>{outcome}</p> : '')}
      </div>
      <div className='buttons'>
        <button onClick={hit}>Hit</button>
        <button onClick={stand}>Stand</button>
        <button onClick={newGame}>New Game</button>
      </div>
      <Betting 
        currentBet={currentBet}
        totalChips={totalChips}
        handleBet={handleBet}
        handleReset={handleReset}
      />
    </div>
  );
}

export default App;