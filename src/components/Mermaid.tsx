'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

interface MermaidProps {
  chart: string;
}

export const Mermaid = ({ chart }: MermaidProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const [svg, setSvg] = useState('');
  const idRef = useRef(`mermaid-${Math.random().toString(36).slice(2, 9)}`);

  useEffect(() => {
    const render = async () => {
      try {
        const mermaid = (await import('mermaid')).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: theme === 'dark' ? 'dark' : 'default',
          themeVariables: theme === 'dark' ? {
            primaryColor: '#3a3a3c',
            primaryTextColor: '#f5f5f7',
            primaryBorderColor: '#48484a',
            lineColor: '#86868b',
            secondaryColor: '#2c2c2e',
            tertiaryColor: '#1c1c1e',
          } : {
            primaryColor: '#f5f5f7',
            primaryTextColor: '#1d1d1f',
            primaryBorderColor: '#d2d2d7',
            lineColor: '#86868b',
            secondaryColor: '#ffffff',
            tertiaryColor: '#fbfbfd',
          },
          flowchart: { curve: 'basis', padding: 20 },
          fontSize: 14,
          fontFamily: '"Inter", "Noto Sans KR", sans-serif',
        });

        const { svg: renderedSvg } = await mermaid.render(idRef.current, chart);
        setSvg(renderedSvg);
      } catch (err) {
        console.error('Mermaid render error:', err);
        setSvg(`<pre style="color:var(--text-secondary);font-size:12px;white-space:pre-wrap">${chart}</pre>`);
      }
    };

    render();
    // Re-generate ID for re-render
    idRef.current = `mermaid-${Math.random().toString(36).slice(2, 9)}`;
  }, [chart, theme]);

  return (
    <div
      ref={ref}
      className="my-8 flex justify-center overflow-x-auto rounded-2xl p-6"
      style={{
        backgroundColor: 'var(--surface-color)',
        border: '1px solid var(--border-color)',
      }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};
