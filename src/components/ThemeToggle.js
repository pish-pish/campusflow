import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      className="theme-switch"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <span className="theme-switch__label">☀️</span>
      <span className={`theme-switch__track ${isDark ? 'theme-switch__track--dark' : ''}`}>
        <span className="theme-switch__thumb"></span>
      </span>
      <span className="theme-switch__label">🌙</span>
    </button>
  );
};

export default ThemeToggle;
