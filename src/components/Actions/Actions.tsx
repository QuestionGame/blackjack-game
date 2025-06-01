import React from 'react';
import { useGame } from '../../context/GameContext';
import styles from './Actions.module.css';

const Actions: React.FC = () => {
  const { playerHit, playerStand, startGame, gamePhase } = useGame();

  const playerCanAct = gamePhase === 'playerTurn';
  const canStartNewGame = gamePhase === 'gameOver' || gamePhase === 'initial';

  return (
    <div className={styles.actionsContainer}>
      <button onClick={playerHit} disabled={!playerCanAct} className={`${styles.actionButton} ${styles.hitButton}`}>
        Взяти ще
      </button>
      <button onClick={playerStand} disabled={!playerCanAct} className={`${styles.actionButton} ${styles.standButton}`}>
        Досить
      </button>
      <button onClick={startGame} disabled={!canStartNewGame} className={`${styles.actionButton} ${styles.newGameButton}`}>
        Нова гра
      </button>
    </div>
  );
};

export default Actions;