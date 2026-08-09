/**
 * 사이트 콘텐츠의 단일 소스.
 *
 * 원칙
 * - 이력서다. 담백한 '~습니다' 체를 쓰고 과장·수식어를 넣지 않는다.
 * - 대외비 금지: 협력사·솔루션·브랜드의 실명, 계약 단가, 예산 금액은 쓰지 않는다.
 *   필요하면 '본인인증 기관', '통관 파트너사', '자사 브랜드몰' 처럼 역할명으로 적는다.
 * - 정량 성과 옆에는 무엇을 세어 확인했는지(measure)를 함께 적는다.
 */

export type Bilingual = { KR: string; EN: string };

type Profile = {
  name: Bilingual;
  role: Bilingual;
  headline: Bilingual;
  intro: { KR: string[]; EN: string[] };
  tags: string[];
  contact: { email: string; blog: string };
};

export const profile: Profile = {
  name: { KR: '박종혁', EN: 'JongHyeok Park' },
  role: { KR: 'IT · 서비스 기획자 / PM', EN: 'IT & Service Planner / PM' },

  headline: {
    KR: '비효율을 발견하면,\n프로젝트로 만듭니다.',
    EN: 'When I find friction,\nI turn it into a project.',
  },

  intro: {
    KR: [
      '수기로 굴러가던 업무에서 병목을 찾아 요건으로 정의하고, 외부 개발사와 유관 부서를 조율해 현업이 실제로 쓰는 시스템까지 안착시키는 일을 해 왔습니다.',
      '지시를 기다리기보다 개선 과제를 먼저 찾아 제안해 왔습니다. 관세법 개정처럼 외부에서 들어오는 규제 역시 고시 단계에서 확인해 대응 프로젝트를 수립하고 시행일 전에 완료했습니다.',
      '컴퓨터공학 전공을 살려 개발사와 기능 단위로 이야기합니다. 문서로 합의가 어려운 요건은 AI 코딩 도구를 써서 직접 프로토타입으로 만들어 검증하고, 수요예측 대시보드처럼 사내에서 쓰는 도구는 설계부터 운영까지 직접 맡았습니다.',
      '지금은 AI·데이터과학을 전공하며, 사람이 판단하던 재고·수요 영역을 어디까지 데이터로 옮길 수 있는지를 다음 과제로 보고 있습니다.',
    ],
    EN: [
      'I find bottlenecks in manual workflows, translate them into requirements, and coordinate vendors and stakeholders until the system is actually used in the field.',
      'I prefer to surface improvements rather than wait for them. When a customs law amendment was announced, I read it at the notice stage, proposed the response project, and closed it before the enforcement date.',
      'My computer science background lets me discuss scope with vendors feature by feature. When a requirement is hard to settle on paper, I build the prototype myself with AI coding tools; the demand forecasting dashboard is one I designed and ran end to end.',
      'I am currently studying AI and data science, and my next question is how far the inventory and demand calls people still make by hand can be moved onto data.',
    ],
  },

  tags: ['IT기획', '프로젝트관리', '요구사항정의', 'API연동', '규제대응', '업무자동화', 'AI활용'],

  contact: {
    email: 'jonghp1357@gmail.com',
    blog: 'https://semon-devlog.tistory.com/',
  },
};

export type Experience = {
  company: Bilingual;
  role: Bilingual;
  period: string;
  duration: Bilingual;
  points: Bilingual[];
};

export const experience: Experience[] = [
  {
    company: { KR: '아이베 (EIBE)', EN: 'EIBE' },
    role: { KR: 'SCM팀 · 사원 (물류기획 및 IT 프로세스)', EN: 'SCM Team (Logistics Planning & IT Process)' },
    period: '2025.09 — 재직중',
    duration: { KR: '11개월', EN: '11 mo' },
    points: [
      {
        KR: '현장 업무 흐름을 분석해 정책서·기능정의서(PRD)를 작성하고 운영 이슈를 트래킹했습니다.',
        EN: 'Analyzed field workflows to write policy documents and PRDs, and tracked operational issues.',
      },
      {
        KR: '외주 개발사 과업지시서(SOW)를 작성하고 기능 단위 공수(M/M)를 검토해 개발 중 추가 과금을 방지했습니다.',
        EN: 'Wrote vendor SOWs and reviewed effort estimates per feature to prevent mid-build change-order costs.',
      },
      {
        KR: '대외 기관 연동 프로젝트를 PM으로 총괄해 요구사항 정의부터 5개사 인터페이스 조율, 오픈까지 진행했습니다.',
        EN: 'Led an external-agency integration as PM, from requirements through five-party interface alignment to launch.',
      },
      {
        KR: '수요예측 대시보드와 B2B 커머스 주문·정산 통합 등 백오피스 자동화를 기획했습니다.',
        EN: 'Planned back-office automation including a demand forecasting dashboard and B2B order/settlement integration.',
      },
      {
        KR: '수발주·수입 통관·3PL·재고 정합성 등 SCM 운영을 직접 담당했고, 기획의 문제 정의는 대부분 여기서 나왔습니다.',
        EN: 'Owned day-to-day SCM operations — ordering, import clearance, 3PL and inventory accuracy — which is where most of my problem definitions originated.',
      },
    ],
  },
];

