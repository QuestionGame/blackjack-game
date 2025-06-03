// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
	  <Router>
		<div className="app-layout">
		  {}
		  <main className="main-content">
			<Routes>
			  <Route path="/home" element={<HomePage />} />
			  <Route path="/game" element={<GamePage />} />
			  <Route path="/rules" element={<RulesPage />} />
			  <Route path="/settings" element={<SettingsPage />} />
			  <Route path="/" element={<Navigate replace to="/home" />} />
			  <Route path="*" element={<div><h1>404 - Сторінку не знайдено</h1><p><a href="/home">На Головну</a></p></div>} />
			</Routes>
		  </main>
		</div>
	  </Router>
	</SettingsProvider>
  );
}

export default App;