// src/components/GameTable/GameTable.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../../context/GameContext';
import { useSettings } from '../../context/SettingsContext';
import Hand from '../Hand/Hand';
import Actions from '../Actions/Actions';
import GameMessage from '../GameMessage/GameMessage';
import styles from './GameTable.module.css';

const GameTable: React.FC = () => {
  const {
    playerHand,
    dealerHand,
    playerScore,
    dealerScore,
    gamePhase,
    startGame, 
    playerWins, 
    dealerWins, 
  } = useGame();

  const { settings } = useSettings();
  const navigate = useNavigate();

  const handleLeaveGame = () => {
    if (gamePhase !== 'initial' && startGame) {
        startGame(); 
    }
    navigate('/home');
  };

  return (
    <div className={styles.gameTable}>
      <button onClick={handleLeaveGame} className={styles.leaveGameButton}>
        На Головну
      </button>

      <div className={styles.overallScoreboard}>
        <span>Гравець: {playerWins}</span>
        <span className={styles.scoreSeparator}> | </span>
        <span>Дилер: {dealerWins}</span>
      </div>

      <GameMessage /> 
      
      <div className={styles.dealerArea}>
        <Hand 
          title="Дилер" 
          hand={dealerHand} 
          score={dealerScore} 
          isDealer={true} 
          gamePhase={gamePhase} 
          cardBackUrl={settings.cardBack}
        />
      </div>
      
      <div className={styles.tableCenter}>
        {/* Можна додати елементи, наприклад, логотип або фішки */}
      </div>

      <div className={styles.playerArea}>
        <Hand 
          title="Гравець" 
          hand={playerHand} 
          score={playerScore} 
          cardBackUrl={settings.cardBack} 
        />
      </div>
      
      <div className={styles.actionsWrapper}>
        <Actions />
      </div>
    </div>
  );
};

export default GameTable;