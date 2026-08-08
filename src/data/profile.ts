/**
 * 사이트 전체의 단일 콘텐츠 소스.
 *
 * 포지셔닝: "비효율을 발견하면 프로젝트로 만드는 PM"
 * - 도메인(SCM)은 문제를 찾아낸 '근거'로만 등장시키고, 전면에는 기획/PM 언어를 둔다.
 * - 정량 성과 옆에는 반드시 '무엇을 세었는지(measure)'를 붙인다.
 * - 태그는 1~2단어로 압축한다.
 */

export type Bilingual = { KR: string; EN: string };

export const profile = {
  name: { KR: '박종혁', EN: 'JongHyeok Park' },
  role: { KR: 'IT · 서비스 기획자 / PM', EN: 'IT & Service Planner / PM' },

  headline: {
    KR: '비효율을 발견하면,\n프로젝트로 만듭니다.',
    EN: 'When I find friction,\nI turn it into a project.',
  },

  summary: {
    KR: '수기로 굴러가던 업무의 병목을 찾아 요건으로 정의하고, 외부 개발사와 유관 부서를 묶어 실제로 쓰이는 시스템까지 안착시킵니다. 관세법 개정처럼 밖에서 날아오는 규제 리스크도 먼저 읽고 대응 프로젝트를 세웁니다.',
    EN: 'I find the bottlenecks in manual workflows, translate them into requirements, and drive them through vendors and stakeholders until the system is actually used. I also read incoming regulatory risk early and stand up projects to meet it.',
  },

  tags: ['IT기획', '프로젝트관리', '요구사항정의', 'API연동', '규제대응', '업무자동화'],

  contact: {
    email: 'jonghp1357@gmail.com',
    github: 'https://github.com/jjongHyeok',
    blog: 'https://semon-devlog.tistory.com/',
  },
} as const;

/** 일하는 방식 — PM 직무의 언어로 4단계 */
export const process: { step: string; title: Bilingual; body: Bilingual }[] = [
  {
    step: '01',
    title: { KR: '비효율을 찾는다', EN: 'Find the friction' },
    body: {
      KR: '현장의 업무 흐름을 따라가며 어디서 시간이 새고 어디서 리스크가 쌓이는지 봅니다. 담당자가 "원래 그렇게 해요"라고 말하는 지점이 대체로 출발선입니다.',
      EN: 'I walk the actual workflow and look for where time leaks and risk accumulates. The phrase "we have always done it this way" is usually the starting line.',
    },
  },
  {
    step: '02',
    title: { KR: '요건으로 번역한다', EN: 'Translate into requirements' },
    body: {
      KR: '현업의 말을 정책서·기능정의서(PRD)와 과업지시서(SOW)로 옮깁니다. 범위를 문서로 못 박아야 개발 중 추가 과금과 분쟁이 생기지 않습니다.',
      EN: 'I turn business language into policy docs, PRDs and statements of work. Pinning the scope down in writing is what prevents mid-build change orders and disputes.',
    },
  },
  {
    step: '03',
    title: { KR: '조율한다', EN: 'Coordinate' },
    body: {
      KR: '외주 개발사 공수(M/M)를 검토하고, 유관 부서와 외부 협력사의 인터페이스를 맞춥니다. 전공 지식이 여기서 협상력이 됩니다.',
      EN: 'I review vendor effort estimates and align interfaces across internal teams and external partners. My CS background is what gives me leverage in those conversations.',
    },
  },
  {
    step: '04',
    title: { KR: '안착시킨다', EN: 'Make it stick' },
    body: {
      KR: '배포가 끝이 아닙니다. 현업이 실제로 쓸 때까지 화면과 로직을 고칩니다. 안 쓰이는 시스템은 만들지 않은 것과 같다는 걸 대시보드에서 배웠습니다.',
      EN: 'Shipping is not the finish line. I keep reworking screens and logic until the team actually uses it. A dashboard taught me that an unused system is the same as no system.',
    },
  },
];

