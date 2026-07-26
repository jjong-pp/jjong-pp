const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'projectsData.ts');
let content = fs.readFileSync(filePath, 'utf-8');

// tms 섹션 끝 부분에 Reference 및 스크린샷 추가
const referenceContent = `

## Reference
[GitHub Repository](https://github.com/jonghyeok-dev/tms) 
[Live Dashboard](https://tms.jonghyeok.dev)

![TMS 대시보드 및 시스템 아키텍처](/assets/tms_thumbnail.png)
\`;`;

// 기존 tms 데이터 닫는 백틱(`;) 부분을 찾아서 치환
content = content.replace(/projectsFullMarkdown\['blog'\] = /g, (match) => {
  return referenceContent + '\n\n' + match;
});

// 혹시 tms 마크다운의 끝을 제대로 못 찾을까봐 안전하게 `projectsFullMarkdown['blog']` 바로 앞 부분을 타겟팅했습니다.
// (tms 마크다운이 끝나고 blog 마크다운이 시작되는 부분)

fs.writeFileSync(filePath, content, 'utf-8');
console.log('TMS 레퍼런스(스크린샷, 링크) 추가 완료');
