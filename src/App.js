import './App.css';
import { useState, useEffect } from 'react';
import deckData from './deck.json';
import _, { delay, range } from 'lodash';
import Dealer from './components/Dealer/Dealer';
import Player from './components/Player/Player';
import { cardValue } from './functions.js';

function App() {

  const GameStage = {
    INITIAL_DEAL: 'INITIAL_DEAL',
    PLAYER_TURN: 'PLAYER_TURN',
    DEALER_TURN: 'DEALER_TURN',
    GAME_OVER: 'GAME_OVER'
  }

  let shuffledDeck = _.shuffle(deckData)
  const [deck, setDeck] = useState(shuffledDeck)
  const [gameStage, setGameStage] = useState(GameStage.INITIAL_DEAL)
  const [dealerCards, setDealerCards] = useState([])
  const [dealerTotal, setDealerTotal] = useState('')
  const [dealerSubtracted, setDealerSubtracted] = useState(0)
  const [playerCards, setPlayerCards] = useState([])
  const [playerTotal, setPlayerTotal] = useState('')
  const [playerSubtracted, setPlayerSubtracted] = useState(0)
  const [winner, setWinner] = useState('')

  
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
      }
    } 
    playerNum = val
    setPlayerTotal(() => playerTotal + playerNum)
    setPlayerCards(() => [...playerCards, card])
  }

  let intervalID;
  useEffect(() => {
    if (gameStage == 'DEALER_TURN') {
      setTimeout(() => {
        dealerDeal(dealerTotal, setDealerTotal, dealerSubtracted, setDealerSubtracted, dealerCards, setDealerCards)
      }, '1000');
    }
  }, [gameStage, dealerCards])
  
  // deals a card to dealer
  function dealerDeal(dealerTotal, setDealerTotal, dealerSubtracted, setDealerSubtracted, dealerCards, setDealerCards) {
    let dealerNum = 0;
    let card = deck.pop()
    let val = parseInt(cardValue(card.value))
    console.log('val: ', val)
    console.log(dealerCards)
    console.log('dealer aces ', dealerCards.filter(card => card.value == 'A').length, ' > ', dealerSubtracted)
    // if dealer turn and if dealerTotal + new card is greater than 21
    if (gameStage == 'DEALER_TURN' && dealerTotal + val > 21) {
      // if recent card is an ace, make val 1
      if (val == 11) {
        val -= 10
        setDealerSubtracted(prevDealerSubtracted => prevDealerSubtracted + 1)
        // if recent card not ace and there are aces in hand still counting as 11
      } else if (dealerCards.filter(card => card.value == 'A').length > dealerSubtracted) {
        console.log('fired')
        val -= 10
        setDealerSubtracted(prevDealerSubtracted => prevDealerSubtracted + 1)
      }
    }
    dealerNum = val
    setDealerCards(prevDealerCards => [...prevDealerCards, card])
    setDealerTotal(prevDealerTotal => prevDealerTotal + dealerNum)

    // this replaces useEffect
    if (dealerTotal + dealerNum >= 17 && gameStage == 'DEALER_TURN') {
      console.log('this ended game')
      setGameStage(GameStage.GAME_OVER)
    }
  }

  // deals 4 cards (stored in playerCards and dealerCards state) and sets GameStage to PLAYER_TURN
  function newGame() {
    if (gameStage !== 'INITIAL_DEAL') {
      setGameStage(GameStage.INITIAL_DEAL)
      setPlayerSubtracted(0)
      setDealerSubtracted(0)
    }
    let who = 'player'
    let playerInitial = [];
    let playerNum = 0;
    let dealerInitial = [];
    let dealerNum = 0;
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
    if (playerInitial.slice(0, 2).filter(card => card.value == 'A').length == 2) {
      setPlayerTotal(12)
      setPlayerSubtracted(prevPlayerSubtracted => prevPlayerSubtracted + 1)
    } else {
      setPlayerTotal(playerNum)
    }
    // if first 2 dealer cards are both aces
    if (dealerInitial.slice(0, 2).filter(card => card.value == 'A').length == 2) {
      setDealerTotal(12)
      setDealerSubtracted(prevDealerSubtracted => prevDealerSubtracted + 1)
    } else {
      setDealerTotal(dealerNum)
    }
    setPlayerCards(playerInitial)
    setDealerCards(dealerInitial)
    setGameStage(() => GameStage.PLAYER_TURN)
  }

  function stand() {
    if (dealerTotal >= 17 && dealerCards.length == 2) {
      console.log('i ended game')
      setGameStage(GameStage.GAME_OVER)
    } else {
      setGameStage(GameStage.DEALER_TURN)
    }
  }

  function hit() {
    if (playerTotal < 21) {
      playerDeal()
    }
  }

  // need to implement
  let winnerColor;
  if (winner == 'player') {
    winnerColor = 'green'
  } else if (winner == 'dealer') {
    winnerColor = 'red'
  }

  return (
    <div className="App">
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
      {winner.length > 0 ? <p className='winner' style={{color: winnerColor}}>Winner</p> : ''}
      <div className='buttons'>
        <button onClick={hit}>Hit</button>
        <button onClick={stand}>Stand</button>
        <button onClick={() => playerDeal()}>Deal</button>
        <button onClick={newGame}>New Game</button>
      </div>
    </div>
  );
}

export default App;