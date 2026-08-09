import { useCallback, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Markdown } from '../components/Markdown';
import { NotFound } from './NotFound';
import { useLanguage } from '../context/LanguageContext';
import { projects } from '../data/profile';
import { projectsFullMarkdown } from '../data/projectsData';
import type { Heading } from '../lib/slug';
import { prepareBody } from '../lib/markdown';

export const ProjectDetail = () => {
  const { id = '' } = useParams();
  const { language } = useLanguage();
  const isKr = language === 'KR';

  const project = projects.find(p => p.id === id);
  const markdown = projectsFullMarkdown[id];

  const body = useMemo(() => (markdown ? prepareBody(markdown) : ''), [markdown]);

  // 목차는 렌더러가 실제로 부여한 id 를 그대로 받는다. (별도 파싱과 어긋나지 않도록)
  const [allHeadings, setAllHeadings] = useState<Heading[]>([]);
  const onHeadings = useCallback((h: Heading[]) => setAllHeadings(h), []);
  const headings = useMemo(() => allHeadings.filter(h => h.level === 2), [allHeadings]);

  if (!project || !markdown) return <NotFound />;

  return (
    <article className="pb-10">
      <Link
        to="/#projects"
        className="inline-flex items-center gap-1.5 text-[0.88rem] text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
      >
        <ArrowLeft size={15} />
        {isKr ? '프로젝트' : 'Projects'}
      </Link>

      <header className="mt-8 border-b border-[var(--border-color)] pb-10 md:pb-14">
        <p className="text-[0.82rem] font-medium tracking-wide text-[var(--text-tertiary)]">
          {isKr ? project.role.KR : project.role.EN} · {project.period}
        </p>
        <h1 className="mt-4 text-[2rem] font-bold leading-[1.2] tracking-[-0.035em] text-[var(--text-primary)] md:text-[3rem]">
          {isKr ? project.title.KR : project.title.EN}
        </h1>
        <p className="mt-6 max-w-[42rem] text-[1.05rem] leading-[1.8] text-[var(--text-secondary)]">
          {isKr ? project.summary.KR : project.summary.EN}
        </p>
      </header>

      <div className="mt-12 flex items-start gap-14">
        <div className="min-w-0 flex-1">
          <Markdown content={body} onHeadings={onHeadings} />
        </div>

        {headings.length > 1 && (
          <nav
            aria-label={isKr ? '목차' : 'Table of contents'}
            className="sticky top-28 hidden w-[15rem] shrink-0 flex-col gap-2.5 border-l border-[var(--border-color)] pl-5 lg:flex"
          >
            <p className="mb-1 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[var(--text-tertiary)]">
              {isKr ? '목차' : 'Contents'}
            </p>
            {headings.map(h => (
              <a
                key={h.id}
                href={`#${h.id}`}
                onClick={e => {
                  e.preventDefault();
                  document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth' });
                  window.history.replaceState(null, '', `#${h.id}`);
                }}
                className="text-[0.85rem] leading-[1.55] text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
              >
                {h.text}
              </a>
            ))}
          </nav>
        )}
      </div>
    </article>
  );
};
