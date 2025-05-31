import React from 'react';
import { useGameState } from './hooks/useGameState';
import Hand from './components/Hand/Hand';
import Actions from './components/Actions/Actions';

import GameMessage from './components/GameMessage/GameMessage';
import './assets/styles/global.css';

function App() {
  const {
    playerHand,
    dealerHand,
    playerScore,
    dealerScore,
    gamePhase,
    message,
    startGame,
    playerHit,
    playerStand,
  } = useGameState();

  return (
    <div className="App">
      <h1>Блекджек</h1>
      
      <GameMessage message={message} />

      <Hand title="Рука дилера" hand={dealerHand} score={dealerScore} isDealer={true} gamePhase={gamePhase} />
      <Hand title="Ваша рука" hand={playerHand} score={playerScore} />
      
      <Actions
        onHit={playerHit}
        onStand={playerStand}
        onNewGame={startGame}
        gamePhase={gamePhase}
      />
    </div>
  );
}

export default App;