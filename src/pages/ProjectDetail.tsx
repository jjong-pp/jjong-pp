import { useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Code } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { projectsFullMarkdown, blogFullMarkdown, projects, blogList } from '../data/projectsData';
import { useTheme } from '../context/ThemeContext';
import mermaid from 'mermaid';

const extractText = (children: any): string => {
  if (typeof children === 'string' || typeof children === 'number') {
    return String(children);
  }
  if (Array.isArray(children)) {
    return children.map(extractText).join('');
  }
  if (children && children.props && children.props.children) {
    return extractText(children.props.children);
  }
  return '';
};

const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
};

export const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const contentRef = useRef<HTMLDivElement>(null);
  
  let markdownContent = id && (projectsFullMarkdown[id] || blogFullMarkdown[id])
    ? (projectsFullMarkdown[id] || blogFullMarkdown[id])
    : '# Not Found\n\nSorry, the requested project could not be found.';

  const projectItem = projects.find(p => p.id === id) || blogList.find((p: any) => p.id === id);
  const mainTitle = projectItem ? (typeof projectItem.title === 'string' ? projectItem.title : projectItem.title.KR) : 'Project Details';

  // TOC: 대제목(##)만 수집
  const headings: { id: string, text: string, level: number }[] = [];
  const headingRegex = /^(#{2})\s+(.+)$/gm;
  let m;
  while ((m = headingRegex.exec(markdownContent)) !== null) {
    headings.push({
      id: slugify(m[2].replace(/^\d+\.\s*/, '')),
      text: m[2],
      level: m[1].length
    });
  }

  const [modalImageSrc, setModalImageSrc] = useState<string | null>(null);
  const [modalSvgContent, setModalSvgContent] = useState<string | null>(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: theme === 'dark' ? 'dark' : 'default',
      fontFamily: '"Inter", sans-serif',
      securityLevel: 'loose'
    });
    // Run mermaid whenever markdown content, theme, or modal state changes
    // This fixes the bug where charts revert to text after closing the modal
    mermaid.run({ querySelector: '.mermaid' }).catch(e => console.error('Mermaid run error:', e));
  }, [markdownContent, theme, modalSvgContent, modalImageSrc]);

  const handleMermaidClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const mermaidContainer = target.closest('.mermaid');
    if (mermaidContainer && mermaidContainer.innerHTML.includes('<svg')) {
      setModalSvgContent(mermaidContainer.innerHTML);
    }
  };



  const components = {
    code: ({ className, children, ...props }: any) => {
      const match = /language-(\w+)/.exec(className || '');
      if (match && match[1] === 'mermaid') {
        return (
          <div 
            className="mermaid" 
            style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0', cursor: 'zoom-in', maxWidth: '100%', overflowX: 'auto' }}
          >
            {extractText(children).replace(/\n$/, '')}
          </div>
        );
      }
      return (
        <code 
          className={className} {...props} 
          style={match 
            ? { color: 'var(--text-primary)', fontSize: '0.9rem', fontFamily: '"Fira Code", monospace' } 
            : { backgroundColor: 'var(--surface-color)', padding: '0.2rem 0.4rem', borderRadius: '4px', fontSize: '0.9em', color: 'var(--primary-color)' }
          }
        >
          {children}
        </code>
      );
    },
    pre: ({ children }: any) => (
      <pre style={{ backgroundColor: 'var(--surface-color)', padding: '1.5rem', borderRadius: '12px', overflowX: 'auto', border: '1px solid var(--border-color)', margin: '1.5rem 0', maxWidth: '100%' }}>
        {children}
      </pre>
    ),
    table: ({ children }: any) => (
      <div style={{ overflowX: 'auto', margin: '2rem 0', borderRadius: '12px', border: '1px solid var(--border-color)', maxWidth: '100%' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'var(--bg-color)' }}>{children}</table>
      </div>
    ),
    th: ({ children }: any) => <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--surface-color)', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem', whiteSpace: 'nowrap' }}>{children}</th>,
    td: ({ children }: any) => <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.9rem' }}>{children}</td>,
    img: ({ src, alt }: any) => (
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '2.5rem 0' }}>
        <img 
          src={src} alt={alt} 
          style={{ 
            cursor: 'zoom-in', maxWidth: '100%', maxHeight: '75vh', height: 'auto', 
            objectFit: 'contain', display: 'block', borderRadius: '12px', 
            border: '1px solid var(--border-color)', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' 
          }} 
          onClick={() => setModalImageSrc(src)}
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
        />
      </div>
    ),
    blockquote: ({ children }: any) => {
      if (!children || (Array.isArray(children) && children.length === 0)) return null;
      return (
        <blockquote style={{ 
          margin: '1.5rem 0', padding: '0.5rem 1.25rem',
          borderLeft: '3px solid var(--primary-color)',
          color: 'var(--text-secondary)', fontSize: '1.05rem',
          display: 'flex', flexDirection: 'column', gap: '0.5rem'
        }}>
          {children}
        </blockquote>
      );
    },
    h1: ({ children }: any) => {
      const id = slugify(String(children).replace(/^\d+\.\s*/, ''));
      return <h1 id={id} style={{ fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.03em', marginTop: '3rem', marginBottom: '1.5rem', color: 'var(--text-primary)', scrollMarginTop: '100px' }}>{children}</h1>;
    },
    h2: ({ children }: any) => {
      const id = slugify(String(children).replace(/^\d+\.\s*/, ''));
      return <h2 id={id} style={{ fontSize: '1.5rem', fontWeight: 600, letterSpacing: '-0.02em', marginTop: '3rem', marginBottom: '1.25rem', color: 'var(--text-primary)', scrollMarginTop: '100px', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>{children}</h2>;
    },
    h3: ({ children }: any) => <h3 style={{ fontSize: '1.25rem', fontWeight: 600, letterSpacing: '-0.01em', marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>{children}</h3>,
    p: ({ children }: any) => <p style={{ fontSize: '1.05rem', lineHeight: 1.75, color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>{children}</p>,
    ul: ({ children }: any) => <ul style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: '1.25rem', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>{children}</ul>,
    ol: ({ children }: any) => <ol style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: '1.25rem', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>{children}</ol>,
    li: ({ children }: any) => <li style={{ paddingLeft: '0.5rem' }}>{children}</li>,
    strong: ({ children }: any) => <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{children}</strong>,
    // ★ URL 멘션태그: LeftSidebar의 Github/Blog 버튼과 완전 동일한 심플 인라인 디자인
    a: ({ href, children }: any) => {
      return (
        <a 
          href={href} 
          target="_blank" 
          rel="noreferrer" 
          className="inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[var(--bg-color)] border border-[var(--border-color)] text-[0.9rem] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-primary)] transition-all shadow-sm px-4"
          style={{ textDecoration: 'none', margin: '0.25rem 0.25rem' }}
        >
          <Code size={16} />
          <span>{children}</span>
        </a>
      );
    },
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', backgroundColor: 'var(--bg-color)' }}>
      
      {/* HEADER */}
      <div style={{
        width: '100%', borderBottom: '1px solid var(--border-color)',
        backgroundColor: 'var(--bg-color)', padding: '2rem 0',
        position: 'sticky', top: '64px', zIndex: 40
      }}>
        <div style={{ width: '90%', maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', position: 'relative' }}>
          <button 
            onClick={() => navigate(-1)}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              background: 'none', border: 'none', color: 'var(--text-tertiary)',
              cursor: 'pointer', fontSize: '0.9rem', fontWeight: 500,
              padding: '0.5rem 1rem', borderRadius: '8px', transition: 'all 0.2s',
              position: 'absolute', left: 0, zIndex: 10
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.backgroundColor = 'var(--surface-color)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-tertiary)'; e.currentTarget.style.backgroundColor = 'transparent'; }}
          >
            <ArrowLeft size={16} />
            Back
          </button>
          <h1 style={{ flex: 1, textAlign: 'center', fontSize: '1.8rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)', padding: '0 100px' }}>
            {mainTitle}
          </h1>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{
        width: '90%', maxWidth: '1400px', margin: '0 auto', padding: '3rem 0',
        display: 'flex', alignItems: 'flex-start', gap: '4rem', position: 'relative'
      }}>
        
        {/* Article */}
        <div ref={contentRef} style={{ flex: 1, minWidth: 0, overflow: 'hidden' }} onClick={handleMermaidClick}>
          <div className="prose" style={{ maxWidth: '100%', width: '100%' }}>
            <ReactMarkdown
              key={`md-${theme}`}
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={components}
            >
              {markdownContent}
            </ReactMarkdown>
          </div>
        </div>

        {/* TOC */}
        {headings.length > 0 && (
          <div style={{
            width: '280px', flexShrink: 0, position: 'sticky', top: '10rem',
            borderLeft: '2px solid var(--border-color)', paddingLeft: '1.5rem',
            display: 'flex', flexDirection: 'column', gap: '0.75rem'
          }} className="hidden lg:flex">
            <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-tertiary)', marginBottom: '0.5rem' }}>
              목차
            </span>
            {headings.map((h, idx) => (
              <a 
                key={idx}
                href={`#${h.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
                style={{
                  fontSize: '0.88rem', color: 'var(--text-secondary)',
                  textDecoration: 'none', transition: 'color 0.2s',
                  display: 'block', padding: '0.25rem 0', lineHeight: 1.5,
                  wordBreak: 'keep-all', whiteSpace: 'normal', overflowWrap: 'break-word'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
              >
                {h.text}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {(modalImageSrc || modalSvgContent) && (
        <div 
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}
          onClick={() => { setModalImageSrc(null); setModalSvgContent(null); }}
          onContextMenu={(e) => e.preventDefault()}
        >
          <div style={{ maxWidth: '95vw', maxHeight: '95vh', overflow: 'auto', position: 'relative', display: 'flex', justifyContent: 'center' }}>
            {modalImageSrc && (
              <img src={modalImageSrc} alt="Zoomed" style={{ maxWidth: '100%', maxHeight: '90vh', objectFit: 'contain' }} onContextMenu={(e) => e.preventDefault()} onDragStart={(e) => e.preventDefault()} />
            )}
            {modalSvgContent && (
              <div dangerouslySetInnerHTML={{ __html: modalSvgContent }} style={{ backgroundColor: 'var(--surface-color)', padding: '2rem', borderRadius: '12px', minWidth: '50vw' }} />
            )}
          </div>
          <button 
            style={{ position: 'absolute', top: '1.5rem', right: '2rem', color: 'white', background: 'none', border: 'none', fontSize: '2.5rem', cursor: 'pointer', opacity: 0.8 }} 
            onClick={() => { setModalImageSrc(null); setModalSvgContent(null); }}
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
};
