// src/components/GameTable/GameTable.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectPlayerHand,
  selectDealerHand,
  selectPlayerScore,
  selectDealerScore,
  selectGamePhase,
  selectPlayerWins,
  selectDealerWins,
  startGame,
  dealerPlay,
  resetWinCounters,
  selectPlayerName, // Додаємо селектор для імені гравця
} from '../../store/gameSlice';
import type { AppDispatch } from '../../store';
import { useSettings } from '../../context/SettingsContext'; // Залишаємо, якщо налаштування не в Redux
import Hand from '../Hand/Hand';
import Actions from '../Actions/Actions';
import GameMessage from '../GameMessage/GameMessage';
import styles from './GameTable.module.css';

const GameTable: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const playerHand = useSelector(selectPlayerHand);
  const dealerHand = useSelector(selectDealerHand);
  const playerScore = useSelector(selectPlayerScore);
  const dealerScore = useSelector(selectDealerScore);
  const gamePhase = useSelector(selectGamePhase);
  const playerWins = useSelector(selectPlayerWins);
  const dealerWins = useSelector(selectDealerWins);
  const playerName = useSelector(selectPlayerName); // Отримуємо ім'я гравця

  const { settings } = useSettings(); // Налаштування (сорочка, колір столу)

  // Ефект для автоматичного ходу дилера
  useEffect(() => {
    if (gamePhase === 'dealerTurn') {
      // Додаємо невелику затримку перед ходом дилера для кращого UX
      const timer = setTimeout(() => {
        dispatch(dealerPlay());
      }, 1000); // 1 секунда затримки
      return () => clearTimeout(timer); // Очищення таймера
    }
  }, [gamePhase, dispatch]);

  const handleLeaveGame = () => {
    if (gamePhase !== 'initial') {
        dispatch(startGame()); // Скидаємо гру через Redux
    }
    navigate('/home');
  };

  const handleResetWins = () => {
    dispatch(resetWinCounters());
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
        <button
          onClick={handleResetWins}
          style={{
            marginLeft: '1.5rem',
            padding: '4px 14px',
            fontSize: '0.95em',
            borderRadius: '14px',
            border: 'none',
            background: '#ffc107',
            color: '#212529',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 1px 3px rgba(0,0,0,0.13)',
            transition: 'background 0.2s'
          }}
          title="Скинути рахунок"
        >
          Скинути рахунок
        </button>
      </div>

      <GameMessage /> {/* GameMessage тепер сам візьме message зі store */}
      
      <div className={styles.dealerArea}>
        <Hand 
          title="Дилер" 
          hand={dealerHand} // З Redux store
          score={dealerScore} // З Redux store
          isDealer={true} 
          gamePhase={gamePhase} // З Redux store
          cardBackUrl={settings.cardBack}
        />
      </div>
      
      <div className={styles.tableCenter}>
        {/* ... */}
      </div>

      <div className={styles.playerArea}>
        <Hand 
          title={playerName ? `${playerName}` : "Гравець"} // Використовуємо ім'я гравця
          hand={playerHand} // З Redux store
          score={playerScore} // З Redux store
          cardBackUrl={settings.cardBack} 
        />
      </div>
      
      <div className={styles.actionsWrapper}>
        <Actions /> {}
      </div>
    </div>
  );
};

export default GameTable;