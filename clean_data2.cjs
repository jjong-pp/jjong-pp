const fs = require('fs');
let data = fs.readFileSync('src/data/projectsData.ts', 'utf8');

// Remove empty blocks
data = data.replace(/<empty-block\/>/g, '');

// Replace <br> with newline
data = data.replace(/<br>/gi, '\n');

// Replace <page url="...">text</page> with [text](url)
data = data.replace(/<page url="([^"]+)">([^<]+)<\/page>/g, '[$2]($1)');

// Fix tables: remove colgroup
data = data.replace(/<colgroup>[\s\S]*?<\/colgroup>/g, '');
data = data.replace(/<col[^>]*>/g, '');
data = data.replace(/<td[^>]*>/g, '<td>');

// Replace Notion <callout> with blockquotes
data = data.replace(/<callout[^>]*>([\s\S]*?)<\/callout>/g, '> $1\n');

// Remove <tabs> and <tab> wrappers but keep the content
data = data.replace(/<tabs>/g, '');
data = data.replace(/<\/tabs>/g, '');
data = data.replace(/<tab>/g, '### ');
data = data.replace(/<\/tab>/g, '\n');

// Also remove font tags like <span color="green"> but keep the text
data = data.replace(/<span[^>]*>([\s\S]*?)<\/span>/g, '**$1**');

fs.writeFileSync('src/data/projectsData.ts', data);
