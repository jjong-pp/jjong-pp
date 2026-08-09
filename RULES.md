# Brand Page 규칙

## 이건 이력서다

- **대외비 금지.** 협력사·솔루션·브랜드 실명, 계약 단가, 예산 금액을 쓰지 않는다.
  역할명으로 적는다: `본인인증 기관`, `통관 파트너사 API`, `자사 브랜드몰`, `커머스 솔루션`, `고객사 ERP`.
  새 문서를 넣기 전 반드시 실명이 남아 있는지 검사한다.
- **말투는 담백한 '~습니다' 체.** 과장·수식어·구어체를 넣지 않는다.
  ("산업을 개편한다", "~하는 편이죠" 같은 표현 금지)
- **정량 성과 옆에는 measure 를 붙인다.** 무엇을 세어 확인했는지 없으면 숫자를 쓰지 않는다.
- **GitHub 링크는 넣지 않는다.** 외부 링크는 기술 블로그만 둔다.

## 화면 구성

```
소개 (이름·헤드라인·소개문·태그·연락)
이력 (경력 → 학력)
프로젝트 (비효율 → 결과 → 측정)
```

- 이 순서를 바꾸지 않는다. '일하는 방식', '공부하는 것' 같은 섹션은 두지 않는다.
- 학습 노트는 사이트에 싣지 않고 기술 블로그로 보낸다.

## 절대 반복 금지 (전부 실제로 사이트를 망가뜨린 적 있음)

1. **`index.css` 에 레이어 없는 `* { margin:0; padding:0 }` 금지.**
   Tailwind v4 유틸리티는 `@layer utilities` 안에 있어 레이어 없는 규칙에 항상 진다.
   이 5줄 때문에 앱 전체의 `p-*` / `m-*` 이 무효화됐다. 같은 리셋은 preflight 가 이미 한다.
2. **slugify 에서 한글을 지우지 말 것.** `[^\w\-]` 는 한글을 전부 날려 heading id 가 `-` 하나로 붕괴한다.
   `src/lib/slug.ts` 구현(가-힣, ㄱ-ㆎ 보존)을 쓴다.
3. **heading id 를 렌더 함수 안 카운터로 매기지 말 것.** StrictMode 이중 렌더로 순번이 두 배가 된다.
   `Markdown.tsx` 의 rehype 플러그인처럼 파싱 시점에 확정한다.
4. **mermaid 를 DOM 직접 조작으로 그리지 말 것.** React 리렌더가 삽입된 SVG 를 지운다.
   `MermaidDiagram.tsx` 처럼 `mermaid.render()` 결과를 state 로 들고 React 가 소유하게 한다.
5. **마크다운 이미지에 `<figure>` 사용 금지.** 이미지는 `<p>` 안에 오는데 `<figure>` 는 `<p>` 의 자손이 될 수 없다.
6. **본문에 원시 HTML + 인라인 SVG 로 링크 박스를 만들지 말 것.** 혼자 튄다.
   외부 참고자료는 그냥 마크다운 링크로 쓰면 `Markdown.tsx` 가 공통 멘션태그로 렌더한다.
7. **정사각 썸네일을 가로로 긴 박스에 `object-cover` 로 넣지 말 것.** 대부분이 잘린다.

## 디자인 통일

- 링크·연락처·참고자료는 전부 `LinkTag`(둥근 테두리 pill) 한 가지를 쓴다.
- 키워드는 `Tag`. 색상은 전부 CSS 변수. 하드코딩 금지.
- 라이트/다크 양쪽에서 본문 대비 4.5:1 이상 유지. (현재 라이트 4.91 / 다크 5.06)
- 페이지당 h1 은 정확히 1개. 본문 heading 레벨은 `prepareBody()` 가 정규화한다.

## 구조

```
src/data/profile.ts        소개·이력·학력·프로젝트 메타 (콘텐츠 단일 소스)
src/data/projectsData.ts   프로젝트 상세 본문 마크다운
src/lib/markdown.ts        본문 전처리 (수평선 복구, h1 정리, heading 레벨 정규화)
src/lib/slug.ts            한글 안전 slugify
src/components/            LinkTag · Markdown · MermaidDiagram · SiteNav · SiteFooter · Logo
src/layouts/PageShell.tsx  nav + 중앙 컬럼(max-w-1080) + footer
src/pages/                 Home · ProjectDetail(lazy)
```

## 기록

- **2026-08-08** UI 붕괴 원인(`*` 리셋) 규명 및 전면 수정. PM 포지셔닝으로 정보구조 재설계.
- **2026-08-09** 이력서 기준으로 재정비. 대외비 45건 익명화, GitHub 링크 전량 삭제,
  '일하는 방식'·'공부하는 것' 섹션 제거, 링크 디자인 통일, MDX/content-collections 파이프라인 제거.
  초기 번들 892KB → 261KB.
