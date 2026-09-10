import { useTheme } from '../context/ThemeContext';

const ThemeToggle = ({ className = '', showLabel = false }) => {
  const { theme, isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`btn btn-sm d-inline-flex align-items-center justify-content-center gap-2 rounded-3 border-0 transition-all ${
        isDark ? 'btn-outline-danger text-danger' : 'btn-outline-light text-light'
      } ${className}`}
      title={`Current: ${theme.toUpperCase()} theme. Click to switch to ${isDark ? 'LIGHT' : 'DARK'} theme.`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      style={{
        width: showLabel ? 'auto' : '38px',
        height: '38px',
        padding: showLabel ? '0.375rem 0.75rem' : '0',
        backgroundColor: isDark ? 'rgba(239, 68, 68, 0.15)' : 'rgba(255, 255, 255, 0.1)',
        borderColor: isDark ? '#dc2626' : 'rgba(255, 255, 255, 0.2)'
      }}
    >
      {isDark ? (
        <i className="bi bi-sun-fill fs-5" style={{ color: '#ef4444' }}></i>
      ) : (
        <i className="bi bi-moon-stars-fill fs-6" style={{ color: '#ffffff' }}></i>
      )}
      {showLabel && (
        <span className="small fw-semibold">
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </span>
      )}
    </button>
  );
};

export default ThemeToggle;
