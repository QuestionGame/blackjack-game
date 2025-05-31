import React from 'react';
import { CardType } from '../../types';
import styles from './Card.module.css';

interface CardProps {
  card: CardType;
}

const Card: React.FC<CardProps> = ({ card }) => {
  return (
    <div className={styles.card}>
      {card.rank}{card.suit}
    </div>
  );
};

export default Card; // <--- ДУЖЕ ВАЖЛИВИЙ РЯДОК!