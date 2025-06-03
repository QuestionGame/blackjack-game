// src/store/gameSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'; // ДОДАНО PayloadAction
import { PlayerHandType, GameStateType } from '../types';
import { BLACKJACK_VALUE, DEALER_STAND_SCORE } from '../constants';
import { createDeck, shuffleDeck, dealCardFromDeck } from '../gameLogic/deck';
import { calculateHandValue } from '../gameLogic/scoring';

// --- ДОДАНО: Розширення типу стану ---
export interface GameStateTypeExtended extends GameStateType {
  playerName: string | null;
}

// Функція для завантаження лічильників виграшів з localStorage
const loadWinsFromStorage = () => {
  const playerWins = parseInt(localStorage.getItem('blackjackPlayerWins') || '0', 10);
  const dealerWins = parseInt(localStorage.getItem('blackjackDealerWins') || '0', 10);
  return { playerWins, dealerWins };
};

// Функція для збереження лічильників виграшів у localStorage
const saveWinsToStorage = (playerWins: number, dealerWins: number) => {
  localStorage.setItem('blackjackPlayerWins', playerWins.toString());
  localStorage.setItem('blackjackDealerWins', dealerWins.toString());
};

const initialWins = loadWinsFromStorage();

// --- ДОДАНО: Додаємо playerName до initialState ---
const initialState: GameStateTypeExtended = {
  deck: [],
  playerHand: [],
  dealerHand: [],
  playerScore: 0,
  dealerScore: 0,
  gamePhase: 'initial',
  message: 'Введіть ім\'я та почніть гру!',
  playerWins: initialWins.playerWins,
  dealerWins: initialWins.dealerWins,
  playerName: localStorage.getItem('blackjackPlayerName') || null,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    // --- ДОДАНО: setPlayerName ---
    setPlayerName: (state, action: PayloadAction<string>) => {
      state.playerName = action.payload;
      localStorage.setItem('blackjackPlayerName', action.payload);
      if (state.gamePhase === 'initial' && action.payload.trim() !== '') {
        state.message = `Вітаємо, ${action.payload}! Натисніть "Почати Нову Гру".`;
      } else if (state.gamePhase === 'initial' && action.payload.trim() === '') {
        state.playerName = null;
        localStorage.removeItem('blackjackPlayerName');
        state.message = 'Введіть ім\'я та почніть гру!';
      }
    },
    startGame: (state) => {
      // --- ДОДАНО: Перевірка наявності імені ---
      if (!state.playerName) {
        state.message = 'Будь ласка, спочатку введіть своє ім\'я на головній сторінці.';
        state.gamePhase = 'initial';
        return;
      }
      let newDeck = shuffleDeck(createDeck());
      let newPlayerHand: PlayerHandType = [];
      let newDealerHand: PlayerHandType = [];
      let cardData;

      cardData = dealCardFromDeck(newDeck, newPlayerHand);
      newDeck = cardData.newDeck; newPlayerHand = cardData.newHand;
      cardData = dealCardFromDeck(newDeck, newPlayerHand);
      newDeck = cardData.newDeck; newPlayerHand = cardData.newHand;
      
      cardData = dealCardFromDeck(newDeck, newDealerHand);
      newDeck = cardData.newDeck; newDealerHand = cardData.newHand;
      cardData = dealCardFromDeck(newDeck, newDealerHand);
      newDeck = cardData.newDeck; newDealerHand = cardData.newHand;

      const pScoreInitial = calculateHandValue(newPlayerHand);
      const dScoreInitial = calculateHandValue(newDealerHand);

      state.deck = newDeck;
      state.playerHand = newPlayerHand;
      state.dealerHand = newDealerHand;
      state.playerScore = pScoreInitial;
      state.dealerScore = dScoreInitial;
      
      if (pScoreInitial === BLACKJACK_VALUE) {
        if (dScoreInitial === BLACKJACK_VALUE) {
          state.message = 'Нічия! У обох Блекджек!';
        } else {
          state.message = `Блекджек! ${state.playerName || 'Ви'} виграли!`;
          state.playerWins += 1;
          saveWinsToStorage(state.playerWins, state.dealerWins);
        }
        state.gamePhase = 'gameOver';
      } else if (dScoreInitial === BLACKJACK_VALUE) {
        state.message = 'Дилер має Блекджек! Ви програли.';
        state.dealerWins += 1;
        saveWinsToStorage(state.playerWins, state.dealerWins);
        state.gamePhase = 'gameOver';
      } else {
        state.gamePhase = 'playerTurn';
        state.message = `${state.playerName || 'Ваш'} хід. Взяти карту чи зупинитись?`;
      }
    },
    playerHit: (state) => {
      if (state.gamePhase !== 'playerTurn' || state.deck.length === 0) return;

      const { newDeck, newHand } = dealCardFromDeck(state.deck, state.playerHand);
      state.deck = newDeck;
      state.playerHand = newHand;
      const newScore = calculateHandValue(newHand);
      state.playerScore = newScore;

      if (newScore > BLACKJACK_VALUE) {
        state.message = `${state.playerName || 'Гравець'} перебрав! Ви програли.`;
        state.dealerWins += 1;
        saveWinsToStorage(state.playerWins, state.dealerWins);
        state.gamePhase = 'gameOver';
      } else if (newScore === BLACKJACK_VALUE) {
        state.message = `21, ${state.playerName || 'Гравець'}! Ваш хід завершено. Хід дилера...`;
        state.gamePhase = 'dealerTurn'; 
      }
    },
    playerStand: (state) => {
      if (state.gamePhase !== 'playerTurn') return;
      state.gamePhase = 'dealerTurn';
      state.message = 'Хід дилера...';
    },
    dealerPlay: (state) => {
      if (state.gamePhase !== 'dealerTurn' || state.playerScore > BLACKJACK_VALUE) return;

      let tempDealerHand = [...state.dealerHand];
      let tempDeck = [...state.deck];
      let tempDealerScore = calculateHandValue(tempDealerHand);

      while (tempDealerScore < DEALER_STAND_SCORE && tempDealerScore <= BLACKJACK_VALUE) {
        const cardData = dealCardFromDeck(tempDeck, tempDealerHand);
        if (!cardData.dealtCard) break; 
        tempDeck = cardData.newDeck;
        tempDealerHand = cardData.newHand;
        tempDealerScore = calculateHandValue(tempDealerHand);
      }
      
      state.dealerHand = tempDealerHand;
      state.dealerScore = tempDealerScore;
      state.deck = tempDeck;

      if (tempDealerScore > BLACKJACK_VALUE) {
        state.message = `Дилер перебрав! ${state.playerName || 'Гравець'}, ви виграли!`;
        state.playerWins += 1;
      } else if (state.playerScore > tempDealerScore) {
        state.message = `${state.playerName || 'Гравець'}, ви виграли!`;
        state.playerWins += 1;
      } else if (tempDealerScore > state.playerScore) {
        state.message = `Дилер виграв. ${state.playerName || 'Гравець'}, ви програли.`;
        state.dealerWins += 1;
      } else { 
        state.message = `Нічия, ${state.playerName || 'Гравець'}!`;
      }
      saveWinsToStorage(state.playerWins, state.dealerWins);
      state.gamePhase = 'gameOver';
    },
    resetWinCounters: (state) => {
      state.playerWins = 0;
      state.dealerWins = 0;
      saveWinsToStorage(state.playerWins, state.dealerWins);
      state.message = 'Лічильники виграшів скинуто. ' + (state.gamePhase === 'gameOver' || state.gamePhase === 'initial' ? 'Натисніть "Почати гру".' : state.message);
    }
  },
});

