import { Truck, LineChart, ShieldCheck, Box } from 'lucide-react';

export const projects = [
  {
    id: 'customs-api',
    title: { KR: '관세청 전자상거래 통관플랫폼 연동', EN: 'Customs API Integration' },
    description: { KR: '관세청 전자상거래 전용 REST API 연동 및 자동화 프로세스 기획', EN: 'Customs E-commerce REST API Integration & Automation Planning' },
    tags: ['API Integration', 'Data Pipeline', 'Project Management'],
    icon: ShieldCheck,
    role: 'Project Manager',
    period: '2026.04 - 2026.08'
  },
  {
    id: 'scm-dashboard',
    title: { KR: 'SCM 재고·발주 자동화 대시보드', EN: 'SCM Inventory & Order Automation Dashboard' },
    description: { KR: '분산된 SCM 데이터를 통합하여 수요 예측 및 발주 자동화 모델 구축', EN: 'Built demand forecasting and order automation model by integrating distributed SCM data' },
    tags: ['Dashboard', 'SCM', 'Data Analysis'],
    icon: LineChart,
    role: 'DX Planner',
    period: '2025.10 - 2026.03'
  },
  {
    id: 'b2b-mall',
    title: { KR: 'B2B 전용 폐쇄몰 기획 및 론칭', EN: 'B2B Closed Mall Planning & Launch' },
    description: { KR: 'B2B 물품 공급망 설계 및 자체 폐쇄몰(Nutricia B2B) 기획·운영 전담', EN: 'B2B supply chain design and exclusive closed mall planning & operation' },
    tags: ['B2B', 'E-Commerce', 'Platform Planning'],
    icon: Box,
    role: 'Project Manager',
    period: '2025.03 - 2025.09'
  },
  {
    id: 'tms',
    title: { KR: '배송 관리 시스템(TMS) 구축', EN: 'Transport Management System (TMS) Development' },
    description: { KR: '분산된 운송 프로세스를 표준화하고 중앙 집중화하는 시스템 구축', EN: 'Developed a system to standardize and centralize distributed transport processes' },
    tags: ['TMS', 'Logistics', 'System Architecture'],
    icon: Truck,
    role: 'Product Manager',
    period: '2024.10 - 2025.02'
  }
];

