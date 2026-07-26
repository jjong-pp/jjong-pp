const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'projectsData.ts');
let content = fs.readFileSync(filePath, 'utf-8');

// 1. 리드자 참고 블록 및 단일 라인 전체 삭제 (안전하게 두 가지 패턴 모두 사용)
// 블록 형태 (여러 줄일 수 있음)
content = content.replace(/>\s*💬\s*\[리드자 참고\][\s\S]*?(?=\n\n|\n---|\n#|$)/g, '');
// 단일 라인 형태
content = content.replace(/.*💬\s*\[리드자 참고\].*\n?/g, '');

// 2. 민감한 키워드 및 회사 이름 일반 명사화
const replacements = [
  { target: /고도몰/g, replacement: '자사몰(쇼핑몰)' },
  { target: /자이언트/g, replacement: '해외 3PL 파트너사' },
  { target: /NICE|나이스/g, replacement: '결제/인증 PG사' },
  { target: /롯데택배/g, replacement: '국내 배송사' },
  { target: /DONGSHU E-BUSINESS/g, replacement: '해외 현지 창고' },
  { target: /K26000127/g, replacement: 'A12345678(마스킹)' },
  { target: /신용철 매니저|강승민 대리/g, replacement: '협력사 담당자' },
  { target: /Geek Studio/g, replacement: '파트너 개발사' },
  { target: /10\.222\.\d+\.\d+/g, replacement: '10.x.x.x(보안)' },
  { target: /1,?200만원/g, replacement: '구축/운영 비용' },
  { target: /수만 건/g, replacement: '대규모' },
  { target: /2026\.08\.05/g, replacement: '202X.08.05' },
  { target: /2026\.08\.15/g, replacement: '202X.08.15' },
  { target: /7\/19 기준/g, replacement: '특정 시점 기준' }
];

replacements.forEach(({ target, replacement }) => {
  content = content.replace(target, replacement);
});

// 3. 고정 파라미터 레퍼런스 등 민감한 테이블 내용 마스킹
// 특정 업체부호나 ID 등이 포함된 행들을 마스킹 처리
content = content.replace(/Staging:K26000127 \/ Prod:Null/g, 'Staging:마스킹 / Prod:마스킹');
content = content.replace(/⚠️ 원복필수/g, '환경별 분기 처리 적용');

fs.writeFileSync(filePath, content, 'utf-8');
console.log('민감 정보 치환 완료');
