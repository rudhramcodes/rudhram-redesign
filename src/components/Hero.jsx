import { useEffect, useRef } from "react";
import { waapi } from "animejs";
import { slides } from "../lib/slides";

function PlayIcon({ playing }) {
  return playing ? (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
    </svg>

  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
    </svg>

  );
}

export default function Hero({ current, playing, onSelect, onNext, onTogglePlaying }) {
  const contentRef = useRef(null);
  const active = slides[current];

  useEffect(() => {
    slides.forEach((slide) => {
      const image = new Image();
      image.src = slide.image;
    });
  }, []);

  useEffect(() => {
    const animation = waapi.animate(contentRef.current, {
      opacity: [0, 1],
      transform: ["translateY(24px)", "translateY(0)"],
      duration: 620,
      ease: "out(4)",
    });
    return () => animation.cancel();
  }, [current]);

  return (
    <main className="relative h-dvh min-h-[640px] overflow-hidden bg-black text-white">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 bg-cover bg-center transition-[opacity,transform] duration-[1600ms] ease-[cubic-bezier(.22,1,.36,1)] ${current === index ? "scale-100 opacity-100" : "scale-105 opacity-0"}`}
          style={{ backgroundImage: `url(${slide.image})` }}
          aria-hidden={current !== index}
        />
      ))}

      <div className="absolute inset-0 bg-black/35 transition-colors duration-300 dark:bg-black/55" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-end px-6 pb-8 pt-32 sm:px-10 sm:pb-10 lg:px-14 lg:pb-12">
        <div ref={contentRef} className="mb-auto mt-auto max-w-3xl py-12">
          <div className="mb-6 flex items-center gap-4 font-mono text-xs uppercase tracking-normal text-white/70">
            <span>0{current + 1}</span>
            <span>{active.subHeading}</span>
          </div>
          <h1 className="text-[clamp(3.5rem,8vw,7.5rem)] font-semibold leading-[.9] tracking-[-0.055em]">{active.title}</h1>
          <p className="mt-8 max-w-2xl text-base leading-6 text-white/85 sm:text-lg sm:leading-7">{active.description}</p>
        </div>

        <div className="flex items-stretch gap-2 rounded-[28px] border border-white/25 bg-black/35 p-2 backdrop-blur-xl">
          <div className="grid min-w-0 flex-1 grid-cols-3 gap-1">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => onSelect(index)}
                aria-label={`Show ${slide.title} slide`}
                aria-pressed={current === index}
                className={`min-w-0 cursor-pointer rounded-2xl px-3 py-3 text-left transition-colors focus-visible:outline-3 focus-visible:outline-white sm:px-5 ${current === index ? "bg-white text-black" : "text-white hover:bg-white/10"}`}
              >
                <span className="block font-mono text-[10px] uppercase tracking-[0.12em] opacity-60">0{index + 1}</span>
                <span className="mt-1 hidden truncate text-sm font-semibold sm:block">{slide.title}</span>
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={onTogglePlaying}
            aria-label={playing ? "Pause slideshow" : "Play slideshow"}
            className="relative flex w-14 shrink-0 cursor-pointer items-center justify-center rounded-2xl text-white transition-colors hover:bg-white/10 focus-visible:outline-3 focus-visible:outline-white"
          >
            <span
              key={current}
              className="slide-progress slide-progress--playing"
              style={{ animationPlayState: playing ? "running" : "paused" }}
              onAnimationEnd={onNext}
              aria-hidden="true"
            />
            <span className="relative z-10"><PlayIcon playing={playing} /></span>
          </button>
        </div>
      </div>
    </main>
  );
}
