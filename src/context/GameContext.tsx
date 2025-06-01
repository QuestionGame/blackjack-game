import React, { createContext, useContext, ReactNode } from 'react';
import { useGameState, UseGameStateHookType } from '../hooks/useGameState';

const GameContext = createContext<UseGameStateHookType | undefined>(undefined);

export const useGame = (): UseGameStateHookType => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const gameState = useGameState();

  return (
    <GameContext.Provider value={gameState}>
      {children}
    </GameContext.Provider>
  );
};