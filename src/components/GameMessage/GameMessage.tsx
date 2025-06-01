import React from 'react';
import { useGame } from '../../context/GameContext';
import styles from './GameMessage.module.css';

const GameMessage: React.FC = () => {
  const { message, gamePhase } = useGame();

  if (!message) return null;

  let messageTypeClass = styles.info; // Default
  if (gamePhase === 'gameOver') {
    if (message.toLowerCase().includes('виграли') || message.toLowerCase().includes('блекджек!')) {
      messageTypeClass = styles.success;
    } else if (message.toLowerCase().includes('програли') || message.toLowerCase().includes('перебір')) {
      messageTypeClass = styles.error;
    } else if (message.toLowerCase().includes('нічия')) {
        messageTypeClass = styles.warning;
    }
  }

  // Додаємо key, щоб React перемонтовував компонент при зміні повідомлення,
  // що перезапустить CSS анімацію
  return (
    <div key={message} className={`${styles.messageContainer} ${messageTypeClass}`}>
      <p>{message}</p>
    </div>
  );
};

export default GameMessage; 