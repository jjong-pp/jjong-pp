import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Moon, Sun, Languages } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { profile } from '../data/profile';
import { Logo } from './Logo';

const SECTIONS = [
  { id: 'career', label: { KR: '이력', EN: 'Career' } },
  { id: 'projects', label: { KR: '포트폴리오', EN: 'Portfolio' } },
];

export const SiteNav = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isKr = language === 'KR';
  const isHome = pathname === '/';
  const [active, setActive] = useState('');

  useEffect(() => {
    if (!isHome) {
      setActive('');
      return;
    }
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );
    SECTIONS.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isHome]);

  const goToSection = (id: string) => {
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      window.history.replaceState(null, '', `#${id}`);
    } else {
      navigate(`/#${id}`);
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-16 border-b border-[var(--border-color)] bg-[var(--bg-color)]/75 backdrop-blur-xl backdrop-saturate-150">
      <nav className="mx-auto flex h-full max-w-[1280px] items-center justify-between gap-4 px-6 md:px-10">
        <Link to="/" className="flex shrink-0 items-center gap-2.5">
          <Logo theme={theme} width={26} height={26} />
          <span className="text-[0.95rem] font-semibold tracking-[-0.01em] text-[var(--text-primary)]">
            {isKr ? profile.name.KR : profile.name.EN}
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {SECTIONS.map(s => (
            <button
              key={s.id}
              onClick={() => goToSection(s.id)}
              className={`rounded-full px-3 py-1.5 text-[0.85rem] transition-colors ${
                active === s.id
                  ? 'text-[var(--text-primary)]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {isKr ? s.label.KR : s.label.EN}
            </button>
          ))}
          <a
            href={profile.contact.blog}
            target="_blank"
            rel="noreferrer"
            className="rounded-full px-3 py-1.5 text-[0.85rem] text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
          >
            Blog
          </a>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            onClick={toggleLanguage}
            className="toggle-btn flex items-center gap-1.5 px-3 py-1.5 text-[0.8rem]"
            aria-label={isKr ? 'Switch to English' : '한국어로 전환'}
          >
            <Languages size={15} />
            {isKr ? 'EN' : 'KO'}
          </button>
          <button
            onClick={toggleTheme}
            className="toggle-btn flex h-8 w-8 items-center justify-center"
            aria-label={theme === 'dark' ? 'Light mode' : 'Dark mode'}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </nav>
    </header>
  );
};
