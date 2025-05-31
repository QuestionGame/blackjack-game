import { useState, useEffect, useCallback } from 'react';
import { CardType, GameStateType, GamePhase, PlayerHandType } from '../types';
import { BLACKJACK_VALUE, DEALER_STAND_SCORE } from '../constants';
import { createDeck, shuffleDeck, dealCardFromDeck } from '../gameLogic/deck';
import { calculateHandValue } from '../gameLogic/scoring';

const initialState: GameStateType = {
  deck: [],
  playerHand: [],
  dealerHand: [],
  playerScore: 0,
  dealerScore: 0,
  gamePhase: 'initial',
  message: 'Натисніть "Нова гра" для початку.',
};

export const useGameState = () => {
  const [deck, setDeck] = useState<CardType[]>(initialState.deck);
  const [playerHand, setPlayerHand] = useState<PlayerHandType>(initialState.playerHand);
  const [dealerHand, setDealerHand] = useState<PlayerHandType>(initialState.dealerHand);
  const [playerScore, setPlayerScore] = useState<number>(initialState.playerScore);
  const [dealerScore, setDealerScore] = useState<number>(initialState.dealerScore);
  const [gamePhase, setGamePhase] = useState<GamePhase>(initialState.gamePhase);
  const [message, setMessage] = useState<string>(initialState.message);

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
    
    if (pScoreInitial === BLACKJACK_VALUE && dScoreInitial === BLACKJACK_VALUE) {
        setMessage('Нічия! У обох Блекджек!');
        setGamePhase('gameOver');
    } else if (pScoreInitial === BLACKJACK_VALUE) {
        setMessage('Блекджек! Ви виграли!');
        setGamePhase('gameOver');
    } else if (dScoreInitial === BLACKJACK_VALUE) {
        setMessage('Дилер має Блекджек! Ви програли.');
        setGamePhase('gameOver');
    } else {
        setGamePhase('playerTurn');
        setMessage('Ваш хід. Взяти карту чи зупинитись?');
    }
  }, []);

  const playerHit = useCallback(() => {
    if (gamePhase !== 'playerTurn' || !deck.length) return;

    const { newDeck, newHand } = dealCardFromDeck(deck, playerHand);
    setDeck(newDeck);
    setPlayerHand(newHand);
    const newScore = calculateHandValue(newHand);
    setPlayerScore(newScore);

    if (newScore > BLACKJACK_VALUE) {
      setMessage('Перебір! Ви програли.');
      setGamePhase('gameOver');
    } else if (newScore === BLACKJACK_VALUE) {
        setMessage('21! Ваш хід завершено. Хід дилера...');
        setGamePhase('dealerTurn'); 
    }
  }, [deck, playerHand, gamePhase]);

  const playerStand = useCallback(() => {
    if (gamePhase !== 'playerTurn') return;
    setGamePhase('dealerTurn');
    setMessage('Хід дилера...');
  }, [gamePhase]);

  useEffect(() => {
    if (gamePhase === 'dealerTurn') {
      let currentDealerHand = [...dealerHand]; // Робимо копію для маніпуляцій
      let currentDeck = [...deck]; // Робимо копію
      let currentDealerScore = calculateHandValue(currentDealerHand);

      const dealerPlayTimeout = setTimeout(() => {
        let tempDeck = currentDeck; // Використовуємо копії
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
        setDeck(tempDeck); // Оновлюємо стан колоди

        if (tempDealerScore > BLACKJACK_VALUE) {
          setMessage('Дилер перебрав! Ви виграли!');
        } else if (playerScore > tempDealerScore) {
          setMessage('Ви виграли!');
        } else if (tempDealerScore > playerScore) {
          setMessage('Дилер виграв.');
        } else { 
          setMessage('Нічия!');
        }
        setGamePhase('gameOver');
      }, 1000); 

      return () => clearTimeout(dealerPlayTimeout);
    }
  }, [gamePhase, dealerHand, playerScore, deck]); // Додав deck сюди, бо він використовується для взяття карт дилером

  return {
    playerHand,
    dealerHand,
    playerScore,
    dealerScore,
    gamePhase,
    message,
    startGame,
    playerHit,
    playerStand,
  };
};