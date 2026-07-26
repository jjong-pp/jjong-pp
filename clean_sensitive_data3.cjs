const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'projectsData.ts');
let content = fs.readFileSync(filePath, 'utf-8');

// 금액 라인 통째로 수정
content = content.replace(/\| 계약 총액 \| ₩[0-9,]+ \(부가세 별도\) — 1차 ₩[0-9,]+ \+ 2차 ₩[0-9,]+ \|/g, '| 계약 총액 | 대외비 |');
content = content.replace(/₩[0-9,]+/g, '대외비');

// 이름 및 업체 마스킹
const replacements = [
  { target: /강명제 팀장, 김동섭 엔지니어/g, replacement: '담당 엔지니어' },
  { target: /공부장, 안과장/g, replacement: '현지 담당자' },
  { target: /김현진 연구원/g, replacement: '담당 연구원' },
  { target: /박종혁 리드/g, replacement: 'PM 담당자' },
  { target: /긱스튜디오/g, replacement: '파트너 개발사' },
  { target: /Geek/gi, replacement: '공식몰' },
  { target: /옌타이 동수 \(Dongshu\)/g, replacement: '현지 창고' },
  { target: /동수/g, replacement: '현지 창고' },
  { target: /Dongshu/g, replacement: '현지 창고' },
  { target: /일양로지스/g, replacement: '특송사' },
  { target: /Giant/g, replacement: '해외 3PL' },
  { target: /뉴트리시아/g, replacement: 'A브랜드' }
];

replacements.forEach(({ target, replacement }) => {
  content = content.replace(target, replacement);
});

fs.writeFileSync(filePath, content, 'utf-8');
console.log('추가 민감 정보 마스킹 완료');
