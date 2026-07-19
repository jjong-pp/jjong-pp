import { useState, useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import { useTheme } from '../context/ThemeContext';

export const MermaidBlock = ({ chartStr }: { chartStr: string }) => {
  const { theme } = useTheme();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: theme === 'dark' ? 'dark' : 'default',
      fontFamily: '"Inter", sans-serif',
      securityLevel: 'loose',
    });
    
    // Run mermaid on both regular and modal containers if they exist
    if (containerRef.current) {
      mermaid.run({ nodes: [containerRef.current] }).catch(e => console.error(e));
    }
    if (modalRef.current) {
      mermaid.run({ nodes: [modalRef.current] }).catch(e => console.error(e));
    }
  }, [chartStr, theme, isFullscreen]);

  return (
    <>
      {/* Regular View */}
      <div 
        onClick={() => setIsFullscreen(true)}
        style={{ 
          cursor: 'zoom-in', 
          padding: '1.5rem', 
          background: 'var(--surface-color)', 
          borderRadius: '16px', 
          border: '1px solid var(--border-color)', 
          margin: '3rem 0', 
          overflowX: 'auto', 
          display: 'flex', 
          justifyContent: 'center', 
          transition: 'all 0.3s ease' 
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.02)';
          e.currentTarget.style.borderColor = 'var(--accent-color)';
          e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.borderColor = 'var(--border-color)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <div ref={containerRef}>{chartStr}</div>
      </div>

      {/* Fullscreen Modal View */}
      {isFullscreen && (
        <div 
          onClick={() => setIsFullscreen(false)}
          style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            width: '100vw', 
            height: '100vh', 
            background: 'rgba(0,0,0,0.85)', 
            backdropFilter: 'blur(8px)', 
            zIndex: 99999, 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            cursor: 'zoom-out', 
            padding: '2rem' 
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{ 
              background: 'var(--surface-color)', 
              padding: '2rem', 
              borderRadius: '24px', 
              width: '95vw', 
              height: '95vh', 
              overflow: 'auto', 
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)', 
              cursor: 'default',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', flexShrink: 0 }}>
              <h3 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '1.25rem' }}>다이어그램 크게 보기 (스크롤 가능)</h3>
              <button 
                onClick={() => setIsFullscreen(false)} 
                style={{ 
                  background: 'var(--accent-color)', 
                  border: 'none', 
                  color: '#fff', 
                  cursor: 'pointer', 
                  padding: '0.5rem 1.5rem',
                  borderRadius: '8px',
                  fontWeight: 600,
                  fontSize: '0.95rem'
                }}
              >
                닫기
              </button>
            </div>
            
            <div style={{ flex: 1, overflow: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: '2rem' }}>
                <div ref={modalRef} style={{ transform: 'scale(1.25)', transformOrigin: 'top center', minWidth: 'min-content' }}>{chartStr}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
