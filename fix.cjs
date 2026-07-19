const fs = require('fs');

let content = fs.readFileSync('src/pages/ProjectDetail.tsx', 'utf8');

// 1. Remove duplicate declarations of Suspense, lazy, MDXProvider, allArticles from anywhere
content = content.replace(/import \{ useEffect, useRef, Suspense, lazy \} from 'react';\nimport \{ MDXProvider \} from '@mdx-js\/react';\nimport \{ allArticles \} from 'content-collections';\n/g, '');
// Re-insert them cleanly at top
content = "import { useEffect, useRef, Suspense, lazy } from 'react';\nimport { MDXProvider } from '@mdx-js/react';\nimport { allArticles } from 'content-collections';\n" + content;

// 2. Fix articleItem declaration and MdxComponent
content = content.replace(/const articleItem = allArticles\.find\(\(a: any\) => a\._meta\.path === id\);/g, '');
content = content.replace(/const projectItem = projects\.find\(p => p\.id === id\);\n/g, 
  "const projectItem = projects.find(p => p.id === id);\n  const articleItem = allArticles.find(a => a._meta.path === id);\n");

content = content.replace(/const mainTitle = projectItem \? \(typeof projectItem\.title === 'string' \? projectItem\.title : projectItem\.title\.KR\) : 'Project Details';/g,
  "const mainTitle = projectItem ? (typeof projectItem.title === 'string' ? projectItem.title : projectItem.title.KR) : (articleItem ? articleItem.title : 'Project Details');\n  const mdxModules = import.meta.glob('../content/articles/*.mdx');\n  const importFn = mdxModules[`../content/articles/${id}.mdx`];\n  const MdxComponent = importFn ? lazy(importFn as any) : null;");

// 3. Fix useEffect dependency
content = content.replace(/, \[markdownContent, theme\]\);/g, ", [markdownContent, theme, MdxComponent]);");

// 4. Fix JSX rendering
content = content.replace(/<ReactMarkdown/g, "{MdxComponent ? (\n              <Suspense fallback={<AppleFallback />}>\n                <MDXProvider components={components}>\n                  <MdxComponent />\n                </MDXProvider>\n              </Suspense>\n            ) : (\n              <ReactMarkdown");
content = content.replace(/<\/ReactMarkdown>/g, "</ReactMarkdown>\n            )}");

fs.writeFileSync('src/pages/ProjectDetail.tsx', content);
