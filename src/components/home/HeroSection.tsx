import { useLanguage } from '../../context/LanguageContext';

export const HeroSection = () => {
  const { language } = useLanguage();
  const isKr = language === 'KR';

  return (
    <div className="mb-12 mt-4">
      <h1 className="text-3xl md:text-[2.5rem] font-bold tracking-tight leading-tight text-[var(--text-primary)] mb-6">
        {isKr ? '개선점을 찾아 끊임없이 고민하는 기획자.' : 'A Planner who Constantly Seeks Improvement.'}
      </h1>
      <div className="text-base leading-relaxed text-[var(--text-secondary)]">
        {isKr ? (
          <>
            <p className="font-semibold text-[var(--text-primary)] mb-4">
              "모든 모델은 틀렸다. 하지만 일부는 유용하다." (조지 박스, 통계학자)
            </p>
            <p className="mb-3">실무에 처음부터 완벽하게 들어맞는 시스템은 없다고 생각합니다.</p>
            <p className="mb-3">하지만 끊임없이 비효율을 찾아내고 최적화된 방법을 강구할 수는 있습니다.</p>
            <p>마치 톱니바퀴의 미세한 오차를 지속적으로 조정해 거대한 기계를 매끄럽게 굴러가게 만드는 엔지니어처럼<br className="hidden md:block"/>비즈니스의 마찰을 줄이고 효율을 높이는 기획자로 성장하고자 합니다.</p>
          </>
        ) : (
          <>
            <p className="font-semibold text-[var(--text-primary)] mb-4">
              "All models are wrong, but some are useful." (George Box)
            </p>
            <p className="mb-3">Like the British statistician George Box said, I believe there is no system that fits perfectly into the field from the beginning.</p>
            <p className="mb-3">However, we can constantly seek out inefficiencies and devise optimized solutions.</p>
            <p>Like an engineer who continuously adjusts the microscopic errors of cogwheels to make a massive machine run smoothly,<br className="hidden md:block"/>I strive to grow into a planner who reduces business friction and enhances efficiency.</p>
          </>
        )}
      </div>
    </div>
  );
};
