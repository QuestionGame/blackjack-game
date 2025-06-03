// src/pages/GamePage.tsx
import React from 'react';
import GameTable from '../components/GameTable/GameTable';
import { useSettings } from '../context/SettingsContext'; // Якщо налаштування ще в Context
import styles from './GamePage.module.css';

const GamePage: React.FC = () => {
  const { settings } = useSettings(); // Якщо налаштування ще в Context

  return (
    <div 
      className={styles.gamePageWrapper} 
      style={{ backgroundColor: settings.tableColor }} // Якщо налаштування ще в Context
    > 
      <GameTable />
    </div>
  );
};

export default GamePage;