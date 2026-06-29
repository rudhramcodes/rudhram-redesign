import { useRef, useState, useEffect } from "react";
import { useSlideTimer } from "../hooks/useSlideTimer";
import { slides } from "../lib/slides";

const pad = (n) => String(n).padStart(2, "0");

const PlayIcon = () => (
  <svg width="14" height="16" viewBox="0 0 10 12" fill="none" aria-hidden="true" className="translate-x-[1px]">
    <path d="M1.5 1L8.5 6L1.5 11V1Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

const PauseIcon = () => (
  <svg width="14" height="16" viewBox="0 0 10 12" fill="none" aria-hidden="true">
    <rect x="1.5" y="1" width="2" height="10" rx="0.5" stroke="currentColor" strokeWidth="1.5" />
    <rect x="6.5" y="1" width="2" height="10" rx="0.5" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export default function Hero() {
  const { current, playing, progress, setPlaying, goTo, total } = useSlideTimer({
    total: slides.length,
    interval: 6000,
  });

  const preloaded = useRef({});
  const s = slides[current];
  useEffect(() => {
    slides.forEach((slide) => {
      if (!preloaded.current[slide.id]) {
        preloaded.current[slide.id] = true;
        const img = new Image();
        img.src = slide.image;
      }
    });
  }, []);

  // Staggered animation triggers for text
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    setAnimate(false);
    const timer = setTimeout(() => setAnimate(true), 50);
    return () => clearTimeout(timer);
  }, [current]);

  return (
    <section className="relative h-dvh w-full overflow-hidden bg-[#111816] select-none font-sans text-rice-paper">
      {/* Background Images */}
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          className={`absolute inset-0 bg-cover bg-center transition-all duration-[2000ms] ease-[cubic-bezier(0.25,1,0.5,1)] will-change-[opacity,transform] ${i === current ? "opacity-100 scale-100" : "opacity-0 scale-110"
            }`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          {/* Rich Vignette/Gradient per image for absolute perfect contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#111816]/95 via-[#111816]/60 to-transparent mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111816]/90 via-[#111816]/20 to-transparent opacity-90" />
        </div>
      ))}

      {/* Main Content Layout */}
      <div className="relative z-10 flex flex-col justify-between h-full w-full">

        {/* Top Space */}
        <div className="h-20 md:h-32 w-full shrink-0" />

        {/* Center Text Area */}
        <div className="flex-1 flex items-center px-6 md:px-16 lg:px-24 w-full">
          <div className="max-w-[700px] relative">
            <div className="relative z-10">
              <div
                className={`flex items-center gap-4 md:gap-6 mb-6 transition-all duration-700 ease-out transform ${animate ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                  }`}
                style={{ transitionDelay: "100ms" }}
              >
                {/* <div className="h-[1.5px] w-12 md:w-20 bg-sandalwood drop-shadow-md" /> */}
                <span className="text-sandalwood text-[13px] md:text-[15px] font-semibold drop-shadow-md">
                  {s.subHeading}
                </span>
              </div>

              <h1
                className={`text-[clamp(3.2rem,6.5vw,6.5rem)] font-serif font-light leading-[1.05] tracking-tight mb-8 drop-shadow-2xl transition-all duration-700 ease-out transform ${animate ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  }`}
                style={{ transitionDelay: "250ms" }}
              >
                {s.title}
              </h1>

              <p
                className={`text-rice-paper/85 text-[clamp(1.05rem,1.5vw,1.25rem)] font-light leading-[1.8] max-w-[540px] drop-shadow-md transition-all duration-700 ease-out transform ${animate ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  }`}
                style={{ transitionDelay: "400ms" }}
              >
                {s.description}
              </p>
            </div>
          </div>
        </div>

        {/* Stunning Bottom Control Bar */}
        <div className="w-full px-6 md:px-16 lg:px-24 pt-6 md:pt-10 pb-8 md:pb-12 shrink-0">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">

            {/* Slide Navigation Tabs */}
            <div className="relative z-20 flex gap-1 pb-2 md:gap-2 md:pb-0">
              {slides.map((slide, i) => {
                return (
                  <div key={slide.id} className="group relative w-28">
                    <span className="absolute inset-x-0 bottom-[2px] h-[180px] md:h-[220px]" aria-hidden="true" />
                    <div
                      className="pointer-events-none absolute bottom-full z-30 mb-5 w-full translate-y-2 opacity-0 transition-all duration-300 ease-out group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100"
                    >
                      <p className="mb-2 text-xs font-semibold text-white drop-shadow-md sm:text-sm md:mb-3 md:text-xl">
                        {slide.title}
                      </p>
                      <img
                        src={slide.image}
                        alt={slide.title}
                        onClick={() => goTo(i)}
                        className="aspect-video w-full max-w-[240px] object-cover shadow-2xl cursor-pointer"
                      />
                    </div>
                    <button
                      onClick={() => goTo(i)}
                      className="flex flex-col gap-4 cursor-pointer text-left w-full"
                      aria-label={`Go to slide ${i + 1}`}
                    >
                          <div className="w-full h-[2px] bg-rice-paper/15 relative overflow-hidden rounded-full">
                        <div
                          className="absolute top-0 left-0 h-full bg-sandalwood rounded-full"
                          style={{
                            width: i < current ? "100%" : i === current ? `${progress}%` : "0%",
                          }}
                        />
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Play/Pause & Counter */}
            <div className="flex items-center gap-8 shrink-0 relative z-20">
              <span className="text-rice-paper/40 text-xs font-sans font-medium tabular-nums tracking-[0.2em] uppercase hidden md:block">
                <span className="text-rice-paper">{pad(current + 1)}</span> / {pad(total)}
              </span>
              <button
                onClick={() => setPlaying((p) => !p)}
                className="group cursor-pointer flex items-center justify-center w-14 h-14 rounded-full border border-rice-paper/20 bg-rice-paper/5 backdrop-blur-md hover:bg-rice-paper/15 hover:border-rice-paper/40 transition-all duration-300 active:scale-90 shadow-2xl"
                aria-label={playing ? "Pause slideshow" : "Play slideshow"}
              >
                <div className="text-rice-paper/80 group-hover:text-white transition-colors duration-300">
                  {playing ? <PauseIcon /> : <PlayIcon />}
                </div>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
