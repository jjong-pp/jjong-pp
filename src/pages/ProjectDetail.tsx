import { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { projectsFullMarkdown, blogFullMarkdown, projects, blogList } from '../data/projectsData';
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
  
  let markdownContent = id && (projectsFullMarkdown[id] || blogFullMarkdown[id])
    ? (projectsFullMarkdown[id] || blogFullMarkdown[id])
    : '# Not Found\n\nSorry, the requested project could not be found.';

  // Extract Main Title from metadata, fallback to 'Project Details'
  const projectItem = projects.find(p => p.id === id) || blogList.find((p: any) => p.id === id);
  const mainTitle = projectItem ? (typeof projectItem.title === 'string' ? projectItem.title : projectItem.title.KR) : 'Project Details';
  
  // Remove the first H1 from the body (which is usually the Notion title export)
  markdownContent = markdownContent.replace(/^#\s+(.+)$/m, () => {
    return '';
  });

  // Extract headings for TOC
  const headings: { id: string, text: string, level: number }[] = [];
  const headingRegex = /^(#{2,4})\s+(.+)$/gm;
  let m;
  while ((m = headingRegex.exec(markdownContent)) !== null) {
    headings.push({
      id: slugify(m[2].replace(/^\d+\.\s*/, '')),
      text: m[2],
      level: m[1].length
    });
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
  }, [markdownContent, theme]);

  const components = {
    pre: ({ children }: any) => <>{children}</>,
    code: ({ node, inline, className, children, ...props }: any) => {
      const match = /language-(\w+)/.exec(className || '');
      if (!inline && match && match[1] === 'mermaid') {
        return <div className="mermaid" style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>{String(children).replace(/\n$/, '')}</div>;
      }
      return !inline ? (
        <pre style={{ backgroundColor: 'var(--surface-color)', padding: '1.5rem', borderRadius: '12px', overflowX: 'auto', border: '1px solid var(--border-color)', margin: '1.5rem 0' }}>
          <code className={className} {...props} style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontFamily: '"Fira Code", monospace' }}>
            {children}
          </code>
        </pre>
      ) : (
        <code className={className} {...props} style={{ backgroundColor: 'var(--surface-color)', padding: '0.2rem 0.4rem', borderRadius: '4px', fontSize: '0.9em', color: 'var(--primary-color)' }}>
          {children}
        </code>
      );
    },
    table: ({ children }: any) => (
      <div style={{ overflowX: 'auto', margin: '2rem 0', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'var(--bg-color)' }}>{children}</table>
      </div>
    ),
    th: ({ children }: any) => <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--surface-color)', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>{children}</th>,
    td: ({ children }: any) => <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.9rem' }}>{children}</td>,
    img: ({ src, alt }: any) => <img src={src} alt={alt} style={{ maxWidth: '100%', borderRadius: '12px', margin: '2rem 0', border: '1px solid var(--border-color)', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }} />,
    blockquote: ({ children }: any) => {
      if (!children || (Array.isArray(children) && children.length === 0)) return null;
      return (
        <blockquote style={{ 
          margin: '1.5rem 0', 
          padding: '0.5rem 1.25rem', 
          borderLeft: '3px solid var(--primary-color)',
          color: 'var(--text-secondary)', 
          fontSize: '1.05rem',
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
    a: ({ href, children }: any) => {
      return <a href={href} target="_blank" rel="noreferrer" style={{ color: 'var(--primary-color)', textDecoration: 'none', borderBottom: '1px solid rgba(var(--primary-color-rgb), 0.3)', transition: 'border-color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.borderBottomColor = 'var(--primary-color)'} onMouseLeave={(e) => e.currentTarget.style.borderBottomColor = 'rgba(var(--primary-color-rgb), 0.3)'}>{children}</a>;
    },
  };

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
            onClick={() => navigate(-1)}
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

      {/* MAIN CONTENT AREA (Velog Style Layout) */}
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
        <div ref={contentRef} style={{ flex: 1, minWidth: 0 }}>
          <div className="prose" style={{ maxWidth: '100%' }}>
            <ReactMarkdown
              key={`md-${theme}`} // Force remount on theme change for mermaid
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={components}
            >
              {markdownContent}
            </ReactMarkdown>
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
