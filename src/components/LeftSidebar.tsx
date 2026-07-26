import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Mail, Code, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';

export const LeftSidebar = () => {
  const { language } = useLanguage();
  const isKr = language === 'KR';
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex flex-col h-full w-full pt-4">
      <div className="flex-1 w-full flex flex-col gap-8 md:gap-12">
        
        {/* HEADER: Avatar & Title */}
        <div className="flex flex-col items-center text-center w-full">
          {/* Profile Image - 크기 확장 & 렌더링 퀄리티 향상 */}
          <div className="mb-4 md:mb-6 w-40 h-40 md:w-56 md:h-56 shrink-0 relative rounded-full p-1 border-2 border-[var(--border-color)]">
            <img 
              src="/assets/profile_picture.jpg" 
              alt="Profile" 
              className="w-full h-full rounded-full object-cover object-center"
              style={{ imageRendering: '-webkit-optimize-contrast' }}
              onError={(e) => {
                e.currentTarget.src = 'https://ui-avatars.com/api/?name=JongHyeok+Park&background=random';
              }}
            />
          </div>

          <h1 className="text-2xl md:text-3xl tracking-tight mb-1 text-[var(--text-primary)] font-bold">
            {isKr ? '박종혁' : 'JongHyeok Park'}
          </h1>
          <h2 className="text-sm md:text-base font-medium text-[var(--text-secondary)] mb-6">
            {isKr ? 'AX 기획자 (Systems Architect & PM)' : 'AX Planner (Systems Architect & PM)'}
          </h2>
          
          {/* Contact Links */}
          <div className="flex flex-col w-full gap-3 px-4">
            <a href="mailto:jonghp1357@gmail.com" 
               className="flex items-center justify-center gap-3 w-full py-3 rounded-xl bg-[var(--surface-color)] border border-[var(--border-color)] text-[0.95rem] font-semibold text-[var(--text-primary)] hover:border-[var(--text-primary)] transition-all shadow-sm">
              <Mail size={18} />
              <span>jonghp1357@gmail.com</span>
            </a>
            <div className="flex w-full gap-3">
              <a href="https://github.com/jjongHyeok" target="_blank" rel="noreferrer"
                 className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[var(--bg-color)] border border-[var(--border-color)] text-[0.9rem] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-primary)] transition-all shadow-sm">
                <Code size={18} />
                <span>Github</span>
              </a>
              <a href="https://semon-devlog.tistory.com/" target="_blank" rel="noreferrer"
                 className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[var(--bg-color)] border border-[var(--border-color)] text-[0.9rem] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-primary)] transition-all shadow-sm">
                <BookOpen size={18} />
                <span>Blog</span>
              </a>
            </div>
          </div>
        </div>

        {/* 모바일 토글 버튼 (데스크탑에선 hidden) */}
        <div className="px-4 md:hidden">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold text-[var(--text-primary)] border border-[var(--border-color)] rounded-xl bg-[var(--surface-color)] shadow-sm hover:bg-[var(--bg-color)] transition-colors"
          >
            {isExpanded ? (isKr ? '프로필 접기' : 'Hide Profile') : (isKr ? '프로필 자세히 보기' : 'View Full Profile')}
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>

        {/* Collapsible Content */}
        <div className={`flex flex-col gap-10 md:gap-12 overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[3000px] opacity-100 mt-2' : 'max-h-0 opacity-0 md:max-h-none md:opacity-100'}`}>
          
          {/* BIO SECTION */}
          <div className="w-full px-4 md:px-2 space-y-5 text-[1.05rem] leading-[1.75] text-[var(--text-secondary)]">
            <p className="text-[var(--text-primary)] font-semibold text-[1.1rem]">
              {isKr
                ? '처음부터 실무에 완벽한 시스템은 없습니다.'
                : 'There is no system that fits perfectly into the field from the start.'}
            </p>
            <p>
              {isKr
                ? '그렇기에 저는 유관 부서와의 치열한 소통으로 문제를 정의합니다.'
                : 'That is why I define problems through intense communication with relevant departments.'}
            </p>
            <p>
              {isKr
                ? '기획부터 AI를 활용한 프로토타입 구현, 그리고 현장에 안착할 때까지의 지속적인 개선을 거쳐 비즈니스에 실질적 가치를 창출하는 End-to-End 솔루션을 완성해 냅니다.'
                : 'From planning to prototype implementation using AI, and continuous improvement until it settles in the field, I complete an end-to-end solution that creates tangible value for the business.'}
            </p>
          </div>

          {/* SKILLSET */}
          <div className="w-full px-4 md:px-2 mb-4">
            <h3 className="text-[1.3rem] font-bold text-[var(--text-primary)] tracking-tight mb-5 border-l-[3px] border-[var(--text-primary)] pl-4">
              {isKr ? '핵심 역량' : 'Skillset'}
            </h3>
            {/* flex-wrap 과 whitespace-nowrap 추가로 가로 넘침 방지 및 자동 줄바꿈 */}
            <div className="flex flex-wrap gap-2.5">
              {['Architecture & API Design', 'Python / Java / SQL', 'SCM Domain', 'AX Planning'].map(skill => (
                <span key={skill} className="whitespace-nowrap shrink-0 px-3 py-1.5 text-[0.85rem] font-medium rounded-lg bg-[var(--surface-color)] text-[var(--text-secondary)] border border-[var(--border-color)] shadow-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* CAREER */}
          <div className="w-full px-4 md:px-2">
            <h3 className="text-[1.3rem] font-bold text-[var(--text-primary)] tracking-tight mb-6 border-l-[3px] border-[var(--text-primary)] pl-4">
              {isKr ? '경력 사항' : 'Career'}
            </h3>
            
            <div className="flex flex-col gap-10">
              {/* EIBE */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-baseline border-b border-[var(--border-color)] pb-2">
                  <strong className="text-[1.1rem] font-bold text-[var(--text-primary)]">아이베(EIBE)</strong>
                  <span className="text-[0.85rem] text-[var(--text-tertiary)] font-medium shrink-0">2025.09 ~ 재직중</span>
                </div>
                <ul className="flex flex-col gap-3.5 mt-3">
                  {[
                    "글로벌 브랜드(Nutricia) 6개월 이상 리드타임 수발주 관리, PO-인보이스 매칭 정산, 환율 연동 재고 자산 가치 평가",
                    "국내 주요 다채널(B2C/B2B) 출고 운영 및 식품 유통기한 특성을 반영한 선입선출(FEFO) 재고 관리",
                    "채널별 MD, 인스탁 매니저, 3PL 등 대내외 이해관계자 간 커뮤니케이션을 돕고, 프로모션 및 긴급 건에 대한 입출고 우선순위 조율",
                    "수입 통관 End-to-End 관리(통관 서류 검토, 입항, 입고 확인, 정산) 및 소규모 수출(CI-PL 작성) 대응",
                    "3PL 파트너사 SLA(서비스 수준 지표) 관리, 월별 물류비 정산 및 신규 풀필먼트 계약 전환 프로젝트 지원",
                    "컴플라이언스 관리: 식품이력추적관리 법적 의무 대응 프로세스 구축 및 신규 상품(특수의료용도식품 등) 수입 통관 셋업",
                    "B2B 물품 공급망 중간 마진 구조 설계 및 자체 폐쇄몰(고도몰) 기획·론칭·운영 전담",
                    "내부 운영 프로세스 병목 파악 및 IT 시스템(자동화 대시보드 등) 기반의 업무 효율화 기획"
                  ].map((desc, i) => (
                    <li key={i} className="flex gap-3 items-start text-[var(--text-secondary)] text-[0.95rem] leading-relaxed">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--text-tertiary)] shrink-0 mt-[0.45rem]"></div>
                      <div className="flex-1">{desc}</div>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Taekhwa */}
              <div className="flex flex-col gap-3 mt-2">
                <div className="flex justify-between items-baseline border-b border-[var(--border-color)] pb-2">
                  <strong className="text-[1.1rem] font-bold text-[var(--text-primary)]">택화로지스틱스코리아㈜</strong>
                  <div className="flex flex-col items-end">
                    <span className="text-[0.85rem] text-[var(--text-tertiary)] font-medium">2024.02 ~ 2025.08</span>
                    <span className="text-[0.75rem] text-[var(--text-tertiary)]">(1년 7개월)</span>
                  </div>
                </div>
                <ul className="flex flex-col gap-3.5 mt-3">
                  {[
                    "End-to-End 서비스 물류(고객 컨택, 담당 엔지니어 연계, 배송/회수) 운영",
                    "고객사(Dell Technologies)의 SLA 기반 23개 핵심성과지표(KPI) 리포팅",
                    "기술 엔지니어사, 배송사(택배/퀵), 관세사, 해외 포워더(DHL) 등 파트너사들과 업무 협업",
                    "내부 출고팀 및 운송 기사 대상 일일 운영 가이드라인 안내 및 실무 지원",
                    "신규 프로세스 도입 및 변경 시 현장 도입 운영"
                  ].map((desc, i) => (
                    <li key={i} className="flex gap-3 items-start text-[var(--text-secondary)] text-[0.95rem] leading-relaxed">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--text-tertiary)] shrink-0 mt-[0.45rem]"></div>
                      <div className="flex-1">{desc}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-4 md:mt-12 pt-8 border-t border-[var(--border-color)] pb-12 flex justify-center text-center">
            <p className="text-[0.85rem] text-[var(--text-tertiary)]">© 2026 JongHyeok Park.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
