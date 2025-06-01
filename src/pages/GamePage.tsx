import React from 'react';
import GameTable from '../components/GameTable/GameTable';
import { useSettings } from '../context/SettingsContext';
import styles from './GamePage.module.css'; // Створимо цей файл

const GamePage: React.FC = () => {
  const { settings } = useSettings();
  return (
    // Цей div тепер буде основним контейнером сторінки гри, займаючи весь екран
    <div 
      className={styles.gamePageWrapper} 
      style={{ backgroundColor: settings.tableColor }}
    > 
      <GameTable />
    </div>
  );
};

export default GamePage;