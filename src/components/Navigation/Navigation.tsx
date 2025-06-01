import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation: React.FC = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <NavLink 
            to="/home" 
            className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
          >
            Головна
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink 
            to="/game" 
            className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
          >
            Грати
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink 
            to="/rules" 
            className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
          >
            Правила
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink 
            to="/settings" 
            className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
          >
            Налаштування
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;