export const { 
  setPlayerName, // ДОДАНО
  startGame, 
  playerHit, 
  playerStand, 
  dealerPlay,
  resetWinCounters
} = gameSlice.actions;

export default gameSlice.reducer;

// --- ДОДАНО: Селектор для імені гравця ---
export const selectPlayerName = (state: { game: GameStateTypeExtended }) => state.game.playerName;

// ОНОВЛЕНО: Селектори для нового типу стану
export const selectGameState = (state: { game: GameStateTypeExtended }) => state.game;
export const selectGamePhase = (state: { game: GameStateTypeExtended }) => state.game.gamePhase;
export const selectPlayerHand = (state: { game: GameStateTypeExtended }) => state.game.playerHand;
export const selectDealerHand = (state: { game: GameStateTypeExtended }) => state.game.dealerHand;
export const selectPlayerScore = (state: { game: GameStateTypeExtended }) => state.game.playerScore;
export const selectDealerScore = (state: { game: GameStateTypeExtended }) => state.game.dealerScore;
export const selectMessage = (state: { game: GameStateTypeExtended }) => state.game.message;
export const selectPlayerWins = (state: { game: GameStateTypeExtended }) => state.game.playerWins;
export const selectDealerWins = (state: { game: GameStateTypeExtended }) => state.game.dealerWins;
export const selectDeck = (state: { game: GameStateTypeExtended }) => state.game.deck;