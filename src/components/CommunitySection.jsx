"use client";

import { useEffect, useState } from "react";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import FacebookPostCard from "./FacebookPostCard";

const leaders = [
  {
    name: "Shivang Vir",
    role: "Founder",
    image: "/shivang.webp",
    quote: "To make Rudhram a masterpiece - something built with intention, discipline, emotion, structure and legacy.",
  },
  {
    name: "Mukund Barrdoliwala",
    role: "Co-Founder",
    image: "/mukund.webp",
    quote: "A director cannot direct without a script, and a writer needs a director who can bring the written world alive.",
  },
  {
    name: "Viral Gohil",
    role: "Chairman",
    image: "/viral.webp",
    quote: "If you want to do it, do it. I am there for you.",
  },
];

const socialCards = [
  {
    platform: "LinkedIn",
    message: "LinkedIn posts will appear here.",
    href: "https://www.linkedin.com/in/rudhram-enterprises-844216419/",
    className: "md:col-span-5 bg-ink text-white dark:bg-cloud dark:text-ink",
  },
  {
    platform: "Instagram",
    message: "Instagram posts will appear here.",
    href: "https://www.instagram.com/rudhramenterprises",
    className: "md:col-span-8 bg-coral text-white",
  },
];

export default function CommunitySection() {
  const [active, setActive] = useState(0);
  const leader = leaders[active];

  useEffect(() => {
    const timer = window.setInterval(() => setActive((value) => (value + 1) % leaders.length), 6000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section id="visionaries" className="community-section bg-[#f4f4f4] px-4 py-10 text-ink dark:bg-night dark:text-cloud sm:px-10 flex min-h-0 sm:py-16 md:h-dvh md:min-h-[720px] md:items-center md:py-20 lg:px-14 lg:py-32">
      <div className="community-container mx-auto w-full max-w-[960px] flex flex-col md:items-center">
        <h2 className="text-[28px] sm:text-[32px] tracking-tight font-medium leading-9 sm:leading-10">Ideas & <span className="font-display text-coral">Insights.</span></h2>

        <div className="community-grid mt-6 sm:mt-10 grid gap-4 sm:gap-6 md:grid-cols-12">
          <article className="overflow-hidden rounded-[24px] sm:rounded-[28px] border border-black/10 bg-white dark:border-white/20 dark:bg-[#111] md:col-span-7">
            <div className="grid min-h-0 md:h-full md:grid-cols-2">
              <img
                key={leader.image}
                src={leader.image}
                alt={leader.name}
                className="h-60 sm:h-72 w-full bg-[#f7f7f5] object-cover object-top md:h-full md:min-h-0 md:object-cover md:object-center"
              />
              <div className="community-founder-content flex min-h-0 flex-col p-5 sm:p-6 justify-between">
                <p className="font-mono text-xs uppercase text-coral">Visionaries</p>
                <blockquote className="community-founder-quote my-3 sm:my-4 md:my-auto max-w-[30ch] border-l border-coral pl-4 text-sm sm:text-base font-semibold leading-5 sm:leading-6 tracking-normal">
                  {leader.quote}
                </blockquote>
                <div className="flex items-end justify-between gap-4 pt-2">
                  <div>
                    <p className="font-semibold text-sm sm:text-base">{leader.name}</p>
                    <p className="mt-0.5 text-xs sm:text-sm text-ink/60 dark:text-cloud/60">{leader.role}</p>
                  </div>
                  <div className="flex gap-2" aria-label="Select visionary">
                    {leaders.map((person, index) => (
                      <button
                        key={person.name}
                        type="button"
                        onClick={() => setActive(index)}
                        aria-label={`Show ${person.name}`}
                        aria-pressed={active === index}
                        className={`size-2.5 cursor-pointer rounded-full border border-current transition-colors focus-visible:outline-3 focus-visible:outline-coral ${active === index ? "bg-coral text-coral" : "bg-transparent text-ink/40 dark:text-cloud/50"}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </article>

          <a
            href={socialCards[0].href}
            target="_blank"
            rel="noreferrer"
            className={`flex min-h-[140px] sm:min-h-[180px] md:min-h-0 flex-col justify-between rounded-[24px] sm:rounded-[28px] p-5 sm:p-6 transition-transform hover:-translate-y-1 focus-visible:outline-3 focus-visible:outline-coral ${socialCards[0].className}`}
          >
            <div className="flex items-center justify-between">
              <p className="font-mono text-xs uppercase">{socialCards[0].platform}</p>
              <ArrowUpRightIcon className="size-5" aria-hidden="true" />
            </div>
            <p className="my-2 sm:my-auto max-w-sm text-base sm:text-xl font-semibold leading-6 sm:leading-7">{socialCards[0].message}</p>
            <p className="text-xs sm:text-sm opacity-60">Visit profile</p>
          </a>

          <FacebookPostCard className="rounded-[24px] sm:rounded-[28px] md:col-span-4" />

          <a
            href={socialCards[1].href}
            target="_blank"
            rel="noreferrer"
            className={`flex min-h-[140px] sm:min-h-[180px] md:min-h-0 flex-col justify-between rounded-[24px] sm:rounded-[28px] p-5 sm:p-6 transition-transform hover:-translate-y-1 focus-visible:outline-3 focus-visible:outline-white ${socialCards[1].className}`}
          >
            <div className="flex items-center justify-between">
              <p className="font-mono text-xs uppercase">{socialCards[1].platform}</p>
              <ArrowUpRightIcon className="size-5" aria-hidden="true" />
            </div>
            <p className="my-2 sm:my-auto max-w-lg text-base sm:text-xl font-semibold leading-6 sm:leading-7">{socialCards[1].message}</p>
            <p className="text-xs sm:text-sm text-white/70">Visit profile</p>
          </a>
        </div>
      </div>
    </section>
  );
}
