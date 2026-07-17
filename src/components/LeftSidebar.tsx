import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

export const LeftSidebar = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const isKr = language === 'KR';

  return (
    <div className="no-scrollbar" style={{ 
      width: '45%', 
      height: '100%', 
      padding: '4rem 3rem', 
      display: 'flex', 
      flexDirection: 'column', 
      borderRight: '1px solid var(--border-color)',
      overflowY: 'auto',
      backgroundColor: 'var(--bg-color)'
    }}>
      {/* Top Banner & Toggles */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div style={{ 
          width: '48px', height: '48px', borderRadius: '12px', 
          background: 'linear-gradient(135deg, var(--accent-color), #8a2be2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontWeight: 'bold', fontSize: '1.2rem'
        }}>JP</div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="toggle-btn" onClick={toggleTheme}>{theme === 'dark' ? 'Light' : 'Dark'}</button>
          <button className="toggle-btn" onClick={toggleLanguage}>{isKr ? 'ENG' : 'KOR'}</button>
        </div>
      </div>

      <div style={{ flex: 1 }}>
        <h1 style={{ fontSize: '3rem', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '1rem' }}>
          {isKr ? '박종혁' : 'JongHyeok Park'}
        </h1>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>
          {isKr ? '현장의 병목을 시스템과 AI로 해결하는 IT 시스템 기획자' : 'IT System Planner resolving bottlenecks with Systems & AI'}
        </h2>
        
        <div style={{ marginBottom: '3.5rem' }}>
          <p className="text-body" style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--text-primary)', marginBottom: '1rem' }}>
            {isKr 
              ? '물류 현장의 파편화된 수기 업무를 데이터 기반의 시스템으로 전환합니다. 아무도 요구하지 않았으나 스스로 문제를 찾아 TMS를 독자 구축하고, AI 바이브 코딩을 통해 400억 규모 SCM 대시보드를 직접 설계하여 실무에 적용해왔습니다.'
              : 'I transform fragmented manual logistics tasks into data-driven systems. Identifying problems independently, I built a TMS from scratch and designed a $30M SCM dashboard using AI vibe-coding for immediate practical application.'}
          </p>
          <p className="text-body" style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--text-primary)' }}>
            {isKr
              ? '진정한 기획은 예쁜 화면을 그리는 것이 아니라, 복잡한 비즈니스 로직을 코드의 언어로 정확히 번역하는 것이라 믿습니다.'
              : 'I believe true planning isn’t just drawing pretty screens, but accurately translating complex business logic into the language of code.'}
          </p>
        </div>

        {/* Detailed Career Section from Resume */}
        <div>
          <h3 style={{ fontSize: '0.9rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.5rem' }}>
            {isKr ? '경력 사항' : 'Career'}
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {/* EIBE */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                <strong style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>아이베(EIBE)</strong>
                <span className="text-meta">2025.09 ~ 재직중</span>
              </div>
              <p className="text-secondary" style={{ fontSize: '0.95rem', marginBottom: '1rem' }}>SCM 팀 · 사원</p>
              <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-primary)', fontSize: '0.95rem', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                <strong style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>택화로지스틱스코리아㈜</strong>
                <span className="text-meta">2024.02 ~ 2025.08 (1년 7개월)</span>
              </div>
              <p className="text-secondary" style={{ fontSize: '0.95rem', marginBottom: '1rem' }}>물류관리 · 사원</p>
              <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-primary)', fontSize: '0.95rem', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
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

      <div style={{ marginTop: '3rem', paddingTop: '2rem' }}>
        <p className="text-meta">© 2026 JongHyeok Park.</p>
      </div>
    </div>
  );
};
