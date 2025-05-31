import React from 'react';
import styles from './ScoreDisplay.module.css';

interface ScoreDisplayProps {
  playerScore: number;
  dealerScore: number;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ playerScore, dealerScore }) => {
  return (
    <div className={styles.scoreContainer}>
      <p>Ваш рахунок: {playerScore}</p>
      {/* Можна не показувати рахунок дилера одразу, або показувати лише одну карту */}
      <p>Рахунок дилера: {dealerScore}</p>
    </div>
  );
};

export default ScoreDisplay;