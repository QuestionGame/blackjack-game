// src/store/gameSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { PlayerHandType, GameStateType } from '../types';
import { BLACKJACK_VALUE, DEALER_STAND_SCORE } from '../constants';
import { createDeck, shuffleDeck, dealCardFromDeck } from '../gameLogic/deck';
import { calculateHandValue } from '../gameLogic/scoring';

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

const initialState: GameStateType = {
  deck: [],
  playerHand: [],
  dealerHand: [],
  playerScore: 0,
  dealerScore: 0,
  gamePhase: 'initial',
  message: 'Натисніть "Почати гру" на головній сторінці.',
  playerWins: initialWins.playerWins,
  dealerWins: initialWins.dealerWins,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startGame: (state) => {
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
          state.message = 'Блекджек! Ви виграли!';
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
        state.message = 'Ваш хід. Взяти карту чи зупинитись?';
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
        state.message = 'Перебір! Ви програли.';
        state.dealerWins += 1;
        saveWinsToStorage(state.playerWins, state.dealerWins);
        state.gamePhase = 'gameOver';
      } else if (newScore === BLACKJACK_VALUE) {
        state.message = '21! Ваш хід завершено. Хід дилера...';
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
        state.message = 'Дилер перебрав! Ви виграли!';
        state.playerWins += 1;
      } else if (state.playerScore > tempDealerScore) {
        state.message = 'Ви виграли!';
        state.playerWins += 1;
      } else if (tempDealerScore > state.playerScore) {
        state.message = 'Дилер виграв.';
        state.dealerWins += 1;
      } else { 
        state.message = 'Нічия!';
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
  startGame, 
  playerHit, 
  playerStand, 
  dealerPlay,
  resetWinCounters
} = gameSlice.actions;

export default gameSlice.reducer;

// Селектори
export const selectGameState = (state: { game: GameStateType }) => state.game;
export const selectGamePhase = (state: { game: GameStateType }) => state.game.gamePhase;
export const selectPlayerHand = (state: { game: GameStateType }) => state.game.playerHand;
export const selectDealerHand = (state: { game: GameStateType }) => state.game.dealerHand;
export const selectPlayerScore = (state: { game: GameStateType }) => state.game.playerScore;
export const selectDealerScore = (state: { game: GameStateType }) => state.game.dealerScore;
export const selectMessage = (state: { game: GameStateType }) => state.game.message;
export const selectPlayerWins = (state: { game: GameStateType }) => state.game.playerWins;
export const selectDealerWins = (state: { game: GameStateType }) => state.game.dealerWins;
export const selectDeck = (state: { game: GameStateType }) => state.game.deck;