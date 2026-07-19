import { useState } from 'react';
import { ArrowUpRight, PanelLeftClose, PanelLeftOpen, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LeftSidebar } from '../components/LeftSidebar';
import { useLanguage } from '../context/LanguageContext';
import { blogList, projects } from '../data/projectsData';

export const Home = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const isKr = language === 'KR';
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div style={{ width: '100%', backgroundColor: 'var(--bg-color)' }}>
      <div style={{ display: 'flex', width: '100%', height: 'calc(100vh - 64px)', position: 'relative' }}>
        
        {/* Bookmark Toggle Button */}
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          style={{
            position: 'absolute',
            top: '2rem',
            left: isSidebarOpen ? '40%' : '0',
            transform: isSidebarOpen ? 'translateX(-50%)' : 'translateX(0)',
            zIndex: 100,
            background: 'var(--surface-color)',
            border: '1px solid var(--border-color)',
            borderRadius: '50%',
            width: '36px', height: '36px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--text-secondary)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            cursor: 'pointer',
            transition: 'left 0.3s ease'
          }}
          title={isSidebarOpen ? "Hide Resume" : "Show Resume"}
        >
          {isSidebarOpen ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18} />}
        </button>

        {/* Left Sidebar - Collapsible (4:6 ratio) */}
        {isSidebarOpen && (
          <div style={{
            width: '40%', flexShrink: 0,
            height: '100%',
            overflowY: 'auto',
            backgroundColor: 'var(--surface-color)',
            borderRight: '1px solid var(--border-color)',
            paddingLeft: '2rem',
            transition: 'width 0.3s ease'
          }}>
            <LeftSidebar />
          </div>
        )}

        {/* Right Main Content (60% or 100%) */}
        <div style={{
          flex: 1,
          height: '100%',
          overflowY: 'auto',
          padding: '4rem 3%',
          backgroundColor: 'var(--bg-color)',
          position: 'relative'
        }}>
          
          <div style={{ width: '100%', maxWidth: '1800px', margin: '0 auto' }}>
            {/* Hero */}
            <div style={{ marginBottom: '3rem', marginTop: '1rem' }}>
              <h1 style={{ fontSize: '2.5rem', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.25, color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
                {isKr ? '개선점을 찾아 끊임없이 고민하는 기획자.' : 'A Planner who Constantly Seeks Improvement.'}
              </h1>
              <div style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
                {isKr ? (
                  <>
                    <p style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem' }}>
                      "모든 모델은 틀렸다. 하지만 일부는 유용하다." (조지 박스, 통계학자)
                    </p>
                    <p style={{ marginBottom: '0.75rem' }}>영국의 통계학자 조지 박스의 말처럼 실무에 처음부터 완벽하게 들어맞는 시스템은 없다고 생각합니다.</p>
                    <p style={{ marginBottom: '0.75rem' }}>하지만 끊임없이 비효율을 찾아내고 최적화된 방법을 강구할 수는 있습니다.</p>
                    <p>마치 톱니바퀴의 미세한 오차를 지속적으로 조정해 거대한 기계를 매끄럽게 굴러가게 만드는 엔지니어처럼<br />비즈니스의 마찰을 줄이고 효율을 높이는 기획자로 성장하고자 합니다.</p>
                  </>
                ) : (
                  <>
                    <p style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem' }}>
                      "All models are wrong, but some are useful." (George Box)
                    </p>
                    <p style={{ marginBottom: '0.75rem' }}>Like the British statistician George Box said, I believe there is no system that fits perfectly into the field from the beginning.</p>
                    <p style={{ marginBottom: '0.75rem' }}>However, we can constantly seek out inefficiencies and devise optimized solutions.</p>
                    <p>Like an engineer who continuously adjusts the microscopic errors of cogwheels to make a massive machine run smoothly,<br />I strive to grow into a planner who reduces business friction and enhances efficiency.</p>
                  </>
                )}
              </div>
            </div>

            {/* Projects Header */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ width: '28px', height: '3px', backgroundColor: 'var(--text-primary)', borderRadius: '2px', display: 'inline-block' }} />
                {isKr ? '프로젝트' : 'Projects'}
              </h2>
            </div>

            {/* Project Grid (Responsive auto-fit) */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
              gap: '1.5rem',
              width: '100%'
            }}>
              {projects.map((project) => {
                const Icon = project.icon;
                return (
                  <div
                    key={project.id}
                    onClick={() => navigate(`/projects/${project.id}`)}
                    className="project-card"
                    style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', height: '100%' }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                      <div style={{
                        width: '40px', height: '40px', borderRadius: '10px',
                        backgroundColor: 'var(--bg-color)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'var(--text-secondary)',
                        transition: 'all 0.3s ease',
                      }}>
                        <Icon size={20} />
                      </div>
                      <span style={{ fontSize: '0.65rem', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {project.role}
                      </span>
                    </div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem', lineHeight: 1.35 }}>
                      {isKr ? project.title.KR : project.title.EN}
                    </h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.55, flex: 1 }}>
                      {isKr ? project.description.KR : project.description.EN}
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', fontWeight: 500 }}>{project.period}</span>
                      <ArrowUpRight size={14} style={{ color: 'var(--text-tertiary)' }} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Blog Section */}
            <div style={{ marginTop: '4rem', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ width: '28px', height: '3px', backgroundColor: 'var(--text-primary)', borderRadius: '2px', display: 'inline-block' }} />
                {isKr ? '아티클' : 'ARTICLE'}
              </h2>
            </div>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
              gap: '1.5rem',
              width: '100%'
            }}>
              {blogList.map((blog: any) => {
                return (
                  <div
                    key={blog.id}
                    onClick={() => navigate(`/projects/${blog.id}`)}
                    className="project-card"
                    style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', height: '100%' }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                      <div style={{
                        width: '40px', height: '40px', borderRadius: '10px',
                        backgroundColor: 'var(--bg-color)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'var(--text-secondary)',
                        transition: 'all 0.3s ease',
                      }}>
                        <FileText size={20} />
                      </div>
                      <span style={{ fontSize: '0.65rem', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {blog.role}
                      </span>
                    </div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem', lineHeight: 1.35 }}>
                      {isKr ? blog.title.KR : blog.title.EN}
                    </h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.55, flex: 1 }}>
                      {isKr ? blog.description.KR : blog.description.EN}
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', fontWeight: 500 }}>{blog.period}</span>
                      <ArrowUpRight size={14} style={{ color: 'var(--text-tertiary)' }} />
                    </div>
                  </div>
                );
              })}
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};