export const projectsFullMarkdown: Record<string, string> = {
  'customs-api': `# 관세청 전자상거래 통관플랫폼 연동 — 전사 공유 기획 보고서

> 📅 최종 업데이트: 2026-07-19 (D-27) | PM: 박종혁

---

## 1. 프로젝트 개요

### 1.1 배경 및 목표

2026년 8월 15일 시행되는 **관세법 제254조의2 개정안**에 따라, 전자상거래업체는 소비자 결제 시점에 개인통관고유부호(PCCC)를 **실시간 검증**하고, 거래정보를 관세청에 **사전 자동 제출**해야 한다. 미이행 시 스마트통관 제외 → 목록통관 전환으로 통관 지연이 발생하며, 과태료 및 블랙리스트 등재 위험이 있다.

### 1.2 기초 정보

| 항목 | 내용 |
|---|---|
| 법적 근거 | 관세법 제254조의2 개정안 (2026.08.15 시행) |
| 대상 쇼핑몰 | 뉴트리시아몰 (고도몰5 기반) |
| 전자상거래업체부호 | **K26000127** (2026.06.01 승인) |
| 대상 상품 | 압타밀(해외직구) / 포티멜(해외직구) |
| 계약 총액 | ₩32,413,815 (부가세 별도) — 1차 ₩17,013,815 + 2차 ₩15,400,000 |

### 1.3 참여 업체 (5개사)

| 업체 | 역할 | 담당자 |
|---|---|---|
| **(+)아이베 / 크로네** | 원청 · 기획 · PM | 박종혁 리드 |
| **긱스튜디오** | 개발사 | 강명제 팀장, 김동섭 엔지니어 |
| **NICE평가정보** | 본인인증 · 통관검증 중계 | 신용철 매니저 (DI사업1실) |
| **옌타이 동수 (Dongshu)** | 중국 물류창고 WMS | 공부장, 안과장 |
| **자이언트네트워크그룹** | 통관 · 특송사 | 김현진 연구원 |

---

## 2. 참조 가이드라인 및 버전

| 연동 기관 | 문서 정식 명칭 | 적용 버전 | 비고 |
|---|---|---|---|
| 관세청 | 관세청 전자상거래 전용 REST API 명세서 | **v1.4** (26년 5월 개정) | AUT, PER, TRA 전체 |
| NICE평가정보 | 통관 스마트 검증 API 개발 가이드 (CI 활용기관) | **v1.0** | SMARTPCC_11/20/30 |
| NICE평가정보 | 통관 스마트 검증 API 개발 규격_260515.pdf | v1.0 | 암복호화 샘플 |
| 자이언트 | GGATE API V2 (자이언트네트워크그룹 신고 API) | **v1.2.0** (26.06.10) | HWB 단건/벌크/조회 |
| 관세청 | 04 전자문서항목정의서 전자상거래물품 통관목록(DKX) | v1.0 | 특송사용 EDI 서식 |
| 관세청 | 03. 개인통관고유부호 체계 개선(안) | v1.0 | OTP/rspn_tp:03 예외처리 |
| 관세청 | 01. 회원가입 및 전자상거래업체부호 등록 | v1.0 | API 사용신청 절차 |

---

## 3. 시간대별 물류 + 데이터 통합 흐름도 ★

고객이 결제 버튼을 누르는 순간부터, 데이터가 어떤 API를 통해 어디로 흐르고, 물리적 화물이 어디에 있는지를 시간순으로 정리한다.

> 💬 **[리드자 참고]** 이 섹션이 발표의 핵심입니다. 경영진과 물류팀이 "고객이 결제하면 데이터가 어떻게 흘러가는 거야?"라고 물을 때 이 흐름도를 기준으로 설명하면 됩니다. 각 단계에서 "여기서 만약 에러가 나면 어떻게 되는지"를 함께 설명하면 리스크 브리핑과 자연스럽게 연결됩니다.

#### 📊 전체 데이터 흐름 및 단계별 시각화

\`\`\`mermaid
sequenceDiagram
    autonumber
    actor C as 고객
    participant G as 뉴트리시아몰 (고도몰/Geek)
    participant N as NICE평가정보
    participant D as 동수 (WMS)
    participant K as 관세청 (KCS)
    participant Z as 자이언트 (Giant)

    rect rgb(240, 248, 255)
    Note right of C: ■ STEP 0. 결제 및 인증 (T+0 실시간)
    C->>G: 결제하기 클릭
    G->>N: [SMARTPCC_11] PCCC 실시간 검증
    alt [에러①] NICE/관세청 통신 장애 (3170 에러)
        N-->>G: 통신 장애 감지
        G->>G: stat_sgn=02 선승인 처리 (결제 차단 안 함)
        Note right of G: ▶해결: 망 복구 후 PER003(SMARTPCC_30) 사후검증 배치
        Note right of G: ▶3170이면 CS가 수동 확인 후 고객에게 PER001 재인증 알림톡
    else [에러②] PCCC 검증 실패 (부호 불일치/만료/도용)
        N-->>G: 검증 실패 응답
        G-->>C: 결제 차단. 재입력 유도 모달 노출
        Note right of G: ▶해결: 고객이 PCCC 재입력하거나 관세청 사이트에서 부호 재발급
    else [에러③] 비갱신 유예대상자 (rspn_tp:03)
        N-->>G: 03 응답 + 임시 인증번호 6자리 자동 회신
        G-->>C: 입력 없이 자동 통과 (27년 12월까지 한시적)
        Note right of G: ▶주의: 2027.12.31 이후 이 경로 폐쇄됨
    else [에러④] Track B SMS 미수신/세션 만료
        N-->>G: SMS 발송 완료 but 고객 미입력
        G-->>C: 인증 모달 타임아웃
        Note right of G: ▶해결: 재인증 UX 흐름으로 전환 (재발송 버튼)
    else [정상] Track A(구매간소화) 또는 Track B(인증완료)
        N-->>G: 검증 성공 및 Track(A/B) 반환 + 인증번호 6자리
        G-->>C: 결제 완료 (p1)
    end
    end

    rect rgb(255, 248, 240)
    Note right of G: ■ STEP 1. 동수 HBL/무게 수집 (T+1일 11:00~12:00)
    Note over G, D: 매 영업일 11:00 동수 수집 / 11:30, 12:00 Geek 폴링
    G->>D: HBL 및 실측 무게(Weight) API 폴링 (하루 2회)
    alt [에러⑤] 동수 API 타임아웃/응답 없음
        D-->>G: 타임아웃 또는 Connection Refused
        Note right of G: ▶해결: 15분 후 자동 재시도. 3회 실패 시 Slack 알림 + 수동 확인
    else [에러⑥] HBL 미채번 (동수 내부 오류)
        D-->>G: HBL=null 응답
        Note right of G: ▶해결: 해당 건은 Skip하고 다음 폴링 시 재수집. 동수 담당자 연락
    else [에러⑦] 무게(Weight) 값 NULL/이상값
        D-->>G: weight=null 또는 음수
        Note right of G: ▶해결: 기본값 0.0 적재 후 Flag 마킹. 운영팀 수동 확인 대상
    else [정상] HBL + 무게 정상 수신
        D-->>G: 송장번호(HBL) 및 무게 정상 응답
        G->>G: 주문상태 [배송중] 전환 (Point of No Return - 취소 불가)
    end
    end

    rect rgb(240, 255, 240)
    Note right of G: ■ STEP 2-3. 관세청 거래정보 제출 및 에러 모니터링
    Note over G, K: HBL 수신 즉시 자동 트리거
    G->>K: [TRA001] 거래정보 일괄제출 (최대 300건/3MB)
    alt [에러⑧] TRA001 제출 자체 실패 (네트워크/관세청 점검)
        K-->>G: HTTP 502/503 또는 Connection Timeout
        Note right of G: ▶해결: 실패큐(Dead-letter)에 적재 → 30분 후 자동 재시도
    else [에러⑨] 관세청 3000 에러 (txif_sbmt_no 중복 또는 필드 오류)
        K-->>G: 3000 에러코드 리턴
        Note right of G: ▶해결: txif_sbmt_no 신규 채번 후 재제출. 필드 오류 시 117/118번에 사유 적재
    else [에러⑩] 30분 룰 위반 (동일 ord_no 30분 내 중복)
        K-->>G: 중복 제출 거부
        Note right of G: ▶해결: ord_cmpl_dttm 비교하여 시스템 자체 방어. 30분 경과 후 재제출
    else [정상] TRA001 제출 성공
        K-->>G: 정상 접수
    end

    loop TRA003 30초 간격 상시 폴링 (50건/큐)
        G->>K: [TRA003] 미확인오류 조회
        alt [에러⑪] 관세청 에러 건 발견 (필드 불일치/인증 만료 등)
            K-->>G: 에러코드 + 상세사유 리턴
            G->>G: [출고보류(Hold)] 자동 ON + 실패리스트(117/118번) 적재
            Note right of G: ▶해결: 운영팀 엑셀 다운 → 원인 파악 → [재제출] 버튼 (새 txif_sbmt_no)
        else [정상] Clean (unread_cnt=0)
            K-->>G: 오류 없음. 30초 Sleep 후 재폴링
        end
    end
    end

    rect rgb(255, 240, 245)
    Note right of G: ■ STEP 4. 자이언트 특송사 전송 (TRA003 Clean 건만)
    Note over G, Z: TRA003 정상(Clean) 건만 전송
    G->>Z: [POST /bulk-sync] 자이언트 HWB 동기화 (동기식)
    alt [에러⑫] 자이언트 HTTP 500/400 에러
        Z-->>G: 에러 응답 (상세사유 포함)
        G->>G: 117/118번에 에러사유 TRUNCATE 바인딩 + Hold ON
        Note right of G: ▶해결: 에러 원인 수정 후 [재제출]로 자이언트에도 동시 재전송
    else [에러⑬] 자이언트 타임아웃 (30초 초과)
        Z-->>G: Connection/Read Timeout
        Note right of G: ▶해결: 100건 청크로 분할 재전송. 지속 시 자이언트 담당자 연락
    else [정상] 전송 성공
        Z-->>G: 정상 접수 응답
    end
    end

    rect rgb(245, 240, 255)
    Note right of G: ■ STEP 5-6. 통관 및 최종 상태 전환 (T+3~5일)
    Note over Z, K: 자이언트 주도 - 수입신고서(DKW/DKX) 세관 EDI 전송
    Note over G, Z: 물리적 상품 준비(출고) 기준 T+3영업일
    G->>Z: 최종 통관 결과 상태 폴링
    alt [에러⑭] 통관 보류/반려 (세관 심사 불통과)
        Z-->>G: 통관 보류/반려 상태 리턴
        G->>G: [출고보류(Hold)] ON. CS팀 수동 대응 (고객 연락)
        Note right of G: ▶해결: 원인별 대응 - 정보불일치: 재제출 / 검역: 서류 보완 / 도용: 신고
    else [에러⑮] 송장 탈거로 HBL 변경 (동수 재발급)
        Z-->>G: 기존 HBL과 적하목록 불일치 감지
        G->>G: 기존 건 Hold
        Note right of G: ▶해결: CS가 [재제출]로 새 HBL 등록 → TRA001+자이언트 동시 재전송
    else [정상] 통관 완료
        Z-->>G: 통관 완료 상태 리턴
        G->>G: 분할배송 시 모든 HBL 완료 확인 후 최종 [통관완료] 전환
    end
    end
\`\`\`

> 💬 **[리드자 참고]** 위 다이어그램의 [에러①~⑮]이 실제로 라이브 후 발생할 수 있는 **모든 에러 경우의 수**입니다. 각 에러 옆에 ▶해결 항목이 있으니, 발표 시 "이 단계에서 만약 이런 에러가 나면 시스템이 이렇게 자동 대응합니다"라고 설명하면 됩니다.

### STEP 0. 고객 결제 (실시간, T+0초)

| 항목 | 내용 |
|---|---|
| 화물 위치 | 중국 옌타이 동수 창고에 재고로 있음 |
| 트리거 | 고객이 뉴트리시아몰에서 **[결제하기]** 버튼 클릭 |
| API 호출 순서 | ① NICE \`SMARTPCC_11\` 호출 (CI 추출 + 관세청 PER001 대체 검증) → ② Track 분기 → ③ 결제 승인 → ④ 고도몰 주문 생성 \`[결제완료]\` |
| 소요시간 | 2~5초 (실시간) |

**Track 분기 상세:**

| Track | 조건 | 동작 | 고객 경험 |
|---|---|---|---|
| **A (구매간소화)** | 주문자 = 수하인 (CI 일치, \`reqt_tp:02\`) | 백그라운드에서 자동인증. 인증번호 6자리가 백엔드로 즉시 회신. | 입력 없이 프리패스 |
| **B (일반인증)** | 주문자 ≠ 수하인 또는 CI 불가 (\`reqt_tp:01\`) | SMS/알림톡으로 인증번호 발송. 고객이 6자리 직접 입력. | 인증번호 입력창 노출 |
| **예외 (03)** | 비갱신 유예대상자 (\`rspn_tp:03\`) | 관세청이 임시 인증번호 6자리를 즉시 회신. | 입력 없이 자동 통과 |

> 💬 **[리드자 참고]** Track A와 B의 차이를 한 문장으로 설명하면: "Track A는 본인이 산 거면 아무것도 입력할 필요 없고, Track B는 다른 사람에게 선물하는 경우라 받는 사람이 직접 인증해야 합니다." 비갱신자(03)는 생일이 아직 안 도래해서 통관부호를 미처 갱신하지 못한 고객으로, 시스템이 자동으로 통과시킵니다 (2027년 12월 31일까지 한시적 운영).

**장애 시 예외 처리 (PER003 사후검증):**
- 관세청/NICE 망이 다운된 경우, 결제를 차단하지 않고 \`stat_sgn=02\`로 **선승인** 처리
- 망 복구 후 NICE \`SMARTPCC_30\` API로 사후 검증 배치 실행 (초당 10건 이하 Rate Limiting)
- \`call_dttm\` 필드에 장애 발생 시각을 필수 기입
- 만약 \`3170\` 에러 (세관이 아닌 당사 내부 망 지연으로 판단) → CS 수동 확인 대기 + 고객에게 PER001 재인증 유도 알림톡 발송

> 💬 **[리드자 참고]** "3170 에러"는 관세청이 "너네 서버가 느린 거지 우리 장애 아니야"라고 거부하는 것입니다. 이 경우 선승인된 주문에 대해 고객이 재인증해야 하므로 CS가 수동으로 대응해야 합니다.

---

### STEP 1. 동수 창고 데이터 수집 및 HBL 채번 (T+수시간 ~ T+1일)

| 항목 | 내용 |
|---|---|
| 화물 위치 | 중국 옌타이 동수 창고에서 피킹/포장 진행 중 |
| 트리거 | **매 영업일 11:00** 동수 WMS가 공식몰 \`p1\`(결제완료) 건들을 수집 |
| API 호출 | ① 동수 WMS 수집 후 HBL(송장번호) 채번 및 패킹 시작 → ② **공식몰(Geek) 스케줄러가 11:30 / 12:00 (하루 2회)** 동수 API를 호출하여 채번된 HBL과 **상품의 실측 무게(Weight)** 수신 → ③ 고도몰 DB에 HBL 및 무게 적재 |
| 상태 전환 | 고도몰 주문 상태: \`[결제완료]\` → **\`[상품준비중]\`** |

**동수 데이터 수집 규칙 (7월 확정):**

| 규칙 | 상세 |
|---|---|
| 수집 기준 | \`orderGoodsData\` 내의 \`orderStatus\`를 **최종 판단 기준**으로 사용 (마스터 주문 상태 아님) |
| 수집 대상 | **오직 \`p1\`(결제완료)만** 수집 |
| 수집 금지 | \`g1\`(상품준비중): 이미 WMS로 넘어간 건이므로 중복수집 시 **이중출고 대형사고** |
| 자동 폐기 | \`c\`(취소), \`r\`(환불), \`f\`(결제실패) 코드가 섬여 있으면 동수 WMS가 자동 Drop |
| 동수 테스트 제약 | Staging에서 실서버 데이터가 리턴됨. **15~18시에만** 테스트 가능. \`ord_no\` 수동 삽입 필요 |

> 💬 **[리드자 참고]** 이 단계가 **Point of No Return**입니다. HBL이 채번되고 \`[상품준비중]\`으로 넘어간 시점부터는 시스템상 단순 취소가 절대 불가능합니다. 관세청 REST API에는 전송 후 취소/삭제 API가 아예 존재하지 않습니다. 이후 고객 변심은 무조건 수령 후 해외 왕복 배송비 고객 부담의 **반품 프로세스**로만 처리해야 합니다. 이것은 CS팀과 반드시 사전 합의해야 합니다.

**분할 배송 발생 시 (1주문 → 복수 HBL):**

| 필드 | 처리 방식 |
|---|---|
| \`hbl_no\` | 박스별 HBL 번호 각각 고유하게 1:1 매핑 |
| \`ord_no\` | 최초 자사몰 주문번호 **동일하게 유지** (관세청 1주문-복수 HBL 허용) |
| \`itemSeq\` | 해당 박스에 실제 적재된 상품만 선별하여 \`001, 002\` 형태로 **재생성** |
| 금액 | **[해당 박스 실적재 수량 × 상품별 USD 고정 공급단가]**로 분기 연산 |

> 💬 **[리드자 참고]** 분할 배송 설명 예시: "고객이 압타밀 6캔을 주문했는데, 창고에서 부피 문제로 3캔/3캔 두 박스로 나뉘습니다. 이때 관세청에는 주문번호는 같지만 금액과 수량을 각각 쏼개서 별도로 신고합니다. 안 그러면 세관에서 세액 불일치로 반려(3000 에러)합니다."

---

### STEP 2. 관세청 거래정보 제출 (T+1일, HBL 적재 직후 트리거)

| 항목 | 내용 |
|---|---|
| 화물 위치 | 동수 창고에서 포장 완료, 선적 대기 또는 항공 적재 준비 중 |
| 트리거 | 11:30, 12:00 배치로 **HBL이 DB에 적재되는 즉시** TRA001 배치 자동 트리거 (이후 실패건은 실패리스트에 적재) |
| API 호출 | 관세청 \`TRA001\` (거래정보 일괄제출) |
| 제약사항 | 최대 300건 배치. Body 최대 3MB. 30분 룰 방어 (\`ord_cmpl_dttm\` 저장) |

**TRA001 주요 파라미터 및 주의사항:**

| 파라미터 | 값 | 주의 |
|---|---|---|
| \`txif_sbmt_no\` | 21자리 신규채번 | ⚠️ 재제출 시 **반드시 새로 채번** (3000 에러 방어) |
| \`sale_ents_sgn\` | K26000127 | 업체부호 |
| \`sale_ents_id\` | **Staging: K26000127 / Prod: Null** | ⚠️ Prod 배포 시 반드시 Null로 원복 |
| \`elcm_pcd\` | A | 독립자사몰 직접판매 |
| \`prod_unprc_curr_cd\` | USD | 고정 |
| \`ord_amt_curr_cd\` | USD | 고정 |
| \`cscl_agcs\` | Null | 통관대행료 제외 |
| \`ord_prod_nm\` | 국문 상품명 그대로 | 옵션 제거, 일반 상품명만 |

> 💬 **[리드자 참고]** \`ord_cmpl_dttm\` 30분 룰은 동일 주문번호로 30분 이내 중복 제출을 방어하는 관세청 정책입니다. 시스템이 \`ord_cmpl_dttm\`을 저장해두고, 30분 이내에 또 동일 건을 제출하면 자체적으로 막습니다. 이것은 대량 반려 edge case로 연결되는 리스크입니다 (섹션 6 참조).

---

### STEP 3. 에러 모니터링 및 확인 (T+1일~, TRA001 제출 직후부터 상시)

| 항목 | 내용 |
|---|---|
| 화물 위치 | 중국 → 인천 이동 중 (항공/해운) |
| 트리거 | TRA001 제출 직후부터 상시 폴링 |
| API 호출 | 관세청 \`TRA003\` (미확인 오류 조회 큐 폴링) |
| 동작 | 50건 단위 큐 조회. \`unread_cnt=0\`이면 30초 Sleep 후 재시도 |

**오류 발생 시 자동화 흐름:**
1. TRA003에서 에러 건 발견
2. 고도몰 어드민에 **\`[출고보류(Hold)]\`** 플래그 자동 세팅 → 동수 창고 송장 출력 원천 차단
3. 에러 코드 및 사유를 고도몰 순정 양식 **117번(사유), 118번(상세사유)** 필드에 자동 바인딩
4. 운영팀이 실패 리스트 엑셀 다운로드 → 원인 파악 → 어드민에서 **[재제출]** 버튼 클릭 (txif_sbmt_no 신규 채번)

> 💬 **[리드자 참고]** ⚠️ **TRA002(단건조회)를 절대 선호출하면 안 됩니다.** TRA002를 먼저 호출하면 TRA003 큐에서 해당 건이 영구히 사라집니다. TRA002는 오직 예외적인 단건 디버깅용으로만 사용합니다.

---

### STEP 4. 자이언트 특송사 데이터 전송 (TRA003 Clean 확인 후)

| 항목 | 내용 |
|---|---|
| 화물 위치 | 중국에서 인천으로 이동 중 또는 인천 입항 대기 |
| 트리거 | TRA003에서 에러 없음 확인된(Clean) 건만 전송 |
| API 호출 | 자이언트 \`POST /api/hwb/bulk-sync\` (**동기식**) |
| 응답 처리 | 즉시 리턴되는 에러 코드/상세를 실시간 파싱 → 고도몰 117/118번에 다이렉트 바인딩 |

**자이언트 전송 필드 고정값:**

| 필드 | 값 | 비고 |
|---|---|---|
| \`shipperName\` | **동수 (DONGSHU E-BUSINESS)** | 실물 발송 근거지인 중국 현지 창고명 (일양로지스 아님) |
| \`domesticCarrierName\` | **롯데택배** | 국내 배송사 |
| \`brokerCode\` | **K26000127** (9자리 고정) | 전자상거래업체부호 |
| \`brokerName\` | 뉴트리시아몰 | 등록된 상호명 |
| \`pccCode\` | 13자 고정 (P로 시작) | 개인통관고유부호 |
| \`tempAuthNo\` | 6자 고정 | 일회용 인증번호 |
| \`sellerName\` | 뉴트리시아몰 | 직구(A) 유형 = 쇼핑몰명 |
| \`qtyUnit\` | EA | 고정 |

---

### STEP 5. 인천 입항 → 통관 → 국내 배송 (T+2~4일)

| 항목 | 내용 |
|---|---|
| 화물 위치 | 인천항/공항 입항 → 세관 창고 반입 → X-ray 검사 → 통관 심사 |
| 데이터 흐름 | 자이언트가 당사가 제출한 거래정보(TRA001)\+HWB 데이터를 기반으로 수입신고서(DKW)/통관목록(DKX)을 세관에 EDI 제출 |
| 역할 구분 | DKW/DKX 제출은 **자이언트(특송사)의 역할**. 당사는 REST API로 거래정보/인증만 담당 |
| 통관 완료 후 | 국내 택배사(롯데택배)로 인계 → 고객 배송 |

### STEP 6. 통관 결과 확인 및 최종 상태 전환 (T+3~5일)

| 항목 | 내용 |
|---|---|
| 화물 위치 | 통관 심사 완료 후 국내 택배망을 통해 고객 배송 중 |
| 통관 결과 폴링 | 물리적인 상품 준비(출고 예정/완료) 후 **3일(T+3일) 시점**에 자이언트 API를 호출하여 최종 통관/배송 상태 결과값 수신 |
| 고도몰 상태 전환 | 통관 통과 및 분할 배송 건의 경우, 쪼개진 **모든 HBL이 최종 출고 완료** 판정을 받았을 때만 마스터 주문 상태를 최종 **\`[통관완료]\`** 로 일괄 전환 |
| 이유 | 고도몰 DB 구조상 개별 송장 단위로 상태값을 제어할 수 없음 (sno 단위로만 상태 매핑) |

> 💬 **[리드자 참고]** CS문의 예상: "통관조회는 어떻게 하나요?" → CS 스크립트: "고객님, 배송중 상태에서 3~5일 뒤 통관이 완료되면 자동으로 [통관완료]로 상태가 변경됩니다."

---

## 4. 기능별 상세 매칭 (API 가이드라인 ↔ 개발 요구사항)

### 4.1 인증 체계 (PER/AUT)

| 가이드 | 기능 | 상태 | 운영 비고 |
|---|---|---|---|
| 관세청 v1.4 AUT | AUT001 토큰발급 / AUT002 폐기 | ✅ | OAuth 2.0, 24시간 자동갱신. 계정당 최대 3개 인가키 |
| NICE v1.0 | SMARTPCC_11 (PER001 대체) | ✅ | Track A/B 자동분기. 비갱신자(03) 허용. AES/GCM/NoPadding 복호화 |
| NICE v1.0 | SMARTPCC_20 (PER002 대체) | ✅ | 주소/연락처 변경 시 재검증. TRA001 이후 호출 차단 |
| NICE v1.0 | SMARTPCC_30 (PER003 대체) | ✅ | 장애 시 선승인 후 사후검증. 10TPS 제한. 3170 에러 시 CS 수동 |

### 4.2 거래정보 (TRA)

| 가이드 | 기능 | 상태 | 운영 비고 |
|---|---|---|---|
| 관세청 v1.4 | TRA001 거래정보 일괄제출 | ✅ | 최대 300건, Body 3MB. txif_sbmt_no 21자리 신규채번 |
| 관세청 v1.4 | TRA002 단건조회 | ✅ | ⚠️ 예외용만. 선호출 시 TRA003 큐 데이터 영구소멸 |
| 관세청 v1.4 | TRA003 미확인오류 폴링 | ✅ | 50건 큐. unread_cnt=0이면 30초 Sleep. 조회기간 7일 제한 |
| UNIPASS API041 | (구) PCCC 검증 | ✅ | 8/15 이후 완전 중단 → PER001로 대체 |

### 4.3 동수 WMS 연동

| 가이드 | 기능 | 상태 | 운영 비고 |
|---|---|---|---|
| 동수 협의(7월) | 공식몰 주도형 Outbound Polling | ✅ | p1만 수집, g1/c/r/f 제외 |
| 동수 협의 | 1회 조회 100건 제한, 초과 시 청크분할 | ✅ | 출고일자+HBL 모두 있는 건만 항공발송 전환 |
| 동수 협의 | 분할배송 연산 규칙 | ✅ | [실적재 수량×USD 고정단가]. 소수점 누적오차 리스크 존재 |

### 4.4 자이언트 연동

| 가이드 | 기능 | 상태 | 운영 비고 |
|---|---|---|---|
| GGATE v1.2.0 | HWB 벌크 동기화 (\`POST /api/hwb/bulk-sync\`) | 🔄 | E2E 대기 |
| GGATE v1.2.0 | 동기식 응답 실시간 파싱 → 117/118번 바인딩 | ✅ | 비동기 배치 기각됨 |
| GGATE v1.2.0 | 통관이상 배치 폴링 (HWB+3영업일부터 조회) | 🔄 | DB 상태 적재 + 어드민 필터 연동 |
| 자이언트 협의 | 교환 건은 TRA 재제출 불요 (CS 수동) | ✅ | 스마트통관을 위해 TRA제출은 필수 |

### 4.5 어드민 및 프론트엔드 기획

| 기획 | 기능 | 상태 | 운영 비고 |
|---|---|---|---|
| 쿠팡형 UI(7.1) | 체크박스 제거, 원클릭 동의 | 🔄 | **개인정보 및 결제 동의 UI 미변경 상태. 프론트엔드 최우선 작업 필요** |
| Hold 자동화(7.7) | TRA003/자이언트/PER003 실패 시 자동 ON | 🔄 | 2일 공수 |
| 실패리스트(7.2) | 117/118번 바인딩. 저장≠송출 분리. 재제출 시 txif_sbmt_no 신규채번 | 🔄 | 4일 공수 |
| 취소차단(6.3) | 취소/환불 주문 TRA001 배열에서 Drop | 🔄 | orderGoodsData.orderStatus 기준 |
| USD/HS코드(7.6) | 별도 DB 신설, 엑셀 벌크 업로드 | ✅ | 1일 공수 |
| 영문정보(7.3) | 영문주소: 행안부 API. 영문성명: 로마자 추천+수동입력 | ✅ | Papago 기각. 2일 공수 |
| 상품명(7월) | 옵션 제거, 일반 상품명만 제출 | ✅ | v1.4 지침 충족 |

---

## 5. 운영 정책

### 5.1 계도기간 및 2027년 유예 정책

| 정책 | 기간 | 상세 |
|---|---|---|
| **임시인증번호(Z99999)** | **2026.08.15 ~ 2026.09.15** | 오픈 후 1개월간 인증번호 대신 \`Z99999\`를 TRA 및 수입신고서에 기재 가능. 9/16부터 전면 불가. |
| **협력인정업체 시범적용** | **2026.08.15 ~ 2027.01.31** | 정식 지정 전이라도 CI 수집 요건을 갖추면 Track A 구매간소화 특례 시범 적용. 당사는 NICE 연동으로 해당. |
| **정식 지정 신청 개시** | **2027.01.01~** | 정식 등록 신청 접수 시작. 세관 승인 10일 이내. |
| **유예 종료** | **2027.02.01 이후** | 정식 협력인정업체만 Track A 유지. 미등록 시 혜택 완전 종료. |

**협력인정업체 등록 요건 (고시 제10조):**
1. 전자상거래업자 등록 완료
2. 직전 반기 거래정보 제출 정합성 **95% 이상** (HBL번호, 주문번호, 업체부호 일치 기준)
3. 최근 1년 내 PCCC 도용 처벌 없을 것
4. 최근 1년 내 개인정보보호법 과징금/고발 없을 것
5. 본인확인기관(NICE)을 통해 CI 취득 가능 상태일 것

> 💬 **[리드자 참고]** 여기서 핵심은 **95% 정합성**입니다. 2번 요건에 의해 계도기간부터 TRA001을 성실하게 제출해야 나중에 협력인정업체 승인을 받을 수 있습니다. 반기별 평가(1월, 7월)를 실시하며, 95% 미달 시 6개월간 특례 적용 정지됩니다.

### 5.2 취소/환불 정책 (Point of No Return)

| 시점 | 취소 가능 여부 | 처리 방식 |
|---|---|---|
| 결제전 | ✅ 가능 | 일반 취소 |
| 결제완료 ~ 상품준비중 전 | ✅ 가능 | 취소 처리, TRA001 배열에서 Drop |
| **상품준비중 (HBL 채번 후)** | ❌ **불가** | 무조건 수령 후 반품 프로세스 (해외 왕복배송비 고객 부담) |

### 5.3 송장 재발급 및 재제출 운영 정책

통관 과정 중 송장 탈거(파손/분실) 등으로 인해 **새로운 HBL 송장번호가 재발급되는 경우**의 CS 운영 원칙입니다.
- **수동 송장 업데이트 차단**: 고도몰 주문 상세에서 CS팀이 송장번호만 단순 수정/업데이트하는 행위는 **시스템 차원에서 원천 차단**합니다. (단순 업데이트 시 관세청에는 과거 송장으로 제출된 상태로 남아 데이터가 심각하게 꼬입니다)
- **전용 [재제출] 기능 사용 의무화**: 새로운 송장번호 발급 시, 반드시 어드민에 마련된 전용 **[재제출] 기능**을 통해서만 송장을 갱신해야 합니다.
- **재제출 시나리오 동작 흐름**: CS팀이 [재제출]을 통해 새 송장 입력 시 → 시스템이 새 \`txif_sbmt_no\` 자동 채번 → 관세청 \`TRA001\`에 새 송장으로 재전송 → 성공 시 자이언트 \`bulk-sync\` 에도 동시 재전송 됨.

---

## 6. 배포 전 체크리스트 (QA 및 리스크 검증)

라이브 오픈(8/15) 및 실서버 이관(8/5) 전, 모든 시스템이 정상적으로 돌아가는지 확인하기 위한 종합 QA 및 리스크 체크리스트입니다.

### 6.1 프론트엔드 및 인증 (NICE)
- [ ] **UI 변경 확인**: 결제 및 개인정보 동의 UI(쿠팡형 원클릭) 정상 노출 여부
- [ ] **Track A/B 분기 테스트**: 수하인=주문자(Track A 간소화), 수하인≠주문자(Track B SMS 인증) 정상 분기 확인
- [ ] **예외 케이스(03) 테스트**: 비갱신 대상자(03) 입력 시 임시 인증번호(Z99999 등) 우회 통과 확인
- [ ] **NICE 망 장애(3170) 테스트**: 모달 세션 타임아웃 및 세관 지연 시 \`stat_sgn=02\` 선승인 후 사후검증(PER003) 전환 확인

### 6.2 동수 창고 (WMS) 및 분할 배송 (개발 레벨 상세 체크)
- [ ] **100건 대량 배치 송수신 및 JSON 파싱**: 동수 WMS \`p1\` 100건 배치 처리 시 JSON Body Parsing Exception 없이 100% 맵핑되는지 점검
- [ ] **무게(Weight) API NULL 대응**: 실측 무게값이 NULL 또는 문자열 파싱 에러로 떨어질 경우 기본값 0.0 처리 혹은 예외 처리 여부
- [ ] **레이스 컨디션 및 트랜잭션**: 동수 배치와 고도몰 상태 전환 타이밍 충돌 시 DB 트랜잭션 락/데드락 발생 없이 g1 수집 방어 여부
- [ ] **분할 배송 소수점 로직**: 분기 연산 시 \`Float/Double\` 오차 방어 로직 (마지막 HBL에 차액을 무조건 할당하여 마스터 총액과 정확히 일치 검증)

### 6.3 관세청 (TRA) 및 자이언트 연동 (Timeout & Payload)
- [ ] **API 응답 타임아웃(Timeout) 엣지 케이스**: 관세청 TRA001 / 자이언트 동기화 시 10초 이상 지연(Connection/Read Timeout) 발생 시 재시도(Retry) 또는 Dead-letter 큐 적재 로직 확인
- [ ] **TRA001 30분 룰 강제 테스트**: 동일 \`ord_no\` 30분 내 중복 방어가 실제 \`ord_cmpl_dttm\` 컬럼 비교를 통해 완벽히 Drop 되는지 검증
- [ ] **자이언트 에러 응답 파싱**: 자이언트 HTTP 500/400 에러 시 Response Body 내의 상세 사유가 고도몰 117/118번 컬럼의 VARCHAR 길이 제한을 초과하지 않고 안전하게 바인딩(TRUNCATE) 되는지 점검
- [ ] **3일 후(T+3) 폴링 스케줄러 데몬**: 배송 시작 후 +3 영업일 뒤 자이언트 폴링 스케줄러가 데몬으로 안정적으로 돌면서 \`[통관완료]\`로 일괄 전환하는지 서버 로그 검증

### 6.4 어드민 제어 및 CS 정책
- [ ] **수동 송장 변경 차단 무결성**: 어드민에서 꼼수(DOM 조작/패킷 탬퍼링)로 송장번호를 강제 수정하더라도 백엔드 API 단에서 막아내는지(Validation) 점검
- [ ] **[재제출] 다중 트랜잭션 성공/실패 롤백**: 새 송장 등록 시 [새 채번 → TRA001 제출 → 자이언트 전송] 3단계 트랜잭션 중 중간에 터졌을 때(ex: TRA001 성공, 자이언트 실패) 데이터 불일치를 방어할 롤백/Hold 로직 확인

### 6.5 시스템 및 인프라 (8/5 실서버 이관용)
- [ ] \`sale_ents_id\` 원복: Staging(K26000127)에서 **Prod(Null)** 로 변경 확인
- [ ] **방화벽 ANY 오픈 확인**: 관세청 통합테스트 전 방화벽 정상 오픈 여부 확인 (Prod: \`103.87.116.64\`)
- [ ] **OAuth 인증 토큰(AUT001)**: 24시간 토큰 자동 갱신 실패 시(만료) 재시도 로직이 백그라운드에 구현되어 있는지 점검
- [ ] **TLS 1.3 통신 확인**: 관세청 및 자이언트 서버와 TLS 1.3 통신이 정상적으로 맺어지는지 점검

---

## 7. 예상 리스크 및 대응 방안 (Risk Management)

> 💬 **[리드자 참고]** 이 테이블은 전체 개발 히스토리(채팅, 회의록, 소스 가이드라인)에서 추출한 **현실적으로 발생 가능한 모든 리스크**를 종합한 것입니다. 경영진에게는 "우리가 이만큼 인지하고 준비했다"는 것을 보여주는 핵심 자료입니다.

| # | 카테고리 | 예상 리스크 | 배경 | 예상 영향 | 대응 방안 |
|---|---|---|---|---|---|
| 1 | 테스트 | **TRA003 Silent Failure (사각지대)** | 테스트 환경에서 관세청 에러를 강제로 유발할 방법이 없음 | 오픈 후 통관 반려 사실을 며칠 뒤에야 인지. 대형 고객 컴플레인 | 오픈 후 최소 2주간 매일 오전/오후 개발사+운영팀 교차 대사 작업 |
| 2 | 테스트 | **동수 WMS Staging = 실서버** | 동수 테스트 환경이 실서버 데이터를 리턴하며, 15~18시에만 테스트 가능 | 통합 테스트 시간 제약으로 충분한 QA 불가 | ord_no 수동 삽입으로 우회 + E2E는 집중 시간대 배정 |
| 3 | 인프라 | **방화벽 ANY 오픈 미확정** | 관세청이 통합테스트 전 방화벽 ANY 오픈 시점을 별도 통보 예정이나 아직 미통보 | 방화벽 미오픈 시 연동 테스트 자체 진행 불가 | 관세청 eccs@korea.kr 주간 단위 일정 재확인 메일 발송 |
| 4 | 인프라 | **관세청 서버 에러 시 (점검/장애)** | 관세청 정기 점검이나 예고 없는 서버 장애 발생 시 TRA001/TRA003 전면 불통 | 실패리스트 대량 적재, 신규 주문 거래정보 제출 전면 지연 | 실패큐(Dead-letter) 적재 → 서버 복구 후 자동 일괄 재처리. 2시간 이상 장기 장애 시 운영팀 수동 전환 |
| 5 | 연동 | **동수-고도몰 상태 레이스 컨디션** | 동수 배치와 고도몰 주문 상태 전환의 타이밍 충돌 | 치명적인 이중출고 (대형 물류사고) | 초기 1주간 매일 DB 대사 스크립트 실행. p1→g1 전환 시 DB 락으로 방어 |
| 6 | 연동 | **연휴/명절 후 배치 폭주** | 공휴일 연휴 후 적체된 수십~수백 건이 한꺼번에 배치 | TRA001 300건/동수 100건 제한으로 병목, 서버 OOM 또는 Gateway Timeout | 배치 간 30초 간격 + 청크 단위 순차 실행 |
| 7 | 연동 | **자이언트 500건 벌크 미검증** | GGATE API가 단건→500건 확장되었으나 실제 대량 테스트 미진행 | 응답 지연/타임아웃으로 전건 실패 처리 | 100건 청크 + 타임아웃 30초 방어 + 자이언트 김현진 연구원과 사전 부하 테스트 협의 |
| 8 | 데이터 | **분할배송 소수점 누적오차** | USD 단위 소수점 버림 연산이 누적되면 마스터 총액과 불일치 | 세액 불일치로 관세청 반려 (3000 에러) | 마지막 박스에 나머지 차액 일괄 할당 로직 구현 완료. QA 검증 필수 |
| 9 | 데이터 | **30분 룰 Edge Case** | 동일 ord_no로 30분 이내 재제출 시 관세청이 자동 거부 | TRA001 대량 반려 발생 가능 | ord_cmpl_dttm 저장하여 시스템 자체 방어 + 관세청에 공식 질의 예정 |
| 10 | CS/운영 | **송장 탈거 후 CS 오대응** | CS 직원이 [재제출]을 사용하지 않고 송장만 메모/수동 수정할 경우 | 적하목록과 불일치로 통관 전면 보류 + 과태료 대상 | 수동 변경 시스템 차단 + CS 스크립트 및 어드민 운영 가이드 교육 |
| 11 | CS/운영 | **분할배송 CS 문의 폭주** | 고도몰은 마스터 단위 상태 제어만 가능하여 "송장은 떴는데 배송중으로 안 바뀐다" | CS 대응 시간 폭증 | CS 스크립트에 분할배송 안내 사전 명시. 알림톡 자동 발송 |
| 12 | 인증 | **NICE 모달 세션 타임아웃** | 고객이 인증창을 오래 놓아두면 세션 만료되어 결제 자체가 무산 | 이탈률 상승 + CS 폭주 | 재인증 UX 흐름 구현(재발송 버튼) + 안내 문구 |
| 13 | 인증 | **NICE AES/GCM 복호화 키 변경** | NICE 측에서 암호화 키를 사전 통보 없이 갱신할 경우 | SMARTPCC_11 전면 장애 → 결제 전면 차단 | NICE 신용철 매니저와 키 변경 통보 SLA 사전 합의 |
| 14 | 정책 | **계도기간 종료 후 미대응 (9/16~)** | 계도기간(8/15~9/15) 종료 후 Z99999 임시인증번호 전면 불가 | 미갱신 고객 결제 실패 폭주 | 9/1부터 미갱신 고객 대상 사전 알림톡 캠페인. 고객 안내 배너 강화 |
| 15 | 정책 | **95% 정합성 미달 → 협력인정업체 탈락** | 반기별(1월/7월) 관세청 평가에서 거래정보 정합성 95% 미달 시 | Track A(구매간소화) 특례 6개월 정지. 모든 고객 Track B로 강제 전환 → UX 악화 | 계도기간부터 TRA001 제출 정확도 모니터링 대시보드 운영. 월간 정합성 리포트 자체 생성 |

---

## 8. 개발사 (Geek Studio) 시연 항목

> 💬 **[리드자 참고]** 시연은 위의 Part 1~6을 설명한 후 마지막에 개발사가 주도하여 진행합니다. "지금 설명드린 내용이 실제 화면에서 어떻게 동작하는지 시연하겠습니다"로 연결하세요.

### 7.1 결제창 인증 유형별 시연 (3건)

| # | 시연 유형 | 테스트 조건 | 확인 포인트 |
|---|---|---|---|
| 1 | **갱신용 (일반 SMS, Track B)** | 주문자 ≠ 수하인 또는 CI 불일치 | SMS 인증창 노출 → 6자리 입력 → 검증 통과 |
| 2 | **구매간소화용 (Track A)** | 주문자 = 수하인, CI 일치 | 입력창 없이 자동 통과 (프리패스) |
| 3 | **비갱신용 (예외 케이스)** | rspn_tp:03 응답 대상자 | 입력창 없이 자동 통과 (03 예외 처리) |

### 7.2 백엔드/어드민 제어 시연 (2건)

| # | 시연 항목 | 제약사항 | 확인 포인트 |
|---|---|---|---|
| 1 | **실패 건 수동 재제출** | TRA003 강제 에러 유발 불가능 → 과거 실패 이력 샘플 활용 | 재제출 버튼 클릭 → 새 txif_sbmt_no 채번 확인 → 정상 접수 |
| 2 | **출고보류(Hold) 플래그 자동세팅** | 에러 발생 시 자동으로 Hold ON 되는지 확인 | Hold 플래그 상태 확인 + 실패 리스트 엑셀 다운로드 |

> 💬 **[리드자 참고]** 시연 후 "동수 API 호출은 테스트 환경 제약으로 건너뛰었습니다"라고 멘트하면 됩니다. 또한 TRA003 강제 에러 시연이 불가능하므로, 이 부분은 **라이브 후 리스크 리스트로 관리**한다고 설명하세요.

---

## 9. 마일스톤 (7/19 기준)

| Phase | 단계 | 일정 | 현황 |
|---|---|---|---|
| — | 1차 자율테스트 | 04.13~04.24 | ✅ |
| — | API 휴지기 | 04.27~05.01 | ✅ |
| — | 2차 통합테스트 | 05.11~05.22 | ✅ |
| P1 | 코어모듈 기술검증 | ~05.22 | ✅ |
| P2 | 운영환경준비 (업체부호 발급 등) | 06.01~06.04 | ✅ |
| P3 | 외부API연동 (NICE 테스트베드 등) | 06월 | ✅ |
| P4 | 모듈결합 QA (4자망) | 07.01~ | 🔄 **P5와 병행** |
| P5 | E2E 통합테스트 | 07.10~08.04 | 🔄 **D-27** |
| P6 | 🚀 **실서버 이관 (Prod Deploy)** | **2026.08.05** | ⏳ 대기 |
| — | **전사 공유 및 시연 미팅** | **다음주** | 📅 예정 |
| — | 🚀 **정식 오픈 (Live)** | **2026.08.15** | ⏳ D-27 |

---

## 10. 고정 파라미터 레퍼런스

| 파라미터 | 값 | 설명 |
|---|---|---|
| elcm_pcd | A | 독립자사몰 직접판매 |
| sale_ents_sgn | K26000127 | 업체부호 |
| sale_ents_id | **Staging:K26000127 / Prod:Null** | ⚠️ 원복필수 |
| prod_unprc_curr_cd | USD | 고정 |
| ord_amt_curr_cd | USD | 고정 |
| cscl_agcs | Null | 통관대행료 제외 |
| shipperName | DONGSHU E-BUSINESS | 중국 현지 창고명 |
| domesticCarrierName | 롯데택배 | 국내 배송사 |
| brokerCode | K26000127 | 9자리 고정 |
| qtyUnit | EA | 고정 |

---

> 💬 **[리드자 참고]** 이 문서의 \`💬 [리드자 참고]\` 표기가 된 부분은 이해하고 암기한 후 삭제하여 자료 공유용으로 전환하시면 됩니다. 내용 수정이나 추가 필요 시 말씀해 주세요.
`,
  'scm-dashboard': `# 1. 문제 정의 및 기획 배경
---
### 문제점 인식
- 수입 분유의 발주-입고 리드타임이 6개월 이상으로, 품절 시 즉시 대응이 불가능하며 과재고 시 유통기한 폐기 리스크가 상존
- 기존 재고 관리: 엑셀 파일 기반 수기 관리. 수십 개 채널의 판매·입출고 데이터가 별도 시트로 분산되어 실시간 현황 파악 불가
- PO 발행 시 환율 변동에 따른 재고 자산 가치를 수동 계산. 담당자가 바뀌면 수식이 깨지는 구조적 문제
- 수요 예측 부재: 매일 1시간씩 수기로 재고 확인·회전율 계산, 주 2시간씩 발주-생산-입고 매칭·재고자산 평가를 수행. 과거 판매량만으로 경험적 발주를 진행하여 품절/과재고가 반복
### 프로젝트 목표
- 파편화된 엑셀 데이터를 단일 DB로 통합하고, 수요 예측·FEFO 역산·재고 시뮬레이션을 자동화하여 데이터 기반 발주 의사결정 체계를 확립
- 수기로 파일을 만들고 편집하는 반복 업무를 제거하고, 정해진 양식만 업로드하면 즉시 데이터화·계산·시뮬레이션이 되는 구조를 구현

# 2. 진행 과정 및 역할
---
### 기술 스택 선정 및 아키텍처 설계 (단독)
- Python 3.11 / FastAPI / Uvicorn: 경량 비동기 웹 프레임워크. 로컬 환경에서도 빠른 응답 속도 확보
- SQLite 3: 별도 DB 서버 없이 파일 기반 동작. IT 인프라 의존도 제거 (별도 서버 비용/승인 불필요)
- Pandas / NumPy: 수요 예측 연산 및 데이터 변환 처리
- Tailwind CSS / Chart.js: 실무자가 직관적으로 확인할 수 있는 대시보드 UI
### DB 스키마 설계 (오버엔지니어링 방지)
- 3차 정규화(3NF) 기반 독립 테이블 설계: 마스터 정보(상품·채널·공급사), 입출고 트래킹, 파이프라인(PO 진행 상태), 인보이스별 환율 정보를 각각 분리
- PO-Invoice 근삿값 매칭 알고리즘: PO와 Invoice 간 다대다 관계를 처리하는 매칭 로직. 복잡한 ERD 없이 실무에 필요한 수준으로 설계
### 핵심 비즈니스 로직
- 24주 수요 예측 및 수요 평탄화 엔진: 과거 판매 데이터 기반 채널별 24주 수요 예측. 극단적 편차 보정으로 1년치 발주 예정량 산출
- FEFO 역산 로직: 유통기한과 채널별 판매 속도를 역산하여 '이 재고는 몇 주 안에 소진되어야 하는가'를 자동 산출. 채널 간 이관 판단 근거 제공
- 채널별 재고 자산 금액 시뮬레이터: 인보이스별 매입 환율 적용. 다음 PO의 캐시플로우 참고 기준으로 활용
- 이벤트성 과거 데이터 수집·대입 시뮬레이터: 프로모션/시즌 효과를 수요 예측에 반영
### 운영 환경
- Windows 11 작업 스케줄러 기반 자동 구동: 출근 시 자동으로 서버가 기동, 브라우저 접속만으로 최신 데이터 확인
- 보안: 내부 IP 접근 제한. 허가된 사용자만 접속 가능한 구조
- AI 도구를 코딩 보조로 활용하되, 아키텍처 및 비즈니스 로직 설계는 전적으로 자체 수행

# 3. 결과 및 성과
---
### 정량적 성과
- 파편화된 엑셀 → 단일 DB 통합: 수만 건 데이터의 실시간 연산 및 시각화
- 수요 예측 기반 선제적 발주 체계로 전환: 품절/과재고 리스크 사전 방어
- 재고 확인·회전율 계산: 일 1시간 → 5분(대시보드 조회). 발주-생산-입고 매칭·자산 평가: 주 2시간 → 자동 산출
- 수기 엑셀 파일 생성·편집 불필요: 정해진 양식 업로드만으로 즉시 데이터화 및 시뮬레이션 (업무 효율 증대)
### 정성적 성과
- 팀 운영 도구로 안착: 일 단위로 팀원들이 의사결정에 활용
- '감'이 아닌 '수치'로 발주 논의가 가능해짐: 데이터 기반 의사결정 문화의 기반 마련

# 4. 회고
---
### 문제 해결: 현업 참여형 설계(Co-Design)
- 초기 도입 후 팀원들의 UI/UX 편의성이 맞지 않아 안착까지 약 2개월 지연. 이후 피드백을 수용하여 수정
- 완벽한 결과물의 일방적 제공보다 핵심 기능 배포 후 사용자와 피드백을 주고받는 방식이 실용적임을 확인
- 팀원들의 정량적 리소스 확보 ⇒ 다음 프로젝트나 프로세스 개선 아이디어 창출 가능
### 개인 성장
- 비즈니스 도메인(SCM)의 요구사항을 기술적 시스템 설계로 변환하는 전체 과정을 단독 경험
- 기술적 완성도보다 현업의 맥락 파악이 우선되어야 함을 체득

# Reference
---
## 대시보드 KPI 시각화
아래는 대시보드 메인 화면의 24주 수요 예측 시뮬레이션 그래프 컨셉입니다. 실제 운영 스크린샷으로 교체할 예정입니다.

- **파편화된 엑셀 → 단일 DB 통합  **수만 건 데이터의 실시간 연산 및 시각화**



- **수요 예측 기반 선제적 발주 체계  **품절/과재고 리스크 사전 방어**



- **수기 엑셀 업무 제거  **정해진 양식 업로드만으로 즉시 데이터화·시뮬레이션**



## DB 스키마 ERD 

\`\`\`mermaid
erDiagram
    PRODUCT_DB ||--o{ ORDER_DB : "발주"
    PRODUCT_DB ||--o{ PRODUCTION_DB : "생산"
    PRODUCT_DB ||--o{ OUTFLOW_HISTORY : "출고"
    PRODUCT_DB ||--o{ MONTHLY_ORDER_PLAN : "발주계획"
    ORDER_DB ||--o| PRODUCTION_DB : "매칭"
    WAREHOUSE_DB ||--o{ INVENTORY_SNAPSHOT : "재고"
    WAREHOUSE_DB ||--o{ OUTFLOW_HISTORY : "출고"
    WAREHOUSE_DB ||--o{ WAREHOUSE_PRODUCT_MOQ : "MOQ"
    PRODUCT_DB ||--o{ WAREHOUSE_PRODUCT_MOQ : "MOQ"
    WAREHOUSE_DB ||--o{ LOGISTICS_COST_DB : "물류비"
    PRODUCT_DB {
        string product_code PK
        string product_name
        float purchase_price
    }
    WAREHOUSE_DB {
        string warehouse_name PK
        string warehouse_type
        int allowed_expiry_days
    }
    INBOUND_DB {
        string invoice_no
        date expiry_date
        float exchange_rate
        string status
    }
\`\`\`

## 수요 예측 엔진 (24주 시뮬레이션)
\`\`\`mermaid
flowchart TD
    A["직전 12주 출고이력"] --> E["주차별 평활화"]
    A --> F["감모 버퍼"]
    B["판매 실적"] --> F
    C["파이프라인 입고"] --> H
    D["현재고"] --> H
    E --> H["24주 시뮬레이션"]
    F --> H
    G["가중치 0.5~2.0"] --> H
    H --> I{"기말재고 < 0?"}
    I -->|"12주내"| J["항공편 경고"]
    I -->|"부족분"| K["MOQ 올림 → 발주 제안"]
    style H fill:#fef3c7,stroke:#d97706
    style J fill:#fee2e2,stroke:#dc2626
    style K fill:#dcfce7,stroke:#16a34a
\`\`\`
### 핵심 수식 (forecasting.py)
\`\`\`python
# 24주 미래 재고 시뮬레이션 공식
예상기말재고(W) = (
    전주기말재고
    + 파이프라인_입고
    + 입고예정
    - (주간수요 × weight_factor + 감모버퍼)
)

# 주간수요: 직전 12주 단순 출고량 평균 → 24주 Flat 상수
# 감모버퍼: (1/12) × Σ(단순출고량 - 순수판매량)
# weight_factor: 실무자 수동 조절 (0.5 ~ 2.0)
# 항공편 트리거: W+12 재고 < 0 시 경고
\`\`\`
## FEFO 유통기한 역산
\`\`\`mermaid
flowchart LR
    A["현재고"] --> B{"잔여 180일?"}
    B -->|Yes| C["임박 재고"]
    C --> D["소진일 예측"]
    D --> E["폐기 위험 금액"]
    E --> F{"이관?"}
    F -->|Yes| G["이관"]
    F -->|No| H["프로모션"]
    style C fill:#fef3c7,stroke:#d97706
    style E fill:#fee2e2,stroke:#dc2626
\`\`\`
### 기술 스택
- Backend: Python 3.11 / FastAPI 0.115 / SQLAlchemy 2.0
- Database: SQLite WAL (11 tables, 3NF)
- Frontend: Jinja2 SSR + Vanilla JS + Chart.js 4.4
- 인증: JWT + bcrypt (12시간 토큰)
- 스케줄러: APScheduler (3시간 자동 백업)
- 엑셀 I/O: pandas + openpyxl (6종 양식)

## 시스템 UI 스크린샷
![대시보드 메인](/assets/SCM-dashboard02_dashboard.png)
<div style="display:grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
  <img src="/assets/SCM-dashboard03_inventory.png" style="width: 100%; border-radius: 8px;" alt="재고 현황" />
  <img src="/assets/SCM-dashboard04_expiry.png" style="width: 100%; border-radius: 8px;" alt="유통기한 관리" />
  <img src="/assets/SCM-dashboard05_order_plan.png" style="width: 100%; border-radius: 8px;" alt="발주 시뮬레이션" />
  <img src="/assets/SCM-dashboard06_matching.png" style="width: 100%; border-radius: 8px;" alt="인보이스 매칭" />
</div>
![설정 및 로그인](/assets/SCM-dashboard07_settings.png)
`,
  'b2b-mall': `# 1. 문제 정의 및 기획 배경
---
### 문제점 인식
- 전국 140여 개 산후조리원의 분유/물품 주문을 구글 폼 + 수기 엑셀로 운영. 주문·출고·정산 모든 프로세스가 수작업에 의존
- 팀원 2명이 매일 30분씩 주문 확인 후 출고 처리, 매월 1\~2일을 수기 정산에 사용
- 수기 계좌이체 확인·매칭 후 출고: 담당자 판단으로 '먼저 출고하고 입금 받는' 등 기존 프로세스를 벗어나는 변수가 빈번. 담당자 피로도 높음
- 거래명세서를 매일 사람이 수기로 작성하여 발송
- 특수 고객(산후조리원)의 높은 CS 강도: 매일 전화로 송장번호, 출고/입고 일정, 상품 재고, 입금 확인 등 반복 문의
- 공급가·매입가 마진 구조상 PG 결제 수수료율을 절대 감당할 수 없는 원가 구조
- 데이터 파편화: 주문(구글 폼), 출고(WMS), 정산(엑셀)이 각각 별도 관리
### 프로젝트 목표
- PG 수수료를 원천 차단하면서도 결제-출고를 자동화하고, 담당자 재량에 의한 변수를 시스템 정책으로 통제
- 파편화된 주문·출고·정산 데이터를 단일 시스템으로 통합하여 데이터 정합성을 확보하고, 국세청 신고용 정산 데이터를 자동 산출

# 2. 진행 과정 및 역할
---
### 플랫폼 아키텍처 설계
- 고도몰5 Pro 멀티숍 구조 채택: 회원 DB 공유 구조로 별도 SSO 개발 비용 절감
- PG 결제 수수료 원천 차단: 공급가·매입가 마진율 구조상 외부 PG를 의도적으로 배제. 현금성 포인트(물품) + 계좌이체(분유)로 결제 수단을 이원화하고, 계좌 스크래핑 API 기반 무통장 입금 자동 대조·승인 체계 설계
### 결제-출고 정책 전환
- 기존: 수기 입금 확인 → 담당자 판단으로 선출고/후입금 등 변수 허용 → 정산 불일치, 미수금 발생, 담당자 피로
- 전환: '결제 매칭이 완료되지 않으면 주문도, 출고도 불가'라는 확고한 정책을 시스템으로 강제. 담당자 재량에 의한 예외를 원천 차단하여 데이터 정합성과 운영 안정성을 동시에 확보
### 결제 및 발주 자동화 로직
- 카테고리별 하이브리드 결제 라우팅: 장바구니 상품 속성에 따라 결제 수단 자동 분기 (물품: 포인트 100% / 분유: 무통장 자동 확인 / 특정 등급: 별도 정책)
- 공급사 SCM 자동 발주 라우팅: 입금 확인 즉시 해당 공급사에만 주문이 자동 격리 노출. 수기 발주 원천 차단
- 거래명세서 자동 발송: 기존 수기 작성·발송 → 24시간 실시간 자동 발송으로 전환
- 국세청 연동: 현금영수증 자동 발행, 월말 세금계산서 일괄 전자 발행. 정산 데이터 정합성이 확보되어 월 1회 신고를 위한 데이터 추출이 즉시 가능
### CS 부담 흡수 설계
- 조리원 마이페이지에서 주문 이력·송장번호·배송 상태·포인트 잔액·입금 확인 여부를 실시간 조회 → 반복 전화 문의 대폭 감소
- 알림톡 자동 발송(주문 확인, 출고 완료, 송장번호): LMS(건당 3.0P) → 알림톡(건당 0.6P), 비용 80% 절감
### 운영 안정성 확보
- CronJob 스케줄러 기반 월말 포인트 자동 소멸, 마이페이지 사업자번호/주소 임의 변경 방지 백엔드 보안 가드
### 개발사 협업
- 시스템 요건을 코드 레벨(DB 테이블·스킨 파일·컨트롤러)까지 명세하여 개발사 SOW 작성
- 조리원의 오프라인 결제 관행과 당사 출하 로직 간의 간극을 조율하여 복잡한 비즈니스 흐름을 단일 시스템으로 통합

# 3. 결과 및 성과
---

- **주문 확인·출고 업무  **83% 단축**  \|  팀원 2명 × 일 30분 → 5분



- **월 정산  **100% 자동화**  \|  월 1\~2일 수기 → 0일. 정산, 분석 등 데이터 즉시 추출



- **결제-출고 정책 전환  **변수 원천 차단**  \|  담당자 재량 → 시스템 강제. 미수금·정산 불일치 제거



- **거래명세서  **수기 → 실시간 자동 발송**  \|  24시간 즉시 발송



- **메시징 비용  **80% 절감**  \|  LMS 3.0P → 알림톡 0.6P



- **PG 수수료  **0원**  \|  마진 구조 보전을 위한 결제 체계 설계
### 
		pc
		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/3361c9d9-0f49-81d8-a453-000300867bf8/04866e00-4253-45bc-adae-5c2777c0e922/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TKOHGYXP%2F20260717%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260717T212502Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFUYAduEUa43wv1ZU4gMZdPUs%2Fg8NsO%2B2hRsHv4Alx8yAiEA9O02xFwZOo7meSlLvwJP5rj%2BdKjfMYN4FBbeJSOM%2Fckq%2FwMIZhAAGgw2Mzc0MjMxODM4MDUiDAN%2FbTonw5AHL5eDRyrcA8UW2lQ3QYMfW0pS3UWDJiajiDZFdgUcdabBeSEEOuAooROVUQN7HrfXUQyhbD%2BzftT0pAa40TUaiXCGnTNMDzXHu5dgR6WF4QVja86X%2F7cA8W4SmFx8VKsuZGuzdZfBrbQlcwnGZefH6MiBX%2F01v0PS%2BSe%2FH6Ya%2FXk74PBfzGtFQdSojwIK2JiZxpGVWGjMApl9Ib%2FsPtGxgzaYWkdWEJKefRul3EAsLOFptroqiQo3cGjVRXQMYB%2FVyWQb%2BDphCm490RNi%2B3wvp6jZPu34g4BrYPiTDrxZPECIR0Sk3tluQRD2Lsep0OeH38N6L8KSqKUnXE5Y2F9WbG1CNYqQJ4%2FQ%2F8Qae9EMd69GWpiK8rd7%2Bmwk%2FQ4puIkCFwcBajkDOTHO8o%2B4S0ma3oOBwwdraN%2Ff1W16gK%2FCaeo1eFNO4lMtAGORUn0qf7U%2FYf%2B3HpXYu5taQpdZfGocOINUl0xERNv8C5PNV0umRodou9lMrQGGwcnh2qR4EK8lj9xSngEgRjg%2FpcizUzbQfnUSvxeuzMjyA%2Bqdm6KWXwreJbx8blySjAkwRyxthUeYbTAc%2F%2BmvwhRvD54W3jonvZnDCGuTde%2Bxp9pKWpcLGfEI0LXwMD3oaeh0tcBnKCT7I%2B7zMMir6tIGOqUBrYBySjOffQZeIkenRhMevv89FOoxVeVMYVhP8lCoQepB%2B1Kfovu2Jzc1IV76jvAboQmUaG9CSSjVwgAlD2lUSb%2F7ANaagsolzkzwD09ErFkcpX4L6URvl6YeS%2BGpPdQmPq1J%2FC0IhaK6Bau5430j%2BgheCMZ5R7sXXuXrw4700vNsCpHo%2Fg7UGogp1l1Ne37AD0H9ApHaK8TiojiptNpzXBL2S8Pg&X-Amz-Signature=a01644e24928a6c441065c77b0f7fd20759165aa37229f3a0fa3d75e4762e102&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/3361c9d9-0f49-81d8-a453-000300867bf8/f1776d04-a9aa-456a-ad16-21605694d248/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TKOHGYXP%2F20260717%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260717T212502Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFUYAduEUa43wv1ZU4gMZdPUs%2Fg8NsO%2B2hRsHv4Alx8yAiEA9O02xFwZOo7meSlLvwJP5rj%2BdKjfMYN4FBbeJSOM%2Fckq%2FwMIZhAAGgw2Mzc0MjMxODM4MDUiDAN%2FbTonw5AHL5eDRyrcA8UW2lQ3QYMfW0pS3UWDJiajiDZFdgUcdabBeSEEOuAooROVUQN7HrfXUQyhbD%2BzftT0pAa40TUaiXCGnTNMDzXHu5dgR6WF4QVja86X%2F7cA8W4SmFx8VKsuZGuzdZfBrbQlcwnGZefH6MiBX%2F01v0PS%2BSe%2FH6Ya%2FXk74PBfzGtFQdSojwIK2JiZxpGVWGjMApl9Ib%2FsPtGxgzaYWkdWEJKefRul3EAsLOFptroqiQo3cGjVRXQMYB%2FVyWQb%2BDphCm490RNi%2B3wvp6jZPu34g4BrYPiTDrxZPECIR0Sk3tluQRD2Lsep0OeH38N6L8KSqKUnXE5Y2F9WbG1CNYqQJ4%2FQ%2F8Qae9EMd69GWpiK8rd7%2Bmwk%2FQ4puIkCFwcBajkDOTHO8o%2B4S0ma3oOBwwdraN%2Ff1W16gK%2FCaeo1eFNO4lMtAGORUn0qf7U%2FYf%2B3HpXYu5taQpdZfGocOINUl0xERNv8C5PNV0umRodou9lMrQGGwcnh2qR4EK8lj9xSngEgRjg%2FpcizUzbQfnUSvxeuzMjyA%2Bqdm6KWXwreJbx8blySjAkwRyxthUeYbTAc%2F%2BmvwhRvD54W3jonvZnDCGuTde%2Bxp9pKWpcLGfEI0LXwMD3oaeh0tcBnKCT7I%2B7zMMir6tIGOqUBrYBySjOffQZeIkenRhMevv89FOoxVeVMYVhP8lCoQepB%2B1Kfovu2Jzc1IV76jvAboQmUaG9CSSjVwgAlD2lUSb%2F7ANaagsolzkzwD09ErFkcpX4L6URvl6YeS%2BGpPdQmPq1J%2FC0IhaK6Bau5430j%2BgheCMZ5R7sXXuXrw4700vNsCpHo%2Fg7UGogp1l1Ne37AD0H9ApHaK8TiojiptNpzXBL2S8Pg&X-Amz-Signature=a16c44405a2e985a1d4743ed3882a604effa9f5c45bc310ad6c7768aed8a0d89&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
### 
		mobile
		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/3361c9d9-0f49-81d8-a453-000300867bf8/be5737ea-311a-4c26-b3b0-7d9134c5eba0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TKOHGYXP%2F20260717%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260717T212502Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFUYAduEUa43wv1ZU4gMZdPUs%2Fg8NsO%2B2hRsHv4Alx8yAiEA9O02xFwZOo7meSlLvwJP5rj%2BdKjfMYN4FBbeJSOM%2Fckq%2FwMIZhAAGgw2Mzc0MjMxODM4MDUiDAN%2FbTonw5AHL5eDRyrcA8UW2lQ3QYMfW0pS3UWDJiajiDZFdgUcdabBeSEEOuAooROVUQN7HrfXUQyhbD%2BzftT0pAa40TUaiXCGnTNMDzXHu5dgR6WF4QVja86X%2F7cA8W4SmFx8VKsuZGuzdZfBrbQlcwnGZefH6MiBX%2F01v0PS%2BSe%2FH6Ya%2FXk74PBfzGtFQdSojwIK2JiZxpGVWGjMApl9Ib%2FsPtGxgzaYWkdWEJKefRul3EAsLOFptroqiQo3cGjVRXQMYB%2FVyWQb%2BDphCm490RNi%2B3wvp6jZPu34g4BrYPiTDrxZPECIR0Sk3tluQRD2Lsep0OeH38N6L8KSqKUnXE5Y2F9WbG1CNYqQJ4%2FQ%2F8Qae9EMd69GWpiK8rd7%2Bmwk%2FQ4puIkCFwcBajkDOTHO8o%2B4S0ma3oOBwwdraN%2Ff1W16gK%2FCaeo1eFNO4lMtAGORUn0qf7U%2FYf%2B3HpXYu5taQpdZfGocOINUl0xERNv8C5PNV0umRodou9lMrQGGwcnh2qR4EK8lj9xSngEgRjg%2FpcizUzbQfnUSvxeuzMjyA%2Bqdm6KWXwreJbx8blySjAkwRyxthUeYbTAc%2F%2BmvwhRvD54W3jonvZnDCGuTde%2Bxp9pKWpcLGfEI0LXwMD3oaeh0tcBnKCT7I%2B7zMMir6tIGOqUBrYBySjOffQZeIkenRhMevv89FOoxVeVMYVhP8lCoQepB%2B1Kfovu2Jzc1IV76jvAboQmUaG9CSSjVwgAlD2lUSb%2F7ANaagsolzkzwD09ErFkcpX4L6URvl6YeS%2BGpPdQmPq1J%2FC0IhaK6Bau5430j%2BgheCMZ5R7sXXuXrw4700vNsCpHo%2Fg7UGogp1l1Ne37AD0H9ApHaK8TiojiptNpzXBL2S8Pg&X-Amz-Signature=119387b3e57140142ba65714982aef5ce15f06858bcff473b85d613cee91c8fc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/3361c9d9-0f49-81d8-a453-000300867bf8/f476a0c5-14f8-48a3-bc2f-9e3936a6eeee/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TKOHGYXP%2F20260717%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260717T212502Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFUYAduEUa43wv1ZU4gMZdPUs%2Fg8NsO%2B2hRsHv4Alx8yAiEA9O02xFwZOo7meSlLvwJP5rj%2BdKjfMYN4FBbeJSOM%2Fckq%2FwMIZhAAGgw2Mzc0MjMxODM4MDUiDAN%2FbTonw5AHL5eDRyrcA8UW2lQ3QYMfW0pS3UWDJiajiDZFdgUcdabBeSEEOuAooROVUQN7HrfXUQyhbD%2BzftT0pAa40TUaiXCGnTNMDzXHu5dgR6WF4QVja86X%2F7cA8W4SmFx8VKsuZGuzdZfBrbQlcwnGZefH6MiBX%2F01v0PS%2BSe%2FH6Ya%2FXk74PBfzGtFQdSojwIK2JiZxpGVWGjMApl9Ib%2FsPtGxgzaYWkdWEJKefRul3EAsLOFptroqiQo3cGjVRXQMYB%2FVyWQb%2BDphCm490RNi%2B3wvp6jZPu34g4BrYPiTDrxZPECIR0Sk3tluQRD2Lsep0OeH38N6L8KSqKUnXE5Y2F9WbG1CNYqQJ4%2FQ%2F8Qae9EMd69GWpiK8rd7%2Bmwk%2FQ4puIkCFwcBajkDOTHO8o%2B4S0ma3oOBwwdraN%2Ff1W16gK%2FCaeo1eFNO4lMtAGORUn0qf7U%2FYf%2B3HpXYu5taQpdZfGocOINUl0xERNv8C5PNV0umRodou9lMrQGGwcnh2qR4EK8lj9xSngEgRjg%2FpcizUzbQfnUSvxeuzMjyA%2Bqdm6KWXwreJbx8blySjAkwRyxthUeYbTAc%2F%2BmvwhRvD54W3jonvZnDCGuTde%2Bxp9pKWpcLGfEI0LXwMD3oaeh0tcBnKCT7I%2B7zMMir6tIGOqUBrYBySjOffQZeIkenRhMevv89FOoxVeVMYVhP8lCoQepB%2B1Kfovu2Jzc1IV76jvAboQmUaG9CSSjVwgAlD2lUSb%2F7ANaagsolzkzwD09ErFkcpX4L6URvl6YeS%2BGpPdQmPq1J%2FC0IhaK6Bau5430j%2BgheCMZ5R7sXXuXrw4700vNsCpHo%2Fg7UGogp1l1Ne37AD0H9ApHaK8TiojiptNpzXBL2S8Pg&X-Amz-Signature=fc87422b05de4e463b73fd2cbe900372e37ca72a791a5842ecc47bbee53329e0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
### 정성적 성과
- 반복 CS 문의 대폭 감소: 조리원 담당자가 시스템에서 직접 정보 확인
- 수기 업무 휴먼 에러 해결 및 팀원 부담 해소 
- 파편화 데이터 → 단일 DB 통합: 발주 내역·결제·출고·정산의 데이터 정합성 확보
# 4. 회고
---
### 교훈
- '수기'에 의존하던 프로세스를 '시스템 정책과 자동화'으로 전환하면, 운영 변수가 사라지고 데이터 정합성이 자동으로 확보됨
- CS 문제는 단순히 응대 인력의 문제가 아니라 정보 접근성의 문제. 시스템으로 해결 가능한 영역이 존재
- PG 수수료 차단은 단순 비용 절감이 아니라, 공급가·매입가 구조상 마진을 지키기 위한 비즈니스 필수 조건이었음
### 개인 성장
- B2B 결제·정산·발주 프로세스를 단일 시스템으로 통합 설계하는 경험
- 오프라인 관행(선출고/후입금)과 시스템 정책 간의 간극을 조율하며 현업을 설득하는 PM 역량
- 외부 개발사를 기술적으로 리드하며 프로젝트를 완수

# Reference
---
## 주문 → 결제 라우팅 → 출고 플로우
\`\`\`mermaid
flowchart TD
    A["조리원 로그인"] --> B["장바구니"]
    B --> C{"상품 유형"}
    C -->|"물품"| D["포인트 100%"]
    C -->|"분유"| E["무통장 <br/> (스크래핑 자동확인)"]
    D --> F{"결제 매칭<br/>완료?"}
    E --> F
    F -->|"Yes"| G["공급사 자동 발주"]
    F -->|"No"| X["주문·출고 차단"]
    G --> H["거래명세서<br/>실시간 자동 발송"]
    H --> I["알림톡 (송장)"]
    I --> J["월말 자동 정산<br/>→ 회계/세무팀 공유"]
    style F fill:#fef3c7,stroke:#d97706
    style X fill:#fee2e2,stroke:#dc2626
    style G fill:#f0fdf4,stroke:#16a34a
\`\`\`

## 시스템 아키텍처
\`\`\`mermaid
graph TB
    subgraph Platform["고도몰5 Pro"]
        FRONT["주문 UI"]
        ADMIN["관리자"]
    end
        subgraph Payment["고도몰5 Pro"]
        POLICY["결제-출고 정책<br/>(매칭 필수)"]
				CATEGORY["카테고리 별 결제 구분<br/>(매칭 필수)"]
        end
    subgraph Logic["비즈니스 로직"]
        SCRAPE["계좌 스크래핑 API"]
        AUTO["자동 발주"]
        INVOICE["거래명세서<br/>자동 발송"]
        CRON["포인트 소멸"]
    end
    subgraph Ext["외부 연동"]
        NTS["월 정산<br/>(세금계산서)"]
        ALIM["알림톡"]
        WMS["WMS"]
    end
    FRONT -->CATEGORY--> CRON --> INVOICE --> ALIM 
    FRONT -->POLICY --> SCRAPE --> INVOICE --> ALIM 
    POLICY --> AUTO --> WMS
    AUTO --> INVOICE --> NTS
    AUTO --> ALIM
    CRON --> INVOICE
    style Platform fill:#faf5ff,stroke:#7c3aed
    style Logic fill:#fff7ed,stroke:#ea580c
    style Ext fill:#eff6ff,stroke:#2563eb
\`\`\`

## B2B 폐쇄몰 시연 화면
![B2B PC 1](/assets/b2b-pc-1.png)
![B2B PC 2](/assets/b2b-pc-2.png)
<div style="display:flex; gap:1rem;">
  <img src="/assets/b2b-mobile-1.png" style="width: 48%; border-radius: 8px;" />
  <img src="/assets/b2b-mobile-2.png" style="width: 48%; border-radius: 8px;" />
</div>

`,
  'tms': `# 1. 문제 정의 및 기획 배경

---

<div style="display: flex; flex-wrap: wrap; gap: 1rem; margin-bottom: 2rem;">
  <a href="https://github.com/park-jjong/TWLKRTMS-releaseRepository" target="_blank" class="reference-link">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
    <span>GitHub Repository</span>
  </a>
  <a href="https://www.youtube.com/watch?v=uegOVSqd4lU" target="_blank" class="reference-link">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
    <span>System Video Reference</span>
  </a>
  <a href="https://app.notion.com/p/4ce1c9d90f4983a4a65701c0b57084e5" target="_blank" class="reference-link">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
    <span>기사 생산성 분석 원리</span>
  </a>
</div>

---

### **문제점 인식**
- 기존 운송 프로세스의 분산 및 수작업 중심 인수인계 방식은 심각한 비효율을 초래함.
- 개인 편의에 따른 인수인계 파편화로 정보 누락, 소통 오류, 업무 연속성 저해 발생.
- 월별 긴급 배송 프로세스 중 오퍼레이션 담당의 실수로 인한 오배송 전체 3\~4% 발생
### **벤치마킹 및 아이디어 도출**
- **“Detrack”** 서비스 시스템을 벤치마킹하여 대시보드 형태의 테이블 기반 주문 관리 및 날짜별 조회, 엑셀 출력 기능의 효율성을 확인.
- TWLKR의 배송 운영을 시스템으로 표준화하고 중앙 집중화하는 아이디어를 구체화함.
### **프로젝트 목표**
- TMS(운송관리시스템) 기획·개발을 통한 **전사적 운송 프로세스 혁신 및 운영 효율성 극대화**.
- **세부 목표**
	- 분산 프로세스 표준화, 인수인계 시스템화, 실시간 배송 추적 및 데이터 기반 관리, 사용자 편의성 제고를 통한 시스템 조기 안착.

# 2. 진행 과정 및 역할

---

### **주요 기능 및 서비스 정의**
- **대시보드 기반 주문 관리 시스템 구현 (Detrack 벤치마킹)**: 날짜별 조회, 검색, 상세 정보 확인 및 상태 업데이트 기능 제공.
- **체계적인 인수인계 커뮤니케이션 시스템 도입**: 인수인계 노트 작성, 조회, 관리 기능 제공.
- **2단계 접근 제어 시스템 구축**: 일반 사용자(Dispatcher)와 관리자(Administrator) 역할에 따른 권한 부여.
- **도착지별 거리 및 소요시간 정립** 
웨이하우스별로 도착지 우편번호를 기준 거리와 예상 소요시간을 데이터들을 중첩시켜 평균 중위값을 자동으로 측정하여 예상 소요시간 리드타임 표준 정립
	- **거리는 naverapi를 이용**하여 실시간으로 4가지 (실시간빠른길,편한길, 최단거리, 무료우선 중)  2번째로 긴 거리를 선정
### **프로세스 설계**
\`\`\`mermaid
graph TD
    subgraph 로그인_인증
        U1[사용자] -->|로그인 정보 입력| WS1(웹 서버)
        WS1 -->|인증 요청| AM1[인증 모듈]
        AM1 -->|인증 결과| WS1
        WS1 -->|로그인 성공/실패 응답| U1
    end

    subgraph 대시보드_주문_관리
        U2[사용자] -->|대시보드/주문 조회 요청| WS2(웹 서버)
        WS2 -->|데이터 조회 요청| DB2[데이터베이스]
        DB2 -->|주문 데이터 응답| WS2
        WS2 -->|화면 렌더링/JSON 응답| U2
        U2 -->|주문 생성/수정/삭제 요청| WS2
        WS2 -->|DB 업데이트 요청| DB2
        DB2 -->|처리 결과 응답| WS2
        WS2 -->|성공/실패 응답| U2
    end

    subgraph 인수인계_관리
        U3[사용자] -->|인수인계 작성/조회 요청| WS3(웹 서버)
        WS3 -->|데이터 처리 요청| DB3[데이터베이스]
        DB3 -->|데이터 응답/업데이트| WS3
        WS3 -->|화면 렌더링/JSON 응답| U3
    end

    subgraph 관리자_기능
        U4[관리자] -->|사용자 관리 페이지 요청| WS4(웹 서버)
        WS4 -->|관리자 권한 확인| AM4[인증 모듈]
        AM4 -->|권한 확인 결과| WS4
        WS4 -->|사용자 목록/폼 응답| U4
        U4 -->|사용자 생성/수정 요청| WS4
        WS4 -->|DB 업데이트 요청| DB4[데이터베이스]
        DB4 -->|처리 결과 응답| WS4
        WS4 -->|성공/실패 응답| U4
    end
\`\`\`
- 사용자 인터페이스: 웹 브라우저 기반의 직관적인 대시보드 및 관리 화면 제공
- 프론트엔드/백엔드 연동
SSR (Server-Side Rendering) 및 CSR (Client-Side Rendering)을 동시 활용
- 데이터 흐름
사용자 요청은 클라이언트 → 웹 서버(FastAPI) → 인증 모듈/비즈니스 로직
을 거쳐 MySQL 데이터베이스와 연동되며 모든 활동은 로깅 시스템에 기록됨.
### **예상 성과**
- 운송 프로세스의 표준화 및 효율 증대.
- 수작업으로 인한 휴먼 에러 및 지연 감소.
- 데이터 기반의 의사결정 지원 및 생산성 향상 기반 마련.
### **팀 구성 및 협업**:
- **배송 Operation 팀 기획 및 주도**: 경영진 설득을 통해 팀을 구성하고 시스템 단독 개발.
- **팀원 추천 기준**: '과묵함'(민감 정보), '꼼꼼함'(데이터 정확성), 'CS 역량 연관성'(고객 중심)을 기준으로 팀원 추천 및 역량 극대화.
- **기술 스택**
	| 구분 | 기술 스택 | 내용 |
| --- | --- | --- |
| Backend | Python 3.12, FastAPI, Jinja2 | SSR 및 CSR 하이브리드 아키텍처 구축 |
| Frontend | HTML/CSS/JavaScript, Bootstrap/Tailwind | Bootstrap/Tailwind 활용, 모듈형 JS 개발 |
| Database | MySQL 8.0 on Cloud SQL | Cloud SQL 배포, Private IP 연결 |
| Infrastructure | Google App Engine Flexible | Docker 컨테이너 기반 Custom |
- **보안**
	| 보안 영역 | 구현 내용 |
| --- | --- |
| 네트워크 보안 | • Cloud Armor를 통한 DDoS 및 웹 공격 방어<br/>• Cloud SQL에 Private IP 연결 사용<br/>• 방화벽 규칙을 통한 인가된 소스만 접근 허용 |
| 애플리케이션 보안 | • HSTS, X-Content-Type-Options, X-Frame-Options 헤더 적용<br/>• CSRF 방어를 위한 SameSite=Lax 쿠키 설정<br/>• 모든 보호된 라우트에 대한 서버 측 세션 유효성 검사<br/>• 서버 및 클라이언트 양단에서의 포괄적인 입력값 검증 |
| 데이터 보호 | • Lock 메커니즘을 통한 동시 수정 방지<br/>• 5분 후 Lock 자동 타임아웃 및 해제<br/>• HTTPS를 통한 전송 데이터 암호화 (HTTPS 강제) |
| 인증 및 권한 부여 | • 역할 기반 접근 제어 (USER/ADMIN)<br/>• 보안 쿠키를 사용한 세션 기반 인증<br/>• 미인증 접근 시 로그인 페이지로 자동 리디렉션 |
- **주요 활동**
	- **프로젝트 기획 및 단독개발 **: 경영진 설득 및 프로젝트 전반 기획 및 단독 개발
	- **사용자 중심 시스템 안착 지원**: 주야간 근무조 동료 대상 개별 코칭을 통한 조기 안착 지원.
	- **저항 극복 및 기능 개선**: 지속적인 소통 및 커피챗을 통한 피드백 수렴. '다수 행 선택 배차' 등 핵심 기능 추가 및 불필요한 클릭 UX 감소에 기여.
	- **보안 및 데이터 무결성 강화**: 동시 수정 방지(Lock Mechanism) 및 5분 후 자동 타임아웃/잠금 해제 기능 기획 반영.
- **어려움 및 해결**
	- **레거시 모델 개선 저항**: 동료들의 새 시스템 도입 저항에 직면.
		- **해결**: 개별 코칭 및 편안한 대화(커피챗)를 통해 우려 경청 및 핵심 기능 즉시 반영으로 시스템 수용도 제고.
	- **민감 정보 및 데이터 동시성 관리**: 보안 및 데이터 무결성 확보의 중요성 인식.
		- **해결**: **동시 수정 방지(Lock Mechanism)** 및 **자동 타임아웃 해제** 기능 기획 반영, 다단계 보안 아키텍처 설계.
# 3. 결과 및 성과
---
### **핵심 성과 지표 (KPI)**
- **정량적 성과**
	- **주차별 기사 생산성 14% 향상**
		⇒ 개발 3개월 전부터 통합 출고 스케줄표를 따로 만들어 적용
그에 따라 총 4개월 정도 데이터와 작년 데이터 대비 향상한 내용
	- 연간 외부 기사 인건비 **약 6% 절감 예상 **(감소 Man-hour 기반 추산)
	- 출발지 별 **평균 소요 거리 및 시간 표준 **정립 
(데이터가 쌓일수록 정확도 상승)
	- 오배송건 0건 
- **정성적 성과**
	- 전사적 운송 프로세스 통일, 커뮤니케이션 오류 감소로 인한 KPI 상승
	- 주요 고객사 배송 최적화를 위한 지역별 기사 스케줄 재정립
### **적용 결과**
- 데스크탑 환경 전용, 한국어 최적화, KST (UTC+9) 기준 시간 처리.
- 단순한 시스템 도입을 넘어, **파편화된 출고 업무 구조를 TMS 중심으로 프로세스 재편 ⇒ 물동량 데이터 추출 가공 **

# 4. 회고
---
### **개선 방안**
- **시스템 안정성 강화**
	- 소규모 데이터 처리를 위한 시스템 개발로 인한 안정성 강화 필요
- 외부 ERP와 연동성 생성 필요
### **개인 성장**
- 레거시 프로세스 문제 파악, 경영진 설득, 사용자 저항 관리, 시스템 안착 전 과정 주도 경험.
- **사용자 중심 사고** 및 **지속적인 소통**의 중요성 체득.
- 복잡한 조직 내 변화 관리자로서의 역량 강화 및 인력 관리, 팀 빌딩 실질적 경험 축적.
# Reference
---
## 시스템 아키텍처
\`\`\`mermaid
graph TB
    subgraph Frontend["프론트엔드"]
        UI["웹 대시보드\n(HTML/CSS/JS)"]
        MAP["지도 API\n(거리 산출)"]
    end
    
    subgraph Backend["백엔드"]
        API["FastAPI\n웹 서버"]
        AUTH["2단계 접근 제어\n(Dispatcher/Admin)"]
        LOG["로깅 시스템"]
    end
    
    subgraph Data["데이터"]
        DB["MySQL\nDatabase"]
        EXCEL["엑셀 출력\n모듈"]
    end
    
    UI --> API
    MAP --> API
    API --> AUTH
    API --> DB
    API --> LOG
    DB --> EXCEL
    
    style Frontend fill:#dbeafe,stroke:#1e3a5f
    style Backend fill:#fef3c7,stroke:#d97706
    style Data fill:#f0fdf4,stroke:#16a34a
\`\`\`

## 운송 프로세스 플로우
\`\`\`mermaid
flowchart LR
    subgraph Input["주문 접수"]
        A["장애 오더\n(Dell ERP)"] --> B["배차 요청"]
    end
    
    subgraph TMS["TMS 시스템"]
        B --> C["기사 배정\n(거리 자동 산출)"]
        C --> D["배차 현황\n실시간 조회"]
        D --> E["인수인계\n노트 관리"]
    end
    
    subgraph Output["운송 실행"]
        C --> F["부품 출고"]
        F --> G["엔지니어 배송\n조율 (24/7)"]
        G --> H["설치/교체\n완료"]
        H --> I["회수 물품\n입고"]
    end
    
    style Input fill:#e0f2fe,stroke:#0284c7
    style TMS fill:#dbeafe,stroke:#1e3a5f
    style Output fill:#f0fdf4,stroke:#16a34a
\`\`\`

## 성과 비교 (Before → After)
\`\`\`mermaid
graph LR
    subgraph Before["Before (수기 관리)"]
        B1["경험 기반 배차"]
        B2["오배송 3~4%"]
        B3["파편화된 인수인계"]
    end
    
    subgraph After["After (TMS 도입)"]
        A1["거리 기반 최적 배차"]
        A2["오배송 0건"]
        A3["시스템 통합 인수인계"]
    end
    
    B1 -->|"시스템화"| A1
    B2 -->|"생산성 14%↑"| A2
    B3 -->|"운송비 6%↓"| A3
    
    style Before fill:#fee2e2,stroke:#dc2626
    style After fill:#dcfce7,stroke:#16a34a
\`\`\`


	GitHub Repository, 대시보드 실제 스크린샷을 추가해 주세요.

`
};

