const fs = require('fs');
let data = fs.readFileSync('src/data/projectsData.ts', 'utf8');

// Remove empty blocks
data = data.replace(/<empty-block\/>/g, '');

// Replace <br> with newline
data = data.replace(/<br>/gi, '\n');

// Replace <page url="...">text</page> with [text](url)
data = data.replace(/<page url="([^"]+)">([^<]+)<\/page>/g, '[$2]($1)');

// Fix tables: remove colgroup to make them responsive.
data = data.replace(/<colgroup>[\s\S]*?<\/colgroup>/g, '');
data = data.replace(/<col[^>]*>/g, '');
// Also remove width properties on td
data = data.replace(/<td[^>]*>/g, '<td>');

fs.writeFileSync('src/data/projectsData.ts', data);
