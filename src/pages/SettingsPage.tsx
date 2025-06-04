import React from 'react';
import { useNavigate } from 'react-router-dom'; // Імпортуємо useNavigate
import { useSettings } from '../context/SettingsContext';
import styles from './SettingsPage.module.css';

// Варіанти сорочок карт
const cardBackOptions = [
  { name: 'Червона Сорочка', value: process.env.PUBLIC_URL + '/cards/backs/red_back.png' },
  { name: 'Синя Сорочка', value: process.env.PUBLIC_URL + '/cards/backs/blue_back.png' },
  { name: 'Сіра Сорочка', value: process.env.PUBLIC_URL + '/cards/backs/gray_back.png' },
  { name: 'Зелена Сорочка', value: process.env.PUBLIC_URL + '/cards/backs/green_back.png' },
  { name: 'Жовта Сорочка', value: process.env.PUBLIC_URL + '/cards/backs/yellow_back.png' },
  { name: 'Фіолетова Сорочка', value: process.env.PUBLIC_URL + '/cards/backs/purple_back.png' },
];

// Варіанти кольору столу
const tableColorOptions = [
  { name: 'Класичний Зелений', value: '#006400' },
  { name: 'Казино Зелений', value: '#35654d' },
  { name: 'Бордовий', value: '#800000' },
  { name: 'Темно-синій', value: '#000080' },
];

const SettingsPage: React.FC = () => {
  const { settings, setCardBack, setTableColor } = useSettings();
  const navigate = useNavigate(); // Ініціалізуємо хук

  return (
    <div className={styles.settingsContainer}>
      <h1>Налаштування Гри</h1>

      <div className={styles.settingGroup}>
        <h2>Сорочка Карт</h2>
        <div className={styles.optionsGrid}>
          {cardBackOptions.map(option => (
            <button
              key={option.value}
              className={`${styles.optionButton} ${settings.cardBack === option.value ? styles.selected : ''}`}
              onClick={() => setCardBack(option.value)}
              title={option.name}
            >
              <img src={option.value} alt={option.name} className={styles.optionPreviewImage} />
              <span>{option.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.settingGroup}>
        <h2>Колір Ігрового Столу</h2>
        <div className={styles.optionsGrid}>
          {tableColorOptions.map(option => (
            <button
              key={option.value}
              className={`${styles.optionButton} ${settings.tableColor === option.value ? styles.selected : ''}`}
              onClick={() => setTableColor(option.value)}
              style={{ backgroundColor: option.value }}
              title={option.name}
            >
              <span className={styles.colorName}>{option.name}</span>
            </button>
          ))}
        </div>
      </div>

      <button onClick={() => navigate(-1)} className={styles.backButton}>
        Назад
      </button>
    </div>
  );
};

export default SettingsPage;
