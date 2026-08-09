const FENCE = /^\s*(```|~~~)/;
const HEADING = /^(#{1,6})(\s+)(.*)$/;

/** 코드펜스 밖의 heading 만 골라 콜백에 넘긴다. */
const eachHeading = (lines: string[], fn: (level: number, index: number, match: RegExpExecArray) => void) => {
  let inFence = false;
  lines.forEach((line, i) => {
    if (FENCE.test(line)) {
      inFence = !inFence;
      return;
    }
    if (inFence) return;
    const m = HEADING.exec(line);
    if (m) fn(m[1].length, i, m);
  });
};

/**
 * 정리 스크립트(clean_*.cjs)들이 남긴 마크다운 파손을 렌더 직전에 보정한다.
 * 대표적으로 `---` 수평선이 `- --` 로 깨져 리스트 항목으로 렌더되고 있었다.
 */
export const normalizeMarkdown = (md: string): string => {
  const cleaned = md
    .replace(/\r\n/g, '\n')
    .replace(/^[ \t]*-[ \t]+--[ \t]*$/gm, '---')
    .replace(/\n{4,}/g, '\n\n\n')
    .trim();

  // `---` / `===` 가 빈 줄 없이 문단 바로 아래 붙으면 마크다운은 이를 수평선이 아니라
  // setext 제목으로 읽는다. 그래서 앞 문단 전체가 heading 이 되어 목차에 본문
  // 한 문단이 통째로 올라오고 있었다. 앞에 빈 줄을 넣어 수평선으로 되돌린다.
  const lines = cleaned.split('\n');
  const out: string[] = [];
  let inFence = false;

  lines.forEach(line => {
    if (FENCE.test(line)) inFence = !inFence;
    const isRule = !inFence && /^\s*(-{3,}|={3,})\s*$/.test(line);
    const prev = out[out.length - 1];
    if (isRule && prev !== undefined && prev.trim() !== '') out.push('');
    out.push(line);
  });

  return out.join('\n');
};

/**
 * 문서 제목 역할을 하는 첫 h1 만 제거한다.
 *
 * 페이지 헤더가 이미 같은 제목을 크게 보여주므로 두 번 나오면 안 된다.
 * 다만 어떤 문서는 h1 을 '섹션' 구분자로 쓰기 때문에(`# 1. 문제 정의`, `# 2. …`),
 * h1 이 하나뿐일 때만 제목으로 보고 지운다.
 */
export const stripLeadingH1 = (md: string): string => {
  const lines = md.split('\n');
  let count = 0;
  let firstIndex = -1;
  eachHeading(lines, (level, i) => {
    if (level !== 1) return;
    count += 1;
    if (firstIndex === -1) firstIndex = i;
  });

  if (count !== 1 || firstIndex === -1) return md;

  lines.splice(firstIndex, 1);
  // 제목 바로 뒤에 붙어 있던 빈 줄과 수평선도 함께 정리
  while (lines[firstIndex] !== undefined && lines[firstIndex].trim() === '') lines.splice(firstIndex, 1);
  if (lines[firstIndex] !== undefined && /^-{3,}\s*$/.test(lines[firstIndex])) lines.splice(firstIndex, 1);

  return lines.join('\n').trim();
};

/**
 * 문서마다 제각각인 heading 레벨을 h2 부터 '빈틈 없이' 다시 매긴다.
 *
 * 단순히 최소 레벨만큼 밀면 문서가 쓰지 않은 레벨이 그대로 구멍으로 남는다.
 * 실제로 `#` 와 `###` 만 쓰는 문서들이 h2 + h4 로 렌더돼, 소제목(h4, 16px)이
 * 본문 글씨와 같은 크기가 되면서 위계가 보이지 않았다.
 * 사용된 레벨의 '순위'로 매핑해 h2, h3, h4… 가 연속되게 만든다.
 */
export const normalizeHeadingLevels = (md: string): string => {
  const lines = md.split('\n');
  const used = new Set<number>();
  eachHeading(lines, level => used.add(level));
  if (!used.size) return md;

  const ranks = [...used].sort((a, b) => a - b);
  const mapped = new Map(ranks.map((level, rank) => [level, Math.min(6, 2 + rank)]));

  eachHeading(lines, (level, i, m) => {
    lines[i] = '#'.repeat(mapped.get(level) ?? 2) + m[2] + m[3];
  });

  return lines.join('\n');
};

/**
 * heading 바로 아래에 붙은 수평선을 지운다.
 *
 * 본문이 `# Reference` 다음 줄에 `---` 를 쓰는 스타일인데, h2 는 이미 아래쪽
 * 테두리를 갖고 있어서 제목 밑에 줄이 두 개(테두리 + hr) 겹쳐 보였다.
 * 사이에 빈 줄이 몇 개 있어도 heading 직후면 같은 문제라 함께 처리한다.
 */
export const dropRuleAfterHeading = (md: string): string => {
  const lines = md.split('\n');
  const drop = new Set<number>();
  let inFence = false;

  lines.forEach((line, i) => {
    if (FENCE.test(line)) {
      inFence = !inFence;
      return;
    }
    if (inFence || !HEADING.test(line)) return;

    let j = i + 1;
    while (lines[j] !== undefined && lines[j].trim() === '') j += 1;
    if (lines[j] !== undefined && /^\s*(-{3,}|={3,}|_{3,})\s*$/.test(lines[j])) drop.add(j);
  });

  return lines.filter((_, i) => !drop.has(i)).join('\n');
};

/** 상세 페이지 본문 전처리 파이프라인. */
export const prepareBody = (md: string): string =>
  dropRuleAfterHeading(normalizeHeadingLevels(stripLeadingH1(normalizeMarkdown(md))));
