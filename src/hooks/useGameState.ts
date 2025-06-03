// src/hooks/useGameState.ts
import { useState, useEffect, useCallback } from 'react';
import { CardType, GameStateType, GamePhase, PlayerHandType } from '../types';
import { BLACKJACK_VALUE, DEALER_STAND_SCORE } from '../constants';
import { createDeck, shuffleDeck, dealCardFromDeck } from '../gameLogic/deck';
import { calculateHandValue } from '../gameLogic/scoring';

const initialWinsState = {
  playerWins: parseInt(localStorage.getItem('blackjackPlayerWins') || '0', 10),
  dealerWins: parseInt(localStorage.getItem('blackjackDealerWins') || '0', 10),
};

const initialStateBase: Omit<GameStateType, 'playerWins' | 'dealerWins'> = { // Базовий стан без лічильників
  deck: [],
  playerHand: [],
  dealerHand: [],
  playerScore: 0,
  dealerScore: 0,
  gamePhase: 'initial',
  message: 'Натисніть "Нова гра" для початку.',
};

export type UseGameStateHookType = ReturnType<typeof useGameState>;

export const useGameState = () => {
  const [deck, setDeck] = useState<CardType[]>(initialStateBase.deck);
  const [playerHand, setPlayerHand] = useState<PlayerHandType>(initialStateBase.playerHand);
  const [dealerHand, setDealerHand] = useState<PlayerHandType>(initialStateBase.dealerHand);
  const [playerScore, setPlayerScore] = useState<number>(initialStateBase.playerScore);
  const [dealerScore, setDealerScore] = useState<number>(initialStateBase.dealerScore);
  const [gamePhase, setGamePhase] = useState<GamePhase>(initialStateBase.gamePhase);
  const [message, setMessage] = useState<string>(initialStateBase.message);
  
  const [playerWins, setPlayerWins] = useState<number>(initialWinsState.playerWins);
  const [dealerWins, setDealerWins] = useState<number>(initialWinsState.dealerWins);

  useEffect(() => {
    localStorage.setItem('blackjackPlayerWins', playerWins.toString());
  }, [playerWins]);

  useEffect(() => {
    localStorage.setItem('blackjackDealerWins', dealerWins.toString());
  }, [dealerWins]);

  const startGame = useCallback(() => {
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

    setDeck(newDeck);
    setPlayerHand(newPlayerHand);
    setDealerHand(newDealerHand);
    setPlayerScore(pScoreInitial);
    setDealerScore(dScoreInitial);
    
    if (pScoreInitial === BLACKJACK_VALUE) {
      if (dScoreInitial === BLACKJACK_VALUE) {
        setMessage('Нічия! У обох Блекджек!');
      } else {
        setMessage('Блекджек! Ви виграли!');
        setPlayerWins(prev => prev + 1);
      }
      setGamePhase('gameOver');
    } else if (dScoreInitial === BLACKJACK_VALUE) {
      setMessage('Дилер має Блекджек! Ви програли.');
      setDealerWins(prev => prev + 1);
      setGamePhase('gameOver');
    } else {
      setGamePhase('playerTurn');
      setMessage('Ваш хід. Взяти карту чи зупинитись?');
    }
  }, [setPlayerWins, setDealerWins]); // Додано залежності, хоча вони стабільні

  const playerHit = useCallback(() => {
    if (gamePhase !== 'playerTurn' || !deck.length) return;

    const { newDeck, newHand } = dealCardFromDeck(deck, playerHand);
    setDeck(newDeck);
    setPlayerHand(newHand);
    const newScore = calculateHandValue(newHand);
    setPlayerScore(newScore);

    if (newScore > BLACKJACK_VALUE) {
      setMessage('Перебір! Ви програли.');
      setDealerWins(prev => prev + 1);
      setGamePhase('gameOver');
    } else if (newScore === BLACKJACK_VALUE) {
        setMessage('21! Ваш хід завершено. Хід дилера...');
        setGamePhase('dealerTurn'); 
    }
  }, [deck, playerHand, gamePhase, setDealerWins]);

  const playerStand = useCallback(() => {
    if (gamePhase !== 'playerTurn') return;
    setGamePhase('dealerTurn');
    setMessage('Хід дилера...');
  }, [gamePhase]);

  useEffect(() => {
    if (gamePhase === 'dealerTurn') {
      if (playerScore > BLACKJACK_VALUE) return; // Гравець вже перебрав

      let currentDealerHand = [...dealerHand]; 
      let currentDeck = [...deck]; 
      let currentDealerScore = calculateHandValue(currentDealerHand);

      const dealerPlayTimeout = setTimeout(() => {
        let tempDeck = currentDeck; 
        let tempDealerHand = currentDealerHand;
        let tempDealerScore = currentDealerScore;

        while (tempDealerScore < DEALER_STAND_SCORE && tempDealerScore <= BLACKJACK_VALUE) {
          const cardData = dealCardFromDeck(tempDeck, tempDealerHand);
          if (!cardData.dealtCard) break; 
          tempDeck = cardData.newDeck;
          tempDealerHand = cardData.newHand;
          tempDealerScore = calculateHandValue(tempDealerHand);
        }
        
        setDealerHand(tempDealerHand);
        setDealerScore(tempDealerScore);
        setDeck(tempDeck);

        if (tempDealerScore > BLACKJACK_VALUE) {
          setMessage('Дилер перебрав! Ви виграли!');
          setPlayerWins(prev => prev + 1);
        } else if (playerScore > tempDealerScore) {
          setMessage('Ви виграли!');
          setPlayerWins(prev => prev + 1);
        } else if (tempDealerScore > playerScore) {
          setMessage('Дилер виграв.');
          setDealerWins(prev => prev + 1);
        } else { 
          setMessage('Нічия!');
        }
        setGamePhase('gameOver');
      }, 1000); 

      return () => clearTimeout(dealerPlayTimeout);
    }
  }, [gamePhase, dealerHand, playerScore, deck, setPlayerWins, setDealerWins]);

  return {
    deck,
    playerHand,
    dealerHand,
    playerScore,
    dealerScore,
    gamePhase,
    message,
    playerWins,
    dealerWins,
    startGame,
    playerHit,
    playerStand,
  };
};