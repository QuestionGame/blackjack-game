// src/components/GameMessage/GameMessage.tsx
import React from 'react';
import styles from './GameMessage.module.css'; // Цей шлях тепер буде правильним
// ... решта коду
interface GameMessageProps {
  message: string;
}

const GameMessage: React.FC<GameMessageProps> = ({ message }) => {
  if (!message) return null;
  return (
    <div className={styles.messageContainer}>
      <p>{message}</p>
    </div>
  );
};

export default GameMessage; // <--- ДУЖЕ ВАЖЛИВИЙ РЯДОК!