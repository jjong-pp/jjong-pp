# brandpage

박종혁 개인 포트폴리오. **"비효율을 발견하면 프로젝트로 만드는 PM"** 포지셔닝의 단일 페이지 + 상세 문서 사이트.

## 스택

React 19 · TypeScript · Vite 8 · Tailwind CSS v4 · React Router 7 · content-collections · mermaid

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
| 포지셔닝 문구, 태그, 일하는 방식 | `src/data/profile.ts` |
| 프로젝트 카드(비효율/결과/측정) | `src/data/profile.ts` → `projects` |
| 프로젝트 상세 본문 | `src/data/projectsData.ts` |
| 학습 노트 글 | `src/content/articles/*.mdx` |
| 노트 중 홈에 노출할 것 | `src/data/profile.ts` → `noteSlugs` |
| 경력 · 학력 | `src/data/profile.ts` → `experience`, `education` |

## 구조

```
src/
  data/profile.ts        사이트 콘텐츠 단일 소스
  data/projectsData.ts   프로젝트 상세 마크다운
  data/notes.ts          content-collections → 학습 노트
  lib/markdown.ts        본문 전처리 (수평선 복구, heading 레벨 정규화)
  lib/slug.ts            한글 안전 slugify
  components/Markdown.tsx   공용 마크다운 렌더러
  components/MermaidDiagram.tsx
  layouts/PageShell.tsx  전역 골격 (nav + 중앙 컬럼 + footer)
  pages/Home.tsx         hero / 일하는 방식 / 프로젝트 / 공부하는 것 / 이력
  pages/Detail.tsx       프로젝트·노트 상세 (lazy 로드)
```

작업 전 [RULES.md](RULES.md) 의 "절대 반복 금지" 항목을 먼저 볼 것. 특히 `index.css` 의 전역 리셋과
한글 slugify 는 과거에 사이트 전체를 망가뜨린 이력이 있다.