export const education = [
  {
    school: { KR: '고려사이버대학교', EN: 'Korea Cyber University' },
    major: { KR: 'AI·데이터과학부', EN: 'AI & Data Science' },
    period: '2025.02 — 재학중',
    note: { KR: '편입 · 학점 4.1 / 4.5', EN: 'Transfer · GPA 4.1 / 4.5' },
  },
  {
    school: { KR: '부천대학교', EN: 'Bucheon University' },
    major: { KR: '컴퓨터소프트웨어과', EN: 'Computer Software' },
    period: '2019.03 — 2024.02',
    note: { KR: '졸업 · 학점 3.8 / 4.5 · 졸업작품 우수상', EN: 'Graduated · GPA 3.8 / 4.5 · Capstone Award' },
  },
];

export type Project = {
  id: string;
  title: Bilingual;
  summary: Bilingual;
  /** 발견한 비효율 · 리스크 */
  friction: Bilingual;
  /** 결과 */
  outcome: Bilingual;
  /** 결과를 무엇을 세어 확인했는지 */
  measure: Bilingual;
  role: Bilingual;
  period: string;
  tags: string[];
  thumbnail: string;
};

export const projects: Project[] = [
  {
    id: 'customs-api',
    title: {
      KR: '관세법 개정 대응 통관 API 연동',
      EN: 'Customs Clearance API Integration',
    },
    summary: {
      KR: '고시 단계에서 규제를 먼저 읽고, 5개사를 묶어 시행일 전에 대응 시스템을 오픈했습니다.',
      EN: 'Read the regulation at the notice stage and launched a five-party integration before the enforcement date.',
    },
    friction: {
      KR: '전자상거래 물품의 거래정보를 세관에 사전 제출하도록 관세법이 개정됐습니다. 미이행 시 스마트통관에서 제외되어 통관이 지연되고 과태료 대상이 되는 사안이었습니다. 고시 단계에서 이를 확인하고 대응 프로젝트를 먼저 제안했습니다.',
      EN: 'A customs law amendment required pre-submission of e-commerce transaction data. Non-compliance meant losing expedited clearance, delaying shipments and incurring fines. I identified this at the notice stage and proposed the response project.',
    },
    outcome: {
      KR: '시행일 전에 오픈했고, 개정 사유로 인한 통관 보류는 발생하지 않았습니다.',
      EN: 'Launched before the enforcement date, with no clearance holds attributable to the amendment.',
    },
    measure: {
      KR: '오픈 후 통관 보류·반려 건수를 사유 코드별로 집계',
      EN: 'Post-launch clearance holds and rejections, counted by reason code',
    },
    role: { KR: 'PM · 요구사항 정의', EN: 'PM · Requirements' },
    period: '2026.04 — 2026.08',
    tags: ['규제대응', 'API연동', '다자조율'],
    thumbnail: '/assets/customs_api_thumbnail.png',
  },
  {
    id: 'scm-dashboard',
    title: {
      KR: '24주 수요예측 대시보드',
      EN: '24-Week Demand Forecast Dashboard',
    },
    summary: {
      KR: '감에 의존하던 발주를 데이터로 옮기고, 현업이 쓰지 않던 두 달을 거쳐 전사 기준으로 정착시켰습니다.',
      EN: 'Moved ordering from intuition to data, and through two unused months made it the company standard.',
    },
    friction: {
      KR: '리드타임이 6개월인 수입 상품의 발주 수량을 담당자 감과 수기 엑셀로 결정하고 있었습니다. 품절과 과재고가 번갈아 발생했고, 마케팅과 물류가 서로 다른 숫자를 근거로 회의에 들어왔습니다.',
      EN: 'Order quantities for imports with a six-month lead time were decided by intuition in spreadsheets. Stockouts and overstock alternated, and marketing and logistics brought different numbers to the same meeting.',
    },
    outcome: {
      KR: '마케팅과 물류가 같은 화면의 커버일수를 근거로 발주 수량을 합의하게 됐고, 발주 기준(SLA)이 이 대시보드로 정리됐습니다. 초기 두 달간 현업이 사용하지 않았는데, 담당자가 매일 보던 엑셀과 구조가 달랐던 것이 원인이었습니다. 이후 현업과 화면을 함께 수정하는 방식으로 바꿔 안착시켰습니다.',
      EN: 'Marketing and logistics now agree on order quantities from the same days-of-cover view, and the ordering SLA is defined on this dashboard. It went unused for two months because it did not match the spreadsheet the team read daily; I then reworked the screens together with them until it stuck.',
    },
    measure: {
      KR: '주간 발주 회의에서 대시보드 수치를 근거로 결정된 SKU 비율',
      EN: 'Share of SKUs whose order decision cited dashboard figures in the weekly review',
    },
    role: { KR: '기획 · 데이터 설계', EN: 'Planning · Data Design' },
    period: '2025.10 — 2026.03',
    tags: ['업무자동화', '데이터파이프라인', '현업안착'],
    thumbnail: '/assets/scm_dashboard_thumbnail.png',
  },
  {
    id: 'b2b-mall',
    title: {
      KR: 'B2B 폐쇄몰 주문·정산 통합',
      EN: 'B2B Closed Mall: Orders & Settlement',
    },
    summary: {
      KR: '원가 구조상 PG를 쓸 수 없는 조건에서 결제·출고·정산을 하나의 정책으로 묶었습니다.',
      EN: 'With margins that could not absorb PG fees, unified payment, fulfillment and settlement under a single policy.',
    },
    friction: {
      KR: '140여 개 거래처의 주문이 구글 폼과 수기 엑셀로 들어왔습니다. 팀원 두 명이 매일 주문 확인에 시간을 썼고, 월 정산 대사에 1~2일이 소요됐습니다. 담당자 재량으로 선출고 후입금 같은 예외가 잦아 미수금과 정산 불일치가 누적됐습니다.',
      EN: 'Orders from about 140 accounts arrived through Google Forms and spreadsheets. Two teammates spent time daily confirming orders, and monthly reconciliation took one to two days. Discretionary exceptions such as shipping before payment accumulated receivables and mismatches.',
    },
    outcome: {
      KR: '수기 접수와 수기 거래명세서를 없앴고, 월 마감 시 입금액과 주문액의 차액이 남지 않게 됐습니다.',
      EN: 'Manual intake and hand-written invoices were eliminated, and month-end now closes with no gap between deposits and orders.',
    },
    measure: {
      KR: '월 마감 시 입금 합계 대비 주문 합계의 차액과 미매칭 건수',
      EN: 'Month-end delta between total deposits and total orders, plus unmatched count',
    },
    role: { KR: 'PM · 서비스 기획', EN: 'PM · Service Planning' },
    period: '2025.03 — 2025.09',
    tags: ['서비스기획', '정산자동화', '정책설계'],
    thumbnail: '/assets/b2b_mall_thumbnail.png',
  },
  {
    id: 'tms',
    title: {
      KR: 'TMS 자동 배차 시스템',
      EN: 'TMS Auto-Dispatch System',
    },
    summary: {
      KR: '지도 API 호출 한도를 경로 캐싱으로 해결하고, 현장 반발을 겪고서 안착의 조건을 배웠습니다.',
      EN: 'Solved map API quota limits with route caching, and learned what adoption requires after pushback from the field.',
    },
    friction: {
      KR: '배차를 수기로 편성하면서 오배송 위험이 상시로 있었고, 경로 계산에 사용하는 지도 API가 일일 호출 한도에 걸려 과금과 실패가 반복됐습니다.',
      EN: 'Manual dispatch carried constant misdelivery risk, and the map API used for routing repeatedly hit daily quota limits, causing charges and failures.',
    },
    outcome: {
      KR: '배차 생산성 14% 향상, 외주 운송비 6% 절감을 확인했습니다. 초기에는 로직이 맞으면 된다고 판단해 현장에 그대로 적용했다가 기사분들의 반발을 겪었고, 이후 현장 피드백대로 UI를 다시 설계해 단계적으로 배포했습니다.',
      EN: '14% higher dispatch productivity and 6% lower outsourced transport cost. I initially rolled it out assuming correct logic would suffice and met pushback from drivers; I then redesigned the UI around their feedback and released it incrementally.',
    },
    measure: {
      KR: '기사 1인당 일 배송 건수를 도입 전후 동일 기간으로 비교',
      EN: 'Deliveries per driver per day, compared across equal pre- and post-rollout periods',
    },
    role: { KR: 'PM · 시스템 기획', EN: 'PM · Systems Planning' },
    period: '2024.10 — 2025.02',
    tags: ['시스템기획', '현장안착', 'API최적화'],
    thumbnail: '/assets/tms_thumbnail.png',
  },
];
