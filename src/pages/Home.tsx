import { ArrowUpRight as ArrowIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { projects } from '../data/projectsData';

export const Home = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const isKr = language === 'KR';

  // 각 프로젝트 아이디별로 적절한 썸네일 이미지 매핑
  const thumbnailMap: Record<string, string> = {
    'customs-api': '/assets/customs_api_thumbnail.png',
    'scm-dashboard': '/assets/scm_dashboard_thumbnail.png',
    'b2b-mall': '/assets/b2b_mall_thumbnail.png',
    'tms': '/assets/tms_thumbnail.png',
  };

  return (
    <section className="pt-2">
      {/* Projects Header */}
      <header className="mb-10 mt-0">
        <h2 className="text-3xl font-bold text-[var(--text-primary)] tracking-tight flex items-center gap-3">
          {isKr ? '주요 프로젝트' : 'Selected Projects'}
        </h2>
        <p className="text-[var(--text-secondary)] mt-3 text-[1.05rem] leading-relaxed">
          {isKr 
            ? '수기 업무의 시스템화부터 데이터를 활용한 파이프라인 구축까지, 비즈니스 목표 달성을 위해 실행했던 핵심 프로젝트들입니다.' 
            : 'Key projects I spearheaded to achieve business goals, from digitalizing manual tasks to building data pipelines.'}
        </p>
      </header>

      {/* Project Image Cards */}
      <div className="flex flex-col gap-10 w-full">
        {projects.map((project, i) => (
          <article
            key={project.id}
            onClick={() => navigate(`/projects/${project.id}`)}
            className="group relative rounded-[20px] overflow-hidden cursor-pointer transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_32px_rgba(0,0,0,0.12)] hover:-translate-y-2 h-[380px] bg-[var(--surface-color)]"
            style={{ animation: `fadeIn 0.5s ease-out ${(i+1)*0.1}s both` }}
          >
            {/* Image with Skeleton background */}
            <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
            <img 
              src={thumbnailMap[project.id] || (project as any).image || '/assets/scm_dashboard_thumbnail.png'} 
              alt={isKr ? project.title.KR : project.title.EN} 
              className="relative z-10 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              onLoad={(e) => {
                // 이미지가 로드되면 뒷배경 스켈레톤을 가리기 위해 펄스 제거 효과
                (e.currentTarget.previousElementSibling as HTMLElement).style.display = 'none';
              }}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement!.style.background = 'linear-gradient(135deg, var(--surface-color) 0%, var(--border-color) 100%)';
                (e.currentTarget.previousElementSibling as HTMLElement).style.display = 'none';
              }}
            />
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/95 via-black/50 to-transparent flex flex-col justify-end px-10 pb-8 pointer-events-none">
              <span className="text-xs font-bold text-white/70 uppercase tracking-wider mb-3">
                {project.role}
              </span>
              <h3 className="text-3xl font-bold text-white mb-3 leading-tight drop-shadow-md">
                {isKr ? project.title.KR : project.title.EN}
              </h3>
              <p className="text-base text-white/90 leading-relaxed drop-shadow-sm max-w-[90%]">
                {isKr ? project.description.KR : project.description.EN}
              </p>
              
              {/* Card Footer Line */}
              <div className="flex justify-between items-center mt-6 pt-5 border-t border-white/20">
                <span className="text-sm font-semibold text-white/80">
                  {project.period}
                </span>
                <div className="flex items-center gap-1 text-white opacity-80 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm font-semibold">{isKr ? '자세히 보기' : 'View Details'}</span>
                  <ArrowIcon size={18} />
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
