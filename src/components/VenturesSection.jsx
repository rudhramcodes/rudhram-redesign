import { useEffect, useRef, useState } from "react";
import {
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PauseIcon,
  PlayIcon,
} from "@heroicons/react/24/outline";
import { stagger, waapi } from "animejs";
import { Link } from "react-router-dom";
import { ventures } from "../lib/venturesContent";

const slideDuration = 7000;
const backgroundImage = ventures[0].image;

export default function VenturesSection() {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(true);
  const rootRef = useRef(null);
  const contentRef = useRef(null);
  const venture = ventures[current];

  const selectVenture = (index) => {
    setCurrent(index);
  };

  const nextVenture = () => selectVenture((current + 1) % ventures.length);
  const previousVenture = () =>
    selectVenture((current - 1 + ventures.length) % ventures.length);

  useEffect(() => {
    const animation = waapi.animate(
      contentRef.current.querySelectorAll("[data-venture-copy]"),
      {
        opacity: [0, 1],
        transform: ["translateY(18px)", "translateY(0)"],
        delay: stagger(65),
        duration: 520,
        ease: "out(4)",
      },
    );
    return () => animation.cancel();
  }, [current]);

  return (
    <section
      ref={rootRef}
      id="ventures"
      aria-labelledby="ventures-heading"
      className="relative isolate h-[100svh] min-h-[640px] bg-night text-white"
    >
      <div className="pointer-events-none absolute inset-0">
        <img
          src={backgroundImage}
          alt=""
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-night/50" aria-hidden="true" />
      </div>

      <div className="ventures-content relative z-10 mx-auto flex h-full w-full max-w-[1200px] flex-col px-6 pb-16 pt-32 sm:px-10 md:pb-24 md:pt-36 lg:px-14">
        <div className="flex flex-1 items-end justify-between gap-8 pb-10 md:pb-14">
          <div ref={contentRef} aria-live="polite" className="max-w-2xl">
            <p
              id="ventures-heading"
              data-venture-copy
              className="mb-5 text-xs font-semibold uppercase text-coral"
            >
              Our Ventures
            </p>
            <h2 data-venture-copy className="text-5xl font-semibold leading-none tracking-normal sm:text-6xl lg:text-7xl">
              {venture.name}
            </h2>
            <p data-venture-copy className="mt-6 max-w-[50ch] text-base leading-7 text-white/75 sm:text-lg">
              {venture.description}
            </p>
            {!venture.url && (
              <p data-venture-copy className="mt-6 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-white/55">
                {venture.status}
              </p>
            )}
            <div data-venture-copy className="mt-8 flex flex-wrap items-center gap-3">
              {venture.url ? (
                <a
                  href={venture.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-semibold text-night transition-colors hover:bg-white/90 focus-visible:outline-3 focus-visible:outline-white"
                >
                  Visit {venture.name}
                  <ArrowRightIcon className="size-4" aria-hidden="true" />
                </a>
              ) : null}
              <Link
                to="/ventures"
                className="inline-flex items-center gap-3 rounded-full border border-white/30 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white hover:text-night focus-visible:outline-3 focus-visible:outline-white"
              >
                Explore all ventures
                <ArrowRightIcon className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="hidden shrink-0 items-center gap-2 md:flex">
            <button
              type="button"
              onClick={previousVenture}
              aria-label="Previous venture"
              className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-white/25 transition-colors hover:bg-white/10 focus-visible:outline-3 focus-visible:outline-white"
            >
              <ChevronLeftIcon className="size-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => setPlaying((value) => !value)}
              aria-label={playing ? "Pause venture slideshow" : "Play venture slideshow"}
              aria-pressed={!playing}
              className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-white/25 transition-colors hover:bg-white/10 focus-visible:outline-3 focus-visible:outline-white"
            >
              {playing ? <PauseIcon className="size-4" /> : <PlayIcon className="size-4" />}
            </button>
            <button
              type="button"
              onClick={nextVenture}
              aria-label="Next venture"
              className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-white/25 transition-colors hover:bg-white/10 focus-visible:outline-3 focus-visible:outline-white"
            >
              <ChevronRightIcon className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <button
            type="button"
            onClick={() => setPlaying((value) => !value)}
            aria-label={playing ? "Pause venture slideshow" : "Play venture slideshow"}
            aria-pressed={!playing}
            className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/25 focus-visible:outline-3 focus-visible:outline-white"
          >
            {playing ? <PauseIcon className="size-4" /> : <PlayIcon className="size-4" />}
          </button>
          <span className="text-xs font-semibold text-white/65">
            {String(current + 1).padStart(2, "0")} / {String(ventures.length).padStart(2, "0")}
          </span>
        </div>

        <div className="mt-5 grid grid-cols-4 gap-3 pb-1 md:mt-0 md:grid-cols-8 md:gap-2">
          {ventures.map((item, index) => {
            const selected = index === current;
            return (
              <button
                key={item.name}
                type="button"
                onClick={() => selectVenture(index)}
                aria-label={`Show ${item.name}`}
                aria-current={selected ? "true" : undefined}
                className="group min-h-12 cursor-pointer pt-2 text-center focus-visible:outline-3 focus-visible:outline-white md:min-h-14 md:px-1 md:pt-3 md:text-left"
              >
                <span className="relative mb-2 block h-0.5 overflow-hidden bg-white/20" aria-hidden="true">
                  {selected && (
                    <span
                      key={current}
                      onAnimationEnd={() => setCurrent((value) => (value + 1) % ventures.length)}
                      className="venture-progress absolute inset-0 origin-left bg-coral will-change-transform"
                      style={{
                        animationDuration: `${slideDuration}ms`,
                        animationPlayState: playing ? "running" : "paused",
                      }}
                    />
                  )}
                </span>
                <span className={`block text-[10px] font-semibold leading-3.5 md:text-[11px] md:leading-4 md:whitespace-nowrap ${selected ? "text-white" : "text-white/55"}`}>
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
