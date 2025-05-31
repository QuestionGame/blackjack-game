import { CardType, Suit, Rank } from '../types'; // Імпорт типів
import { SUITS, RANKS, RANK_VALUES } from '../constants'; // Імпорт констант

export const createDeck = (): CardType[] => {
  const deck: CardType[] = [];
  SUITS.forEach((suit: Suit) => { // Явний тип для suit
    RANKS.forEach((rank: Rank) => { // Явний тип для rank
      deck.push({ suit, rank, value: RANK_VALUES[rank] });
    });
  });
  return deck;
};

export const shuffleDeck = (deck: CardType[]): CardType[] => {
  const shuffledDeck = [...deck];
  for (let i = shuffledDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
  }
  return shuffledDeck;
};

export const dealCardFromDeck = (currentDeck: CardType[], currentHand: CardType[]): { newDeck: CardType[], newHand: CardType[], dealtCard: CardType | null } => {
    if (currentDeck.length === 0) return { newDeck: currentDeck, newHand: currentHand, dealtCard: null };
    const newDeck = [...currentDeck];
    const dealtCard = newDeck.pop();
    if (!dealtCard) return { newDeck: currentDeck, newHand: currentHand, dealtCard: null };
    const newHand = [...currentHand, dealtCard];
    return { newDeck, newHand, dealtCard };
};