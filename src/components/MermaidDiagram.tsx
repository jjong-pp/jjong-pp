import { useEffect, useId, useState } from 'react';
import mermaid from 'mermaid';

/**
 * Mermaid 다이어그램.
 *
 * 이전에는 `.mermaid` 노드를 찾아 mermaid.run() 이 직접 DOM 을 채우게 했는데,
 * 그 사이에 React 가 한 번이라도 리렌더하면(예: 목차 상태 갱신) 자기 가상 DOM 을
 * 기준으로 삽입된 SVG 를 지워버려 다이어그램이 사라졌다. 여기서는 SVG 문자열을
 * state 로 들고 React 가 소유하게 해서 그 충돌을 없앤다.
 */
export const MermaidDiagram = ({
  source,
  theme,
  onZoom,
}: {
  source: string;
  theme: 'light' | 'dark';
  onZoom: (svg: string) => void;
}) => {
  const [svg, setSvg] = useState('');
  const [failed, setFailed] = useState(false);
  const reactId = useId();

  useEffect(() => {
    let alive = true;
    // id 에 콜론이 들어가면 querySelector 가 깨지므로 제거한다.
    const renderId = `mermaid-${reactId.replace(/[^a-zA-Z0-9]/g, '')}`;

    mermaid.initialize({
      startOnLoad: false,
      theme: theme === 'dark' ? 'dark' : 'default',
      fontFamily: 'Inter, "Noto Sans KR", sans-serif',
      securityLevel: 'loose',
    });

    mermaid
      .render(renderId, source)
      .then(({ svg }) => {
        if (!alive) return;
        setSvg(svg);
        setFailed(false);
      })
      .catch(() => {
        if (!alive) return;
        setSvg('');
        setFailed(true);
      });

    return () => {
      alive = false;
    };
  }, [source, theme, reactId]);

  if (failed) {
    // 문법 오류 등으로 못 그리면 원문을 그대로 보여준다.
    return (
      <pre className="custom-scrollbar my-10 overflow-x-auto rounded-2xl border border-[var(--border-color)] bg-[var(--surface-color)] p-5 text-[0.85rem] text-[var(--text-secondary)]">
        {source}
      </pre>
    );
  }

  if (!svg) {
    return (
      <div className="my-10 h-40 animate-pulse rounded-2xl border border-[var(--border-color)] bg-[var(--surface-color)]" />
    );
  }

  return (
    <div
      role="img"
      onClick={() => onZoom(svg)}
      className="custom-scrollbar my-10 flex cursor-zoom-in justify-center overflow-x-auto rounded-2xl border border-[var(--border-color)] bg-[var(--surface-color)] p-6"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};
