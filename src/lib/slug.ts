/**
 * 한글 안전 slugify.
 *
 * 이전 구현은 `[^\w\-]+` 로 걸러서 한글을 전부 삭제했고, 그 결과 모든 한글 heading이
 * id "-" 하나로 붕괴해 목차 링크가 전부 같은 곳으로 점프했다. 한글 음절(가-힣)과
 * 자모(ㄱ-ㆎ)를 명시적으로 보존한다.
 */
export const slugify = (text: string): string => {
  const s = String(text)
    .normalize('NFC')
    .toLowerCase()
    .trim()
    .replace(/^\d+[.)]\s*/, '') // 선행 번호 "1. "
    .replace(/[*_`~]/g, '') // 마크다운 강조 기호
    .replace(/\s+/g, '-')
    .replace(/[^\w\-ㄱ-ㆎ가-힣]+/g, '')
    .replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '');

  return s || 'section';
};

/** 같은 제목이 반복돼도 id가 겹치지 않도록 순번을 붙인다. */
export const uniqueSlug = (text: string, seen: Record<string, number>): string => {
  const base = slugify(text);
  seen[base] = (seen[base] ?? 0) + 1;
  return seen[base] === 1 ? base : `${base}-${seen[base]}`;
};

/** React children(문자열/배열/엘리먼트)에서 순수 텍스트만 뽑아낸다. */
export const extractText = (node: unknown): string => {
  if (node === null || node === undefined || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractText).join('');
  if (typeof node === 'object' && 'props' in (node as any)) {
    return extractText((node as any).props?.children);
  }
  return '';
};

export type Heading = { id: string; text: string; level: number };
