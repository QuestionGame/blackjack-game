// src/components/GameMessage/GameMessage.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { selectMessage, selectGamePhase } from '../../store/gameSlice'; // Імпортуємо селектори
// import type { RootState } from '../../store';
import styles from './GameMessage.module.css';

const GameMessage: React.FC = () => {
  const message = useSelector(selectMessage); // Отримуємо message зі store
  const gamePhase = useSelector(selectGamePhase); // Отримуємо gamePhase для стилізації

  if (!message) return null;

  let messageTypeClass = styles.info;
  if (gamePhase === 'gameOver') {
    if (message.toLowerCase().includes('виграли') || message.toLowerCase().includes('блекджек!')) {
      messageTypeClass = styles.success;
    } else if (message.toLowerCase().includes('програли') || message.toLowerCase().includes('перебір')) {
      messageTypeClass = styles.error;
    } else if (message.toLowerCase().includes('нічия')) {
        messageTypeClass = styles.warning;
    }
  }

  return (
    <div key={message} className={`${styles.messageContainer} ${messageTypeClass}`}>
      <p>{message}</p>
    </div>
  );
};

export default GameMessage;