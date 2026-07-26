const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'projectsData.ts');
let content = fs.readFileSync(filePath, 'utf-8');
const original = content;

// ========================================
// 1. 관세청 프로젝트: 섹션 8, 9, 10 통째로 삭제
// ========================================
// "## 8. 개발사 (Geek Studio) 시연 항목" 부터 "## 10. 고정 파라미터 레퍼런스" 테이블 끝까지 전부 삭제
// 시작: "## 8." 으로 시작하는 줄
// 끝: "| qtyUnit | EA | 고정 |" 이후 "---" 까지

// 라인 단위로 작업
const lines = content.split('\n');
let inDeleteZone = false;
let deleteStart = -1;
let deleteEnd = -1;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  // 섹션 8 시작 감지
  if (line.startsWith('## 8.') && line.includes('개발사')) {
    inDeleteZone = true;
    // 바로 위의 "---" 도 함께 삭제
    deleteStart = (i > 0 && lines[i-1].trim() === '---') ? i - 1 : i;
  }
  // 섹션 10 끝 감지: "리드자 참고" 줄 또는 그 다음 줄
  if (inDeleteZone && line.includes('리드자 참고') && line.includes('이 문서의')) {
    deleteEnd = i;
    inDeleteZone = false;
  }
}

if (deleteStart >= 0 && deleteEnd >= 0) {
  lines.splice(deleteStart, deleteEnd - deleteStart + 1);
  console.log(`섹션 8, 9, 10 삭제 완료 (${deleteStart}~${deleteEnd}줄)`);
}
content = lines.join('\n');

// ========================================
// 2. 리드자 참고 전부 삭제
// ========================================
content = content.replace(/^.*리드자 참고.*\n?/gm, '');
console.log('리드자 참고 라인 삭제 완료');

// ========================================
// 3. 민감 업체명/인명/지명 마스킹
// ========================================
// 동수 → 현지 창고 / 해외 물류 창고
content = content.replace(/동수 WMS/g, '현지 창고 WMS');
content = content.replace(/동수 창고/g, '현지 창고');
content = content.replace(/동수 테스트/g, '현지 창고 테스트');
content = content.replace(/동수/g, '현지 창고');

// 일양로지스 / 일양 로지스
content = content.replace(/일양로지스/g, '해외 3PL');
content = content.replace(/일양 로지스/g, '해외 3PL');

// 자이언트네트워크그룹 / 자이언트 → 통관 파트너사
content = content.replace(/자이언트네트워크그룹/g, '통관 파트너사');
content = content.replace(/자이언트/g, '통관 파트너사');

// DONGSHU E-BUSINESS → 해외 현지 창고
content = content.replace(/DONGSHU E-BUSINESS/g, '해외 현지 창고');
content = content.replace(/DONGSHU/g, '해외 현지 창고');

// 중국 옌타이 → 해외 창고
content = content.replace(/중국 옌타이/g, '해외 창고');

// "중국" 단독 → 해외 (단, "중국 현지 창고" 이미 치환되었으므로 안전)
content = content.replace(/중국 물류창고/g, '해외 물류창고');
content = content.replace(/중국 현지 창고/g, '해외 현지 창고');
content = content.replace(/중국에서/g, '해외 창고에서');
content = content.replace(/중국 →/g, '해외 창고 →');

// Geek Studio → 파트너 개발사
content = content.replace(/Geek Studio/g, '파트너 개발사');

// 실명 마스킹: 신용철 매니저 → 담당 매니저
content = content.replace(/신용철 매니저/g, '담당 매니저');

// 업체부호 값 마스킹
content = content.replace(/K26000127/g, 'KXXXXXXXXX');

// ========================================
// 4. 1.2 기초 정보 섹션 삭제
// ========================================
// "### 1.2 기초 정보" ~ "### 1.3 참여 업체" 사이
const lines2 = content.split('\n');
let basicInfoStart = -1;
let basicInfoEnd = -1;
for (let i = 0; i < lines2.length; i++) {
  if (lines2[i].includes('### 1.2 기초 정보')) {
    basicInfoStart = i;
  }
  if (basicInfoStart >= 0 && lines2[i].includes('### 1.3 참여 업체')) {
    basicInfoEnd = i;
    break;
  }
}
if (basicInfoStart >= 0 && basicInfoEnd > basicInfoStart) {
  lines2.splice(basicInfoStart, basicInfoEnd - basicInfoStart);
  // 1.3을 1.2로 리넘버링
  for (let i = 0; i < lines2.length; i++) {
    if (lines2[i].includes('### 1.3 참여 업체')) {
      lines2[i] = lines2[i].replace('### 1.3 참여 업체', '### 1.2 참여 업체');
      break;
    }
  }
  console.log('1.2 기초 정보 삭제 완료');
}
content = lines2.join('\n');

// ========================================
// 5. 이모지 삭제
// ========================================
const emojisToRemove = /🚀|🤖|💡|📊|🎯|🔄|⚙️|📋|✅|📈|📉|📝|🗣️|🛠️|📦|🚚|💬|⏳|📅/g;
content = content.replace(emojisToRemove, '');
console.log('이모지 삭제 완료');

fs.writeFileSync(filePath, content, 'utf-8');
console.log('전체 대외비 클렌징 완료!');
console.log(`원본 크기: ${original.length} → 클렌징 후: ${content.length} (${original.length - content.length}바이트 삭제됨)`);