projectsFullMarkdown['blog'] = `# 🛠️ GitHub Pages에 완벽하게 맞추기 위한 아키텍처 변경 방안
현재의 Vite + React (SPA) 구조에서 발생하는 "새로고침 시 404 에러" 문제를 원천 차단하고 GitHub Pages의 장점을 살리려면, 아키텍처를 SSG(Static Site Generation, 정적 사이트 생성) 방식으로 변경해야 합니다.

## 추천하는 아키텍처 변경 옵션:

### 1. Next.js (Static Export) 도입 (가장 추천)
- 현재 React 기반이므로 문법이 거의 100% 호환됩니다.
- Next.js의 \`output: 'export'\` 설정을 사용하면, 프로젝트를 빌드할 때 \`/about.html\`, \`/projects.html\` 등 모든 라우팅 경로에 맞는 실제 HTML 파일을 생성해 줍니다.
- **조건**: 레포지토리 이름을 반드시 \`[깃허브_아이디].github.io\`로 만들어야 합니다.
- **형식**: https://[깃허브_아이디].github.io
- 이렇게 구워진 정적 파일들을 GitHub Pages에 올리면 라우팅 에러 없이 완벽하게 작동합니다.

### 2. Astro + React로 전환 (초고속 성능)
- 최근 포트폴리오나 블로그 사이트에서 가장 각광받는 프레임워크입니다.
- 자바스크립트를 최소화하여 로딩 속도를 극한으로 끌어올립니다. 기존에 작성한 React 컴포넌트를 그대로 가져와서 렌더링할 수 있습니다.
- 역시 빌드 시 모든 페이지를 정적 HTML로 생성하므로 GitHub Pages와 찰떡궁합입니다.

### 3. 기존 Vite + React 유지 시: Pre-rendering 플러그인 추가
- 프레임워크를 바꾸는 것이 부담스럽다면, 기존 Vite 환경에 \`vite-plugin-prerender\` 같은 플러그인을 추가하여 빌드 타임에 라우팅 경로별 HTML을 미리 생성해 두는 방식을 취할 수 있습니다. (다만 설정이 다소 까다로울 수 있습니다.)

### 4. (비추천) React Router의 HashRouter 사용
- 아키텍처를 바꾸지 않는 가장 쉬운 방법이지만, URL이 \`domain.com/#/about\` 처럼 중간에 \`#\`이 들어갑니다. 미관상 좋지 않고 SEO에 악영향을 주어 포트폴리오용으로는 추천하지 않습니다.

## 📝 결론
포트폴리오는 **"빠른 로딩 속도"**와 **"구글 검색 노출(SEO)"**이 생명입니다. 만약 약간의 아키텍처 변경(예: Next.js 정적 내보내기 또는 Astro 전환)을 감수하실 수 있다면, GitHub Pages 인프라 위에서 SSG 방식으로 서비스하는 것이 성능과 비용, 유지보수 측면에서 가장 완성도 높은 최종 형태라고 볼 수 있습니다.
`;




