import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Read saved theme preference ('light', 'dark', 'system')
  const [themeMode, setThemeMode] = useState(() => {
    return localStorage.getItem('carcare_theme') || 'system';
  });

  // Track the actual active theme applied ('light' or 'dark')
  const [activeTheme, setActiveTheme] = useState(() => {
    const saved = localStorage.getItem('carcare_theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const computeEffectiveTheme = (mode) => {
      if (mode === 'system') {
        return mediaQuery.matches ? 'dark' : 'light';
      }
      return mode;
    };

    const applyTheme = (effectiveTheme) => {
      setActiveTheme(effectiveTheme);
      document.documentElement.setAttribute('data-bs-theme', effectiveTheme);
      if (effectiveTheme === 'dark') {
        document.documentElement.classList.add('dark-theme');
        document.documentElement.classList.remove('light-theme');
      } else {
        document.documentElement.classList.add('light-theme');
        document.documentElement.classList.remove('dark-theme');
      }
    };

    const currentEffectiveTheme = computeEffectiveTheme(themeMode);
    applyTheme(currentEffectiveTheme);

    // Listener for system preference changes when in 'system' mode
    const handleSystemChange = (e) => {
      if (themeMode === 'system') {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleSystemChange);
    return () => mediaQuery.removeEventListener('change', handleSystemChange);
  }, [themeMode]);

  // Set theme mode ('light', 'dark', 'system')
  const setTheme = (mode) => {
    setThemeMode(mode);
    localStorage.setItem('carcare_theme', mode);
  };

  // Toggle directly between light and dark
  const toggleTheme = () => {
    const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: activeTheme,
        themeMode,
        isDark: activeTheme === 'dark',
        setTheme,
        toggleTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;
