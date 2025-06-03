// src/components/Actions/Actions.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { playerHit, playerStand, startGame, selectGamePhase } from '../../store/gameSlice';
import type { AppDispatch } from '../../store';
import styles from './Actions.module.css';

const Actions: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const gamePhase = useSelector(selectGamePhase);

  const playerCanAct = gamePhase === 'playerTurn';
  const canStartNewGame = gamePhase === 'gameOver' || gamePhase === 'initial';

  return (
    <div className={styles.actionsContainer}>
      <button 
        onClick={() => dispatch(playerHit())} 
        disabled={!playerCanAct} 
        className={`${styles.actionButton} ${styles.hitButton}`}
      >
        Взяти ще
      </button>
      <button 
        onClick={() => dispatch(playerStand())} 
        disabled={!playerCanAct} 
        className={`${styles.actionButton} ${styles.standButton}`}
      >
        Досить
      </button>
      <button 
        onClick={() => dispatch(startGame())} 
        disabled={!canStartNewGame} 
        className={`${styles.actionButton} ${styles.newGameButton}`}
      >
        Нова гра
      </button>
    </div>
  );
};

export default Actions;