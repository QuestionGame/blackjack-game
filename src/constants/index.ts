import { Suit, Rank } from '../types';

export const SUITS: Suit[] = ['♠', '♣', '♥', '♦'];
export const RANKS: Rank[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

export const RANK_VALUES: { [key in Rank]: number } = {
  '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10,
  'J': 10, 'Q': 10, 'K': 10, 'A': 11,
};

export const BLACKJACK_VALUE = 21;
export const DEALER_STAND_SCORE = 17;

// Мапінг для імен файлів зображень карт
export const RANK_TO_IMAGE_CHAR: { [key in Rank]: string } = {
  'A': 'A', 'K': 'K', 'Q': 'Q', 'J': 'J', '10': '10', '9': '9', '8': '8', '7': '7', '6': '6', '5': '5', '4': '4', '3': '3', '2': '2'
};
export const SUIT_TO_IMAGE_CHAR: { [key in Suit]: string } = {
  '♠': 'S', '♣': 'C', '♥': 'H', '♦': 'D'
};