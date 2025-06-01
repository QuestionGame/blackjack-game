import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GameProvider } from './context/GameContext';
import { SettingsProvider } from './context/SettingsContext';
// Navigation тепер не потрібен тут як окремий хедер
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';
import RulesPage from './pages/RulesPage';
import SettingsPage from './pages/SettingsPage';
import './assets/styles/global.css';

function App() {
  return (
    <SettingsProvider>
      <GameProvider>
        <Router>
          <div className="app-layout">
            {/* <header> <Navigation /> </header> -- ПРИБРАЛИ ХЕДЕР */}
            <main className="main-content">
              <Routes>
                <Route path="/home" element={<HomePage />} />
                <Route path="/game" element={<GamePage />} />
                <Route path="/rules" element={<RulesPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/" element={<Navigate replace to="/home" />} />
                {/* Можна додати сторінку 404 Not Found */}
                <Route path="*" element={<div><h1>404 - Сторінку не знайдено</h1><p><a href="/home">На Головну</a></p></div>} />
              </Routes>
            </main>
          </div>
        </Router>
      </GameProvider>
    </SettingsProvider>
  );
}

export default App;