export const blogList = [
  {
    "id": "blog-1249",
    "title": {
      "KR": "**1. 첫 번째 단계: 혼돈 속에서 '질서' 찾기 - 현실 세계의 구조화**",
      "EN": "**1. 첫 번째 단계: 혼돈 속에서 '질서' 찾기 - 현실 세계의 구조화**"
    },
    "role": "Tech Article",
    "period": "2026.07",
    "description": {
      "KR": "지난 글에서는 SCM(공급망 관리)이 왜 복잡하고 어려운 문제이며,",
      "EN": "지난 글에서는 SCM(공급망 관리)이 왜 복잡하고 어려운 문제이며,"
    }
  },
  {
    "id": "blog-1258",
    "title": {
      "KR": "Blog Post",
      "EN": "Blog Post"
    },
    "role": "Tech Article",
    "period": "2026.07",
    "description": {
      "KR": "![](https://blog.kakaocdn.net/dna/M6cjL/btsPJDGFr8A/AAAAAAAAAAAAAAAAAAAAAF9yqI7tC6k_y3Ti-6hITCjdjHVQ",
      "EN": "![](https://blog.kakaocdn.net/dna/M6cjL/btsPJDGFr8A/AAAAAAAAAAAAAAAAAAAAAF9yqI7tC6k_y3Ti-6hITCjdjHVQ"
    }
  },
  {
    "id": "blog-1259",
    "title": {
      "KR": "'보관하다' 라는 관계(Property)를 정의",
      "EN": "'보관하다' 라는 관계(Property)를 정의"
    },
    "role": "Tech Article",
    "period": "2026.07",
    "description": {
      "KR": "![](https://blog.kakaocdn.net/dna/q0Whk/btsPO7INc6p/AAAAAAAAAAAAAAAAAAAAAF5ZafdiLM_yKNYp7ubdyAiZ_56J",
      "EN": "![](https://blog.kakaocdn.net/dna/q0Whk/btsPO7INc6p/AAAAAAAAAAAAAAAAAAAAAF5ZafdiLM_yKNYp7ubdyAiZ_56J"
    }
  },
  {
    "id": "blog-1260",
    "title": {
      "KR": "관세법 개정의 위기를 기회로: 5개사 연동 시스템 기획기",
      "EN": "관세법 개정의 위기를 기회로: 5개사 연동 시스템 기획기"
    },
    "role": "Tech Article",
    "period": "2026.07",
    "description": {
      "KR": "현업에서 마주하는 가장 까다로운 요구사항은 비즈니스 내부의 니즈가 아닌 '외부의 규제'에서 출발할 때입니다. 이 프로젝트의 시작은 평범한 날 날아온 한 통의 공문에서 비롯되었습니다",
      "EN": "현업에서 마주하는 가장 까다로운 요구사항은 비즈니스 내부의 니즈가 아닌 '외부의 규제'에서 출발할 때입니다. 이 프로젝트의 시작은 평범한 날 날아온 한 통의 공문에서 비롯되었습니다"
    }
  }
];

