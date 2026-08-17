import { useCallback, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { Markdown } from '../components/Markdown';
import { ProjectArtifacts } from '../components/ProjectArtifacts';
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
        {project.projectScale && (
          <p className="mt-3 inline-flex flex-wrap items-center gap-x-2 rounded-full border border-[var(--border-color)] px-3.5 py-1.5 text-[0.82rem] leading-relaxed">
            <span className="font-medium text-[var(--text-tertiary)]">
              {isKr ? '프로젝트 규모' : 'Project scale'}
            </span>
            <span className="font-semibold text-[var(--text-primary)]">
              {isKr ? project.projectScale.KR : project.projectScale.EN}
            </span>
          </p>
        )}
        <h1 className="mt-4 text-[2rem] font-bold leading-[1.2] tracking-[-0.035em] text-[var(--text-primary)] md:text-[3rem]">
          {isKr ? project.title.KR : project.title.EN}
        </h1>
        <p className="mt-6 max-w-[56rem] text-[1.05rem] leading-[1.8] text-[var(--text-secondary)]">
          {isKr ? project.summary.KR : project.summary.EN}
        </p>
      </header>

      <section className="mt-10 md:mt-12" aria-labelledby="project-at-a-glance">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2
            id="project-at-a-glance"
            className="text-[1.3rem] font-semibold tracking-[-0.02em] text-[var(--text-primary)] md:text-[1.5rem]"
          >
            {isKr ? '프로젝트 한눈에 보기' : 'Project at a glance'}
          </h2>
          <p className="text-[0.78rem] font-medium tracking-[0.03em] text-[var(--text-tertiary)]">
            {isKr ? '30초 요약' : '30-second summary'}
          </p>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--surface-color)] p-5 md:p-6">
            <h3 className="text-[0.78rem] font-semibold tracking-[0.04em] text-[var(--text-tertiary)]">
              {isKr ? '문제' : 'Problem'}
            </h3>
            <p className="mt-3 text-[0.98rem] leading-[1.75] text-[var(--text-secondary)]">
              {isKr ? project.friction.KR : project.friction.EN}
            </p>
          </div>
          <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--surface-color)] p-5 md:p-6">
            <h3 className="text-[0.78rem] font-semibold tracking-[0.04em] text-[var(--text-tertiary)]">
              {isKr ? project.outcomeLabel.KR : project.outcomeLabel.EN}
            </h3>
            <p className="mt-3 text-[0.98rem] leading-[1.75] text-[var(--text-secondary)]">
              {isKr ? project.outcome.KR : project.outcome.EN}
            </p>
          </div>
        </div>

        <div className="mt-5 grid border-y border-[var(--border-color)] lg:grid-cols-[1.35fr_0.65fr] lg:divide-x lg:divide-[var(--border-color)]">
          <div className="py-6 lg:pr-8">
            <h3 className="text-[0.78rem] font-semibold tracking-[0.04em] text-[var(--text-tertiary)]">
              {isKr ? '핵심 판단' : 'Key decisions'}
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {project.decisions.map((decision, index) => (
                <li key={index} className="flex gap-3 text-[0.95rem] leading-[1.7] text-[var(--text-secondary)]">
                  <span className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-color)]" />
                  <span>{isKr ? decision.KR : decision.EN}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t border-[var(--border-color)] py-6 lg:border-t-0 lg:pl-8">
            <h3 className="text-[0.78rem] font-semibold tracking-[0.04em] text-[var(--text-tertiary)]">
              {isKr ? project.measureLabel.KR : project.measureLabel.EN}
            </h3>
            <p className="mt-4 text-[0.95rem] leading-[1.7] text-[var(--text-secondary)]">
              {isKr ? project.measure.KR : project.measure.EN}
            </p>
          </div>
        </div>
      </section>

      {project.artifacts && <ProjectArtifacts artifacts={project.artifacts} isKr={isKr} />}

      <details className="group mt-10 border-t border-[var(--border-color)] pt-8 md:mt-12 md:pt-10">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-5 rounded-2xl border border-[var(--border-color)] bg-[var(--surface-color)] px-5 py-4 transition-colors hover:bg-[var(--elevated-color)] [&::-webkit-details-marker]:hidden">
          <span>
            <span className="block text-[0.74rem] font-semibold tracking-[0.04em] text-[var(--text-tertiary)]">
              {isKr ? '상세 기록' : 'Detailed record'}
            </span>
            <span className="mt-1 block text-[1rem] font-semibold text-[var(--text-primary)]">
              {isKr ? '기획 문서·시퀀스·로직 플로우 보기' : 'View planning docs, sequences, and flows'}
            </span>
          </span>
          <ChevronDown
            size={20}
            className="shrink-0 text-[var(--text-secondary)] transition-transform duration-300 group-open:rotate-180"
          />
        </summary>

        {headings.length > 1 && (
          <nav
            aria-label={isKr ? '모바일 목차' : 'Mobile table of contents'}
            className="mt-6 flex gap-2 overflow-x-auto pb-2 lg:hidden"
          >
            {headings.map(h => (
              <a
                key={h.id}
                href={`#${h.id}`}
                className="shrink-0 rounded-full border border-[var(--border-color)] px-3 py-1.5 text-[0.8rem] text-[var(--text-secondary)]"
              >
                {h.text}
              </a>
            ))}
          </nav>
        )}

        <div className="mt-10 flex items-start gap-14">
          <div className="min-w-0 flex-1">
            <Markdown content={body} onHeadings={onHeadings} />
          </div>

          {headings.length > 1 && (
            <nav
              aria-label={isKr ? '목차' : 'Table of contents'}
              className="sticky top-28 hidden w-[15rem] shrink-0 flex-col gap-2.5 border-l border-[var(--border-color)] pl-5 lg:flex"
            >
              <p className="mb-1 text-[0.74rem] font-semibold tracking-[0.04em] text-[var(--text-tertiary)]">
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
      </details>
    </article>
  );
};
