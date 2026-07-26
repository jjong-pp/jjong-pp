import { type ReactNode, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { TopNav } from '../components/TopNav';
import { LeftSidebar } from '../components/LeftSidebar';
import { PanelLeftOpen, PanelLeftClose } from 'lucide-react';

export const SplitLayout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const isDetailPage = location.pathname.startsWith('/projects/');

  // 상세 페이지 진입 시 기본적으로 사이드바를 접음
  const [sidebarOpen, setSidebarOpen] = useState(!isDetailPage);

  // 라우트 변경 시 사이드바 상태 자동 전환
  const [prevIsDetail, setPrevIsDetail] = useState(isDetailPage);
  if (isDetailPage !== prevIsDetail) {
    setPrevIsDetail(isDetailPage);
    setSidebarOpen(!isDetailPage);
  }

  return (
    <>
      <TopNav />
      <div className="w-full min-h-screen bg-[var(--bg-color)] flex justify-center pt-24">
        {/* Main Content Container */}
        <div className={`flex flex-col md:flex-row w-full gap-16 md:gap-0 px-0 py-8 items-start transition-all duration-500 ${
          sidebarOpen ? 'max-w-[1600px] md:px-16 md:gap-24' : ''
        }`}>
          
          {/* Desktop: Sidebar Toggle Button — 모든 페이지에서 표시 */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden md:flex fixed left-4 top-[5.5rem] z-50 items-center justify-center w-10 h-10 rounded-xl bg-[var(--surface-color)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-primary)] transition-all shadow-lg"
            title={sidebarOpen ? '사이드바 닫기' : '사이드바 열기'}
          >
            {sidebarOpen ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18} />}
          </button>

          {/* Left Column (Profile & Bio) - 토글 가능 */}
          <aside className={`shrink-0 sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto custom-scrollbar hidden md:block pb-10 pr-4 transition-all duration-500 ease-in-out ${
            sidebarOpen 
              ? 'w-full max-w-[500px] opacity-100 ml-8' 
              : 'w-0 max-w-0 opacity-0 overflow-hidden ml-0 pr-0'
          }`}>
            <LeftSidebar />
          </aside>
          
          {/* Mobile Profile Area (Visible only on mobile) */}
          <div className="md:hidden w-full mb-8 px-8">
            <LeftSidebar />
          </div>

          {/* Right Column (Projects / Detail) */}
          <main className={`flex-1 min-w-0 pb-16 w-full transition-all duration-500 ${
            sidebarOpen ? 'px-8 md:px-0' : 'px-8 md:px-16'
          }`}>
            {children}
          </main>
          
        </div>
      </div>
    </>
  );
};
