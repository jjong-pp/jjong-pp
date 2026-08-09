import { Mail, BookOpen } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { LinkTag } from './LinkTag';
import { profile } from '../data/profile';

export const SiteFooter = () => {
  const { language } = useLanguage();
  const isKr = language === 'KR';

  return (
    <footer className="mt-32 border-t border-[var(--border-color)]">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-6 px-6 py-14 md:flex-row md:items-center md:justify-between md:px-10">
        <div>
          <p className="text-[1.05rem] font-semibold text-[var(--text-primary)]">
            {isKr ? profile.role.KR : profile.role.EN}
          </p>
          <p className="mt-1 text-[0.85rem] text-[var(--text-tertiary)]">
            © 2026 {isKr ? profile.name.KR : profile.name.EN}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <LinkTag href={`mailto:${profile.contact.email}`} icon={Mail}>
            {profile.contact.email}
          </LinkTag>
          <LinkTag href={profile.contact.blog} icon={BookOpen}>
            Blog
          </LinkTag>
        </div>
      </div>
    </footer>
  );
};
