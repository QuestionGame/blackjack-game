import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css'; // Можливо, у вас є цей файл, але ми використовуємо global.css
import './assets/styles/global.css'; // Імпортуємо глобальні стилі тут
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();