const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'projectsData.ts');
let content = fs.readFileSync(filePath, 'utf-8');

// 기사 생산성 관련된 항목들 삭제
// 1. Mermaid 노드 내용이나 리스트 안에 있는 텍스트
content = content.replace(/.*기사 생산성.*\n?/g, '');
// 2. Mermaid 안에 남아있을 수 있는 다른 생산성 관련
content = content.replace(/.*"생산성 14%↑".*\n?/g, '');

fs.writeFileSync(filePath, content, 'utf-8');
console.log('기사 생산성 관련 내용 완전 삭제 완료');
