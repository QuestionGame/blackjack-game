import { Suit, Rank } from '../types'; // Додаємо імпорт, щоб точно зробити файл модулем

export const SUITS: Suit[] = ['♠', '♣', '♥', '♦'];
export const RANKS: Rank[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

export const RANK_VALUES: { [key in Rank]: number } = {
  '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10,
  'J': 10, 'Q': 10, 'K': 10, 'A': 11,
};

export const BLACKJACK_VALUE = 21;
export const DEALER_STAND_SCORE = 17;

// Якщо проблема "is not a module" зберігається, додайте цей рядок в кінці:
// export {};