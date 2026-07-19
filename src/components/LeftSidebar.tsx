import { useLanguage } from '../context/LanguageContext';

export const LeftSidebar = () => {
  const { language } = useLanguage();
  const isKr = language === 'KR';

  return (
    <div className="no-scrollbar" style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '2.5rem 2rem' }}>
      <div style={{ flex: 1, marginTop: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
          {isKr ? '박종혁' : 'JongHyeok Park'}
        </h1>

        {/* Intro */}
        <div style={{ marginBottom: '2rem' }}>
          <p style={{ fontSize: '0.875rem', lineHeight: 1.75, color: 'var(--text-primary)', marginBottom: '0.6rem' }}>
            {isKr
              ? '개선점을 찾아 끊임없이 고민하는 기획자입니다.'
              : 'I am a planner who constantly seeks improvement.'}
          </p>
          <p style={{ fontSize: '0.875rem', lineHeight: 1.75, color: 'var(--text-primary)', marginBottom: '0.6rem' }}>
            {isKr
              ? '실무에 완벽히 들어맞는 시스템은 처음부터 존재하지 않습니다. 하지만 현장의 병목을 데이터로 포착하고, 자동화 프로세스로 전환하는 일은 가능합니다.'
              : 'No system fits perfectly from the start. But we can capture field bottlenecks with data and transform them into automated processes.'}
          </p>
          <p style={{ fontSize: '0.875rem', lineHeight: 1.75, color: 'var(--text-primary)' }}>
            {isKr
              ? <>현장의 사각지대에서 발생하는 간극을 가장 먼저 발견하고, 문제 정의부터 프로토타입 구현까지 비즈니스에 실질적 가치를 더하는 데이터 기반의 솔루션을 만듭니다.</>
              : <>By identifying gaps in operational blind spots, I deliver data-driven solutions from problem definition to prototype implementation, adding tangible value to the business.</>}
          </p>
        </div>

        {/* Career */}
        <div>
          <h3 style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem', fontWeight: 600 }}>
            {isKr ? '경력 사항' : 'Career'}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* EIBE */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.15rem' }}>
                <strong style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>아이베(EIBE)</strong>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', fontWeight: 500 }}>2025.09 ~ 재직중</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>SCM 팀 · 사원</p>
              <ul style={{ paddingLeft: '1rem', color: 'var(--text-primary)', fontSize: '0.78rem', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <li>글로벌 브랜드(Nutricia) 6개월 이상 리드타임 수발주 관리, 발주서와 인보이스 매칭 정산, 환율 연동 재고 자산 가치 평가</li>
                <li>국내 주요 다채널(B2C/B2B) 출고 운영 및 식품 유통기한 특성을 반영한 선입선출 재고 관리</li>
                <li>채널별 MD, 인스탁 매니저, 3PL 등 대내외 이해관계자 간 커뮤니케이션을 리딩하며, 프로모션 및 긴급 건에 대한 입출고 우선순위 최적화</li>
                <li>수입 통관의 전 과정(서류 검토부터 정산까지) 관리 및 소규모 수출 서류 작성 대응</li>
                <li>3PL 파트너사 서비스 수준 지표 관리, 월별 물류비 정산 및 신규 풀필먼트 계약 전환 프로젝트 수행</li>
                <li>컴플라이언스 관리: 식품이력추적관리 법적 의무 대응 프로세스 구축 및 신규 상품 수입 통관 세팅</li>
                <li>B2B 물품 공급망 중간 마진 구조 설계 및 자체 폐쇄몰 기획·론칭·운영 전담</li>
                <li>내부 운영 프로세스 병목 분석 및 자동화 대시보드 등 IT 시스템 기반의 업무 효율화 기획</li>
              </ul>
            </div>
            {/* Taekhwa */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.15rem' }}>
                <strong style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>택화로지스틱스코리아㈜</strong>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', fontWeight: 500 }}>2024.02 ~ 2025.08</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>물류관리 · 사원 (1년 7개월)</p>
              <ul style={{ paddingLeft: '1rem', color: 'var(--text-primary)', fontSize: '0.78rem', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <li>End-to-End 서비스 물류(고객 컨택, 담당 엔지니어 연계, 배송/회수) 운영</li>
                <li>핵심 고객사(Dell Technologies)의 SLA 기반 23개 핵심성과지표(KPI) 데이터 관리</li>
                <li>특수 목적(수리/폐기) 물품의 국내 및 해외(수출입) 운송 프로세스 관리</li>
                <li>기술 엔지니어사, 배송사(택배/퀵), 관세사, 해외 포워더(DHL) 등 복수 전문 파트너사들과 업무 협업</li>
                <li>내부 출고팀 및 운송 기사(10명 이상) 대상 일일 운영 가이드라인 제시 및 실무 리딩</li>
                <li>신규 프로세스 도입 및 변경 시 도입 운영</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>© 2026 JongHyeok Park.</p>
      </div>
    </div>
  );
};
