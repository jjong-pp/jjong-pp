import { useEffect, useRef, useState } from 'react';
import { ExternalLink, GitFork, PlayCircle, X } from 'lucide-react';
import { LinkTag } from './LinkTag';
import type {
  ProjectArtifactImage,
  ProjectArtifactLink,
  ProjectArtifacts as ProjectArtifactsData,
} from '../data/profile';

type Props = {
  artifacts: ProjectArtifactsData;
  isKr: boolean;
};

const linkIcon = (kind: ProjectArtifactLink['kind']) => {
  if (kind === 'github') return GitFork;
  if (kind === 'video') return PlayCircle;
  return ExternalLink;
};

export const ProjectArtifacts = ({ artifacts, isKr }: Props) => {
  const images = artifacts.images ?? [];
  const links = artifacts.links ?? [];
  const [selected, setSelected] = useState<ProjectArtifactImage | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!selected) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelected(null);
      if (event.key === 'Tab') {
        event.preventDefault();
        closeButtonRef.current?.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocusRef.current?.focus();
    };
  }, [selected]);

  if (images.length === 0 && links.length === 0) return null;

  return (
    <>
      <section
        className="mt-10 border-t border-[var(--border-color)] pt-8 md:mt-12 md:pt-10"
        aria-labelledby="project-artifacts"
      >
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[0.76rem] font-semibold tracking-[0.04em] text-[var(--text-tertiary)]">
              {isKr ? '확인 가능한 첨부' : 'Available artifacts'}
            </p>
            <h2
              id="project-artifacts"
              className="mt-1 text-[1.3rem] font-semibold tracking-[-0.02em] text-[var(--text-primary)] md:text-[1.5rem]"
            >
              {isKr ? '결과물 및 참고자료' : 'Outputs and references'}
            </h2>
          </div>
          {images.length > 0 && (
            <p className="text-[0.8rem] text-[var(--text-tertiary)]">
              {isKr ? `결과 화면 ${images.length}장` : `${images.length} result images`}
            </p>
          )}
        </div>

        <p className="mt-3 max-w-[50rem] text-[0.92rem] leading-[1.7] text-[var(--text-secondary)]">
          {isKr
            ? '실제로 확인된 자료만 연결했습니다. 결과 화면을 선택하면 크게 볼 수 있습니다.'
            : 'Only verified materials are linked. Select a result image to view it at a larger size.'}
        </p>

        {links.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {links.map(link => (
              <LinkTag key={`${link.kind}-${link.href}`} href={link.href} icon={linkIcon(link.kind)}>
                {isKr ? link.label.KR : link.label.EN}
              </LinkTag>
            ))}
          </div>
        )}

        {images.length > 0 && (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 md:gap-5">
            {images.map(image => {
              const alt = isKr ? image.alt.KR : image.alt.EN;
              const caption = isKr ? image.caption.KR : image.caption.EN;
              const featured = image.display === 'featured';
              const portrait = image.display === 'portrait';

              return (
                <figure
                  key={image.src}
                  className={`min-w-0 ${featured ? 'sm:col-span-2' : ''}`}
                >
                  <button
                    type="button"
                    onClick={() => setSelected(image)}
                    aria-label={isKr ? `${alt} 크게 보기` : `Enlarge: ${alt}`}
                    className={`group block w-full cursor-zoom-in overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--surface-color)] p-2 transition-colors hover:border-[var(--border-strong)] ${
                      portrait ? 'h-[32rem] md:h-[38rem]' : ''
                    }`}
                  >
                    <img
                      src={image.src}
                      alt={alt}
                      loading="lazy"
                      className={`mx-auto block max-w-full rounded-xl object-contain transition-transform duration-300 group-hover:scale-[1.005] ${
                        portrait ? 'h-full w-auto' : 'h-auto max-h-[44rem] w-auto max-w-full'
                      }`}
                    />
                  </button>
                  <figcaption className="mt-2.5 text-[0.84rem] leading-relaxed text-[var(--text-tertiary)]">
                    {caption}
                  </figcaption>
                </figure>
              );
            })}
          </div>
        )}
      </section>

      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="artifact-lightbox-caption"
          onClick={() => setSelected(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm md:p-6"
        >
          <button
            ref={closeButtonRef}
            type="button"
            onClick={() => setSelected(null)}
            aria-label={isKr ? '확대 화면 닫기' : 'Close enlarged image'}
            className="absolute right-4 top-4 rounded-full p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white md:right-6 md:top-6"
          >
            <X size={26} />
          </button>
          <div
            className="flex max-h-[92vh] max-w-[96vw] flex-col items-center gap-3 overflow-auto custom-scrollbar"
            onClick={event => event.stopPropagation()}
          >
            <img
              src={selected.src}
              alt={isKr ? selected.alt.KR : selected.alt.EN}
              className="max-h-[86vh] max-w-full object-contain"
            />
            <p id="artifact-lightbox-caption" className="text-center text-[0.88rem] text-white/80">
              {isKr ? selected.caption.KR : selected.caption.EN}
            </p>
          </div>
        </div>
      )}
    </>
  );
};
