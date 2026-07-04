import { CheckIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SectionCounter from "../components/business/SectionCounter";
import SystemLayers from "../components/business/SystemLayers";
import {
  brandHousePolicies,
  buildingBlocks,
  leaders,
  legalIdentity,
  pillars,
  whatWeAre,
  whatWeAreNot,
} from "../lib/businessContent";

const sectionPadding = "px-6 py-24 sm:px-10 md:py-32 lg:px-16 lg:py-40";
const container = "mx-auto w-full max-w-[1240px]";

function Reveal({ children, className = "", delay = 0 }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({ children, className = "" }) {
  const reducedMotion = useReducedMotion();

  return (
    <div className="overflow-hidden pb-1">
      <motion.h2
        className={`text-4xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-5xl lg:text-7xl ${className}`}
        initial={reducedMotion ? false : { y: "105%" }}
        whileInView={reducedMotion ? undefined : { y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.h2>
    </div>
  );
}

function BusinessHero() {
  const reducedMotion = useReducedMotion();
  const words = "Ideas need more than belief. They need a system.".split(" ");

  return (
    <section
      id="business"
      data-business-section
      data-section="1"
      className="flex min-h-svh items-end bg-white px-6 pb-16 pt-36 sm:px-10 md:pb-24 lg:px-16"
    >
      <div className={`${container} grid gap-12 md:grid-cols-12 md:items-end`}>
        <h1 className="md:col-span-9 text-[clamp(3.5rem,8.5vw,9rem)] font-semibold leading-[0.86] tracking-[-0.065em]">
          {words.map((word, index) => (
            <Fragment key={`${word}-${index}`}>
              <span className="inline-block overflow-hidden pb-[0.12em] pr-[0.06em]">
                <motion.span
                  className="inline-block"
                  initial={reducedMotion ? false : { y: "110%" }}
                  animate={reducedMotion ? undefined : { y: 0 }}
                  transition={{ duration: 0.75, delay: 0.08 * index, ease: [0.22, 1, 0.36, 1] }}
                >
                  {word}
                </motion.span>
              </span>{" "}
            </Fragment>
          ))}
        </h1>
        <Reveal className="md:col-span-3" delay={0.55}>
          <p className="max-w-[34ch] text-base leading-7 text-ink/70">
            Rudhram builds the structure that allows original ideas to become enduring brands, businesses, and cultural assets.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function WhatIsRudhram() {
  return (
    <section id="what-is-rudhram" data-business-section data-section="2" className={`${sectionPadding} bg-white`}>
      <div className={`${container} grid gap-14 md:grid-cols-12 md:gap-8`}>
        <div className="md:col-span-5">
          <SectionHeading>What is Rudhram?</SectionHeading>
          <Reveal className="mt-10 space-y-6 text-base leading-8 text-ink/70 sm:text-lg">
            <p>
              Rudhram is a business-building platform for ideas that deserve time, clarity, and an operating system behind them.
            </p>
            <p>
              We bring creative ambition and commercial discipline into the same room—then build brands that can remain distinct while benefiting from shared stewardship.
            </p>
          </Reveal>
        </div>
        <Reveal className="md:col-span-6 md:col-start-7 md:flex md:items-end" delay={0.15}>
          <blockquote className="border-t border-coral pt-7 text-3xl font-semibold leading-tight tracking-[-0.035em] sm:text-4xl lg:text-5xl">
            “Belief creates the beginning. Structure gives it a future.”
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}

function WhatWeAre() {
  return (
    <section id="what-we-are" data-business-section data-section="3" className={`${sectionPadding} bg-cloud`}>
      <div className={container}>
        <SectionHeading className="max-w-[12ch]">What we are.<br />What we are not.</SectionHeading>
        <Reveal className="mt-16 overflow-hidden rounded-2xl border border-ink/15">
          <table className="w-full border-separate border-spacing-0">
            <thead>
              <tr>
                <th scope="col" className="w-1/2 bg-white/50 px-5 py-4 sm:px-6 sm:py-5 text-left font-mono text-xs font-semibold uppercase tracking-[0.12em] text-coral border-b border-ink/15">
                  What we are
                </th>
                <th scope="col" className="w-1/2 bg-white/50 px-5 py-4 sm:px-6 sm:py-5 text-left font-mono text-xs font-semibold uppercase tracking-[0.12em] text-ink/45 border-b border-ink/15">
                  What we are not
                </th>
              </tr>
            </thead>
            <tbody>
              {whatWeAre.map((item, i) => {
                const notLast = i < whatWeAre.length - 1;
                return (
                  <tr key={item}>
                    <td className={`px-5 py-4 sm:px-6 sm:py-5 align-top ${notLast ? "border-b border-ink/15" : ""}`}>
                      <div className="flex gap-3">
                        <CheckIcon className="mt-1 size-4 shrink-0 text-coral" strokeWidth={2} aria-hidden="true" />
                        <span className="text-sm leading-6 sm:text-base">{item}</span>
                      </div>
                    </td>
                    <td className={`px-5 py-4 sm:px-6 sm:py-5 align-top text-sm leading-6 sm:text-base text-ink/45 line-through decoration-ink/30 ${notLast ? "border-b border-ink/15" : ""}`}>
                      {whatWeAreNot[i]}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  );
}

function TheSystem() {
  return (
    <section id="rudhram-system" data-business-section data-section="4" className="bg-white px-6 pt-24 sm:px-10 md:pt-32 lg:px-16 lg:pt-40">
      <div className={container}>
        <SectionHeading>The Rudhram system.</SectionHeading>
        <Reveal className="mt-8 max-w-[58ch] text-lg leading-8 text-ink/70">
          <p>Three layers move together. None works for long without the others.</p>
        </Reveal>
        <SystemLayers />
      </div>
    </section>
  );
}

function WhatWeAreBuilding() {
  return (
    <section id="what-we-are-building" data-business-section data-section="5" className={`${sectionPadding} bg-white`}>
      <div className={container}>
        <SectionHeading>What we are building.</SectionHeading>
        <div className="mt-16 grid border-b border-ink/15 sm:grid-cols-2 lg:grid-cols-3">
          {buildingBlocks.map(([title, text], index) => (
            <Reveal key={title} delay={(index % 3) * 0.06} className="border-t border-ink/15 py-8 sm:min-h-64 sm:px-7 sm:first:pl-0 lg:[&:nth-child(3n+1)]:pl-0 lg:[&:nth-child(3n)]:pr-0">
              <span className="font-mono text-[10px] font-semibold text-coral">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="mt-10 text-2xl font-semibold tracking-tight">{title}</h3>
              <p className="mt-4 max-w-[35ch] text-sm leading-6 text-ink/65">{text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ThreePillars() {
  return (
    <section id="three-pillars" data-business-section data-section="6" className={`${sectionPadding} bg-cloud`}>
      <div className={container}>
        <SectionHeading>Three pillars.</SectionHeading>
        <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-8">
          {pillars.map((pillar, index) => (
            <Reveal key={pillar.title} delay={index * 0.12}>
              <article className="border-t-2 border-coral pt-6">
                <span className="font-mono text-[10px] font-semibold">0{index + 1}</span>
                <h3 className="mt-12 text-2xl font-semibold tracking-tight">{pillar.title}</h3>
                <p className="mt-5 text-sm leading-7 text-ink/65">{pillar.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function VisionAndMission() {
  const pairs = [["Imagination", "Accountability"], ["Independence", "Stewardship"], ["Speed", "Patience"]];

  return (
    <section id="vision-mission" data-business-section data-section="7" className={`${sectionPadding} bg-white`}>
      <div className={container}>
        <SectionHeading>Vision & mission.</SectionHeading>
        <Reveal className="mt-16 max-w-[22ch] text-4xl italic leading-tight tracking-[-0.035em] sm:text-5xl lg:text-7xl">
          <p>To build a house where original ideas gain the structure to endure.</p>
        </Reveal>
        <div className="mt-20 grid gap-14 border-t border-ink/15 pt-10 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <h3 className="text-2xl font-semibold">Balance is the operating principle.</h3>
            <dl className="mt-8">
              {pairs.map(([left, right]) => (
                <div key={left} className="grid grid-cols-[1fr_auto_1fr] gap-3 border-t border-ink/15 py-4 text-sm first:border-t-0">
                  <dt>{left}</dt><span className="text-coral">↔</span><dd className="text-right">{right}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal className="md:col-span-6 md:col-start-7" delay={0.12}>
            <h3 className="text-2xl font-semibold">Our mission</h3>
            <ul className="mt-6 space-y-4 text-base leading-7 text-ink/70">
              <li>Give every serious idea a clear strategic and operating foundation.</li>
              <li>Build distinct brands without losing the advantage of shared knowledge.</li>
              <li>Create businesses, intellectual property, and cultural value that compound over time.</li>
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Leadership() {
  return (
    <section id="leadership" data-business-section data-section="8" className={`${sectionPadding} bg-white`}>
      <div className={container}>
        <SectionHeading>Leadership.</SectionHeading>
        <Reveal className="mt-16 border-t border-ink/20">
          {leaders.map(([name, role], index) => (
            <div key={name} className="grid gap-2 border-b border-ink/20 py-6 sm:grid-cols-12 sm:items-baseline">
              <span className="font-mono text-[10px] text-coral sm:col-span-1">0{index + 1}</span>
              <h3 className="text-2xl font-semibold tracking-tight sm:col-span-7">{name}</h3>
              <p className="text-sm text-ink/60 sm:col-span-4 sm:text-right">{role}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function BrandHouseModel() {
  return (
    <section id="brand-house" data-business-section data-section="9" className={`${sectionPadding} bg-white`}>
      <div className={`${container} grid gap-14 md:grid-cols-12`}>
        <div className="md:col-span-5">
          <SectionHeading>One house.<br />Distinct brands.</SectionHeading>
          <Reveal className="mt-8 max-w-[46ch] text-base leading-8 text-ink/70">
            <p>
              Rudhram is not a master brand stamped onto everything. It is the disciplined house behind brands with their own audience, language, and ambition.
            </p>
          </Reveal>
        </div>
        <Reveal className="md:col-span-6 md:col-start-7" delay={0.12}>
          <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-coral">House policy</h3>
          <ul className="mt-8 border-t border-ink/20">
            {brandHousePolicies.map((policy) => (
              <li key={policy} className="flex gap-4 border-b border-ink/20 py-5 text-sm leading-6">
                <CheckIcon className="mt-1 size-4 shrink-0 text-coral" aria-hidden="true" />
                {policy}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

function LegalIdentity() {
  return (
    <section id="legal-identity" data-business-section data-section="10" className={`${sectionPadding} bg-cloud`}>
      <div className={container}>
        <SectionHeading>Legal identity.</SectionHeading>
        <Reveal className="mt-14 overflow-hidden border-y border-ink/20">
          <dl>
            {legalIdentity.map(([term, value]) => (
              <div key={term} className="grid gap-2 border-b border-ink/15 py-4 text-xs leading-5 last:border-b-0 sm:grid-cols-12 sm:gap-8">
                <dt className="font-mono uppercase tracking-[0.08em] text-ink/45 sm:col-span-4">{term}</dt>
                <dd className="font-semibold sm:col-span-8">{value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

function ClosingStatement() {
  return (
    <section id="closing" data-business-section data-section="11" className="flex min-h-[80svh] items-center bg-white px-6 py-24 text-center sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[900px]">
        <Reveal>
          <p className="text-4xl font-semibold leading-tight tracking-[-0.045em] sm:text-6xl lg:text-8xl">
            Build with belief.<br />Operate with clarity.
          </p>
          <p className="mt-10 text-xl font-semibold text-coral sm:text-2xl">From uncertainty, direction.</p>
        </Reveal>
      </div>
    </section>
  );
}

export default function BusinessPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-ink">
      <Navbar />
      <SectionCounter />
      <main>
        <BusinessHero />
        <WhatIsRudhram />
        <WhatWeAre />
        <TheSystem />
        <WhatWeAreBuilding />
        <ThreePillars />
        <VisionAndMission />
        <Leadership />
        <BrandHouseModel />
        <LegalIdentity />
        <ClosingStatement />
      </main>
      <Footer />
    </div>
  );
}
