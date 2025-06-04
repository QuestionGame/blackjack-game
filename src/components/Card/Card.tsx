import React from 'react';
import { CardType } from '../../types';
import { RANK_TO_IMAGE_CHAR, SUIT_TO_IMAGE_CHAR } from '../../constants';
import styles from './Card.module.css';

interface CardProps {
  card?: CardType;
  isHidden?: boolean;
  cardBackUrl?: string; // Новий проп для URL сорочки
}

const Card: React.FC<CardProps> = ({ card, isHidden = false, cardBackUrl }) => {
  if (isHidden || !card) {
    // Додаємо process.env.PUBLIC_URL для коректного шляху на GitHub Pages
    const backToShow =
      cardBackUrl
        ? (cardBackUrl.startsWith('http') ? cardBackUrl : process.env.PUBLIC_URL + cardBackUrl)
        : process.env.PUBLIC_URL + '/cards/backs/red_back.png';
    return (
      <div className={`${styles.card} ${styles.hidden}`}>
        <img src={backToShow} alt="Card Back" className={styles.cardImage} />
      </div>
    );
  }

  const rankChar = RANK_TO_IMAGE_CHAR[card.rank];
  const suitChar = SUIT_TO_IMAGE_CHAR[card.suit];
  const imageName = `${rankChar}${suitChar}.png`;
  const imagePath = process.env.PUBLIC_URL + `/cards/${imageName}`;

  return (
    <div className={styles.card}>
      <img src={imagePath} alt={`${card.rank} of ${card.suit}`} className={styles.cardImage} />
    </div>
  );
};

export default Card;