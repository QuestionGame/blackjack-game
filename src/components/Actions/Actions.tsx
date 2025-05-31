import React from 'react';
import styles from './Actions.module.css';

interface ActionsProps {
  onHit: () => void;
  onStand: () => void;
  onNewGame: () => void;
  gamePhase: string; // 'playerTurn', 'gameOver', 'initial'
}

const Actions: React.FC<ActionsProps> = ({ onHit, onStand, onNewGame, gamePhase }) => {
  const playerCanAct = gamePhase === 'playerTurn';
  const canStartNewGame = gamePhase === 'gameOver' || gamePhase === 'initial';

  return (
    <div className={styles.actionsContainer}>
      <button onClick={onHit} disabled={!playerCanAct} className={styles.actionButton}>
        Взяти ще (Hit)
      </button>
      <button onClick={onStand} disabled={!playerCanAct} className={styles.actionButton}>
        Досить (Stand)
      </button>
      <button onClick={onNewGame} disabled={!canStartNewGame} className={styles.newGameButton}>
        Нова гра
      </button>
    </div>
  );
};

export default Actions;