import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface AppSettings {
  cardBack: string; // URL або ідентифікатор сорочки
  tableColor: string; // CSS колір
}

interface SettingsContextType {
  settings: AppSettings;
  setCardBack: (cardBack: string) => void;
  setTableColor: (tableColor: string) => void;
}

const defaultSettings: AppSettings = {
  cardBack: '/cards/backs/red_back.png', // Шлях до сорочки за замовчуванням
  tableColor: '#006400', // Темно-зелений стіл за замовчуванням
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AppSettings>(() => {
    const savedSettings = localStorage.getItem('blackjackSettings');
    return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem('blackjackSettings', JSON.stringify(settings));
  }, [settings]);

  const setCardBack = (cardBack: string) => {
    setSettings(prev => ({ ...prev, cardBack }));
  };

  const setTableColor = (tableColor: string) => {
    setSettings(prev => ({ ...prev, tableColor }));
  };

  return (
    <SettingsContext.Provider value={{ settings, setCardBack, setTableColor }}>
      {children}
    </SettingsContext.Provider>
  );
};