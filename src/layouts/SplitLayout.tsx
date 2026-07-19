import { type ReactNode } from 'react';
import { TopNav } from '../components/TopNav';

export const SplitLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <TopNav />
      <div style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: 'var(--bg-color)',
        paddingTop: '64px', /* Match TopNav height */
        boxSizing: 'border-box', /* Fix scrolling issue */
        display: 'flex',
        alignItems: 'stretch',
      }}>
        {children}
      </div>
    </>
  );
};
