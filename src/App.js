import './App.css';
import { useState, useEffect } from 'react';
import deckData from './deck.json';
import _, { delay, range } from 'lodash';
import Dealer from './components/Dealer/Dealer';
import Player from './components/Player/Player';

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
  const [dealerAces, setDealerAces] = useState(0)
  const [playerCards, setPlayerCards] = useState([])
  const [playerTotal, setPlayerTotal] = useState('')
  const [winner, setWinner] = useState('')
  
  // handles player ace (need to make one for both player and dealer)
  // useEffect(() => {
  //   let playerAce = 0;
  //   let newTotal = playerTotal;
  //   // if player over 21 and its players turn
  //   if (newTotal > 21 && gameStage == 'PLAYER_TURN') {
  //     // loop through players cards
  //     for (let i = 0; i < playerCards.length; i++) {
  //     // if there is an ace, subtract 10 from newTotal
  //       if (playerCards[i].value == 'A') {
  //         playerAce++;
  //       }
  //     }
      
  //     // newTotal = total with -10 from ace
  //     if (newTotal > 21) {
  //       setGameStage(GameStage.DEALER_TURN)
  //     }
  //     setPlayerTotal(newTotal)
  //   }
  // }, [playerTotal])
  
  const [playerSubtracted, setPlayerSubtracted] = useState(0)
  const [playerAce, setPlayerAce] = useState(false)
  useEffect(() => {
    let newTotal = playerTotal;
    // if total is greater than 21
    if (newTotal > 21 && gameStage == 'PLAYER_TURN') {
      // if the first 2 cards are both aces, -10 from newTotal
      if (playerCards.slice(0, 2).filter(card => card.value == 'A').length > 0 && playerAce == false) {
        newTotal -= 10;
        setPlayerSubtracted(prevPlayerSubtracted => prevPlayerSubtracted + 1)
        setPlayerAce(true)
      // if most recent card is an ace
      } else if (playerCards[playerCards.length - 1] == 'A') {
        newTotal -= 10;
        setPlayerSubtracted(prevPlayerSubtracted => prevPlayerSubtracted + 1);
      // if most recent card is not an ace
      } else if (playerCards[playerCards.length - 1] !== 'A') {
        // if amount of aces in hand is greated than amount of times 10 has been subtracted
        if (playerCards.filter(card => card.value == 'A').length > playerSubtracted) {
          newTotal -= 10;
          setPlayerSubtracted(prevPlayerSubtracted => prevPlayerSubtracted + 1)
        }
      }
      setPlayerTotal(newTotal)
    }
  }, [playerTotal])

  const [dealerSubtracted, setDealerSubtracted] = useState(0)
  const [dealerAce, setDealerAce] = useState(false)
  // handles dealer ace
  useEffect(() => {
    let newTotal = dealerTotal;
    // if total is greater than 21
    if (newTotal > 21 && gameStage == 'DEALER_TURN') {
      // if the first 2 cards are both aces, -10 from newTotal
      if (dealerCards.slice(0, 2).filter(card => card.value == 'A').length > 0 && dealerAce == false) {
        newTotal -= 10;
        setDealerSubtracted(prevDealerSubtracted => prevDealerSubtracted + 1)
        setDealerAce(true)
      // if most recent card is an ace
      } else if (playerCards[playerCards.length - 1] == 'A') {
        newTotal -= 10;
        setDealerSubtracted(prevDealerSubtracted => prevDealerSubtracted + 1);
      // if most recent card is not an ace
      } else if (dealerCards[dealerCards.length - 1] !== 'A') {
        // if amount of aces in hand is greated than amount of times 10 has been subtracted
        if (playerCards.filter(card => card.value == 'A').length > dealerSubtracted) {
          newTotal -= 10;
          setDealerSubtracted(prevDealerSubtracted => prevDealerSubtracted + 1)
        }
      }
      setDealerTotal(newTotal)
    }
  }, [dealerTotal])


  // deals a card to dealer every 2 seconds when it is DEALER_TURN
  let intervalID;
  // need to fix
  useEffect(() => {
    if (gameStage == 'DEALER_TURN') {
      intervalID = setInterval(() => {
        deal()
      }, 2000)
    }
    return () => {
      clearInterval(intervalID)
    }
  }, [gameStage])

  // sets GameStage to GAME_OVER when dealerTotal is 17 or greater
  useEffect(() => {
    if (dealerTotal >= 17 && gameStage == 'DEALER_TURN') {
      setGameStage(GameStage.GAME_OVER)
    }
  }, [dealerTotal])

  // useEffect(() => {
  //   // finish this for declaring winner
  // }, [dealerTotal, playerTotal])

  // returns array of card(s) from deck
  function deal() {
    console.log('dela is running still')
    let val;
    let playerNum = 0;
    let dealerNum = 0;
    let card = deck.pop()
    switch (card.value)  {
      case 'J':
      case 'Q':
      case 'K':
        val = 10
        break;
      case 'A':
        val = 11;
        break;
      default:
        val = card.value
    }
    if (gameStage == 'PLAYER_TURN' && playerTotal < 21) {
      playerNum = parseInt(val)
      setPlayerCards(() => [...playerCards, card])
      setPlayerTotal(() => playerTotal + playerNum)
    } else if (gameStage == 'DEALER_TURN' && dealerTotal < 17) {
      dealerNum = parseInt(val)
      setDealerCards(prevDealerCards => [...prevDealerCards, card])
      setDealerTotal(prevDealerTotal => prevDealerTotal + dealerNum)
    }
  }

  // deals 4 cards (stored in playerCards and dealerCards state) and sets GameStage to PLAYER_TURN
  function newGame() {
    if (gameStage !== 'INITIAL_DEAL') {
      setGameStage(GameStage.INITIAL_DEAL)
    }
    let who = 'player'
    let val;
    let playerInitial = [];
    let playerNum = 0;
    let dealerInitial = [];
    let dealerNum = 0;
    for (let i = 0; i < 4; i++) {
      let card = deck.pop()
      switch (card.value)  {
        case 'J':
        case 'Q':
        case 'K':
          val = 10
          break;
        case 'A':
          val = 11
          break;
        default:
          val = card.value
      }
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
    setPlayerCards(playerInitial)
    setPlayerTotal(playerNum)
    setDealerCards(dealerInitial)
    setDealerTotal(dealerNum)
    setGameStage(() => GameStage.PLAYER_TURN)
  }

  let winnerColor;
  if (winner == 'player') {
    winnerColor = 'green'
  } else if (winner == 'dealer') {
    winnerColor = 'red'
  }

  function stand() {
    setGameStage(GameStage.DEALER_TURN)
  }

  function hit() {
    deal()
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
        <button onClick={() => deal(1)}>Deal</button>
        <button onClick={newGame}>New Game</button>
      </div>
    </div>
  );
}

export default App;