import { useEffect, useRef, useState } from "react";
import {
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PauseIcon,
  PlayIcon,
} from "@heroicons/react/24/outline";
import { stagger, waapi } from "animejs";

const ventures = [
  {
    name: "Panigrahna",
    description:
      "A considered venture shaped around meaningful unions, enduring rituals, and thoughtfully created experiences.",
  },
  {
    name: "Aghhori",
    description:
      "An uncompromising exploration of transformation, inner strength, and ideas that challenge convention.",
  },
  {
    name: "House Of Joogi",
    description:
      "A creative house for culture-led expression, original thinking, and stories with a distinct point of view.",
  },
  {
    name: "Damrru",
    description:
      "Rhythm, movement, and sonic identity brought together through a bold contemporary lens.",
  },
  {
    name: "Tandavs",
    description:
      "A platform inspired by energy in motion, disciplined expression, and the force of performance.",
  },
  {
    name: "Kapaalik",
    description:
      "A distinctive venture grounded in fearless identity, transformation, and purposeful creation.",
  },
  {
    name: "Kalyannam",
    description:
      "A thoughtful interpretation of celebration, connection, and experiences designed to endure.",
  },
  {
    name: "Storage Media Solution",
    description:
      "A structured approach to protecting, organising, and preserving valuable media.",
  },
];

const slideDuration = 7000;
const backgroundImage =
  "https://images.unsplash.com/photo-1762008312967-beaf3f59984e?auto=format&fit=crop&w=2200&q=85";

export default function VenturesSection() {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(true);
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
      id="ventures"
      aria-labelledby="ventures-heading"
      className="relative h-[100svh] min-h-[640px] overflow-hidden bg-night text-white"
    >
      <img
        src={backgroundImage}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-night/60" aria-hidden="true" />

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
            <button
              data-venture-copy
              type="button"
              disabled
              className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/30 bg-white px-5 py-3 text-sm font-semibold text-night"
            >
              Visit {venture.name}
              <ArrowRightIcon className="size-4" aria-hidden="true" />
            </button>
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

        <div className="venture-rail mt-5 flex gap-2 overflow-x-auto pb-1 md:mt-0 md:grid md:grid-cols-8 md:overflow-visible">
          {ventures.map((item, index) => {
            const selected = index === current;
            return (
              <button
                key={item.name}
                type="button"
                onClick={() => selectVenture(index)}
                aria-label={`Show ${item.name}`}
                aria-current={selected ? "true" : undefined}
                className="group min-h-14 min-w-[132px] cursor-pointer px-1 pt-3 text-left focus-visible:outline-3 focus-visible:outline-white md:min-w-0"
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
                <span className={`block text-[11px] whitespace-nowrap font-semibold leading-4 ${selected ? "text-white" : "text-white/55"}`}>
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
