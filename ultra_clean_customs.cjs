const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'projectsData.ts');
let content = fs.readFileSync(filePath, 'utf-8');

// 1. 관세청 데이터 특정 마스킹 (지명, 업체명)
content = content.replace(/중국 옌타이/g, '해외 창고');
content = content.replace(/중국 인천/g, '해외 창고');
content = content.replace(/인천/g, '국내 통관장'); 
content = content.replace(/일양 로지스/g, '해외 3PL');
content = content.replace(/일양로지스/g, '해외 3PL');

// 2. 이모지 삭제 (관세청에 쓰였을 법한 로켓, 로봇, 전구 등)
const emojisToRemove = /🚀|🤖|💡|📊|🎯|🔄|⚙️|📋|✅|📈|📉|📝|🗣️|🛠️|📦|🚚/g;
content = content.replace(emojisToRemove, '');

// 3. 리드자 참고 내용 삭제
// `> 💬 **[리드자 참고]**` 로 시작하는 블록을 찾아서 완전히 삭제.
content = content.replace(/> 💬 \[리드자 참고\][\s\S]*?(?=\n\n|\n#{1,3} |\n- )/g, ''); 
// 혹시 ** 가 삭제되어서 `> 💬 [리드자 참고]` 일 수도 있으므로 위 정규식은 볼드를 뺐음. (이전에 볼드를 지웠기 때문)

// 4. 고정 파라미터 내용 삭제
// "고정 파라미터" 키워드가 포함된 테이블이나 항목 삭제
content = content.replace(/## 고정 파라미터[\s\S]*?(?=\n## |\n# )/g, '');
content = content.replace(/- 고정 파라미터[\s\S]*?(?=\n- |\n## |\n# )/g, '');

// 5. "8, 9번 내용" 삭제
// 마크다운 헤딩 또는 번호 리스트에 있는 8번, 9번 섹션 통째로 날림
// "## 8. " 혹은 "### 8. " 로 시작하는 경우 
content = content.replace(/\n#* 8\. [\s\S]*?(?=\n#* 9\. |\n#* 10\. |\n#* 1\. |\n\n\n|$)/g, '');
content = content.replace(/\n#* 9\. [\s\S]*?(?=\n#* 10\. |\n#* 1\. |\n\n\n|$)/g, '');

// 6. "1.2. 기초 정보" 내용 삭제
content = content.replace(/\n#* 1\.2\.? 기초 정보[\s\S]*?(?=\n#* 1\.3 |\n#* 2\. |\n#* 1\. |\n\n\n)/g, '');

fs.writeFileSync(filePath, content, 'utf-8');
console.log('초정밀 관세청 잔재 데이터 및 이모지 삭제 완료');
