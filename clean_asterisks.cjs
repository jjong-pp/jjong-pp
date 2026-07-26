const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'projectsData.ts');
let content = fs.readFileSync(filePath, 'utf-8');

// 1. 요청받은 찌꺼기 텍스트 삭제
content = content.replace(/GitHub Repository, 대시보드 실제 스크린샷을 추가해 주세요\./g, '');
content = content.replace(/이딴거 지워/g, '');

// 2. 중간에 깨진 애스터리스크 삭제
// 사용자가 "애스테릭 이런거 전부 삭제해"라고 했으므로, 리스트 중간에 노출된 `**` 를 모두 제거합니다.
// 예: `- **수기 엑셀 업무 제거  **정해진 양식` -> `- 수기 엑셀 업무 제거 정해진 양식`
content = content.replace(/\*\*/g, '');

fs.writeFileSync(filePath, content, 'utf-8');
console.log('문구 삭제 및 애스터리스크 제거 완료');
