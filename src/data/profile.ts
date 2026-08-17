/**
 * 사이트 콘텐츠의 단일 소스.
 *
 * 원칙
 * - 이력서다. 담백한 '~습니다' 체를 쓰고 과장·수식어를 넣지 않는다.
 * - 대외비 금지: 협력사·솔루션·브랜드의 실명과 계약 단가는 쓰지 않는다.
 *   필요하면 '본인인증 기관', '통관 파트너사', '자사 브랜드몰' 처럼 역할명으로 적는다.
 * - 사용자가 공개를 승인한 프로젝트 규모는 정확한 계약 조건 대신 약식 금액으로만 적는다.
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
  role: { KR: '서비스 · 프로젝트 PM', EN: 'Service & Project PM' },

  headline: {
    KR: '낯선 일은 빠르게 배우고,\n복잡한 일은 명확하게 풉니다.',
    EN: 'Learn the unfamiliar quickly.\nMake the complex clear.',
  },

  intro: {
    KR: [
      '새로운 업무는 현장 담당자에게 묻고 데이터 흐름을 따라가며 빠르게 익힙니다.\n반복되는 불편은 요청 그대로 옮기지 않고, 원인과 예외를 확인해 해결할 문제로 정리합니다.',
      '모르는 것은 확인하고, 확인한 사실은 작은 실행으로 검증합니다.\n문서는 서로 다른 해석을 하나의 기준으로 맞추기 위해 쓰며, 결과가 실제 운영에 자리 잡을 때까지 책임집니다.',
    ],
    EN: [
      'I learn unfamiliar work by following frontline conversations and data flows, then define recurring friction as a problem worth solving. Rather than translating requests directly into features, I separate causes, exceptions, constraints, and stakeholders and turn them into shared policies, processes, and requirements.',
      'I believe a good PM is not someone who knows every answer at the start, but someone who verifies unknowns, tests assumptions through small executions, and owns the result. Documents create alignment; operational data and actual user change validate the decision.',
    ],
  },

  tags: [
    '서비스 기획',
    '프로젝트 관리',
    '요구사항 분석',
    '데이터 분석',
    '문제 해결',
    '커뮤니케이션',
  ],

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
    period: '2025.09 — 재직 중',
    duration: { KR: '11개월', EN: '11 mo' },
    points: [
      {
        KR: 'SCM 운영: 수발주·수입 통관·국내외 3PL·재고 정합성·사업자 주문 및 정산 운영',
        EN: 'SCM operations: ordering, import customs, 3PL, inventory accuracy, and business-account settlement',
      },
      {
        KR: '운영 분석: 주문·재고·출고·정산 데이터 대사와 운영 기준·마스터데이터 정합성 관리',
        EN: 'Operational analysis: reconciliation and accuracy controls across orders, inventory, fulfillment, and settlement',
      },
      {
        KR: '문제 정의: 현장 인터뷰·업무 관찰·데이터 흐름 분석 기반 업무 불편·예외 조건·AS-IS·TO-BE 정의',
        EN: 'Problem definition: pain-point analysis and AS-IS/TO-BE design through interviews, observation, and data flows',
      },
      {
        KR: '요구사항 관리: 정책서·기능정의서(PRD)·과업지시서(SOW) 작성과 요구사항·우선순위·완료 기준 관리',
        EN: 'Requirements management: policy, PRD, and SOW authoring with requirements and priority control',
      },
      {
        KR: '개발사 협업: 질의 대응, 기능별 예상 공수 검토와 범위·비용·일정·변경사항 조율',
        EN: 'Vendor collaboration: Q&A, feature-level effort review, and scope, cost, schedule, and change management',
      },
      {
        KR: '검증·조율: 화면·정책·예외 시나리오 QA/UAT 및 영업·물류·재무·외부 파트너 조율',
        EN: 'Validation and coordination: UI, policy, and exception-scenario QA/UAT with cross-functional stakeholders',
      },
    ],
  },
];

export const education = [
  {
    school: { KR: '고려사이버대학교', EN: 'Korea Cyber University' },
    major: { KR: 'AI·데이터과학부', EN: 'AI & Data Science' },
    period: '2025.02 — 재학 중',
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
  /** 프로젝트 상태에 맞는 결과 영역 라벨 */
  outcomeLabel: Bilingual;
  /** 결과를 무엇을 세어 확인했는지 */
  measure: Bilingual;
  /** 측정값 또는 검증 산출물의 성격 */
  measureLabel: Bilingual;
  /** PM으로서 내린 핵심 판단 */
  decisions: Bilingual[];
  /** 공개 승인된 약식 프로젝트 비용 규모 */
  projectScale?: Bilingual;
  role: Bilingual;
  period: string;
  tags: string[];
  thumbnail: string;
  /** 실제로 확인 가능한 결과 화면과 외부 결과물만 연결한다. */
  artifacts?: ProjectArtifacts;
};

