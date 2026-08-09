import type { ComponentType, ReactNode } from 'react';

/**
 * 사이트 공통 링크 표기(멘션태그).
 *
 * 연락처, 블로그, 프로젝트 참고자료가 전부 이 모양을 쓴다.
 * 예전에는 프로젝트 본문에만 인라인 SVG 를 박은 별도 박스가 있어 혼자 튀었다.
 */
export const LinkTag = ({
  href,
  icon: Icon,
  children,
}: {
  href: string;
  icon?: ComponentType<{ size?: number | string }>;
  children: ReactNode;
}) => {
  const external = href.startsWith('http');
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      className="inline-flex items-center gap-2 rounded-full border border-[var(--border-color)] px-4 py-2 text-[0.88rem] font-medium text-[var(--text-secondary)] no-underline transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
    >
      {Icon && <Icon size={15} />}
      <span>{children}</span>
    </a>
  );
};

/** 읽기 전용 키워드 태그. 링크가 아니다. */
export const Tag = ({ children }: { children: ReactNode }) => (
  <span className="rounded-full border border-[var(--border-color)] px-3.5 py-1.5 text-[0.82rem] font-medium text-[var(--text-secondary)]">
    {children}
  </span>
);
