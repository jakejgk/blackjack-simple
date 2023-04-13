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