export type ProjectArtifactLink = {
  kind: 'github' | 'video' | 'reference';
  href: string;
  label: Bilingual;
};

export type ProjectArtifactImage = {
  src: string;
  alt: Bilingual;
  caption: Bilingual;
  display?: 'featured' | 'portrait';
};

export type ProjectArtifacts = {
  links?: ProjectArtifactLink[];
  images?: ProjectArtifactImage[];
};

export const projects: Project[] = [
  {
    id: 'b2b-mall',
    title: {
      KR: '사업자 전용 회원제 커머스',
      EN: 'Member Commerce for Business Accounts',
    },
    summary: {
      KR: '일반 쇼핑몰의 구매 경험에 사업자 회원별 등급·카테고리·결제·선출고 정책을 결합한 서비스입니다.',
      EN: 'Combined a B2C-style shopping experience with account-specific tier, category, payment, and ship-first policies.',
    },
    friction: {
      KR: '130여 개 회원 계정의 주문이 구글 폼과 엑셀에 흩어져 있었고, 상품군과 회원 등급에 따라 결제·선출고 정책이 달라 일반 쇼핑몰의 단일 결제 흐름으로는 운영을 담기 어려웠습니다.',
      EN: 'Orders from more than 130 business accounts were split across forms and spreadsheets, while payment and ship-first rules varied by product category and member tier.',
    },
    outcome: {
      KR: '등급별 결제 분기, 간편 주문, 선출고 발주, 거래명세서와 포인트 정리 기능을 운영에 반영했습니다. 외부 서비스 활성화가 필요한 기능은 개발 완료와 운영 가능 상태를 구분해 관리했습니다.',
      EN: 'Released tier-based payment routing, simplified ordering, ship-first purchase orders, transaction statements, and point controls. Validated 11 follow-up and QA items with real order scenarios and separated external-service prerequisites.',
    },
    measure: {
      KR: '추가 요청 3건·1차 QA 5건·후속 요청 3건의 처리 결과와 PC·모바일 실제 주문 시나리오',
      EN: 'Completion of 3 follow-ups, 5 first-round QA items, and 3 subsequent requests, plus live order-scenario verification',
    },
    outcomeLabel: { KR: '운영 반영', EN: 'Operational release' },
    measureLabel: { KR: '검증 근거', EN: 'Evidence' },
    decisions: [
      {
        KR: '고객 유형보다 실제 구매 행동을 기준으로 B2C형 회원제 커머스로 포지셔닝',
        EN: 'Positioned the service by buying behavior rather than customer type',
      },
      {
        KR: '회원 등급 × 상품 카테고리 조합을 결제 정책표로 분리해 서버 검증 기준으로 정의',
        EN: 'Defined tier-by-category payment rules as a server-validated policy table',
      },
      {
        KR: '개발 결함·운영 배포 누락·외부 서비스 미신청·추가 개발 범위를 서로 다른 상태로 관리',
        EN: 'Separated defects, deployment gaps, external prerequisites, and new scope',
      },
    ],
    projectScale: {
      KR: '개발비 약 750만 원',
      EN: 'Approx. KRW 7.5M development budget',
    },
    role: { KR: 'PM · 서비스 기획', EN: 'PM · Service Planning' },
    period: '2026.07 — 2026.08',
    tags: ['서비스 기획', '커머스 정책', '외주 개발 관리', 'QA'],
    thumbnail: '/assets/b2b_mall_thumbnail.png',
    artifacts: {
      images: [
        {
          src: '/assets/b2b-pc-1.png',
          alt: {
            KR: '사업자 전용 회원제 커머스 PC 메인과 상품 목록 화면',
            EN: 'Desktop storefront and product listing for the business member commerce service',
          },
          caption: { KR: 'PC · 메인과 상품 목록', EN: 'Desktop · Storefront and product listing' },
          display: 'featured',
        },
        {
          src: '/assets/b2b-pc-2.png',
          alt: {
            KR: '사업자 전용 회원제 커머스 PC 주문 목록과 배송 조회 화면',
            EN: 'Desktop order history and delivery tracking for the business member commerce service',
          },
          caption: { KR: 'PC · 주문 목록과 배송 조회', EN: 'Desktop · Orders and delivery tracking' },
          display: 'featured',
        },
        {
          src: '/assets/b2b-mobile-1.png',
          alt: {
            KR: '사업자 전용 회원제 커머스 모바일 메인과 상품 목록 화면',
            EN: 'Mobile storefront and product listing for the business member commerce service',
          },
          caption: { KR: '모바일 · 메인과 상품 목록', EN: 'Mobile · Storefront and product listing' },
          display: 'portrait',
        },
        {
          src: '/assets/b2b-mobile-2.png',
          alt: {
            KR: '사업자 전용 회원제 커머스 모바일 주문 목록과 배송 조회 화면',
            EN: 'Mobile order history and delivery tracking for the business member commerce service',
          },
          caption: { KR: '모바일 · 주문 목록과 배송 조회', EN: 'Mobile · Orders and delivery tracking' },
          display: 'portrait',
        },
      ],
    },
  },
  {
    id: 'customs-api',
    title: {
      KR: '관세법 개정 대응 통관 API 연동',
      EN: 'Customs Clearance API Integration',
    },
    summary: {
      KR: '기존 ERP·WMS 흐름을 새 사전신고 E2E에 편입하고, 주문·본인확인·물류·통관 사이의 식별자와 상태 계약을 설계했습니다.',
      EN: 'Integrated the existing ERP and WMS flow into a new customs pre-declaration E2E and defined identifiers and state contracts across systems.',
    },
    friction: {
      KR: '같은 주문을 시스템마다 다른 번호·상품·포장 단위와 생성 시점으로 다뤘습니다. 오류 주문 회수와 고객 수정·취소, 창고 출고 마감도 하나의 흐름에서 맞춰야 했습니다.',
      EN: 'Each system represented the same order with different identifiers, units, and timing, while error recovery and fulfillment cutoffs had to remain aligned.',
    },
    outcome: {
      KR: '본인확인부터 TRA 제출·오류조회, 출고 회수, 통관 파트너사의 분리 API 병합까지 E2E 계약을 정리하고 시범운영을 준비하고 있습니다.',
      EN: 'Defined the E2E contract from identity verification through TRA submission, error recovery, shipment rollback, and broker-side API merging, and prepared the pilot operation.',
    },
    outcomeLabel: { KR: '현재 상태', EN: 'Current status' },
    measure: {
      KR: '시스템별 필드 소유권, 식별자 매핑, 정상·오류 E2E 시나리오와 우선순위별 잔여 리스크',
      EN: 'Field ownership, identifier mappings, normal/error E2E scenarios, and prioritized residual risks',
    },
    measureLabel: { KR: '검증 근거', EN: 'Evidence' },
    decisions: [
      {
        KR: '기존 ERP·WMS 연동은 유지하고 사전신고에 필요한 상태·식별자 계약만 확장',
        EN: 'Scoped the work as integration of existing ERP/WMS assets rather than rebuilding them',
      },
      {
        KR: '원주문번호·분할주문번호·HBL·제출번호의 역할을 분리하고 추적 관계 정의',
        EN: 'Separated and traced original order, split order, HBL, and submission identifiers',
      },
      {
        KR: '개인정보와 물류 스냅샷을 소스별로 저장한 뒤 양측 도착 시 병합하는 계약 설계',
        EN: 'Designed source-owned snapshots that merge only after both sides arrive',
      },
    ],
    projectScale: {
      KR: '개발비 약 4,000만 원 · 본인확인 서비스 운영비 약 400만 원 예정',
      EN: 'Approx. KRW 40M development budget · KRW 4M identity-service operating cost planned',
    },
    role: { KR: 'PM · 요구사항 정의', EN: 'PM · Requirements' },
    period: '2026.04 — 진행 중',
    tags: ['규제 대응', 'API 연동', 'ERP·WMS', '다자간 조율'],
    thumbnail: '/assets/customs_api_thumbnail.png',
  },
  {
    id: 'scm-dashboard',
    title: {
      KR: '재고·발주 의사결정 대시보드',
      EN: 'Inventory & Ordering Decision Dashboard',
    },
    summary: {
      KR: '분산된 엑셀과 경험 중심 발주를 단일 데이터 기준으로 통합하고, 현업 피드백을 반영해 팀 운영 도구로 안착시켰습니다.',
      EN: 'Unified fragmented spreadsheets and intuition-led ordering into one data standard, then improved adoption through frontline feedback.',
    },
    friction: {
      KR: '6개월 리드타임 상품의 재고·판매·입고 데이터가 여러 엑셀에 흩어져 매일 같은 계산을 반복했고, 마케팅과 물류가 서로 다른 수치로 발주를 논의했습니다.',
      EN: 'Inventory, sales, and inbound data for six-month lead-time products was split across spreadsheets, creating repeated calculations and conflicting numbers.',
    },
    outcome: {
      KR: '재고 확인·회전율 계산을 일 1시간에서 약 5분으로 줄이고, 월 8~9시간의 데이터 취합·양식 작성 작업을 자동화했습니다. 초기 미사용 원인을 화면 구조에서 찾아 현업과 함께 수정했습니다.',
      EN: 'Reduced daily inventory and turnover checks from one hour to about five minutes and automated 8–9 hours of monthly data preparation, then corrected early adoption issues with users.',
    },
    outcomeLabel: { KR: '운영 결과', EN: 'Operational result' },
    measure: {
      KR: '도입 전 수기 작업시간과 대시보드 조회시간 비교, 월간 데이터 취합 업무 기록, 품절 위험 SKU 탐지 사례',
      EN: 'Pre/post task time, monthly data-preparation records, and detected stockout-risk cases',
    },
    measureLabel: { KR: '측정 기준', EN: 'Measured by' },
    decisions: [
      {
        KR: '직전 12주 평균과 실무자 조정 계수를 결합해 계산 근거를 확인할 수 있는 발주 시뮬레이션 구성',
        EN: 'Used a transparent 12-week average plus operator adjustment rather than overstating forecasting sophistication',
      },
      {
        KR: '서버 도입이 어려운 제약에서 로컬 실행·파일 DB·NAS 백업 구조 선택',
        EN: 'Selected local execution, file database, and NAS backup under infrastructure constraints',
      },
      {
        KR: '초기 미사용 원인을 기존 엑셀과 달라진 정보 구조에서 확인하고 화면 구성 재설계',
        EN: 'Reframed non-adoption as an information-architecture problem rather than user resistance',
      },
    ],
    role: { KR: 'PM · 프로토타입 구현', EN: 'PM · Prototype Implementation' },
    period: '2026.06 — 2026.07',
    tags: ['업무 자동화', '데이터 분석', '프로토타이핑', '현업 안착'],
    thumbnail: '/assets/scm_dashboard_thumbnail.png',
    artifacts: {
      images: [
        {
          src: '/assets/SCM-dashboard02_dashboard.png',
          alt: {
            KR: '재고 자산과 품절·폐기 위험을 요약한 SCM 대시보드 화면',
            EN: 'SCM dashboard summarizing inventory value, stockout risk, and expiry risk',
          },
          caption: { KR: '운영 요약 대시보드', EN: 'Operations overview dashboard' },
          display: 'featured',
        },
        {
          src: '/assets/SCM-dashboard03_inventory.png',
          alt: {
            KR: '창고별 현재고를 조회하고 엑셀로 등록하는 화면',
            EN: 'Inventory view for warehouse-level stock lookup and spreadsheet upload',
          },
          caption: { KR: '창고별 현재고', EN: 'Warehouse inventory' },
        },
        {
          src: '/assets/SCM-dashboard04_expiry.png',
          alt: {
            KR: 'FEFO 기준 유통기한 임박 재고와 폐기 예상 금액 화면',
            EN: 'FEFO expiry-risk inventory and estimated disposal value view',
          },
          caption: { KR: '유통기한·폐기 위험', EN: 'Expiry and disposal risk' },
        },
        {
          src: '/assets/SCM-dashboard05_order_plan.png',
          alt: {
            KR: '품목별 발주 제안과 미래 재고 시뮬레이션 화면',
            EN: 'Item-level order recommendations and future inventory simulation',
          },
          caption: { KR: '발주 제안과 재고 시뮬레이션', EN: 'Order planning and inventory simulation' },
          display: 'featured',
        },
        {
          src: '/assets/SCM-dashboard06_matching.png',
          alt: {
            KR: '인보이스별 입고 내역과 결제 금액을 관리하는 화면',
            EN: 'Inbound records and invoice payment management view',
          },
          caption: { KR: '입고·인보이스 관리', EN: 'Inbound and invoice management' },
        },
        {
          src: '/assets/SCM-dashboard07_settings.png',
          alt: {
            KR: '품목·창고·입고·현재고 데이터 양식을 관리하는 설정 화면',
            EN: 'Settings for product, warehouse, inbound, and inventory data templates',
          },
          caption: { KR: '데이터 양식 관리', EN: 'Data template management' },
        },
      ],
    },
  },
  {
    id: 'tms',
    title: {
      KR: 'TMS 자동 배차 시스템',
      EN: 'TMS Auto-Dispatch System',
    },
    summary: {
      KR: '수기 배차를 시스템화하고, 현장 피드백을 반영해 단계적으로 적용한 프로젝트입니다.',
      EN: 'Solved map API quota limits with route caching, and learned what adoption requires after pushback from the field.',
    },
    friction: {
      KR: '수기 배차와 교대 인수인계로 정보가 파편화됐고, 경로 계산 때마다 지도 API를 호출해 일일 한도와 과금 위험이 반복됐습니다.',
      EN: 'Manual dispatch carried constant misdelivery risk, and the map API used for routing repeatedly hit daily quota limits, causing charges and failures.',
    },
    outcome: {
      KR: '도입 전후 동일 기간 비교에서 기사 1인당 일 배송 건수가 14% 늘었습니다. 감소한 작업시간을 기준으로 외주 운송비 약 6%의 절감 가능성을 산출했습니다.',
      EN: 'Deliveries per driver per day improved by 14% across comparable periods. Reduced work hours indicated roughly 6% potential outsourced transport savings; this is an estimate, not realized savings.',
    },
    outcomeLabel: { KR: '운영 결과', EN: 'Operational result' },
    measure: {
      KR: '도입 전후 동일 기간의 기사 1인당 일 배송 건수와 감소 작업시간 기반 비용 시뮬레이션',
      EN: 'Deliveries per driver per day across comparable periods and a work-hour-based cost simulation',
    },
    measureLabel: { KR: '측정 기준', EN: 'Measured by' },
    decisions: [
      {
        KR: '도착지 우편번호별 경로를 캐싱해 지도 API 재호출과 일일 한도 위험 축소',
        EN: 'Cached routes by destination postal code to reduce repeat API calls and quota risk',
      },
      {
        KR: '동시 수정 충돌을 막기 위해 수정 진입 시 잠금과 5분 자동 해제 적용',
        EN: 'Applied edit locking with a five-minute timeout to prevent concurrent conflicts',
      },
      {
        KR: '초기 일괄 적용 뒤 현장 반발을 확인하고 다중 배차·클릭 동선 개선 후 단계 배포로 전환',
        EN: 'Moved from an initial broad rollout to staged releases after improving workflows from driver feedback',
      },
    ],
    role: { KR: 'PM · 시스템 기획·개발', EN: 'PM · Systems Planning & Development' },
    period: '2024.10 — 2025.02',
    tags: ['시스템 기획', '운영 개선', 'API 최적화', '변화 관리'],
    thumbnail: '/assets/tms_thumbnail.png',
    artifacts: {
      links: [
        {
          kind: 'github',
          href: 'https://github.com/park-jjong/TWLKRTMS-releaseRepository',
          label: { KR: 'GitHub 저장소', EN: 'GitHub repository' },
        },
        {
          kind: 'video',
          href: 'https://www.youtube.com/watch?v=uegOVSqd4lU',
          label: { KR: '시스템 시연 영상', EN: 'System demo video' },
        },
      ],
    },
  },
];
