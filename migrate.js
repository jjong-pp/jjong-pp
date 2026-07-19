import fs from 'fs';
import path from 'path';

// A simple script to extract blogList and blogFullMarkdown from projectsData.ts
// Since it's a TS file, we'll read it as a string, extract the JSON-like structures.
// Wait, an easier way is to just use a regular expression or eval if we clean it up,
// or I can just write the 4 known articles manually since there are only 4.

const data = fs.readFileSync(path.join(process.cwd(), 'src/data/projectsData.ts'), 'utf-8');

// Extract blogList
const listMatch = data.match(/export const blogList = (\[[\s\S]*?\]);/);
const markdownMatch = data.match(/export const blogFullMarkdown: Record<string, string> = (\{[\s\S]*?\});/);

if (listMatch && markdownMatch) {
  let list;
  let markdownDict;
  try {
    // using eval because it contains unquoted keys or JS syntax
    eval('list = ' + listMatch[1]);
    eval('markdownDict = ' + markdownMatch[1]);
  } catch (e) {
    console.error('Eval error', e);
  }

  const articlesDir = path.join(process.cwd(), 'src/content/articles');
  if (!fs.existsSync(articlesDir)) {
    fs.mkdirSync(articlesDir, { recursive: true });
  }

  list.forEach(item => {
    const id = item.id;
    const title = item.title.KR || item.title.EN;
    const description = (item.description.KR || item.description.EN || '').replace(/\n/g, ' ');
    const role = item.role || 'Tech Article';
    const date = item.period || '2026.07';
    const content = markdownDict[id] || '';

    const frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
description: "${description.replace(/"/g, '\\"')}"
date: "${date}"
role: "${role}"
---
`;
    const mdxContent = frontmatter + content;
    fs.writeFileSync(path.join(articlesDir, `${id}.mdx`), mdxContent);
    console.log(`Created ${id}.mdx`);
  });
} else {
  console.log('Could not find blogList or blogFullMarkdown');
}
