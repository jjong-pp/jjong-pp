import { useEffect, useMemo, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { X, ExternalLink } from 'lucide-react';
import { MermaidDiagram } from './MermaidDiagram';
import { LinkTag } from './LinkTag';
import { useTheme } from '../context/ThemeContext';
import { extractText, uniqueSlug, type Heading } from '../lib/slug';
import { normalizeMarkdown } from '../lib/markdown';

const hastText = (node: any): string => {
  if (node?.type === 'text') return node.value ?? '';
  if (node?.children) return node.children.map(hastText).join('');
  return '';
};

/**
 * heading id 를 '파싱 시점'에 확정하는 rehype 플러그인.
 *
 * 이전에는 렌더 함수 안의 카운터로 순번을 매겼는데, StrictMode 가 렌더를 두 번
 * 돌리면서 같은 제목이 두 번 카운트돼 id 에 `-2` 가 붙었고 목차 링크가 전부
 * 어긋났다. 파싱은 content 당 한 번만 일어나므로 여기서 매기면 항상 안정적이다.
 */
const rehypeHeadingIds = (collect: Heading[]) => () => (tree: any) => {
  const seen: Record<string, number> = {};
  collect.length = 0;

  const walk = (node: any) => {
    if (node.type === 'element' && /^h[1-4]$/.test(node.tagName)) {
      const text = hastText(node).trim();
      const id = uniqueSlug(text, seen);
      node.properties = { ...(node.properties ?? {}), id };
      collect.push({ id, text, level: Number(node.tagName[1]) });
    }
    (node.children ?? []).forEach(walk);
  };

  walk(tree);
};

type Props = {
  content: string;
  /** 파싱된 heading 목록을 부모(목차)에게 전달 */
  onHeadings?: (headings: Heading[]) => void;
};

export const Markdown = ({ content, onHeadings }: Props) => {
  const { theme } = useTheme();
  const rootRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState<{ kind: 'img'; src: string } | { kind: 'svg'; html: string } | null>(null);

  const source = normalizeMarkdown(content);
  const headingsRef = useRef<Heading[]>([]);
  const rehypeIds = useMemo(() => rehypeHeadingIds(headingsRef.current), []);

  useEffect(() => {
    onHeadings?.([...headingsRef.current]);
    // onHeadings 는 매 렌더 새 함수일 수 있어 의존성에서 제외한다.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [source]);

  useEffect(() => {
    if (!zoom) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setZoom(null);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [zoom]);

  // id 는 rehypeHeadingIds 가 이미 확정해 props 로 내려준다.
  const heading = (level: 1 | 2 | 3 | 4) => ({ id, children }: any) => {
    const Tag = `h${level}` as 'h1';
    const cls = {
      1: 'text-[1.9rem] md:text-[2.2rem] font-bold tracking-[-0.03em] mt-16 mb-6 first:mt-0',
      2: 'text-[1.4rem] md:text-[1.6rem] font-semibold tracking-[-0.02em] mt-14 mb-5 pb-3 border-b border-[var(--border-color)]',
      3: 'text-[1.15rem] md:text-[1.25rem] font-semibold tracking-[-0.01em] mt-10 mb-3',
      4: 'text-[1.02rem] font-semibold mt-8 mb-2',
    }[level];
    return (
      <Tag id={id} className={`scroll-mt-28 text-[var(--text-primary)] ${cls}`}>
        {children}
      </Tag>
    );
  };

  const components = {
    h1: heading(1),
    h2: heading(2),
    h3: heading(3),
    h4: heading(4),

    // 문단 전체가 링크 하나뿐이면(예: 시연 영상 참고자료) 사이트 공통 멘션태그로 띄운다.
    // 문장 속에 섞인 링크는 아래 `a` 컴포넌트가 인라인으로 처리한다.
    p: ({ node, children }: any) => {
      const kids = (node?.children ?? []).filter(
        (c: any) => !(c.type === 'text' && !c.value.trim())
      );
      if (kids.length === 1 && kids[0].type === 'element' && kids[0].tagName === 'a') {
        const href = kids[0].properties?.href ?? '';
        return (
          <span className="my-6 block">
            <LinkTag href={href} icon={ExternalLink}>
              {extractText(children)}
            </LinkTag>
          </span>
        );
      }
      return <p className="text-[1.02rem] leading-[1.85] text-[var(--text-secondary)] my-5">{children}</p>;
    },
    ul: ({ children }: any) => (
      <ul className="my-5 pl-5 flex flex-col gap-2 list-disc marker:text-[var(--text-tertiary)] text-[1.02rem] leading-[1.8] text-[var(--text-secondary)]">
        {children}
      </ul>
    ),
    ol: ({ children }: any) => (
      <ol className="my-5 pl-5 flex flex-col gap-2 list-decimal marker:text-[var(--text-tertiary)] text-[1.02rem] leading-[1.8] text-[var(--text-secondary)]">
        {children}
      </ol>
    ),
    li: ({ children }: any) => <li className="pl-1">{children}</li>,
    strong: ({ children }: any) => (
      <strong className="font-semibold text-[var(--text-primary)]">{children}</strong>
    ),
    em: ({ children }: any) => <em className="italic text-[var(--text-secondary)]">{children}</em>,
    hr: () => <hr className="my-12 border-0 border-t border-[var(--border-color)]" />,

    blockquote: ({ children }: any) => (
      <blockquote className="my-6 pl-5 border-l-2 border-[var(--accent-color)] text-[var(--text-secondary)] [&>p]:my-2">
        {children}
      </blockquote>
    ),

    // 인라인 링크는 문장 흐름을 지켜야 한다. (이전엔 모든 링크를 큰 알약 버튼으로 바꿔 글줄이 깨졌다)
    a: ({ href, children }: any) => (
      <a
        href={href}
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noreferrer' : undefined}
        className="text-[var(--accent-color)] underline underline-offset-[3px] decoration-[var(--border-strong)] hover:decoration-[var(--accent-color)] transition-colors"
      >
        {children}
      </a>
    ),

    code: ({ className, children, ...rest }: any) => {
      const lang = /language-(\w+)/.exec(className || '')?.[1];
      if (lang === 'mermaid') {
        const src = extractText(children).replace(/\n$/, '');
        return (
          <MermaidDiagram source={src} theme={theme} onZoom={html => setZoom({ kind: 'svg', html })} />
        );
      }
      if (lang) {
        return (
          <code className={`${className} text-[0.86rem] leading-relaxed`} {...rest}>
            {children}
          </code>
        );
      }
      return (
        <code className="rounded-md bg-[var(--elevated-color)] px-1.5 py-0.5 text-[0.88em] font-medium text-[var(--text-primary)]">
          {children}
        </code>
      );
    },

    // ```mermaid 블록은 MermaidDiagram 이 테두리·배경·패딩을 가진 자기 컨테이너를
    // 직접 그린다. 여기서 <pre> 로 한 번 더 감싸면 테두리와 배경이 이중으로 겹치고,
    // <pre> 안에 <div> 가 들어가 HTML 도 깨진다. 그래서 mermaid 만 래퍼를 벗긴다.
    pre: ({ node, children }: any) => {
      const child = (node?.children ?? []).find((c: any) => c.type === 'element');
      const cls = child?.properties?.className;
      if (Array.isArray(cls) && cls.includes('language-mermaid')) return <>{children}</>;

      return (
        <pre className="my-6 overflow-x-auto rounded-2xl border border-[var(--border-color)] bg-[var(--surface-color)] p-5 text-[var(--text-primary)] custom-scrollbar">
          {children}
        </pre>
      );
    },

    table: ({ children }: any) => (
      <div className="my-8 overflow-x-auto rounded-2xl border border-[var(--border-color)] custom-scrollbar">
        <table className="w-full border-collapse text-left">{children}</table>
      </div>
    ),
    th: ({ children }: any) => (
      <th className="whitespace-nowrap bg-[var(--elevated-color)] px-4 py-3 text-[0.8rem] font-semibold uppercase tracking-wide text-[var(--text-tertiary)] border-b border-[var(--border-color)]">
        {children}
      </th>
    ),
    td: ({ children }: any) => (
      <td className="px-4 py-3 align-top text-[0.92rem] leading-relaxed text-[var(--text-secondary)] border-b border-[var(--border-color)]">
        {children}
      </td>
    ),

    // 마크다운 이미지는 <p> 안에 들어오는 경우가 많다. <figure>/<figcaption> 은
    // <p> 의 자손이 될 수 없어(HTML 위반 + React 경고) span 기반으로 감싼다.
    img: ({ src, alt }: any) => (
      <span className="my-10 block">
        <img
          src={src}
          alt={alt || ''}
          loading="lazy"
          onClick={() => setZoom({ kind: 'img', src })}
          className="mx-auto block max-h-[70vh] w-auto max-w-full cursor-zoom-in rounded-2xl border border-[var(--border-color)] object-contain"
        />
        {alt ? (
          <span className="mt-3 block text-center text-[0.85rem] text-[var(--text-tertiary)]">{alt}</span>
        ) : null}
      </span>
    ),
  };

  return (
    <div ref={rootRef}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeIds]}
        components={components}
      >
        {source}
      </ReactMarkdown>

      {zoom && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setZoom(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-6 backdrop-blur-sm"
        >
          <button
            onClick={() => setZoom(null)}
            aria-label="Close"
            className="absolute right-6 top-6 rounded-full p-2 text-white/80 hover:bg-white/10 hover:text-white transition-colors"
          >
            <X size={26} />
          </button>
          <div className="max-h-[90vh] max-w-[95vw] overflow-auto custom-scrollbar" onClick={e => e.stopPropagation()}>
            {zoom.kind === 'img' ? (
              <img src={zoom.src} alt="" className="max-h-[88vh] max-w-full object-contain" />
            ) : (
              <div
                className="rounded-2xl bg-[var(--surface-color)] p-8 [&_svg]:max-w-none"
                dangerouslySetInnerHTML={{ __html: zoom.html }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
