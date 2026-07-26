const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'projectsData.ts');
let content = fs.readFileSync(filePath, 'utf-8');

const replacementMarkdown = `\`\`\`javascript
  'customs-api': \`# 전자상거래 통관플랫폼 연동 자동화
## 1. 프로젝트 배경 및 문제 정의
새로운 통관 규제 도입에 따라, 전자상거래 주문 발생 시 거래 정보를 실시간으로 통관 플랫폼에 전송해야 하는 의무가 신설되었습니다.
기존의 파편화된 물류 및 결제 시스템으로는 실시간 데이터를 안정적으로 규격에 맞춰 전송할 수 없었으며, 이를 해결하기 위한 중앙 통합 아키텍처가 필요했습니다.

## 2. 해결 방안: API 통합 미들웨어 구축
각기 다른 시스템(쇼핑몰 프론트, 결제 시스템, 해외 배송사, 관세법인 등) 간의 직접 연동(N:N)을 피하고, 
데이터를 한 곳에서 수집·정제·검증하여 통관 플랫폼으로 안전하게 전송하는 **API 통합 미들웨어(1:N)**를 기획했습니다.

- **데이터 파이프라인 일원화**: 파편화된 주문, 결제, 물류 데이터를 미들웨어에서 취합
- **암호화 및 보안**: 민감한 고객 개인정보 및 결제 정보를 자체 암호화하여 외부 유출 원천 차단
- **에러 핸들링 및 재시도**: 네트워크 장애나 전송 실패 시 큐(Queue)를 활용한 자동 재시도 및 실패 내역 모니터링 로직 설계

## 3. 주요 성과
- 다자간 복잡한 연동 구조를 중앙 집중형으로 단순화하여 **전체 개발 기간 및 비용 대폭 단축**
- 에러 자동 감지 및 재처리 프로세스 도입으로 통관 지연 방지
- 외부 파트너사들과의 데이터 통신 규격을 표준화하여 확장성 확보
\`,
\`\`\``;

// 정규식을 사용해 'customs-api': `# ... (다음 프로젝트 또는 파일 끝까지) 부분을 덮어씌운다.
// 단, 'scm-dashboard' 등 다른 프로젝트가 시작되기 전까지만 치환해야 하므로 정교한 정규식이 필요.
content = content.replace(/'customs-api':\s*`#[\s\S]*?(?=\n  'scm-dashboard'|\nexport const blogFullMarkdown)/, replacementMarkdown.replace(/```javascript\n|\n```/g, ''));

fs.writeFileSync(filePath, content, 'utf-8');
console.log('customs-api 내용 추상화 및 일반화 완료');
