import { allArticles } from 'content-collections';
import { noteSlugs } from './profile';

export type Note = {
  id: string;
  title: string;
  description: string;
  date: string;
  role: string;
  content: string;
};

const byId = new Map(allArticles.map(a => [a._meta.path, a]));

/**
 * Studying 섹션에 노출할 글.
 *
 * src/content/articles/*.mdx 는 content-collections 로 이미 빌드되고 있었지만
 * import 하는 곳이 한 군데도 없어서 화면에서 도달할 수 없는 상태였다.
 * noteSlugs 순서를 그대로 노출 순서로 쓴다. (프로젝트와 중복되는 글은 제외)
 */
export const notes: Note[] = noteSlugs.flatMap(slug => {
  const a = byId.get(slug);
  if (!a) return [];
  return [
    {
      id: a._meta.path,
      title: a.title,
      description: a.description,
      date: a.date,
      role: a.role ?? 'Note',
      content: a.content,
    },
  ];
});

export const getNote = (id: string): Note | undefined => notes.find(n => n.id === id);
