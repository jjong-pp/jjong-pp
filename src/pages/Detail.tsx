import { useCallback, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Markdown } from '../components/Markdown';
import { useLanguage } from '../context/LanguageContext';
import { projects } from '../data/profile';
import { projectsFullMarkdown } from '../data/projectsData';
import { getNote } from '../data/notes';
import type { Heading } from '../lib/slug';
import { prepareBody } from '../lib/markdown';

type Resolved = {
  title: string;
  meta: string;
  lead?: string;
  content: string;
  backTo: string;
  backLabel: string;
};

export const Detail = ({ kind }: { kind: 'project' | 'note' }) => {
  const { id = '' } = useParams();
  const { language } = useLanguage();
  const isKr = language === 'KR';

  const resolved: Resolved | null = useMemo(() => {
    if (kind === 'project') {
      const p = projects.find(x => x.id === id);
      const md = projectsFullMarkdown[id];
      if (!p || !md) return null;
      return {
        title: isKr ? p.title.KR : p.title.EN,
        meta: `${isKr ? p.role.KR : p.role.EN} · ${p.period}`,
        lead: isKr ? p.summary.KR : p.summary.EN,
        content: md,
        backTo: '/#projects',
        backLabel: isKr ? '프로젝트' : 'Projects',
      };
    }
    const n = getNote(id);
    if (!n) return null;
    return {
      title: n.title,
      meta: `${n.role} · ${n.date}`,
      lead: n.description,
      content: n.content,
      backTo: '/#studying',
      backLabel: isKr ? '공부하는 것' : 'Studying',
    };
  }, [kind, id, isKr]);

  const body = useMemo(() => (resolved ? prepareBody(resolved.content) : ''), [resolved]);

  // 목차는 렌더러가 실제로 부여한 id 를 그대로 받는다. (별도 정규식 파싱과 어긋나지 않도록)
  const [allHeadings, setAllHeadings] = useState<Heading[]>([]);
  const onHeadings = useCallback((h: Heading[]) => setAllHeadings(h), []);
  const headings = useMemo(() => allHeadings.filter(h => h.level === 2), [allHeadings]);

  if (!resolved) {
    return (
      <div className="flex flex-col items-start gap-6 py-24">
        <h1 className="text-[2rem] font-bold tracking-[-0.03em] text-[var(--text-primary)]">
          {isKr ? '찾을 수 없는 글입니다' : 'Not found'}
        </h1>
        <p className="text-[var(--text-secondary)]">
          {isKr ? '주소가 바뀌었거나 삭제된 글일 수 있습니다.' : 'The address may have changed or the page was removed.'}
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full border border-[var(--border-color)] px-4 py-2 text-[0.9rem] text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
        >
          <ArrowLeft size={15} />
          {isKr ? '홈으로' : 'Back home'}
        </Link>
      </div>
    );
  }

  return (
    <article className="pb-10">
      <Link
        to={resolved.backTo}
        className="inline-flex items-center gap-1.5 text-[0.88rem] text-[var(--text-tertiary)] transition-colors hover:text-[var(--text-primary)]"
      >
        <ArrowLeft size={15} />
        {resolved.backLabel}
      </Link>

      <header className="mt-8 border-b border-[var(--border-color)] pb-10 md:pb-14">
        <p className="text-[0.82rem] font-medium tracking-wide text-[var(--text-tertiary)]">{resolved.meta}</p>
        <h1 className="mt-4 text-[2rem] font-bold leading-[1.2] tracking-[-0.035em] text-[var(--text-primary)] md:text-[3rem]">
          {resolved.title}
        </h1>
        {resolved.lead && (
          <p className="mt-6 max-w-[42rem] text-[1.05rem] leading-[1.8] text-[var(--text-secondary)]">
            {resolved.lead}
          </p>
        )}
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
