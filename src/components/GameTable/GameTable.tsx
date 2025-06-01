// src/components/GameTable/GameTable.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; // <--- ДОДАЙТЕ ЦЕЙ ІМПОРТ
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
    startGame, // <--- ДОДАЙТЕ startGame, якщо ви його використовуєте для скидання гри
  } = useGame();

  const { settings } = useSettings();
  const navigate = useNavigate(); // <--- ІНІЦІАЛІЗУЙТЕ navigate

  const handleLeaveGame = () => {
    // Опціонально: скинути стан гри при виході
    if (gamePhase !== 'initial' && startGame) { // Перевіряємо, чи startGame існує
        startGame(); 
    }
    navigate('/home'); // Переходимо на головну сторінку
  };

  return (
    <div className={styles.gameTable}>
      {/* ОСЬ ВАША КНОПКА */}
      <button onClick={handleLeaveGame} className={styles.leaveGameButton}>
        На Головну
      </button>

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
        {/* Місце для колоди, якщо потрібно */}
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