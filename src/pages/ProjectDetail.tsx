import { useNavigate, useParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  useScrollReveal();

  const isKr = language === 'KR';

  // EXACT text from 공통_이력서.md
  const contentMap: Record<string, { title: string, subtitle: string, img: string, purpose: string, role?: string, results: string[] }> = {
    'customs-api': {
      title: '전자상거래 플랫폼 법령 개정 대응 시스템 구축',
      subtitle: 'PM / 개발 80% 완료',
      img: '/assets/customs_api_thumbnail.png',
      purpose: '2026.08 시행 관세법 개정에 따른 거래정보 자동 제출 시스템 구축 (예산 3,300만 원 규모)',
      role: '시스템 기획 및 PM (관세청 고시문 해석 및 IT 요건 정의)',
      results: [
        '결제 이탈률 최소화를 위해 본인확인 식별정보 기반의 1차 인증과 SMS OTP를 결합한 백업 인증 구조 기획',
        '관세청, 본인인증사, 물류 및 통관사, 개발사 등 5개사 이해관계 조율 및 개발 마일스톤 관리'
      ]
    },
    'scm-dashboard': {
      title: 'SCM 수요 예측 및 재고 관리 대시보드 구축 및 운영',
      subtitle: 'AI 바이브 코딩 활용 자체 개발',
      img: '/assets/scm_dashboard_thumbnail.png',
      purpose: '6개월 이상 장기 리드타임 수입 상품의 품절 및 과재고 리스크 헷징',
      role: '대시보드 아키텍처 설계 및 자체 개발 (AI 바이브 코딩 활용)',
      results: [
        '24주 수요 예측, 선입선출 기반 재고 최적화, 발주 파이프라인 추적 기능 구현',
        'Python, FastAPI, SQL 기반 백엔드(API 40개, 테이블 11개) 구축 및 현업 운용 안착'
      ]
    },
    'b2b-mall': {
      title: 'B2B 폐쇄몰 기반 산후조리원 주문 통합 시스템 구축',
      subtitle: '운영 효율화 프로젝트',
      img: '/assets/b2b_mall_thumbnail.png',
      purpose: '이원화된 수기 주문(분유/물품) 채널을 단일 플랫폼으로 통합하여 운영 효율화',
      role: '비즈니스 로직 재설계, 플랫폼 요건 정의, 커스텀 개발사 협업 및 과업지시서 작성',
      results: [
        '분유 채널(140개소): 구글 폼 수기 접수 및 정산 프로세스를 계좌이체 기반 시스템으로 전면 자동화',
        '물품 채널(77개소): 공급사 발굴, 마진 구조 설계, 회원 관리 등 쇼핑몰 론칭 전 과정 주도'
      ]
    },
    'recall-management': {
      title: '30억 원 규모 리콜 폐기 총괄 및 보상액 환수',
      subtitle: 'Aptamil 글로벌 협업 건',
      img: '/assets/customs_api_thumbnail.png',
      purpose: 'Aptamil 105,000캔 리콜 폐기 진행 및 본사 보상액 전액 환수',
      role: 'SGS 글로벌 감사기관 커뮤니케이션 리딩 및 3자 감사 세팅',
      results: [
        'SGS 등 글로벌 감사기관의 절차를 리서칭하여 한국과 중국 간 3자 감사 체계 단독 세팅',
        '실중량 데이터 오차인 용기 무게를 선제 규명하여 본사 반려를 방어하고 보상액 100% 환수 완료'
      ]
    },
    'tms': {
      title: 'TMS(운송관리시스템) 자체 기획 및 개발',
      subtitle: '수기 배차의 전면 디지털화',
      img: '/assets/tms_thumbnail.png',
      purpose: '수기 배차 업무의 비효율 개선 및 오배송 방지',
      role: '시스템 기획, AI 바이브 코딩을 통한 기능 구현, 현장 안착 리딩',
      results: [
        '지도 API 연동 배송 거리 자동 산출 및 실시간 배차 현황 대시보드 구현',
        '기사 생산성 14% 향상, 외주 운송비 6% 절감, 오배송 0건 달성'
      ]
    }
  };

  const data = contentMap[id || ''] || contentMap['tms'];

  return (
    <div style={{ width: '100%', paddingBottom: '8rem' }}>
      <button className="toggle-btn" onClick={() => navigate(-1)} style={{ marginBottom: '4rem' }}>
        ← {isKr ? '뒤로 가기' : 'Back to Projects'}
      </button>

      {/* Hero Section */}
      <div style={{ animation: 'fadeIn 0.6s ease-out' }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '0.5rem', letterSpacing: '-0.02em', color: 'var(--text-primary)', wordBreak: 'keep-all' }}>{data.title}</h1>
        <p className="text-subtitle" style={{ fontSize: '1.25rem', marginBottom: '3rem', color: 'var(--accent-color)' }}>{data.subtitle}</p>

        <div className="doc-image reveal fade-up-on-scroll" style={{ marginBottom: '5rem', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          <img src={data.img} alt={data.title} style={{ width: '100%', maxHeight: '500px', objectFit: 'cover', display: 'block' }} />
        </div>
      </div>

      {/* Details Section (No Max-Width limits, taking full advantage of the split view!) */}
      <div style={{ width: '100%' }}>
        
        <div className="reveal fade-up-on-scroll" style={{ marginBottom: '4rem' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
            목적
          </h3>
          <p className="text-body" style={{ fontSize: '1.25rem', lineHeight: 1.8 }}>
            {data.purpose}
          </p>
        </div>

        {data.role && (
          <div className="reveal fade-up-on-scroll" style={{ marginBottom: '4rem' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
              주요 역할
            </h3>
            <p className="text-body" style={{ fontSize: '1.25rem', lineHeight: 1.8 }}>
              {data.role}
            </p>
          </div>
        )}

        <div className="reveal fade-up-on-scroll" style={{ marginBottom: '4rem' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
            핵심 성과
          </h3>
          <ul style={{ paddingLeft: '1.5rem' }}>
            {data.results.map((res, idx) => (
              <li key={idx} className="text-body" style={{ fontSize: '1.2rem', lineHeight: 1.7, marginBottom: '1rem' }}>
                {res}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
};
