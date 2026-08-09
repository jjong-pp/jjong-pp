import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { PageShell } from './layouts/PageShell';

/**
 * 상세 페이지는 react-markdown + mermaid 를 끌고 오므로 초기 번들에서 분리한다.
 */
const ProjectDetail = lazy(() =>
  import('./pages/ProjectDetail').then(m => ({ default: m.ProjectDetail }))
);

const Loading = () => (
  <div className="flex flex-col gap-4 py-16" aria-hidden>
    <div className="h-4 w-32 animate-pulse rounded bg-[var(--surface-color)]" />
    <div className="h-12 w-3/4 animate-pulse rounded bg-[var(--surface-color)]" />
    <div className="h-64 w-full animate-pulse rounded-2xl bg-[var(--surface-color)]" />
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <BrowserRouter>
          <PageShell>
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects/:id" element={<ProjectDetail />} />
                <Route path="*" element={<ProjectDetail />} />
              </Routes>
            </Suspense>
          </PageShell>
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
