import { useEffect, useRef, Suspense, lazy } from 'react';
import { MDXProvider } from '@mdx-js/react';
import { allArticles } from 'content-collections';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { projectsFullMarkdown, projects } from '../data/projectsData';
import { useTheme } from '../context/ThemeContext';
import mermaid from 'mermaid';

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
  
  let markdownContent = id && projectsFullMarkdown[id]
    ? projectsFullMarkdown[id]
    : '';

  // Extract Main Title from metadata, fallback to 'Project Details'
  const projectItem = projects.find(p => p.id === id);
  const articleItem = allArticles.find(a => a._meta.path === id);
  
  
  const mainTitle = projectItem ? (typeof projectItem.title === 'string' ? projectItem.title : projectItem.title.KR) : (articleItem ? articleItem.title : 'Project Details');
  const mdxModules = import.meta.glob('../content/articles/*.mdx');
  const importFn = mdxModules[`../content/articles/${id}.mdx`];
  const MdxComponent = importFn ? lazy(importFn as any) : null;

  // For non-MDX projects, process the string content
  if (markdownContent) {
    markdownContent = markdownContent.replace(/^#\s+(.+)$/m, () => {
      return '';
    });
  }

  // Extract headings for TOC (only for string markdown projects)
  const headings: { id: string, text: string, level: number }[] = [];
  if (markdownContent) {
    const headingRegex = /^(#{2,4})\s+(.+)$/gm;
    let m;
    while ((m = headingRegex.exec(markdownContent)) !== null) {
      const rawText = m[2].replace(/\*\*/g, '').trim();
      headings.push({
        id: slugify(rawText.replace(/^\d+\.\s*/, '')),
        text: rawText,
        level: m[1].length
      });
    }
  }

  // Force re-initialization of Mermaid on theme change
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: theme === 'dark' ? 'dark' : 'default',
      fontFamily: '"Inter", sans-serif',
      securityLevel: 'loose'
    });
    mermaid.run({
      querySelector: '.mermaid',
    }).catch(e => console.error(e));
  }, [markdownContent, theme, MdxComponent]);

  const components = {
    pre: ({ children }: any) => <>{children}</>,
    code: ({ node, inline, className, children, ...props }: any) => {
      const match = /language-(\w+)/.exec(className || '');
      if (!inline && match && match[1] === 'mermaid') {
        return <div className="mermaid" style={{ display: 'flex', justifyContent: 'center', margin: '3rem 0' }}>{String(children).replace(/\n$/, '')}</div>;
      }
      return !inline ? (
        <pre style={{ backgroundColor: 'var(--surface-color)', padding: '1.5rem', borderRadius: '16px', overflowX: 'auto', border: '1px solid var(--border-color)', margin: '2.5rem 0' }}>
          <code className={className} {...props} style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontFamily: '"Fira Code", monospace' }}>
            {children}
          </code>
        </pre>
      ) : (
        <code className={className} {...props} style={{ backgroundColor: 'var(--surface-color)', padding: '0.2rem 0.4rem', borderRadius: '4px', fontSize: '0.9em', color: 'var(--text-primary)' }}>
          {children}
        </code>
      );
    },
    table: ({ children }: any) => (
      <div style={{ overflowX: 'auto', margin: '2.5rem 0', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'var(--bg-color)' }}>{children}</table>
      </div>
    ),
    th: ({ children }: any) => <th style={{ padding: '1.25rem 1rem', textAlign: 'left', borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--surface-color)', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.9rem' }}>{children}</th>,
    td: ({ children }: any) => <td style={{ padding: '1.25rem 1rem', borderBottom: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '1rem' }}>{children}</td>,
    img: ({ src, alt }: any) => <img src={src} alt={alt} style={{ width: '100%', borderRadius: '16px', margin: '3rem 0', boxShadow: '0 10px 40px rgba(0,0,0,0.08)' }} />,
    blockquote: ({ children }: any) => {
      if (!children || (Array.isArray(children) && children.length === 0)) return null;
      return (
        <blockquote style={{ 
          margin: '2.5rem 0', 
          padding: '0.5rem 1.5rem', 
          borderLeft: '4px solid var(--border-color)',
          color: 'var(--text-secondary)', 
          fontSize: '1.25rem',
          fontStyle: 'italic',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}>
          {children}
        </blockquote>
      );
    },
    h1: ({ children }: any) => {
      const id = slugify(String(children).replace(/^\d+\.\s*/, ''));
      return <h1 id={id} style={{ fontSize: '2.75rem', fontWeight: 700, letterSpacing: '-0.04em', margin: '3.5rem 0 1.5rem', color: 'var(--text-primary)', scrollMarginTop: '100px' }}>{children}</h1>;
    },
    h2: ({ children }: any) => {
      const id = slugify(String(children).replace(/^\d+\.\s*/, ''));
      return <h2 id={id} style={{ fontSize: '1.75rem', fontWeight: 600, letterSpacing: '-0.03em', margin: '3rem 0 1rem', color: 'var(--text-primary)', scrollMarginTop: '100px', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>{children}</h2>;
    },
    h3: ({ children }: any) => <h3 style={{ fontSize: '1.35rem', fontWeight: 600, letterSpacing: '-0.02em', margin: '2rem 0 1rem', color: 'var(--text-primary)' }}>{children}</h3>,
    p: ({ children }: any) => <p style={{ fontSize: '1.125rem', lineHeight: 1.75, color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>{children}</p>,
    ul: ({ children }: any) => <ul style={{ fontSize: '1.125rem', lineHeight: 1.75, color: 'var(--text-secondary)', marginBottom: '1.5rem', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>{children}</ul>,
    ol: ({ children }: any) => <ol style={{ fontSize: '1.125rem', lineHeight: 1.75, color: 'var(--text-secondary)', marginBottom: '1.5rem', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>{children}</ol>,
    li: ({ children }: any) => <li style={{ paddingLeft: '0.5rem' }}>{children}</li>,
    strong: ({ children }: any) => <strong style={{ color: 'var(--accent-color)', fontWeight: 700 }}>{children}</strong>,
    a: ({ href, children }: any) => {
      return <a href={href} target="_blank" rel="noreferrer" style={{ color: 'var(--accent-color)', textDecoration: 'none', borderBottom: '1px solid var(--accent-color)', transition: 'all 0.2s' }} onMouseEnter={(e) => {e.currentTarget.style.opacity = '0.7';}} onMouseLeave={(e) => {e.currentTarget.style.opacity = '1';}}>{children}</a>;
    },
  };

  const AppleFallback = () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px', color: 'var(--text-secondary)' }}>
      <span style={{ fontSize: '1.25rem', letterSpacing: '-0.02em', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}>
        Loading...
      </span>
    </div>
  );

  return (
    <div className="custom-scrollbar" style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', backgroundColor: 'var(--bg-color)', overflowY: 'auto' }}>
      
      {/* HEADER SECTION */}
      <div style={{
        width: '100%', 
        borderBottom: '1px solid var(--border-color)',
        backgroundColor: 'var(--bg-color)',
        padding: '2rem 3%',
        flexShrink: 0,
        position: 'sticky',
        top: 0,
        zIndex: 40
      }}>
        <div style={{
          width: '100%',
          maxWidth: '1800px', // Matches main content width
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          position: 'relative'
        }}>
          <button 
            onClick={() => navigate('/')}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              background: 'none', border: 'none', color: 'var(--text-tertiary)',
              cursor: 'pointer', fontSize: '0.9rem', fontWeight: 500,
              padding: '0.5rem 1rem', borderRadius: '8px', transition: 'all 0.2s',
              position: 'absolute', left: 0, zIndex: 10
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--text-primary)';
              e.currentTarget.style.backgroundColor = 'var(--surface-color)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--text-tertiary)';
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <ArrowLeft size={16} />
            Back
          </button>
          
          <h1 style={{ flex: 1, textAlign: 'center', fontSize: '1.8rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)', padding: '0 100px' }}>
            {mainTitle}
          </h1>
        </div>
      </div>

      {/* MAIN CONTENT AREA (Apple / Velog Style Layout) */}
      <div style={{
        width: '100%',
        maxWidth: '1800px',
        margin: '0 auto',
        padding: '3rem 3%',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '4rem',
        position: 'relative'
      }}>
        
        {/* Left Pane: Article Content */}
        <div ref={contentRef} style={{ flex: 1, minWidth: 0, display: 'flex', justifyContent: 'center' }}>
          <div className="prose" style={{ width: '100%', maxWidth: '800px' }}>
            {MdxComponent ? (
              <Suspense fallback={<AppleFallback />}>
                <MDXProvider components={components}>
                  <MdxComponent />
                </MDXProvider>
              </Suspense>
            ) : (
              <ReactMarkdown
              key={`md-${theme}`} // Force remount on theme change for mermaid
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={components}
            >
              {markdownContent}
            </ReactMarkdown>
            )}
          </div>
        </div>

        {/* Right Pane: Sticky TOC */}
        {headings.length > 0 && (
          <div style={{
            width: '240px',
            flexShrink: 0,
            position: 'sticky',
            top: '3rem',
            borderLeft: '2px solid var(--border-color)',
            paddingLeft: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }} className="hidden lg:flex">
            {headings.map((h, idx) => (
              <a 
                key={idx}
                href={`#${h.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
                style={{
                  fontSize: '0.85rem',
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                  display: 'block',
                  padding: '0.2rem 0',
                  paddingLeft: `${(h.level - 2) * 1}rem`,
                  lineHeight: 1.4
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
    </div>
  );
};
