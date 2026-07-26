const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'projectsData.ts');
let content = fs.readFileSync(filePath, 'utf-8');

// 1. 리드자 참고 줄 전체 삭제
content = content.replace(/^.*💬 \[리드자 참고\].*$/gm, '');

// 2. IP 주소 삭제
content = content.replace(/103\.87\.116\.64/g, '[IP Masked]');

// 3. 특정 에러 코드 및 디테일한 API 명 추상화
content = content.replace(/TRA001/g, '데이터 연동 API');
content = content.replace(/TRA003/g, '결과 확인 API');
content = content.replace(/PER001/g, '사전 검증 API');
content = content.replace(/3170 에러/g, '네트워크 타임아웃 오류');
content = content.replace(/3000 에러/g, '데이터 검증 오류');

// 4. 연속된 빈 줄 정리
content = content.replace(/\n\s*\n\s*\n/g, '\n\n');

fs.writeFileSync(filePath, content, 'utf-8');
console.log('projectsData.ts 보안 필터링 완료');
