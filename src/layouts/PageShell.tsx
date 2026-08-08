import { useEffect, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { SiteNav } from '../components/SiteNav';
import { SiteFooter } from '../components/SiteFooter';

/**
 * 모든 라우트가 같은 골격을 쓴다.
 *
 * 이전 SplitLayout 은 상세 페이지 진입 시 좌측 사이드바를 width 0 으로 접어
 * 레이아웃이 통째로 바뀌었고, 사이드바를 데스크탑/모바일용으로 DOM 에 두 번
 * 렌더해 h1 과 프로필 이미지가 중복이었다. 여기서는 폭·여백 규칙을 한 벌만 둔다.
 */
export const PageShell = ({ children }: { children: ReactNode }) => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0 });
      return;
    }

    // 라우트 전환 직후에는 대상 섹션이 아직 커밋되지 않았을 수 있다(lazy 라우트 포함).
    // 한 프레임만 기다리면 놓치므로 잠깐 동안 다시 확인한다.
    const id = hash.slice(1);
    let raf = 0;
    const deadline = performance.now() + 1200;

    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
      if (performance.now() < deadline) raf = requestAnimationFrame(tryScroll);
    };

    raf = requestAnimationFrame(tryScroll);
    return () => cancelAnimationFrame(raf);
  }, [pathname, hash]);

  return (
    <div className="min-h-screen bg-[var(--bg-color)]">
      <SiteNav />
      <main className="mx-auto w-full max-w-[1080px] px-6 pt-28 md:px-10 md:pt-36">{children}</main>
      <SiteFooter />
    </div>
  );
};
