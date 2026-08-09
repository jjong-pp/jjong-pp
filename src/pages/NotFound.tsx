import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

/**
 * 존재하지 않는 주소용 화면.
 *
 * 이전에는 `*` 라우트가 ProjectDetail 을 가리켜, 오탈자 주소 하나에도
 * react-markdown + mermaid 가 들어 있는 상세 청크(430KB)를 받아온 뒤에야
 * "찾을 수 없다"를 보여줬다. 이 화면은 초기 번들에 포함돼 즉시 뜬다.
 */
export const NotFound = () => {
  const { language } = useLanguage();
  const isKr = language === 'KR';

  return (
    <div className="flex flex-col items-start gap-6 py-24">
      <h1 className="text-[2rem] font-bold tracking-[-0.03em] text-[var(--text-primary)]">
        {isKr ? '찾을 수 없는 페이지입니다' : 'Not found'}
      </h1>
      <p className="text-[var(--text-secondary)]">
        {isKr
          ? '주소가 바뀌었거나 삭제된 페이지일 수 있습니다.'
          : 'The address may have changed or the page was removed.'}
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 rounded-full border border-[var(--border-color)] px-4 py-2 text-[0.9rem] text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
      >
        <ArrowLeft size={15} />
        {isKr ? '홈으로' : 'Back home'}
      </Link>
    </div>
  );
};
