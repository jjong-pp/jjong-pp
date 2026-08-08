// lucide v1 에서 브랜드 아이콘(Github)이 제거되어 Code 로 대체
import { Mail, Code, BookOpen } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { profile } from '../data/profile';

export const SiteFooter = () => {
  const { language } = useLanguage();
  const isKr = language === 'KR';

  const links = [
    { href: `mailto:${profile.contact.email}`, icon: Mail, label: profile.contact.email },
    { href: profile.contact.github, icon: Code, label: 'GitHub' },
    { href: profile.contact.blog, icon: BookOpen, label: 'Blog' },
  ];

  return (
    <footer className="mt-32 border-t border-[var(--border-color)]">
      <div className="mx-auto flex max-w-[1080px] flex-col gap-6 px-6 py-14 md:flex-row md:items-center md:justify-between md:px-10">
        <div>
          <p className="text-[1.05rem] font-semibold text-[var(--text-primary)]">
            {isKr ? '함께 풀어볼 문제가 있다면' : 'Got a problem worth solving?'}
          </p>
          <p className="mt-1 text-[0.9rem] text-[var(--text-tertiary)]">
            © 2026 {isKr ? profile.name.KR : profile.name.EN}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {links.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noreferrer' : undefined}
              className="flex items-center gap-2 rounded-full border border-[var(--border-color)] px-4 py-2 text-[0.85rem] text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
            >
              <Icon size={15} />
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};
