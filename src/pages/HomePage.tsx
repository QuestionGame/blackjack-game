import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext'; // Для скидання/початку гри
import styles from './HomePage.module.css'; // Створимо цей файл

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { startGame, gamePhase } = useGame(); // Отримуємо startGame з GameContext

  const handleStartNewGame = () => {
    // Переконуємося, що нова гра починається при переході
    if (gamePhase === 'gameOver' || gamePhase === 'initial') {
      startGame();
    } else {
      // Якщо гра вже йде, можливо, запитати підтвердження або просто почати нову
      // Для простоти зараз просто починаємо нову
      startGame();
    }
    navigate('/game');
  };

  return (
    <div className={styles.homeContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>Ласкаво просимо до Блекджеку!</h1>
        <p className={styles.subtitle}>Перевірте свою удачу та стратегію</p>
      </header>
      
      <nav className={styles.navigation}>
        <button onClick={handleStartNewGame} className={`${styles.navButton} ${styles.playButton}`}>
          Почати Нову Гру
        </button>
        <Link to="/rules" className={styles.navButton}>
          Правила Гри
        </Link>
        <Link to="/settings" className={styles.navButton}>
          Налаштування
        </Link>
      </nav>

      <section className={styles.rulesPreview}>
        <h2>Коротко про правила:</h2>
        <p>Мета – набрати 21 очко або більше, ніж у дилера, не перевищивши 21. Туз може бути 1 або 11. Картинки – 10 очок.</p>
        <Link to="/rules" className={styles.moreRulesLink}>Дізнатися більше...</Link>
      </section>
    </div>
  );
};

export default HomePage;