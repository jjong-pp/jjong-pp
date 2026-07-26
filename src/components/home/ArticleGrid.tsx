import { FileText, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { allArticles } from 'content-collections';

export const ArticleGrid = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isKr = language === 'KR';

  return (
    <>
      <div className="mt-16 mb-6">
        <h2 className="text-xl font-semibold text-[var(--text-primary)] tracking-tight flex items-center gap-3">
          <span className="w-7 h-[3px] bg-[var(--text-primary)] rounded-sm inline-block" />
          {isKr ? '아티클' : 'ARTICLE'}
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
        {allArticles.map((blog: any) => {
          return (
            <div
              key={blog._meta.path}
              onClick={() => {
                if (blog.title.includes('기사 생산성')) {
                  navigate('/projects/tms');
                } else {
                  navigate(`/projects/${blog._meta.path}`);
                }
              }}
              className="project-card p-6 flex flex-col h-full bg-[var(--surface-color)] border border-[var(--border-color)] rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-lg bg-[var(--bg-color)] flex items-center justify-center text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
                  <FileText size={20} />
                </div>
                <span className="text-[0.65rem] font-semibold text-[var(--text-tertiary)] uppercase tracking-wider">
                  {blog.role || 'Article'}
                </span>
              </div>
              <h3 className="text-base font-semibold text-[var(--text-primary)] mb-2 leading-snug">
                {blog.title}
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed flex-1">
                {blog.description}
              </p>
              <div className="flex justify-between items-center mt-4 pt-3 border-t border-[var(--border-color)]">
                <span className="text-[0.7rem] text-[var(--text-tertiary)] font-medium">{blog.date}</span>
                <ArrowUpRight size={14} className="text-[var(--text-tertiary)] group-hover:text-[var(--text-primary)] transition-colors" />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
