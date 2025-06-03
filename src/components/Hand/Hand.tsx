// src/components/Hand/Hand.tsx
import React from 'react';
import { PlayerHandType, CardType } from '../../types';
import Card from '../Card/Card';
import styles from './Hand.module.css';

interface HandProps {
  title: string;
  hand: PlayerHandType;
  score: number;
  isDealer?: boolean;
  gamePhase?: string; // Для логіки приховування карт
  cardBackUrl: string; 
}

const Hand: React.FC<HandProps> = ({ title, hand, score, isDealer = false, gamePhase, cardBackUrl }) => {
  const shouldHideFirstDealerCard = isDealer && gamePhase === 'playerTurn' && hand.length > 0;

  return (
    <div className={styles.handContainer}>
      <h3 className={styles.handTitle}>{title}: <span className={styles.score}>{score > 0 ? score : '0'}</span></h3>
      <div className={styles.cardsWrapper}>
        {hand.length === 0 && (
          <div className={styles.emptyHandPlaceholder}>
            <Card isHidden={true} cardBackUrl={cardBackUrl} />
          </div>
        )}
        {hand.map((card: CardType, index: number) => (
          <Card
            key={`${card.rank}-${card.suit}-${index}`}
            card={card}
            isHidden={isDealer && index === 0 && shouldHideFirstDealerCard}
            cardBackUrl={cardBackUrl}
          />
        ))}
        {isDealer && shouldHideFirstDealerCard && hand.length === 1 && (
          <Card isHidden={true} cardBackUrl={cardBackUrl} />
        )}
      </div>
    </div>
  );
};

export default Hand;