// src/components/Hand/Hand.tsx
import React from 'react';
import { PlayerHandType, CardType } from '../../types';
// Ось цей рядок:
import Card from '../Card/Card';
import styles from './Hand.module.css';

interface HandProps {
  title: string;
  hand: PlayerHandType;
  score: number;
  isDealer?: boolean;
  gamePhase?: string;
}

const Hand: React.FC<HandProps> = ({ title, hand, score, isDealer = false, gamePhase }) => {
  return (
    <div className={styles.handContainer}>
      <h3>{title} (Рахунок: {score > 0 ? score : '0'})</h3>
      <div className={styles.cardsWrapper}>
        {hand.length === 0 && <p>Немає карт</p>}
        {hand.map((card: CardType, index: number) => {
          return <Card key={`${card.rank}-${card.suit}-${index}`} card={card} />; // <--- І тут використовується
        })}
      </div>
    </div>
  );
};

export default Hand;