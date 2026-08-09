# brandpage

박종혁 이력 페이지. **소개 → 이력 → 프로젝트** 한 장 + 프로젝트 상세 문서.

## 스택

React 19 · TypeScript · Vite 8 · Tailwind CSS v4 · React Router 7 · mermaid

## 실행

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build
```

## 콘텐츠 수정하는 곳

| 무엇을 | 어디서 |
| --- | --- |
| 헤드라인·소개문·태그·연락처 | `src/data/profile.ts` → `profile` |
| 경력·학력 | `src/data/profile.ts` → `experience`, `education` |
| 프로젝트 카드 (비효율·결과·측정) | `src/data/profile.ts` → `projects` |
| 프로젝트 상세 본문 | `src/data/projectsData.ts` |

## 구조

```
src/
  data/profile.ts           콘텐츠 단일 소스
  data/projectsData.ts      프로젝트 상세 마크다운
  lib/markdown.ts           본문 전처리
  lib/slug.ts               한글 안전 slugify
  components/LinkTag.tsx    공통 링크·태그 표기
  components/Markdown.tsx   마크다운 렌더러
  components/MermaidDiagram.tsx
  components/SiteNav.tsx  SiteFooter.tsx  Logo.tsx
  layouts/PageShell.tsx     nav + 중앙 컬럼 + footer
  pages/Home.tsx            소개 → 이력 → 프로젝트
  pages/ProjectDetail.tsx   상세 (lazy 로드)
```

작업 전 [RULES.md](RULES.md) 를 먼저 볼 것. 특히 **대외비 표기 규칙**과
`index.css` 전역 리셋 / 한글 slugify 금지 항목은 과거에 실제로 사고가 났던 부분이다.
