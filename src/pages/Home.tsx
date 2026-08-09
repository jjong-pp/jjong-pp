import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, BookOpen } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { LinkTag, Tag } from '../components/LinkTag';
import { profile, experience, education, projects } from '../data/profile';

const Section = ({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) => (
  <section id={id} className="scroll-mt-24 border-t border-[var(--border-color)] pt-14 md:pt-20">
    <h2 className="text-[1.7rem] font-bold tracking-[-0.03em] text-[var(--text-primary)] md:text-[2.1rem]">
      {title}
    </h2>
    <div className="mt-10 md:mt-14">{children}</div>
  </section>
);

export const Home = () => {
  const { language } = useLanguage();
  const isKr = language === 'KR';
  const t = <T,>(v: { KR: T; EN: T }) => (isKr ? v.KR : v.EN);

  return (
    <div className="flex flex-col gap-20 pb-10 md:gap-28">
      {/* ---------- 소개 ---------- */}
      <section className="flex flex-col">
        <div className="flex items-center gap-5 md:gap-6">
          <img
            src="/assets/profile_picture.jpg"
            alt=""
            className="h-24 w-24 shrink-0 rounded-full border border-[var(--border-color)] object-cover md:h-32 md:w-32"
            onError={e => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <div>
            <p className="text-[1.15rem] font-semibold text-[var(--text-primary)] md:text-[1.3rem]">
              {t(profile.name)}
            </p>
            <p className="mt-0.5 text-[0.95rem] text-[var(--text-tertiary)]">{t(profile.role)}</p>
          </div>
        </div>

        <h1 className="mt-10 whitespace-pre-line text-[2.4rem] font-bold leading-[1.15] tracking-[-0.04em] text-[var(--text-primary)] md:mt-14 md:text-[4rem]">
          {t(profile.headline)}
        </h1>

        <div className="mt-8 flex max-w-[42rem] flex-col gap-4">
          {t(profile.intro).map((line, i) => (
            <p key={i} className="text-[1.02rem] leading-[1.85] text-[var(--text-secondary)] md:text-[1.08rem]">
              {line}
            </p>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {profile.tags.map(tag => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          <LinkTag href={`mailto:${profile.contact.email}`} icon={Mail}>
            {profile.contact.email}
          </LinkTag>
          <LinkTag href={profile.contact.blog} icon={BookOpen}>
            Blog
          </LinkTag>
        </div>
      </section>

      {/* ---------- 이력 ---------- */}
      <Section id="career" title={isKr ? '이력' : 'Career'}>
        <div className="flex flex-col gap-14">
          {experience.map(e => (
            <article
              key={e.company.KR}
              className="grid gap-5 border-t border-[var(--border-color)] pt-8 first:border-t-0 first:pt-0 md:grid-cols-[13rem_1fr] md:gap-10"
            >
              <div>
                <h3 className="text-[1.1rem] font-bold tracking-[-0.01em] text-[var(--text-primary)]">
                  {t(e.company)}
                </h3>
                <p className="mt-1.5 text-[0.85rem] leading-relaxed text-[var(--text-tertiary)]">{t(e.role)}</p>
                <p className="mt-1 text-[0.82rem] tabular-nums text-[var(--text-tertiary)]">
                  {e.period} · {t(e.duration)}
                </p>
              </div>
              <ul className="flex flex-col gap-3">
                {e.points.map((pt, i) => (
                  <li key={i} className="flex gap-3 text-[0.96rem] leading-[1.75] text-[var(--text-secondary)]">
                    <span className="mt-[0.7em] h-1 w-1 shrink-0 rounded-full bg-[var(--text-tertiary)]" />
                    <span>{t(pt)}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}

          <div className="grid gap-5 border-t border-[var(--border-color)] pt-8 md:grid-cols-[13rem_1fr] md:gap-10">
            <h3 className="text-[1.1rem] font-bold tracking-[-0.01em] text-[var(--text-primary)]">
              {isKr ? '학력' : 'Education'}
            </h3>
            <ul className="flex flex-col gap-5">
              {education.map(ed => (
                <li key={ed.school.KR} className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-6">
                  <div>
                    <p className="text-[0.98rem] font-medium text-[var(--text-primary)]">
                      {t(ed.school)}{' '}
                      <span className="font-normal text-[var(--text-secondary)]">{t(ed.major)}</span>
                    </p>
                    <p className="mt-0.5 text-[0.85rem] text-[var(--text-tertiary)]">{t(ed.note)}</p>
                  </div>
                  <p className="shrink-0 text-[0.85rem] tabular-nums text-[var(--text-tertiary)]">{ed.period}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ---------- 프로젝트 ---------- */}
      <Section id="projects" title={isKr ? '포트폴리오' : 'Portfolio'}>
        <div className="flex flex-col">
          {projects.map((p, i) => (
            <Link
              key={p.id}
              to={`/projects/${p.id}`}
              className="group grid gap-7 border-t border-[var(--border-color)] py-10 first:border-t-0 first:pt-0 md:grid-cols-[13rem_1fr] md:gap-10 md:py-14"
            >
              <div className="flex flex-col gap-4">
                <div className="overflow-hidden rounded-xl border border-[var(--border-color)] bg-[var(--surface-color)]">
                  {/* 원본이 정사각형이라 비율을 그대로 유지한다 (강제 크롭 금지) */}
                  <img
                    src={p.thumbnail}
                    alt=""
                    loading={i > 1 ? 'lazy' : undefined}
                    className="aspect-square w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                    onError={e => {
                      e.currentTarget.parentElement!.style.display = 'none';
                    }}
                  />
                </div>
                <div className="text-[0.82rem] text-[var(--text-tertiary)]">
                  <p className="font-medium text-[var(--text-secondary)]">{t(p.role)}</p>
                  <p className="mt-0.5 tabular-nums">{p.period}</p>
                </div>
              </div>

              <div className="flex flex-col">
                <h3 className="text-[1.45rem] font-bold tracking-[-0.02em] text-[var(--text-primary)] md:text-[1.75rem]">
                  {t(p.title)}
                </h3>
                <p className="mt-3 text-[1rem] leading-[1.75] text-[var(--text-secondary)]">{t(p.summary)}</p>

                <dl className="mt-6 flex flex-col gap-4 border-l-2 border-[var(--border-color)] pl-5">
                  <div>
                    <dt className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-[var(--text-tertiary)]">
                      {isKr ? '발견한 비효율' : 'Friction'}
                    </dt>
                    <dd className="mt-1.5 text-[0.94rem] leading-[1.75] text-[var(--text-secondary)]">
                      {t(p.friction)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-[var(--text-tertiary)]">
                      {isKr ? '결과' : 'Outcome'}
                    </dt>
                    <dd className="mt-1.5 text-[0.94rem] leading-[1.75] text-[var(--text-secondary)]">
                      {t(p.outcome)}
                      <span className="mt-1.5 block text-[0.85rem] text-[var(--text-tertiary)]">
                        {isKr ? '측정' : 'Measured by'} — {t(p.measure)}
                      </span>
                    </dd>
                  </div>
                </dl>

                <div className="mt-6 flex flex-wrap items-center gap-2">
                  {p.tags.map(tag => (
                    <span
                      key={tag}
                      className="rounded-md bg-[var(--elevated-color)] px-2.5 py-1 text-[0.78rem] text-[var(--text-secondary)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <span className="mt-6 inline-flex items-center gap-1.5 text-[0.9rem] font-medium text-[var(--accent-color)]">
                  {isKr ? '기획 문서 보기' : 'Read the write-up'}
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </div>
  );
};
