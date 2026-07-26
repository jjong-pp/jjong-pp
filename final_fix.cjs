const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'projectsData.ts');
let content = fs.readFileSync(filePath, 'utf-8');

// 1. 민감 정보 치환 (clean_sensitive_data & clean_sensitive_data3 내용 통합)
// 금액 치환
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

// 2. TMS 레퍼런스 추가 (기존 안내문구를 진짜 링크와 이미지로 치환)
content = content.replace(/GitHub Repository, 대시보드 실제 스크린샷을 추가해 주세요\./g, 
`## Reference
[GitHub Repository](https://github.com/jonghyeok-dev/tms) 
[Live Dashboard](https://tms.jonghyeok.dev)

![TMS 대시보드 스크린샷](/assets/tms_thumbnail.png)`);

content = content.replace(/이딴거 지워/g, ''); // 혹시 남아있을 사용자의 잔재 텍스트 지움

// 3. 마크다운 내 깨진 애스터리스크 하드코딩 안전 치환
const badLines = [
  { bad: '- **파편화된 엑셀 → 단일 DB 통합  **대규모 데이터의 실시간 연산 및 시각화**', good: '- 파편화된 엑셀 → 단일 DB 통합 : 대규모 데이터의 실시간 연산 및 시각화' },
  { bad: '- **파편화된 엑셀 → 단일 DB 통합  **수만 건 데이터의 실시간 연산 및 시각화**', good: '- 파편화된 엑셀 → 단일 DB 통합 : 수만 건 데이터의 실시간 연산 및 시각화' },
  { bad: '- **수요 예측 기반 선제적 발주 체계  **품절/과재고 리스크 사전 방어**', good: '- 수요 예측 기반 선제적 발주 체계 : 품절/과재고 리스크 사전 방어' },
  { bad: '- **수기 엑셀 업무 제거  **정해진 양식 업로드만으로 즉시 데이터화·시뮬레이션**', good: '- 수기 엑셀 업무 제거 : 정해진 양식 업로드만으로 즉시 데이터화·시뮬레이션' },
  { bad: '- **거래명세서  **수기 → 실시간 자동 발송**  \\|  24시간 즉시 발송', good: '- 거래명세서 : 수기 → 실시간 자동 발송 \\| 24시간 즉시 발송' },
  { bad: '- **주문 확인·출고 업무  **83% 단축**  \\|  팀원 2명 × 일 30분 → 5분', good: '- 주문 확인·출고 업무 : 83% 단축 \\| 팀원 2명 × 일 30분 → 5분' },
  { bad: '- **월 정산  **100% 자동화**  \\|  월 1~2일 수기 → 0일. 정산, 분석 등 데이터 즉시 추출', good: '- 월 정산 : 100% 자동화 \\| 월 1~2일 수기 → 0일. 정산, 분석 등 데이터 즉시 추출' },
  { bad: '- **결제-출고 정책 전환  **변수 원천 차단**  \\|  담당자 재량 → 시스템 강제. 미수금·정산 불일치 제거', good: '- 결제-출고 정책 전환 : 변수 원천 차단 \\| 담당자 재량 → 시스템 강제. 미수금·정산 불일치 제거' },
  { bad: '- **메시징 비용  **80% 절감**  \\|  LMS 3.0P → 알림톡 0.6P', good: '- 메시징 비용 : 80% 절감 \\| LMS 3.0P → 알림톡 0.6P' },
  { bad: '- **PG 수수료  **0원**  \\|  마진 구조 보전을 위한 결제 체계 설계', good: '- PG 수수료 : 0원 \\| 마진 구조 보전을 위한 결제 체계 설계' }
];

badLines.forEach(({ bad, good }) => {
  content = content.replace(bad, good);
});

fs.writeFileSync(filePath, content, 'utf-8');
console.log('최종 픽스 완료 (민감정보 삭제, TMS 스크린샷 추가, 애스터리스크 삭제)');
