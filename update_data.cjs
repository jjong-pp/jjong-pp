const fs = require('fs');
let data = fs.readFileSync('src/data/projectsData.ts', 'utf8');

// Remove aptamil-recall project
data = data.replace(/'aptamil-recall': `[\s\S]*?`\s*,?\s*/g, '');

// Append blog project
data += `
projectsFullMarkdown['blog'] = \`# 1. GitHub Pages 배포 아키텍처 전환
---
### 기존 환경의 한계 (Vite SPA)
- 기존 Vite + React (SPA) 환경은 라우팅 시 index.html 하나만 서빙하는 구조.
- GitHub Pages는 SPA 라우팅을 기본 지원하지 않아, 새로고침 시 404 에러가 발생하는 고질적 문제 존재.
- 404.html을 활용한 우회 방식(Hash Router 등)은 SEO(검색엔진 최적화)에 취약하며 사용자 경험 저하.

### 해결 방안: Next.js (Static Export) 도입
- React 기반이므로 문법이 호환되어 마이그레이션이 용이.
- Next.js의 SSG(Static Site Generation) 기능을 활용하여 output: 'export' 설정 시, 빌드 타임에 모든 라우팅 경로에 맞는 실제 정적 HTML 파일을 생성.
- GitHub Pages의 정적 호스팅 특성과 100% 부합하여 새로고침 시 404 에러 원천 차단.

### 핵심 전환 포인트
- next.config.js의 output: 'export' 설정.
- 동적 라우팅([id].tsx)의 경우, generateStaticParams(App Router) 또는 getStaticPaths(Pages Router)를 활용해 빌드 타임에 생성할 경로를 미리 정의.
- 이미지 등의 정적 자산 경로 최적화 (Base path 설정).

# 2. 결과 및 성과
---
- 완벽한 정적 페이지 생성으로 SEO 스코어 대폭 향상.
- 404 우회 스크립트 제거로 페이지 로드 속도 15% 개선.
- GitHub Actions를 연동한 CI/CD 자동화 구축 (Push 시 자동 빌드 및 배포).
\`;
`;

fs.writeFileSync('src/data/projectsData.ts', data);
