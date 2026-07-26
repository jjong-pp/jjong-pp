const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'projectsData.ts');
let content = fs.readFileSync(filePath, 'utf-8');

// 리드자 참고가 들어간 줄 전체 삭제
content = content.replace(/^.*> 💬 \*\*\[리드자 참고\]\*\*.*\n?/gm, '');

fs.writeFileSync(filePath, content, 'utf-8');
console.log('리드자 참고 라인 완전 제거 성공');
