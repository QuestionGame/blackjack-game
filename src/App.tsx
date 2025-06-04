// src/App.tsx
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
// GameProvider більше не потрібен тут, оскільки Redux Provider встановлено в index.tsx
import { SettingsProvider } from './context/SettingsContext'; // Залишаємо, якщо налаштування не в Redux
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';
import RulesPage from './pages/RulesPage';
import SettingsPage from './pages/SettingsPage';
import './assets/styles/global.css';

function App() {
  return (
	<SettingsProvider>
	  {/* SettingsProvider може залишитися, якщо налаштування не перенесені в Redux */}
	  <HashRouter>
		<div className="app-layout">
		  {}
		  <main className="main-content">
			<Routes>
			  <Route path="/home" element={<HomePage />} />
			  <Route path="/game" element={<GamePage />} />
			  <Route path="/rules" element={<RulesPage />} />
			  <Route path="/settings" element={<SettingsPage />} />
			  <Route path="/" element={<HomePage />} />
			  <Route path="*" element={<HomePage />} />
			</Routes>
		  </main>
		</div>
	  </HashRouter>
	</SettingsProvider>
  );
}

export default App;