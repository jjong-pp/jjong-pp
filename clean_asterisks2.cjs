const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'projectsData.ts');
let content = fs.readFileSync(filePath, 'utf-8');

// 1. 요청받은 안내 텍스트 삭제
content = content.replace(/GitHub Repository, 대시보드 실제 스크린샷을 추가해 주세요\./g, '');
content = content.replace(/이딴거 지워/g, '');

// 2. projectsFullMarkdown 하위의 마크다운 문자열 내부에서만 애스터리스크(**) 삭제 (TS 문법 파괴 방지)
content = content.replace(/(projectsFullMarkdown\['[^']+'\] = `)([\s\S]*?)(`;)/g, (match, prefix, markdownBody, suffix) => {
  // 마크다운 내용 중 ** 전부 삭제 (볼드체 강조를 일반 텍스트로 평탄화)
  const cleanedMarkdown = markdownBody.replace(/\*\*/g, '');
  return prefix + cleanedMarkdown + suffix;
});

// 동일하게 blogFullMarkdown도 처리
content = content.replace(/(blogFullMarkdown\['[^']+'\] = `)([\s\S]*?)(`;)/g, (match, prefix, markdownBody, suffix) => {
  const cleanedMarkdown = markdownBody.replace(/\*\*/g, '');
  return prefix + cleanedMarkdown + suffix;
});

fs.writeFileSync(filePath, content, 'utf-8');
console.log('문구 및 마크다운 내부 애스터리스크 완전 삭제 (안전 모드)');
