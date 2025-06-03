// src/pages/HomePage.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { startGame, selectPlayerName, selectMessage } from '../store/gameSlice'; // Додаємо selectPlayerName, selectMessage
import type { AppDispatch } from '../store';
import PlayerNameForm from '../components/PlayerNameForm/PlayerNameForm'; // Імпортуємо форму
import styles from './HomePage.module.css';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const playerName = useSelector(selectPlayerName); // Отримуємо ім'я гравця
  const message = useSelector(selectMessage); // Отримуємо повідомлення для відображення

  const handleStartNewGame = () => {
    dispatch(startGame());
    navigate('/game');
  };

  return (
    <div className={styles.homeContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>Ласкаво просимо до Блекджеку!</h1>
        {playerName && <p className={styles.greeting}>Вітаємо, {playerName}!</p>}
        <p className={styles.subtitle}>Перевірте свою удачу та стратегію</p>
      </header>
      <div className={styles.mainContentFlex}>
        <div className={styles.formWrapper}>
          <PlayerNameForm />
        </div>
        <div className={styles.buttonsWrapper}>
          {/* Повідомлення над кнопками */}
          {message && (message.startsWith('Введіть') || message.startsWith('Вітаємо')) && 
            <p className={styles.infoMessage}>{message}</p>
          }
          <nav className={styles.navigation}>
            <button 
              onClick={handleStartNewGame} 
              className={`${styles.navButton} ${styles.playButton}`}
              disabled={!playerName}
              title={!playerName ? "Будь ласка, введіть та збережіть ім'я" : "Почати гру"}
            >
              Почати Нову Гру
            </button>
            <Link to="/rules" className={styles.navButton}>
              Правила Гри
            </Link>
            <Link to="/settings" className={styles.navButton}>
              Налаштування
            </Link>
          </nav>
        </div>
      </div>
      <section className={styles.rulesPreview}>
        <h2>Коротко про правила:</h2>
        <p>Мета – набрати 21 очко або більше, ніж у дилера, не перевищивши 21. Туз може бути 1 або 11. Картинки – 10 очок.</p>
        <Link to="/rules" className={styles.moreRulesLink}>Дізнатися більше...</Link>
      </section>
    </div>
  );
};

export default HomePage;