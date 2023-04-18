export function cardValue(card) {
  switch (card)  {
    case 'J':
    case 'Q':
    case 'K':
      return 10
    case 'A':
      return 11
    default:
      return card
  }
}

// figure this out
export function book(game, playerC, playerT, dealerC) {
  if (game === 'PLAYER_TURN') {
    let dealerNum = dealerC[1].value
    // if player has 2 of the same card
    if (playerC.length === 2 && playerC[0].value === playerC[1].value) {
      console.log('fired')
      console.log(playerC[0].value)
      // if player has aces
      if (playerC[0].value === 'A') {
        return 'Split'
      // if player has 10s
      } else if (playerC[0].value == 10 || playerC[0].value === 'K' || playerC[0].value === 'Q' || playerC[0].value === 'J') {
        console.log('sevens fired')
        return 'Stand'
      // if player has 9s
      } else if (playerC[0].value == 9) {
        // if dealer has 2 - 6 or 8 - 9
        if (2 <= dealerNum && dealerNum <= 6 || 8 <= dealerNum && dealerNum <= 9) {
          return 'Split'
        } else {
          return 'Stand'
        }
      // if player has 8s
      } else if (playerC[0].value == 8) {
        return 'Split'
      // if player has 7s
      } else if (playerC[0].value == 7) {
        console.log('sevens fired')
        // if dealer has 2 - 7
        if (2 <= dealerNum && dealerNum <= 7) {
          return 'Split'
        } else {
          return 'Hit'
        }
      } else if (playerC[0].value == 6) {
        if (2 <= dealerNum && dealerNum <= 6) {
          return 'Split'
        } else {
          return 'Hit'
        }
      } else if (playerC[0].value == 5) {
        if (2 <= dealerNum && dealerNum <= 9) {
          return 'Double'
        } else {
          return 'Hit'
        }
      } else  if (playerC[0].value == 4) {
        if (5 <= dealerNum && dealerNum <= 6) {
          return 'Split'
        } else {
          return 'Hit'
        }
      } else if (playerC[0].value == 3 || playerC[0].value == 2) {
        if (2 <= dealerNum && dealerNum <= 7) {
          return 'Split'
        } else {
          return 'Hit'
        }
      }
    // if player has no aces
    } else if (playerC.filter(card => card.value === 'A').length === 0) {
      // if player has 17 - 20
      if (17 <= playerT && playerT < 21) {
        return 'Stand'
      // if player has 13 - 16
      } else if (13 <= playerT && playerT <= 16) {
        // if dealer has 2 - 6
        if (2 <= dealerNum && dealerNum <= 6) {
          return 'Stand'
        } else {
          return 'Hit'
        }
      // if player has 12
      } else if (playerT === 12) {
        if (4 <= dealerNum && dealerNum <= 6)  {
          return 'Stand'
        } else {
          return 'Hit'
        }
      // if player has 11
      } else if (playerT == 11) {
        return 'Double'
      // if player has 10
      } else if (playerT == 10) {
        if (2 <= dealerNum && dealerNum <= 9) {
          return 'Double'
        } else {
          return 'Hit'
        }
      // if player has 9
      } else if (playerT === 9) {
        if (3 <= dealerNum && dealerNum <= 6) {
          return 'Double'
        } else {
          return 'Hit'
        }
      // if player has 8
      } else if (playerT === 8) {
        return 'Hit'
      // if player has less than 8
      } else if (5 <= playerT && playerT <= 7) {
        return 'Hit Duh'
      }
    // if player has an ace
    } else {
      // if player has 20
      if (playerT == 20) {
        return 'Stand'
      // if player has 19
      } else if (playerT == 19) {
        if (dealerNum === 6) {
          return 'Double'
        } else {
          return 'Stand'
        }
      // if player has 18
      } else if (playerT == 18) {
        if (2 <= dealerNum && dealerNum <= 6) {
          return 'Double'
        } else if (9 <= dealerNum && dealerNum <= 11) {
          return 'Hit'
        } else {
          return 'Stand'
        }
      // if player has 17
      } else if (playerT == 17) {
        if (3 <= dealerNum && dealerNum <= 6) {
          return 'Double'
        } else {
          return 'Hit'
        }
      // if player has 15 - 16
      } else if (15 <= playerT && playerT <= 16) {
        if (4 <= dealerNum && dealerNum <= 6) {
          return 'Double'
        } else {
          return 'Hit'
        }
      // if player has 13 - 14
      } else if (13 <= playerT && playerT <= 14) {
        if (5 <= dealerNum && dealerNum <= 6) {
          return 'Double'
        } else {
          return 'Hit'
        }
      }
    }
  }
}

// Ace, 3 , 8 against an Ace doesnt work