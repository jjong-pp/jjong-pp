import { type ReactNode } from 'react';
import { LeftSidebar } from '../components/LeftSidebar';

export const SplitLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      backgroundColor: 'var(--bg-color)',
      padding: '4vh 10vw', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center' 
    }}>
      <div style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        backgroundColor: 'var(--surface-color)',
        borderRadius: '24px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        border: '1px solid var(--border-color)',
        overflow: 'hidden',
        position: 'relative'
      }}>
        {/* Left Pane is Global now */}
        <LeftSidebar />

        {/* Right Pane: Router Outlet */}
        <div className="no-scrollbar" style={{ 
          width: '55%', 
          height: '100%', 
          overflowY: 'auto', 
          padding: '4rem 3rem',
          scrollBehavior: 'smooth',
          backgroundColor: 'var(--bg-color)'
        }}>
          {/* Removed maxWidth to satisfy wide apple styling */}
          <div style={{ width: '100%' }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
