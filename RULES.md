# Brand Page 프로젝트 규칙 및 패턴

## 포지셔닝 (2026-08 확정)

**"비효율을 발견하면 프로젝트로 만드는 PM"**

- 직무는 **IT 기획 / 서비스 기획 / PM**. SCM 은 도메인이자 문제를 발견한 '근거'로만 등장시킨다.
- 프로젝트 서술은 항상 `발견한 비효율 → 한 일 → 결과 → 무엇을 세어 측정했나` 순서.
- 규제 대응(관세법 개정)처럼 **먼저 읽고 먼저 제안한** 사례를 가장 앞에 둔다.
- 스킬 태그는 1~2단어로 압축한다. (`IT기획` `규제대응` — `Architecture & API Design` 같은 긴 영문구 금지)

## 🛑 절대 반복 금지

1. **`index.css` 에 레이어 없는 `* { margin:0; padding:0 }` 금지.**
   Tailwind v4 유틸리티는 `@layer utilities` 안에 있고 레이어 없는 규칙이 항상 이긴다.
   과거 이 5줄 때문에 앱 전체의 `p-*` / `m-*` 이 전부 무효화돼 "여백이 없다"는 증상이 광범위하게 발생했다.
   동일한 리셋은 Tailwind preflight 가 base 레이어에서 이미 수행한다.
2. **slugify 에서 한글을 지우지 말 것.** `[^\w\-]` 는 한글을 전부 날려 모든 heading id 가 `-` 하나로
   붕괴한다. `src/lib/slug.ts` 의 구현(가-힣, ㄱ-ㆎ 보존)을 쓴다.
3. **heading id 를 렌더 함수 안의 카운터로 매기지 말 것.** StrictMode 이중 렌더로 순번이 두 배가 된다.
   `Markdown.tsx` 의 rehype 플러그인처럼 **파싱 시점**에 확정한다.
4. **mermaid 를 DOM 직접 조작으로 그리지 말 것.** React 가 리렌더하면 삽입한 SVG 를 지운다.
   `MermaidDiagram.tsx` 처럼 `mermaid.render()` 결과를 state 로 들고 React 가 소유하게 한다.
5. **마크다운 이미지에 `<figure>` 사용 금지.** 이미지는 `<p>` 안에 오는 경우가 많은데
   `<figure>` 는 `<p>` 의 자손이 될 수 없다. span 기반으로 감싼다.
6. **이미지 비율 왜곡 금지.** 정사각 썸네일을 가로로 긴 박스에 `object-cover` 로 끼우면 대부분이 잘린다.
   원본 비율(`aspect-square`)을 유지한다.
7. **상업 랜딩 룩 금지.** 큰 사진 위 흰 글씨 오버레이 카드 지양. 타이포그래피 + 얇은 구분선 + 넉넉한 여백.
8. **콘텐츠 임의 축약 금지.** 상세 문서의 기획 배경·성과 텍스트는 원본을 유지하고 CSS 만 입힌다.

## 🟢 유지할 패턴

1. **단일 중앙 컬럼(max-w-1080)** — 홈과 상세가 같은 폭·같은 여백 규칙을 쓴다.
   (과거 SplitLayout 은 상세 진입 시 사이드바를 width 0 으로 접어 레이아웃이 통째로 바뀌었고,
   사이드바를 데스크탑/모바일용으로 DOM 에 두 번 렌더해 h1 과 프로필 이미지가 중복이었다.)
2. **페이지당 h1 은 정확히 1개.** 본문 마크다운의 heading 레벨은 `prepareBody()` 가 정규화한다.
3. **테마/언어는 localStorage 에 저장**하고, 테마 초기값은 `prefers-color-scheme` 를 따른다.
   첫 페인트 깜빡임은 `index.html` 인라인 스크립트로 막는다.
4. 색상은 전부 CSS 변수(`--text-primary`, `--accent-color` …)로. 하드코딩 금지.
   라이트/다크 양쪽에서 본문 대비 4.5:1 이상을 유지한다.

## 아키텍처

```
src/data/profile.ts        ← 사이트 콘텐츠의 단일 소스 (포지셔닝/프로젝트/경력/학력)
src/data/projectsData.ts   ← 프로젝트 상세 본문(마크다운)만
src/content/articles/*.mdx ← 학습 노트 원문
  └ content-collections → src/data/notes.ts (noteSlugs 로 노출 대상 선별)
src/lib/markdown.ts        ← 본문 전처리(수평선 복구, h1 정리, heading 레벨 정규화)
src/lib/slug.ts            ← 한글 안전 slugify
src/components/Markdown.tsx ← 공용 마크다운 렌더러 (상세 페이지 공통)
```

- `.mdx` 를 컴포넌트로 import 하는 곳은 없다. 그래서 `@mdx-js/rollup` 플러그인은 vite 설정에서 제거했다.
- 상세 라우트는 `React.lazy` 로 분리한다. mermaid/react-markdown 이 초기 번들에 들어가면 홈이 느려진다.

## 기록

- **2026-08-08**: UI 붕괴 원인 규명(`*` 리셋) 및 전면 수정. 정보구조를 PM 포지셔닝으로 재설계.
  죽은 코드 제거(사이드바/SplitLayout/home 컴포넌트/정리 스크립트 17개/blogList).
  도달 불가였던 학습 노트 4편을 'Studying' 섹션으로 복구. 초기 번들 892KB → 386KB.