export const blogFullMarkdown: Record<string, string> = {
  "blog-1249": "지난 글에서는 SCM(공급망 관리)이 왜 복잡하고 어려운 문제이며,\n이를 해결하기 위해 '관계'를 파악하는 것이 왜 중요한지에 대해 생각하였습니다..\n또한 그를 위해 대략적인 사이드 프로젝트의 골조와 사용할 아키텍쳐에 관한 간단한 기술 내용을 기술하였습니다.\n성공적인 SCM 사이드 프로젝트를 위해 혼란스러운 현실을 어떻게 구조화하고 문제의 본질을 어떻게 통찰하며\n지속 가능한 해결책을 어떻게 시스템으로 구축해 나가는지 저가 스터디한 단계를 이야기해볼까 합니다.\n특히 SCM을 벗어나  <span underline=\"true\">**문제를 받아들이는 단계와 방향**</span>에 대해 집중하였습니다.\n---\n# **1. 첫 번째 단계: 혼돈 속에서 '질서' 찾기 - 현실 세계의 구조화**\n## **접근법: 공통의 언어로 현실을 번역하라**\n이 단계의 핵심은 문제의 배경이 되는 현실 세계를 모두가 동의할 수 있는 **'공통의 언어'**로 번역하는 것입니다.\n이를 위해 저는 문제와 관련된 모든 '**명사**'를 **객체(Object)**로 그 명사의 **특징을 속성(Property)**으로\n그리고 명사들 사이의 **상호작용(동사)**을 **관계(Link)**로 정의했습니다.\n예를 들어, SCM에서는 '고객 주문서'와 '배송 트럭'이라는 객체가 있고\n트럭은 '현재 위치'라는 속성을 가지며, 주문서와 트럭은 '운송한다'는 관계로 연결됩니다.\n이 접근법은 단순히 기술적 모델링이 아니라, 다양한 이해관계자들이 동일한 현실을 기반으로 소통하게 만드는 토대를 마련합니다.\n## **필요했던 도메인 지식: 비즈니스 프로세스 및 도메인 자체에 대한 깊은 이해**\n이 구조를 제대로 만들기 위해 가장 필요했던 것은 비즈니스 로직보다는 **해당 도메인이 실제로 어떻게 작동하는지에 대한 이해**였습니다.\n저는 SCM의 흐름을 파악하기 위해 현업 담당자들이 사용하는 용어, 각 부서 간의 데이터 전달 과정\n그리고 '주문'과 같은 하나의 개념이 여러 시스템에서 어떻게 다르게 불리는지를 학습해야 했습니다.\n## **핵심 개념의 객체 모델 변환 예시 (feat. SCM)**\n<table>\n<tr>\n<td>**구분**</td>\n<td>객체(Object)</td>\n<td>주요 속성 (Properties)</td>\n<td>연결되는 관계 (Links)</td>\n</tr>\n<tr>\n<td>**공급**</td>\n<td>공급업체</td>\n<td>업체명(String), 위치(Geo), 신용등급(Enum)</td>\n<td>SUPPLIES (자재를 공급)</td>\n</tr>\n<tr>\n<td>**자재**</td>\n<td>자재/부품</td>\n<td>SKU(String), 단가(Float), 리드타임(Int), 안전재고량(Int)</td>\n<td>IS_PART_OF (완제품의 일부)</td>\n</tr>\n<tr>\n<td>**생산**</td>\n<td>생산라인</td>\n<td>라인번호(String), 공장위치(String), 시간당생산량(Int)</td>\n<td>CONSUMES (자재를 소비),PRODUCES (완제품을 생산)</td>\n</tr>\n<tr>\n<td>**재고**</td>\n<td>창고</td>\n<td>창고명(String), 위치(Geo), 총용량(Float), 현재용량(Float)</td>\n<td>STORES (제품/자재를 보관)</td>\n</tr>\n<tr>\n<td>**유통**</td>\n<td>운송수단</td>\n<td>차량번호(String), 운송타입(Enum), 현재위치(Geo)</td>\n<td>TRANSPORTS (주문을 운송)</td>\n</tr>\n<tr>\n<td>**판매**</td>\n<td>고객주문</td>\n<td>주문번호(String), 주문일시(Timestamp), 배송상태(Enum)</td>\n<td>CONTAINS (제품을 포함)</td>\n</tr>\n</table>\n> <mention-page url=\"https://app.notion.com/p/39b1c9d90f4980faaed1cbc61402b4ff\"/> \n---\n# **2. 두 번째 단계: 현상을 넘어 '본질' 구축 - 관계망 분석**\n문제의 현상은 개별 객체의 상태 변화(예: 재고 부족)로 나타나지만,\n그 **본질적인 원인**은 대부분 객체들 사이의 복잡한 **'관계망'** 속에 숨어있습니다.\n#### **접근법: 엔티티 간의 관계를 중점으로 정의**\n이 단계의 핵심은 관계를 단순히 객체를 잇는 선으로 보지 않고, 그 자체로 중요한 정보를 담고 있는 **행위 동작**을 분석해야합니다.\nSCM에서 '운송한다'는 관계는 단순한 연결이 아니라 그 안에 운송비용, 예상 도착일, 현재 운송 상태와 같은 구체적인 데이터를 품고 있습니다.\n이처럼 관계에 맥락을 부여함으로써 우리는 \"비용이 비정상적으로 높은 운송 건들은 주로 어떤 경로를 이용했는가?\"와 같은 심도 있는 질문에 답할 수 있게 됩니다.\n문제의 현상이 아닌 그 현상을 초래한 **프로세스와 상관계**를 분석하는 것입니다.\n#### **필요했던 도메인 지식: 그래프 이론 및 네트워크 분석**\n관계망의 숨겨진 의미를 파악하기 위해, 저는 **그래프 이론**을 공부해야 했습니다.\n개별 데이터가 아닌 전체 네트워크의 구조적 특징을 분석하는 방법을 배워야 했습니다.\n- **중심성 분석:** 전체 공급망에서 가장 많은 부품을 공급하거나 가장 많은 물류의 흐름이 거쳐 가는 핵심적인 '**허브**' 또는 **'병목'**지점을 수학적으로 찾아내는 데 사용했습니다.\n- **경로 탐색:** 특정 부품의 공급 지연이 어떤 생산라인과 고객 주문에까지 연쇄적으로 영향을 미치는지 그 파급 효과의 전체 경로를 추적하는 데 필수적이었습니다.\n> \\[심화 스터디📚\\] 그래프 알고리즘 라이브러리\n---\n## **3. 세 번째 단계: 목표 설정하기 - 해결책의 수준과 방향 정의**\n\"그래서 무엇을 만들 것인가?\"라는 해결책의 목표 수준을 명확히 정의해야 합니다.\n저는 이 목표를 4단계의 성숙도 모델로 나누어 접근했습니다.\n#### **접근법: 서술적 분석에서 처방적 분석으로 점진적 진화**\n프로젝트의 목표를 '단순 현황 보고'에서 '능동적 의사결정 지원'까지 단계적으로 발전시키는 로드맵을 그렸습니다.\n처음부터 완벽한 AI 예측 시스템을 만들기보다 신뢰할 수 있는 데이터 기반의 현황 분석(1, 2단계)을 먼저 구축하고\n그 기반 위에서 예측과 제안(3, 4단계)으로 나아가는 것이 현실적이었습니다.\n<table>\n<tr>\n<td>단계</td>\n<td>분석유형</td>\n<td>해결하고자 하는 핵심 질문</td>\n<td>필요한 주요 기술/알고리즘</td>\n</tr>\n<tr>\n<td>1단계</td>\n<td>서술</td>\n<td>\"그래서, 지금 무슨 일이 일어나고 있죠? 현황은?\"</td>\n<td>그래프 탐색(Graph Traversal), Cypher/SPARQL 쿼리</td>\n</tr>\n<tr>\n<td>2단계</td>\n<td>진단</td>\n<td>\"왜 이런 일이 발생했나요? 근본 원인은 무엇이죠?\"</td>\n<td>경로 탐색(Pathfinding), 이상 탐지(Anomaly Detection)</td>\n</tr>\n<tr>\n<td>3단계</td>\n<td>예측</td>\n<td>\"이 일이 미래에 어떤 영향을 미칠까요?\"</td>\n<td>그래프 임베딩(Graph Embedding), GNN(그래프 신경망), 시계열 예측</td>\n</tr>\n<tr>\n<td>4단계</td>\n<td>처방</td>\n<td>\"그렇다면, 우리는 무엇을 해야 할까요? 최적의 대안은?\"</td>\n<td>최적화(Optimization) 알고리즘, What-if 시뮬레이션</td>\n</tr>\n</table>\n**필요했던 도메인 지식: 분석적 성숙도 모델 및 예측 모델링**\n이 로드맵을 실현하기 위해서는 각 단계에 맞는 분석 기술을 학습해야 했습니다. 특히 3, 4단계로 나아가기 위해서는 전통적인 통계 모델을 넘어, 관계 데이터 자체를 학습하는 \\*\\*그래프 기반 머신러닝(Graph Machine Learning)\\*\\*에 대한 이해가 필요했습니다. GNN과 같은 기술은 개별 노드의 특성뿐만 아니라 이웃 노드와의 관계 패턴까지 학습하기 때문에, 네트워크 효과가 중요한 문제에서 더 정교한 예측을 가능하게 합니다.\n---\n# **4. 결론: 그래서 궁극적으로 도출해야 하는 것은?**\n이 모든 과정을 거쳐 제가 도달한 결론은, 특정 기술이나 솔루션을 만드는 것을 넘어,\n'**디지털 트윈 기반의 문제 해결사 마인드셋**'을 내재화해야 한다는 것이었습니다.\n따라서 저만의 사이드 프로젝트를 아래와 같은 Flow chart로 생각하였습니다.\n![](https://blog.kakaocdn.net/dna/VJO7J/btsPRtDJ9HF/AAAAAAAAAAAAAAAAAAAAAPr87S9qbV-IDwNBSDq-U3XuP46Q8KvcglUKc9zw-SPV/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1785509999&allow_ip=&allow_referer=&signature=bm2EQGljjugJuyg5XscnmOWAS98%3D)",
  "blog-1258": "## 1. 공급망 관리(SCM)의 본질: 정적이 아닌 '동적 네트워크'\n![](https://blog.kakaocdn.net/dna/M6cjL/btsPJDGFr8A/AAAAAAAAAAAAAAAAAAAAAF9yqI7tC6k_y3Ti-6hITCjdjHVQ45TW_rVAlCLGoEDI/img.jpg?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1785509999&allow_ip=&allow_referer=&signature=qwYHWvEe4VQstoi3xgRlNHXJmyE%3D)\n우리가 흔히 보는 SCM 프로세스는 자재 공급 → 생산 → 재고 → 유통 → 고객으로 이어지는 선형적인 흐름으로 그려집니다.\n하지만 이는 현실을 극도로 단순화한 그림입니다.\n실제 공급망의 특수성은 다음과 같습니다.\n- **극심한 상호연결성과 파급 효과**공급망의 모든 참여자(노드)는 거미줄처럼 얽혀있습니다. 베트남의 작은 부품 공장 파업(하나의 노드 변경)이 독일 자동차 생산 라인의 중단과 미국 소비자의 주문 취소로 이어지는 '파급 효과'가 발생합니다.\n- **정보의 왜곡과 증폭 **고객의 작은 수요 변화가 소매, 도매, 제조, 공급 단계를 거슬러 올라가면서 정보가 왜곡되고 예측 변동성이 눈덩이처럼 커지는 '채찍 효과'가 발생합니다. 이는 각 단계가 전체 네트워크를 보지 못하고 단절된 정보에만 의존하기 때문입니다.\n- **지속적인 변동성**수요 변동, 운송 지연, 파업, 자연재해 등 공급망은 계획(Plan)이 아닌 변수(Exception)에 의해 움직이는 파도 효과를 가지고 있습니다.\n## 2. 데이터의 역할: 이 복잡성 속에서 우리가 파악하려는 것\n이런 복잡한 네트워크 속에서 데이터의 역할은 단순히 현황을 기록하는 것을 넘어,\n'**네트워크의 동적인 상태를 이해하고 미래를 예측하여 최적의 의사결정을 내리는 것**'에 있습니다.\n구체적으로 우리는 데이터를 통해 다음을 파악하고자 합니다.\n- **가시성(Visibility) 확보**지금 특정 제품의 생산과 배송은 어디쯤에 있는지, 특정 창고의 재고는 얼마인지 등 전체 공급망의 현재 상태를 투명하게 파악합니다.\n- **리스크 식별 및 영향도 분석** \"만약 A 공급사에 문제가 생기면, 어떤 제품 생산에 차질이 생기고, 그로 인해 어떤 고객 주문이 가장 위험해지는가?\" 와 같이 **하나의 이벤트가 네트워크 전체에 미치는 파급 효과**를 분석합니다.\n- **최적화:** 최소의 재고로 최대의 고객 만족을 이끌어내는 법, 가장 효율적인 물류 경로는 어디인지 등 비용과 효율을 최적화할 지점을 찾습니다.\n따라서 SCM 전략은 위와 같은 대표적인 3가지 요소를 분석하고 사전에 점검하며\n기업의 **미래 비즈니스를 위한 주춧돌**이 되줘야 합니다.\n나아가, 예상치 못한 타 부서의 문제가 발생했을 때 이를 막아줄 **방패의 역할**도 되어야 합니다.\n![](https://blog.kakaocdn.net/dna/ehsYko/btsPJtqA4a7/AAAAAAAAAAAAAAAAAAAAAAlZFswrsHZashtHKwMjkdFvrG44ytfUBEBKs1HpsH75/img.jpg?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1785509999&allow_ip=&allow_referer=&signature=aG5l8Mgz3DlQbq0eWimrmlLhKhk%3D)\n## 3. 한계를 넘어 새로운 방향으로: 관계, 전략, 그리고 기술\n#### 현실의 장벽: 왜 데이터는 있는데 통찰력은 없는가?\n데이터 기반 SCM의 유토피아를 꿈꾸지만, 현실은 여러 장벽에 부딪힙니다. 가장 큰 문제는 다음과 같습니다.\n1. **데이터 사일로**ERP, SCM, WMS 등 기업 내 데이터는 각기 다른 시스템에 파편화되어 있어 통합적인 분석이 어렵습니다.\n2. **분석의 복잡성**설령 모든 데이터를 한곳에 모았다 하더라도, N단계로 이어지는 관계를 분석하는 것은 전통적인 분석 방식으로는 매우 어렵고 느립니다. 'A 공급사 → B 부품 → C 완제품 → D 고객'으로 이어지는 관계만 분석하려 해도, 수많은 테이블을 연결(JOIN)하는 복잡하고 느린 작업이 필요합니다.\n3. **데이터의 관계성단순히 엑셀과 SQL로 데이터를 적절히 적재하고 출력하는 것이 아니라**각 시트, 테이블 나아가 스키마 별로의 유의미한 관계성을 파악해야하지만단순 2차원 배열의 테이블이나 RDB 로써는 이 **관계**를 정의하는데 한계가 있습니다.\n이러한 한계는 결국 '**데이터는 존재하지만, 유의미한 통찰력을 실시간으로 얻지 못하는**' 상황을 만듭니다.\n#### 방향성 전환: '예측'을 넘어 '대응'으로\n이 한계를 극복하기 위해 저는 분석의 패러다임 자체를 전환해야 한다고 결론 내렸습니다.\n단순히 미래 수요를 더 정확하게 '예측'하는 것을 넘어, 예측 불가능한 이벤트가 발생했을 때 신속하게 그 파급 효과를 파악하고 최적의 경로를 재설정하는 **'회복탄력성'과 '대응' 능력을 갖추는 것**으로 목표를 재설정했습니다.\n이 '대응' 능력의 핵심은 데이터의 '**관계성**'을 이해하는 데 있습니다.\n개별 데이터의 수치만으로는 \"**만약 특정 이벤트가 발생한다면, 그 파급 효과의 전체 범위는 어디까지인가?**\"라는 질문에 답할 수 없습니다. 데이터 간의 연결고리를 추적해야만 충격의 전파 경로를 파악하고 즉각적으로 대응할 수 있습니다.\n#### 성공 사례: 팔란티어는 어떻게 '관계'로 문제를 해결하는가?\n이러한 '관계' 기반 접근을 통해 그 효과를 증명해낸 대표적인 기업이 바로 **팔란티어(Palantir Technologies)**입니다.\n좀 더 보태자면 작년 12월 경 부터 처음 알게된 기업이고 [유튜버 빅데이터 닥터](https://www.youtube.com/@bigdatadoctor) 님의 영상을 접하며 좀 더 상세히 알게되었습니다.\n[빅데이터닥터 BIGDATA DOCTOR<br>문제의 본질을 찾아내서 근본적으로 해결하려 합니다. ➤ 공식 이메일 bigdatadoctor@icloud.com ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ ✦ 빅데이터닥터 - 작가 - 내과 전문의 - 심장내<br>www.youtube.com](https://www.youtube.com/@bigdatadoctor)\n팔란티어는 복잡한 현실 세계를 '온톨로지'라는 개념으로 **디지털 세계에 복제(Digital Twin)**합니다.\n예를 들어, 항공기 제조사 에어버스는 팔란티어 플랫폼을 통해 수백만 개의 부품과 수천 개의 공급업체, 복잡한 생산 공정의 관계망을 하나의 지도처럼 펼쳐봅니다.\n이를 통해 특정 부품의 공급 지연이 어떤 항공기 생산 라인에 며칠의 차질을 빚게 할지 시뮬레이션하고 즉각적으로 대응합니다.\n팔란티어의 성공은 '관계' 데이터가 어떻게 예측을 넘어선 '대응'의 영역을 여는지 보여주는 가장 강력한 예시입니다.\n## 4. SCM 모듈화 구현\n저는 그들의 핵심 원리인 '온톨로지'와 '그래프 DB'를 채택하여\n어떠한 비즈니스 기업에서도 활용 될 수 있는 기반 역량을 다지기 위해 SCM 사이드 프로젝트를 구상하였습니다.\n물론, 개인이 SCM 시스템 전체를 만드는 것은 현실적으로 불가능하며 현명하지도 않습니다.\n저는 가장 큰 부가가치를 창출할 수 있는 핵심, 즉 '예측의 정확도를 넘어 그 이유까지 설명하는 인텔리전스 모듈'과\n'이를 통해 기획자가 직관적 의사결정을 내릴 수 있는 시각화'에 집중하기로 했습니다.\n따라서 단순히 숫자를 예측하는 모델을 넘어 SCM 운영 기획자의 \"왜?\"라는 질문에 답하여 신뢰를 얻는 '설명 가능한 예측' 시스템을 구축해보며 일어나는 데이터의 관계성과 변수들의 사이클을 구현 해보는데 의의를 두었습니다.\n#### 핵심 목표: 신뢰를 기반으로 한 의사결정 지원\n- **(X) 기존의 예측**\"다음 달 A 제품은 1,500개 팔릴 겁니다.\" (근거를 알 수 없어 기획자는 이 숫자를 믿어야 할지 확신할 수 없습니다.)\n- **(O) 나의 목표**\"다음 달 A 제품은 1,500개 팔릴 것으로 예측되며,**그 주된 이유는 작년 동기 대비 강화된 프로모션과 경쟁사 B의 재고 부족 현상 때문입니다.**\"(기획자는 예측의 근거를 이해하고, 자신의 지식과 결합하여 행동 여부를 결정할 수 있습니다.)\n#### 아키텍처 설계: 왜 이 구조를 선택했는가?\n이 '설명 가능한 예측'을 구현하기 위해, 저는 다음과 같은 단계별 아키텍처를 설계했습니다.\n**Step 1 & 2: 관계의 지도 그리기 (코어 지식 그래프 구축)**모든 데이터 분석의 시작은 현실을 디지털 세계에 올바르게 표현하는 것입니다.먼저 SCM의 핵심 요소들(제품, 창고, 판매, 프로모션, 공급사 등)을 노드(Node)로,그들의 상호작용(판매되다, 적용되다, 공급받다 등)을 관계(Relationship)로 정의합니다.그 후, 흩어져 있는 테이블 형태의 데이터를 이 '관계의 지도',즉 지식 그래프(Knowledge Graph) 위에 채워 넣어 **디지털 트윈**을 구현합니다.\n**Step 3: 통찰력의 원천 (그래프 기반 피처 엔지니어링)**\n보통 머신러닝은 숫자 테이블을 입력받지만, 그래프의 진짜 힘은 그 '관계 구조'에 있습니다.\n저는 머신러닝 모델이 더 똑똑한 판단을 내릴 수 있도록,\n그래프에 다음과 같은 질문을 던져 '지능적인 특성(Feature)'을 추출할 것입니다. (RAG 결합으로 볼 수도 있습니다.)\n<table>\n<tr>\n<td>기획자의 궁금증</td>\n<td>그래프 쿼리 feature</td>\n<td>설명</td>\n</tr>\n<tr>\n<td>\"프로모션이 얼마나 영향을 줬나?\"</td>\n<td>promo_influence_score</td>\n<td>특정 제품과 연결된 프로모션 노드의 수나 강도를 계산</td>\n</tr>\n<tr>\n<td>\"공급망 리스크는 없나?\"</td>\n<td>supply_chain_risk_factor</td>\n<td>제품과 연결된 공급사 노드의 리드타임이나 안정성 점수를 활용</td>\n</tr>\n<tr>\n<td>\"어떤 상품과 같이 잘 팔리지?\"</td>\n<td>cross_sale_velocity</td>\n<td>동일 판매 이벤트에 함께 포함된 다른 제품의 판매량을 활용</td>\n</tr>\n<tr>\n<td>\"재고는 충분한가?\"</td>\n<td>inventory_tension</td>\n<td>창고의 현재 재고량과 평균 출고 속도를 비교하여 계산</td>\n</tr>\n</table>\n이렇게 생성된 '관계 기반 피처'들은 단순한 숫자 너머의 맥락을 담고 있기에,\n다음 단계의 머신러닝 모델이 훨씬 정교하고 설명 가능한 예측을 할 수 있는 기반이 됩니다.\n**Step 4 & 5: ML 모델링 및 시각화**\n지능적인 피처들을 입력받아 XGBoost 같은 머신러닝 모델이 미래 수요를 예측합니다.\n예측 결과는 다시 그래프에 새로운 '예측 노드'로 저장하여 학습데이터로 재활용합니다.\n가장 중요한 것은 이 결과를 기획자가 '사용'할 수 있게 만드는 것입니다.\n이를 위해 3가지 핵심 기능을 갖춘 대시보드를 구상했습니다.\n1. **예측 대시보드 (What)**\"미래 수요는 어떻게 될까?\" → 과거 판매량과 미래 예측치를 시계열 차트로 보여주며, 예측이 평소와 다른 '이상 지점'을 자동으로 강조해줍니다.\n2. **인과관계 분석 뷰 (Why)**\"이 예측이 왜 이렇게 나왔지?\" → 기획자가 1번의 '이상 지점'을 클릭하면, 해당 시점의 제품을 중심으로 판매량에 영향을 미친 모든 요인(프로모션, 경쟁사 이슈 등)들이 그래프로 시각화되어 \"아, 이때 이래서 판매량이 급증했구나!\"를 한눈에 이해시켜 줍니다.\n3. **리스크 전파 시뮬레이션 (What-if)**\"만약 공급사에 문제가 생기면?\" → 기획자가 특정 공급사 노드를 '지연' 상태로 설정하면, 그로 인해 영향받는 모든 제품과 예상 손실이 지도 위에 붉게 표시되어 리스크의 범위를 직관적으로 파악하게 돕습니다.\n## **To be Continue,**\n<mention-page url=\"https://app.notion.com/p/39b1c9d90f4980d3bd7dc4edee106063\"/>",
  "blog-1259": "![](https://blog.kakaocdn.net/dna/q0Whk/btsPO7INc6p/AAAAAAAAAAAAAAAAAAAAAF5ZafdiLM_yKNYp7ubdyAiZ_56JQ_2jCkfk6eZbQ8uG/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1785509999&allow_ip=&allow_referer=&signature=PS6PnA1SS%2FJ6q3ZdR84QZ9TIyK4%3D)\n공급망 관리(SCM) 현업에서 일하는 개발자나 데이터 분석가라면 누구나 이런 경험이 있을 것입니다.\n종합 ERP 시스템에는 PART-A789라는 코드로, 창고관리시스템(WMS)에는 SKU-9511이라는 코드로\n협력사 시스템에는 또 다른 이름으로 등록된 **'똑같은'** 부품.\n이들을 통합 분석하기 위해 우리는 오늘도 엑셀 VLOOKUP과 수작업 매핑 테이블에 의존하며 힘겨운 싸움을 하고 있습니다.\n이 방식은 비효율적일 뿐만 아니라, 데이터가 추가되거나 변경될 때마다 깨지기 쉬운 **아주 위험한 구조**입니다.\n만약 시스템이 PART-A789와 SKU-9511이 **'의미적으로 동일한 대상'**임을 스스로 이해할 수 있다면 어떨까요?\n이 질문에 대한 해답이 바로 **온톨로지 공학**과 **지식 그래프**에 있습니다.\n지금부터 이 기술들이 어떻게 데이터의 단순 나열을 넘어\n**컴퓨터가 '이해'하고 '추론'하는 지식의 네트워크로 바꾸어 놓는지**\n그 핵심 구성 요소인 **RDF, RDFS, OWL**을 중심으로 차근차근 알아보겠습니다.\n---\n## 1. RDF로 모든 것을 '주어-서술어-목적어'로 표현하기\n온톨로지의 가장 기초가 되는 벽돌은 **RDF(Resource Description Framework)**입니다.\nRDF의 핵심 아이디어는 세상의 모든 지식을 아주 단순한 **트리플(Triple)**\n즉 **주어(Subject)** **- 서술어(Predicate) - 목적어(Object)**라는 세 요소의 조합으로 표현하는 것입니다.\n마치 우리가 \"A 창고는 - 서울에 - 위치한다\"라고 말하는 것과 같습니다.\n이 단순한 구조는 컴퓨터가 정보를 명확하게 처리할 수 있는 최소 단위가 됩니다.\n여기서 가장 중요한 점은, 각 요소가 단순한 문자열이 아니라 **URI(Uniform Resource Identifier)**라는 고유한 웹 주소 형태의 식별자를 갖는다는 것입니다.\n- 'A창고' (X) -\\> \\<http://mySCM.com/warehouse/A\\> (O)\n- '위치한다' (X) -\\> \\<http://mySCM.com/property/isLocatedIn\\> (O)\n- '서울' (X) -\\> \\<http://mySCM.com/city/Seoul\\> (O)\n이렇게 모든 개념에 고유 ID를 부여함으로써, '서울'이라는 이름의 도시와 '서울'이라는 이름의 사람을 컴퓨터가 절대 혼동하지 않게 됩니다. 즉, **데이터의 모호함이 원천적으로 제거**됩니다.\n이러한 트리플들이 수없이 연결되면, 점과 선으로 이루어진 거대한 지식의 네트워크, 즉 **지식 그래프**가 만들어집니다.\n#### 잠깐, 이게 관계형 데이터베이스(RDB)랑 뭐가 다른가요?\nRDB가 정해진 틀(테이블 스키마)에 데이터를 맞추는 방식이라면\nRDF는 데이터 조각(트리플)들을 레고처럼 자유롭게 연결하는 방식입니다.\n<table>\n<tr>\n<td>구분</td>\n<td>**관계형 데이터베이스 (RDB)**</td>\n<td>**그래프 데이터 (RDF)**</td>\n</tr>\n<tr>\n<td>**구조**</td>\n<td>정해진 스키마 (테이블, 행, 열)</td>\n<td>스키마 없는 유연한 구조 (트리플)</td>\n</tr>\n<tr>\n<td>**관계 표현**</td>\n<td>외래 키(Foreign Key)를 이용한 **JOIN** 연산</td>\n<td>관계로 노드를 직접 연결 (**Graph Traversal**)</td>\n</tr>\n<tr>\n<td>**유연성**</td>\n<td>스키마 변경이 매우 복잡하고 비용이 큼</td>\n<td>새로운 관계(Predicate)나 데이터 타입 추가가 자유로움</td>\n</tr>\n</table>\nSCM 데이터처럼 공급사, 고객사, 물류센터 등 계속해서 관계와 종류가 변하는 복잡한 환경에서는 RDF의 유연성이 강력한 무기가 됩니다.\n---\n## 2. RDFS로 데이터에 '분류 체계(문법)' 부여하기\nRDF만으로는 데이터의 의미를 충분히 표현할 수 없습니다. \\<http://mySCM.com/warehouse/A\\>가 '창고'라는 **개념**에 속하는지 아니면 '부품'인지 컴퓨터는 알지 못합니다.\n이때 필요한 것이 바로 **RDFS(RDF Schema)**입니다.\nRDFS는 우리가 만든 RDF 데이터에 대한 **'기본적인 문법 규칙'과 '분류 체계**'를 정의합니다.\nRDFS는 몇 가지 중요한 용어를 제공하여 데이터에 질서를 부여합니다.\n- **rdfs:Class**: '개념' 또는 '분류'를 정의합니다. (예: 창고, 제품, 공급업체)\n- **rdfs:subClassOf**: 특정 클래스가 다른 클래스의 하위 분류임을 명시합니다. (예: 냉장창고는 창고의 하위 분류)\n- **rdfs:domain**: 특정 관계(서술어)의 **주어**가 될 수 있는 클래스를 제한합니다.\n- **rdfs:range**: 특정 관계(서술어)의 **목적어**가 될 수 있는 클래스를 제한합니다.\n#### RDFS가 왜 중요한가요?\n\"오직 **창고**만이 **제품**을 보관할 수 있다\"는 규칙을 시스템에 알려줄 수 있습니다.\n```plain text\n# '보관하다' 라는 관계(Property)를 정의\n:stores a rdf:Property ;\n         # 주어(domain)는 반드시 '창고' 클래스여야 함\n         rdfs:domain :Warehouse ;\n         # 목적어(range)는 반드시 '제품' 클래스여야 함\n         rdfs:range :Product .\n```\n만약 누군가 '제품이 창고를 보관한다'와 같은 논리적으로 말이 안 되는 데이터를 입력하면 시스템은 이 규칙에 어긋남을 스스로 감지할 수 있게 됩니다.\n이처럼 RDFS는 데이터의 **정합성과 품질을 보장**하는 최소한의 안전장치 역할을 합니다.\n---\n## 3. 세 번째 벽돌: OWL로 '논리적 추론 시스템' 구축하기\nRDFS는 기본적인 분류 체계는 제공하지만, 더 복잡한 현실 세계의 비즈니스 규칙을 표현하기에는 한계가 있습니다.\n- \"모든 부품은 **단 하나의** 고유 부품 번호만 가질 수 있다.\"\n- \"A 부품의 공급사는 B사이고, B사의 협력사는 C사라면, C사도 A 부품의 **잠재적 공급망**에 속한다.\"\n- \"ERP의 PART-A789와 WMS의 SKU-9511은 **사실 동일한 부품**이다.\"\n이러한 정교하고 복잡한 논리를 표현하고 이를 바탕으로 시스템이 새로운 사실을 **'추론'**하게 만드는 강력한 언어가 바로 **OWL(Web Ontology Language)**입니다.\nOWL은 RDFS를 확장하여 컴퓨터가 마치 사람처럼 논리적 사고를 할 수 있는 강력한 기능을 제공합니다.\n#### OWL의 추론 능력\nOWL이 제공하는 몇 가지 핵심 기능만 봐도 그 강력함을 느낄 수 있습니다.\n<table>\n<tr>\n<td>OWL 문법</td>\n<td>의미(논리 규칙)</td>\n<td>SCM 활용 예시</td>\n<td>**시스템의 추론 결과**</td>\n</tr>\n<tr>\n<td>**sameAs**</td>\n<td>**동일성 선언**</td>\n<td>:PART-A789 owl:sameAs :SKU-9511 .</td>\n<td>:PART-A789를 검색하면 :SKU-9511의 정보까지 **자동으로 함께 조회**됩니다. (서두의 문제 해결!)</td>\n</tr>\n<tr>\n<td>**TransitiveProperty**</td>\n<td>**추이적 관계**</td>\n<td>:isLocatedIn(…에 위치한다)을 추이적 속성으로 정의. (부천공장은 부천에 위치, 부천은 경기도에 위치)</td>\n<td>우리는 명시하지 않았지만, 시스템은 **부천공장이 경기도에 위치한다는 새로운 사실을 스스로 추론**해냅니다.</td>\n</tr>\n<tr>\n<td>**FunctionalProperty**</td>\n<td>**유일성 보장**</td>\n<td>:hasPartNumber를 함수적 속성으로 정의.</td>\n<td>한 부품에 두 개 이상의 부품 번호를 할당하려 하면, 시스템이 **논리적 모순임을 감지**합니다.</td>\n</tr>\n<tr>\n<td>**inverseOf**</td>\n<td>**역관계 정의**</td>\n<td>:isSuppliedBy는 :supplies의 역관계.</td>\n<td>A사가 B부품을 공급(supplies)한다고 입력하면, B부품은 A사에 의해 공급된다(isSuppliedBy)는 사실이 **자동으로 생성**됩니다.</td>\n</tr>\n</table>\n이러한 규칙들을 바탕으로 새로운 사실을 추론해내는 소프트웨어 엔진을 **추론기**라고 부릅니다.\nOWL과 추론기를 통해 우리의 SCM 데이터 시스템은 단순히 데이터를 저장하는 창고에서 새로운 지식을 스스로 생성하고 확장해나가는 지능적인 '**지식 베이스(Knowledge Base)'**로 진화합니다.\n---\n## 실전 활용: SPARQL로 지식 그래프에 질문하고 답 얻기\n자, 이렇게 지식 그래프를 구축했다면 어떻게 활용할 수 있을까요?\n지식 그래프에 질문을 던지는 표준 언어가 바로 **SPARQL(스파클)** 입니다.\nSPARQL은 '**그래프를 위한 SQL'**이라고 생각하면 쉽습니다.\n우리가 처음 제기했던 문제, 즉 ERP의 PART-A789와 관련된 모든 정보를 찾고 싶을 때 SPARQL을 사용하면 어떻게 될까요?\n```plain text\n# 'PART-A789'와 관련된 모든 이름과 재고 위치를 알려줘\n\nSELECT ?name ?location\nWHERE {\n  # ?part는 PART-A789 이거나, 그와 동일한(sameAs) 모든 것을 의미\n  { :PART-A789 ?p ?o } UNION { ?s ?p :PART-A789 } .\n  BIND(IF(BOUND(?s), ?s, :PART-A789) AS ?part)\n\n  # ?part와 관련된 이름과 위치 정보를 찾음\n  ?part :hasName ?name .\n  ?part :isStoredIn ?warehouse .\n  ?warehouse :isLocatedIn ?location .\n}\n```\n이 쿼리의 놀라운 점은 우리는 PART-A789만 물어봤지만 OWL의 owl:sameAs 규칙 덕분에\n시스템은 알아서 SKU-9511과 관련된 정보(예: WMS 상의 창고 위치)까지 **모두 찾아서 한 번에** 보여준다는 것입니다.\n더 이상 여러 시스템을 오가며 수작업으로 데이터를 취합할 필요가 없습니다.\n---\n## 결론: 데이터를 넘어 지식으로, 미래 SCM의 핵심 인프라\nRDF, RDFS, OWL. 언뜻 복잡해 보이지만 이 기술들의 여정은 결국 한 가지 목표를 향합니다.\n바로 **'지식을 정확하고 명료하게 표현하여 기계가 이해하고 활용하게 만들자'**는 것입니다.\n- **RDF**는 지식의 최소 단위(알파벳)를 정의하고\n- **RDFS**는 그 지식들의 기본 분류 체계(기본 문법)를 세우며\n- **OWL**은 그 지식들 사이에 흐르는 논리(고급 문법)를 부여하여 추론을 가능하게 합니다.\n이러한 정교한 설계도를 통해 우리는 데이터의 모호함을 제거하고 여러 시스템에 흩어진 데이터를 완벽하게 통합하며,\n궁극적으로는 시스템이 데이터의 **'의미'**를 이해하여 사람의 의사결정을 돕는 진정한 AI 시스템을 구축할 수 있습니다.\n특히 환각(Hallucination) 현상이 문제 되는 최신 LLM(거대 언어 모델) 시대에\n사실에 기반한 **지식 그래프는 AI가 신뢰할 수 있는 답변을 생성하도록 돕는 핵심적인 역할**을 합니다.",
  "blog-1260": "# 관세법 개정의 위기를 기회로: 5개사 연동 시스템 기획기\n## 1. 예상치 못한 외부 변수와 마주하다\n현업에서 마주하는 가장 까다로운 요구사항은 비즈니스 내부의 니즈가 아닌 '외부의 규제'에서 출발할 때입니다. 이 프로젝트의 시작은 평범한 날 날아온 한 통의 공문에서 비롯되었습니다.\n관세청에서 '해외직구 구매대행업자의 거래정보 의무 제출'이라는 새로운 법안을 예고한 것입니다. 기존에는 쇼핑몰에서 상품을 결제하고 통관 고유부호만 입력하면 문제없이 배송이 진행되었습니다. 하지만 개정된 법안은 결제가 일어나는 즉시 '누가, 언제, 어디서, 무엇을, 얼마에 샀는지'에 대한 민감한 거래 정보를 관세청 시스템에 '실시간'으로 전송할 것을 강제했습니다.\n단순히 API 하나를 덧붙이는 작업이라고 생각할 수도 있습니다. 하지만 당시 저희의 커머스 아키텍처는 그렇게 단순하지 않았습니다. 고객이 결제를 진행하는 프론트엔드 쇼핑몰(솔루션 A사), 결제를 처리하는 PG사(솔루션 B사), 주문 데이터를 수집하고 정제하는 내부 ERP(C사), 현지에서 물건을 포장하고 발송하는 해외 배송 대행지(D사), 그리고 최종적으로 통관을 대행하는 관세법인(E사)까지. 하나의 주문이 흘러가는 파이프라인에 무려 5개의 서로 다른 외부 시스템이 얽혀 있었습니다.\n이 5개사가 각자의 시스템을 수정하고, 실시간으로 거래 정보를 관세청 규격에 맞춰 릴레이(Relay) 방식으로 전달해야만 하는 그야말로 '레거시 연동의 지옥'이 펼쳐진 것입니다.\n## 2. 병목의 발견: 어디서 데이터를 통제할 것인가?\n처음 기획 회의 당시, 각 협력사들은 서로 책임을 미루기 바빴습니다. 쇼핑몰 측은 \"우리는 결제 정보만 가지고 있으니 관세청 전송은 배송 대행지에서 해라\"라고 주장했고, 배송 대행지 측은 \"우리는 결제 승인 내역이나 통관 고유부호의 유효성을 검증할 권한이 없으니 프론트엔드에서 처리해라\"라며 팽팽히 맞섰습니다.\n이 복잡한 '관계망' 속에서 본질적인 문제를 찾기 위해, 저는 각 시스템 간의 데이터 흐름(Data Flow)을 처음부터 끝까지 추적하기 시작했습니다. 그리고 치명적인 병목을 발견했습니다.\n만약 배송 대행지에서 관세청으로 데이터를 최종 전송하려면, 쇼핑몰에서 발생한 민감한 결제 정보(PG 승인 번호, 암호화된 고객 정보)가 아무런 보안 필터링 없이 3개의 시스템을 거쳐 해외 서버로 넘어가야만 했습니다. 이는 심각한 보안 리스크이자 개인정보 보호법 위반 소지가 다분했습니다. 반대로 쇼핑몰에서 직접 전송을 맡으려 해도, 그들은 화물의 실측 무게나 현지 배송 상태 등 물류 데이터를 알 수 없었습니다.\n단방향의 데이터 흐름(A -\\> B -\\> C -\\> D)이라는 기존의 파이프라인 패러다임으로는 이 문제를 결코 풀 수 없었습니다. 누군가 중간에서 모든 파편화된 데이터를 취합하고 통제하는 단일한 '허브(Hub)'가 필요했습니다.\n## 3. 스터디와 구조의 재설계: API 미들웨어 패턴\n이 교착 상태를 타개하기 위해 저는 기존의 선형적인 아키텍처를 버리고, 분산 시스템 통합에 사용되는 'API 미들웨어(Middleware)' 패턴을 깊이 스터디하여 프로젝트에 도입하기로 결정했습니다.\n'의미적으로 동일한 하나의 주문'이라는 핵심 개념을 기반으로, 분산된 5개 시스템의 트랜잭션을 하나로 묶어줄 중앙 아키텍처를 구상했습니다.\n- **프론트엔드(쇼핑몰)** 에서는 결제가 일어나는 즉시 다음 단계의 시스템으로 데이터를 맹목적으로 넘기는 것이 아니라, 저희가 구축할 중앙 미들웨어로 식별자와 암호화된 기초 정보만 전송한다.\n- **해외 배송 대행지** 에서는 화물의 포장이 끝나는 시점에 자신들이 알고 있는 실측 무게와 트래킹 넘버만 중앙 미들웨어로 전송한다.\n- **중앙 미들웨어(자사 ERP 백엔드)** 가 이 두 조각의 비동기 데이터를 수집하여 하나의 '완전한 거래 정보' 객체로 조립(Aggregation)하고, 관세청의 보안 규격에 맞춰 직접 최종 암호화 전송을 수행한다.\n이 구조의 강력함은 5개사가 서로의 레거시 시스템 스펙을 분석하며 N x N 연동을 할 필요 없이, 오직 중앙 미들웨어와 1 x N으로만 통신하면 된다는 점에 있었습니다. 복잡도가 획기적으로 낮아지는 순간이었습니다.\n## 4. 설득과 아키텍트로서의 첫걸음\n기술적인 해답을 찾았지만, 이를 실현하기 위해서는 각기 다른 이해관계를 가진 타사의 개발팀들을 설득해야 했습니다. 저는 제가 스터디하여 직접 설계한 새로운 아키텍처 다이어그램을 들고 5개사의 실무 책임자들을 소집했습니다.\n\"각자 시스템을 뜯어고쳐 연쇄적으로 데이터를 넘기지 마십시오. 그러면 오류 추적도 불가능해지고 각 사의 개발 비용만 기하급수적으로 늘어납니다. 저희가 중앙에서 미들웨어 역할을 구축할 테니, 여러분은 최소한의 트리거(Trigger) 시점에 파편화된 데이터만 저희 쪽 API로 던져주십시오. 관세청과의 연동 책임과 장애 처리 로직은 모두 우리가 통제하겠습니다.\"\n이 과감한 역제안을 통해 지리멸렬하던 기획 회의는 단번에 정리되었습니다. 각 사에서 1\\~2천만 원씩 방어적으로 요구하던 시스템 개발 견적은 인터페이스 단순화로 인해 대폭 축소되었고, 기약 없던 전체 프로젝트의 런칭 기간 역시 절반 이상 단축할 수 있었습니다. 외부의 위기를 기술적 주도권으로 바꿔낸 값진 경험이었습니다.\n---\n> **다음 스터디 과제: 보안의 벽을 넘다**\n> 내부 연동 아키텍처는 정리되었지만, 이렇게 설계된 중앙 미들웨어 시스템이 관세청이라는 폐쇄적이고 낡은 국가 인프라와 통신하기 위해서는 또 다른 거대한 장벽을 넘어야 했습니다.\n> 다음 글에서는 관세청이 요구한 난해한 '3-Track 암호화 인증'을 해석하고 뚫어내기 위해 어떤 암호학적 스터디가 필요했는지, 그리고 불안정한 공공 API 환경에서 데이터 유실을 막기 위해 큐(Queue)와 재시도(Retry) 로직을 어떻게 설계했는지 파고들어 보겠습니다."
};
