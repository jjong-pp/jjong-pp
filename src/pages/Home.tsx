import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export const Home = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isKr = language === 'KR';

  const projects = [
    {
      id: 'customs-api',
      title: isKr ? '관세청 자동 전송 API' : 'Customs API',
      desc: isKr ? '결제 연동 시스템 기획' : 'Payment Integration',
      image: '/assets/customs_api_thumbnail.png'
    },
    {
      id: 'scm-dashboard',
      title: isKr ? 'SCM 대시보드' : 'SCM Dashboard',
      desc: isKr ? 'AI 활용 예측 시스템' : 'AI-driven Forecast',
      image: '/assets/scm_dashboard_thumbnail.png'
    },
    {
      id: 'b2b-mall',
      title: isKr ? 'B2B 폐쇄몰 고도화' : 'B2B Closed Mall',
      desc: isKr ? '주문-정산 자동화' : 'Order Automation',
      image: '/assets/b2b_mall_thumbnail.png'
    },
    {
      id: 'recall-management',
      title: isKr ? '30억 리콜 총괄' : 'Recall Management',
      desc: isKr ? '감사 체계 세팅 및 환수' : 'Audit & Reimbursement',
      image: '/assets/customs_api_thumbnail.png'
    },
    {
      id: 'tms',
      title: isKr ? 'TMS 자체 개발' : 'TMS Build',
      desc: isKr ? '지도 기반 배차 시스템' : 'Map-based Dispatch',
      image: '/assets/tms_thumbnail.png'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', width: '100%' }}>
      {/* Project Summary */}
      <div style={{ marginBottom: '1rem', animation: 'fadeIn 0.6s ease-out' }}>
        <h3 style={{ fontSize: '1.8rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
          {isKr ? 'Selected Work' : 'Selected Work'}
        </h3>
        <p className="text-secondary" style={{ fontSize: '1rem', lineHeight: 1.6 }}>
          {isKr 
            ? '수기 업무의 시스템화부터 AI를 활용한 데이터 파이프라인 구축까지, 비즈니스 목표 달성을 위해 주도적으로 실행했던 핵심 프로젝트들입니다. 각 프로젝트를 클릭하여 문제 해결 과정의 디테일을 확인해 보세요.' 
            : 'From digitalizing manual tasks to building AI data pipelines, these are the key projects I spearheaded to achieve business goals. Click each to explore the problem-solving details.'}
        </p>
      </div>

      {projects.map((p, i) => (
        <div key={p.id} className="project-card" onClick={() => navigate(`/projects/${p.id}`)} style={{ animation: `fadeIn 0.5s ease-out ${(i+1)*0.1}s both`, width: '100%' }}>
          <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', aspectRatio: '16/9', backgroundColor: 'var(--surface-color)', display: 'block' }} />
          <div className="project-card-overlay">
            <h4 style={{ fontSize: '1.4rem', color: '#fff', margin: 0, fontWeight: 600, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{p.title}</h4>
            <p style={{ color: 'rgba(255,255,255,0.8)', marginTop: '0.25rem', fontSize: '0.95rem', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>{p.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