export type Project = {
  id: string;
  title: Bilingual;
  summary: Bilingual;
  /** 발견한 비효율 / 리스크 */
  friction: Bilingual;
  /** 기획자로서 한 일 */
  action: Bilingual;
  /** 결과 + 무엇을 세어 측정했는지 */
  outcome: Bilingual;
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
      KR: '밖에서 날아온 규제를 먼저 읽고, 5개사를 묶어 시행일 전에 대응 시스템을 올린 건',
      EN: 'Read an incoming regulation early and stood up a 5-party integration before the enforcement date',
    },
    friction: {
      KR: '전자상거래 물품의 거래정보를 세관에 사전 제출하도록 관세법이 개정됐습니다. 미이행 시 스마트통관에서 제외돼 통관이 밀리고 과태료 대상이 됩니다. 공지 단계에서 이걸 읽고 대응 프로젝트를 먼저 제안했습니다.',
      EN: 'A customs law amendment required e-commerce shipments to pre-submit transaction data. Non-compliance meant losing expedited clearance, delayed shipments and fines. I flagged it at the notice stage and proposed the response project.',
    },
    action: {
      KR: '고시문을 해석해 요구사항 명세서를 쓰고, 세관·본인인증사·물류사·개발사까지 5개 주체의 인터페이스와 기준정보를 하나로 맞췄습니다. 결제 단계에 인증을 넣으면 이탈이 생기므로, 1차 본인확인에 SMS OTP 백업을 얹은 Two-Track 구조를 기획했습니다.',
      EN: 'I read the official notice, wrote the requirements spec, and aligned interfaces and master data across five parties: customs, the identity verifier, logistics, and the dev vendor. Since adding verification at checkout risks drop-off, I designed a two-track flow with an SMS OTP fallback behind primary verification.',
    },
    outcome: {
      KR: '시행일 전에 오픈했고, 개정 사유로 인한 통관 보류는 나오지 않았습니다.',
      EN: 'Shipped before the enforcement date, with no clearance holds attributable to the amendment.',
    },
    measure: {
      KR: '오픈 후 통관 보류·반려 건수를 사유 코드별로 집계',
      EN: 'Counted post-launch clearance holds and rejections by reason code',
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
      KR: '감으로 잡던 발주를 데이터로 옮기고, 안 쓰이던 2개월을 거쳐 전사 기준으로 만든 건',
      EN: 'Moved ordering from gut feel to data, and through two unused months turned it into the company standard',
    },
    friction: {
      KR: '리드타임이 6개월인 수입 상품의 발주 수량을 담당자 감과 수기 엑셀로 정하고 있었습니다. 품절과 과재고가 번갈아 났고, 마케팅과 물류가 서로 다른 숫자를 들고 회의에 들어왔습니다.',
      EN: 'Order quantities for imports with a six-month lead time were decided by gut feel in spreadsheets. Stockouts and overstock alternated, and marketing and logistics walked into meetings with different numbers.',
    },
    action: {
      KR: '흩어진 ERP 데이터를 REST API 파이프라인으로 정규화하고, 커버일수 기반 모니터링 화면을 설계했습니다. 처음엔 백엔드만 완성해두고 현업이 두 달간 쓰지 않았습니다. 원인은 담당자가 매일 보던 엑셀 화면과 구조가 달랐던 것이라, 이후엔 대시보드를 같이 띄워놓고 화면과 로직을 수정하는 방식으로 바꿨습니다.',
      EN: 'I normalized scattered ERP data into a REST API pipeline and designed a days-of-cover monitoring view. At first I built only the backend, and the team ignored it for two months. The cause was that it did not match the spreadsheet they looked at daily, so I switched to reworking screens and logic with them in the room.',
    },
    outcome: {
      KR: '마케팅과 물류가 같은 화면의 커버일수를 근거로 발주 수량을 합의하게 됐고, 발주 기준(SLA)이 이 대시보드로 정리됐습니다.',
      EN: 'Marketing and logistics now agree on order quantities from the same days-of-cover view, and the ordering SLA is defined on this dashboard.',
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
      KR: '원가 구조상 PG를 못 쓰는 조건에서, 결제·출고·정산을 하나의 정책으로 묶은 건',
      EN: 'With margins that could not absorb PG fees, unified payment, fulfillment and settlement under one policy',
    },
    friction: {
      KR: '140여 개소의 주문이 구글 폼과 수기 엑셀로 들어왔습니다. 팀원 두 명이 매일 주문 확인에 시간을 썼고, 월마다 정산 대사에 1~2일이 통째로 들어갔습니다. 담당자 재량으로 "먼저 출고하고 나중에 입금받는" 예외가 잦아 미수금과 정산 불일치가 쌓였습니다.',
      EN: 'Orders from ~140 accounts arrived via Google Forms and spreadsheets. Two teammates spent time daily just confirming orders, and monthly reconciliation consumed one to two full days. Ad-hoc exceptions like "ship now, collect later" piled up receivables and mismatches.',
    },
    action: {
      KR: '공급가와 매입가 사이 마진이 PG 결제 수수료를 감당할 수 없는 구조라, 외부 PG를 의도적으로 배제하고 계좌 스크래핑 API로 입금을 자동 대조하는 방식을 설계했습니다. 그리고 "결제 매칭 전에는 주문도 출고도 불가"라는 정책을 시스템으로 강제해 담당자 재량을 없앴습니다.',
      EN: 'Because the margin between supply and purchase price could not absorb PG fees, I deliberately excluded external PG and designed automatic deposit matching via a bank scraping API. I then enforced "no order and no shipment before payment is matched" in the system, removing individual discretion.',
    },
    outcome: {
      KR: '수기 접수와 수기 거래명세서를 없앴고, 월 마감 시 입금액과 주문액의 차액이 남지 않게 됐습니다.',
      EN: 'Manual intake and hand-written invoices were eliminated, and month-end closes with no gap between deposits and orders.',
    },
    measure: {
      KR: '월 마감 시 입금 합계 대 주문 합계의 차액, 미매칭 건수',
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
      KR: '지도 API 호출 한도를 캐싱으로 우회하고, 기사 반발을 겪고 나서야 배운 안착의 조건',
      EN: 'Worked around map API quotas with caching, and learned what adoption really requires the hard way',
    },
    friction: {
      KR: '배차를 수기로 짜면서 오배송 위험이 상시로 있었고, 경로 계산에 쓰는 지도 API가 일일 호출 한도에 걸려 과금과 실패가 반복됐습니다.',
      EN: 'Manual dispatch carried constant misdelivery risk, and the map API used for routing kept hitting daily quota limits, causing charges and failures.',
    },
    action: {
      KR: '중복 구간을 캐싱해 호출량을 줄이는 로직을 설계하고 자동 배차를 붙였습니다. 처음엔 로직이 맞으니 되겠지 하고 현장에 그대로 밀어넣었다가 기사님들의 반발을 크게 겪었습니다. 이후 현장 피드백대로 UI를 다시 짜고 애자일하게 나눠 배포했습니다.',
      EN: 'I designed caching for repeated route segments to cut call volume, then layered auto-dispatch on top. I first pushed it to the field assuming correct logic would be enough, and met strong pushback from drivers. I rebuilt the UI around their feedback and re-released it in smaller increments.',
    },
    outcome: {
      KR: '배차 생산성 14% 향상, 외주 운송비 6% 절감. 무엇보다 아키텍처보다 사용자 수용성이 먼저라는 걸 여기서 배웠습니다.',
      EN: '14% higher dispatch productivity and 6% lower outsourced transport cost. More importantly, this is where I learned that adoption outranks architecture.',
    },
    measure: {
      KR: '기사 1인당 일 배송 건수를 도입 전후 동일 기간으로 비교',
      EN: 'Compared deliveries per driver per day across equal pre/post periods',
    },
    role: { KR: 'PM · 시스템 기획', EN: 'PM · Systems Planning' },
    period: '2024.10 — 2025.02',
    tags: ['시스템기획', '현장안착', 'API최적화'],
    thumbnail: '/assets/tms_thumbnail.png',
  },
];

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
        KR: '현장 업무 흐름을 분석해 정책서·기능정의서(PRD)를 작성하고, 운영 이슈를 트래킹',
        EN: 'Analyzed field workflows to write policy docs and PRDs, and tracked operational issues',
      },
      {
        KR: '외주 개발사 과업지시서(SOW) 작성, 기능 단위 공수(M/M) 산정 및 범위 관리로 추가 과금 방지',
        EN: 'Wrote vendor SOWs, estimated effort per feature, and managed scope to prevent change-order costs',
      },
      {
        KR: '대외 기관 연동 프로젝트 PM — 요구사항 정의부터 5개사 인터페이스 조율, 오픈까지 총괄',
        EN: 'PM for an external-agency integration — from requirements through five-party interface alignment to launch',
      },
      {
        KR: '백오피스 자동화 기획 — 수요예측 대시보드, B2B 커머스 주문·정산 통합',
        EN: 'Planned back-office automation — demand forecasting dashboard and B2B commerce order/settlement',
      },
      {
        KR: 'SCM 운영 전반(수발주·수입 통관·3PL·재고 정합성)을 직접 담당 — 기획의 문제 정의가 여기서 나옴',
        EN: 'Owned day-to-day SCM operations (ordering, import clearance, 3PL, inventory accuracy) — the source of the problems I later planned around',
      },
    ],
  },
  {
    company: { KR: '택화로지스틱스코리아㈜', EN: 'Taekhwa Logistics Korea' },
    role: { KR: '물류 운영', EN: 'Logistics Operations' },
    period: '2024.02 — 2025.08',
    duration: { KR: '1년 7개월', EN: '1 yr 7 mo' },
    points: [
      {
        KR: 'End-to-End 서비스 물류(고객 컨택 → 엔지니어 연계 → 배송·회수) 운영',
        EN: 'Ran end-to-end service logistics: customer contact, engineer dispatch, delivery and recovery',
      },
      {
        KR: '고객사 SLA 기반 23개 핵심성과지표(KPI) 리포팅',
        EN: 'Reported 23 SLA-based KPIs to the client',
      },
      {
        KR: 'TMS 도입 시 현장 가이드라인 수립 및 운송 기사 온보딩',
        EN: 'Wrote field guidelines and onboarded drivers during the TMS rollout',
      },
      {
        KR: '엔지니어사·배송사·관세사·해외 포워더 등 파트너사 협업',
        EN: 'Coordinated with engineering, delivery, customs and overseas forwarding partners',
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

/** Studying 섹션에 띄울 글 (src/content/articles/*.mdx 의 slug) */
export const noteSlugs = [
  'scm-ontology-palantir',
  'ontology-engineering',
  'customs-api-architecture',
  'tms-driver-productivity',
];
