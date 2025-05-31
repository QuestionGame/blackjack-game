// src/components/Button/Button.tsx
import React from 'react';
// Можливо, ви імпортуєте стилі:
// import styles from './Button.module.css';

// Визначте інтерфейс для пропсів вашої кнопки
interface ButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
  disabled?: boolean;
  // Додайте інші пропси, якщо вони потрібні
}

const Button: React.FC<ButtonProps> = ({ children, onClick, disabled }) => {
  return (
    <button 
      onClick={onClick} 
      disabled={disabled} 
      // className={styles.myButton} // Якщо використовуєте CSS Modules
    >
      {children}
    </button>
  );
};

export default Button; // <--- ОСЬ ЦЕЙ РЯДОК ВАЖЛИВИЙ!