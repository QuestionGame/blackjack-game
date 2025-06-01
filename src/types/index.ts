export type Suit = '♠' | '♣' | '♥' | '♦';
export type Rank = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A';

export interface CardType {
  suit: Suit;
  rank: Rank;
  value: number;
}

export type PlayerHandType = CardType[];

export type GamePhase =
  | 'initial'
  | 'playerTurn'
  | 'dealerTurn'
  | 'gameOver';

export interface GameStateType {
  deck: CardType[];
  playerHand: PlayerHandType;
  dealerHand: PlayerHandType;
  playerScore: number;
  dealerScore: number;
  gamePhase: GamePhase;
  message: string;
}