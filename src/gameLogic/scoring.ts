import { PlayerHandType, CardType } from '../types'; // Імпорт CardType
import { BLACKJACK_VALUE } from '../constants';

export const calculateHandValue = (hand: PlayerHandType): number => {
  let value = 0;
  let aceCount = 0;
  hand.forEach((card: CardType) => { // Явний тип для card
    value += card.value;
    if (card.rank === 'A') {
      aceCount++;
    }
  });
  while (value > BLACKJACK_VALUE && aceCount > 0) {
    value -= 10;
    aceCount--;
  }
  return value;
};