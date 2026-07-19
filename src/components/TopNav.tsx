import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { Moon, Sun, Globe } from 'lucide-react';
import { Logo } from './Logo';

export const TopNav = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      height: '64px',
      borderBottom: '1px solid var(--border-color)',
      backgroundColor: theme === 'dark' ? 'rgba(0,0,0,0.72)' : 'rgba(255,255,255,0.72)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: '1600px',
        padding: '0 5%'
      }}>
        {/* Left (40% to match sidebar) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Logo theme={theme} width={36} height={36} />
          <span style={{
            fontSize: '1rem', fontWeight: 600, letterSpacing: '-0.01em',
            color: 'var(--text-primary)',
          }}>{language === 'KR' ? '박종혁 | 기획자' : 'JongHyeok Park | Planner'}</span>
      </div>

      {/* Right (60% to match main content) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <button className="toggle-btn" onClick={toggleLanguage}
          style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', padding: '0.5rem 1rem', fontSize: '0.95rem' }}>
          <Globe size={18} />
          {language === 'KR' ? 'ENG' : 'KOR'}
        </button>
        <button className="toggle-btn" onClick={toggleTheme}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.5rem', width: '44px', height: '44px' }}>
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
      </div>
    </header>
  );
};
