import { ArrowDownIcon, ArrowUpRightIcon, CheckIcon } from "@heroicons/react/24/outline";
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

const container = "mx-auto w-full max-w-[1240px]";
const section = "px-6 py-24 sm:px-10 md:py-32 lg:px-16 lg:py-40";

function Reveal({ children, className = "", delay = 0 }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: 28 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionIntro({ number, title, children, dark = false }) {
  return (
    <div className="grid gap-8 border-t border-current/20 pt-6 md:grid-cols-12 md:gap-8">
      <p className={`font-mono text-[11px] font-semibold tracking-[0.12em] ${dark ? "text-coral" : "text-ink/45"}`}>
        {number}
      </p>
      <div className="md:col-span-7 md:col-start-3">
        <h2 className="max-w-[11ch] text-4xl font-semibold leading-[0.96] tracking-[-0.05em] sm:text-5xl lg:text-7xl">
          {title}
        </h2>
      </div>
      {children ? (
        <div className={`max-w-[36ch] text-base leading-7 md:col-span-3 md:self-end ${dark ? "text-white/60" : "text-ink/65"}`}>
          {children}
        </div>
      ) : null}
    </div>
  );
}

function BusinessHero() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="business"
      data-business-section
      data-section="1"
      className="relative flex min-h-svh overflow-hidden bg-white px-6 pb-10 pt-32 sm:px-10 md:pb-12 md:pt-40 lg:px-16"
    >
      <div className={`${container} flex flex-col justify-between`}>
        <div className="grid flex-1 items-center py-12 md:grid-cols-12 md:py-16">
          <motion.h1
            className="max-w-[11ch] text-[clamp(3.7rem,8.1vw,8.5rem)] font-semibold leading-[0.88] tracking-[-0.07em] md:col-span-11"
            initial={reducedMotion ? false : { opacity: 0, y: 36 }}
            animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            Ideas need more than <span className="font-display font-normal italic text-coral">belief.</span> They need a system.
          </motion.h1>
        </div>

        <motion.div
          className="grid gap-6 border-t border-ink/20 pt-6 md:grid-cols-12 md:items-end"
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={reducedMotion ? undefined : { opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.45 }}
        >
          <p className="max-w-[48ch] text-sm leading-6 text-ink/65 md:col-span-5 md:text-base md:leading-7">
            Rudhram builds the structure that allows original ideas to become enduring brands, businesses, and cultural assets.
          </p>
          <div className="md:col-span-3 md:col-start-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/40">Business building platform</p>
            <p className="mt-2 text-sm font-medium">Mumbai · Surat · Delhi</p>
          </div>
          <a
            href="#what-is-rudhram"
            className="group flex w-fit items-center gap-3 text-sm font-semibold md:col-span-2 md:justify-self-end"
          >
            Explore
            <span className="flex size-9 items-center justify-center rounded-full border border-ink/25 transition-colors duration-200 group-hover:border-coral group-hover:bg-coral group-hover:text-white">
              <ArrowDownIcon className="size-4" aria-hidden="true" />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function Definition() {
  return (
    <section id="what-is-rudhram" data-business-section data-section="2" className={`${section} bg-cloud`}>
      <div className={container}>
        <Reveal>
          <SectionIntro number="01 / Definition" title="What is Rudhram?">
            A business-building platform for ideas that deserve time, clarity, and an operating system behind them.
          </SectionIntro>
        </Reveal>

        <div className="mt-20 grid gap-14 md:grid-cols-12 md:gap-8 lg:mt-28">
          <Reveal className="md:col-span-5 md:col-start-3">
            <p className="text-lg leading-8 text-ink/70">
              We bring creative ambition and commercial discipline into the same room—then build brands that can remain distinct while benefiting from shared stewardship.
            </p>
          </Reveal>
          <Reveal className="md:col-span-5 md:col-start-8" delay={0.1}>
            <blockquote className="font-display text-4xl leading-[1.03] tracking-[-0.035em] sm:text-5xl lg:text-6xl">
              “Belief creates the beginning. <span className="italic text-coral">Structure</span> gives it a future.”
            </blockquote>
          </Reveal>
        </div>

        <div id="what-we-are" className="mt-24 grid border-t border-ink/20 md:mt-36 md:grid-cols-2">
          <Reveal className="py-8 md:border-r md:border-ink/20 md:pr-12 lg:pr-20">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-coral">What we are</p>
            <ul className="mt-8">
              {whatWeAre.map((item) => (
                <li key={item} className="flex gap-4 border-t border-ink/15 py-5 text-base leading-7 first:border-t-0">
                  <CheckIcon className="mt-1 size-4 shrink-0 text-coral" strokeWidth={2} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="border-t border-ink/20 py-8 md:border-t-0 md:pl-12 lg:pl-20" delay={0.1}>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/40">What we are not</p>
            <ul className="mt-8">
              {whatWeAreNot.map((item) => (
                <li key={item} className="border-t border-ink/15 py-5 text-base leading-7 text-ink/45 first:border-t-0">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function TheSystem() {
  return (
    <section id="rudhram-system" data-business-section data-section="3" className={`${section} bg-night text-white`}>
      <div className={container}>
        <Reveal>
          <SectionIntro number="02 / Operating model" title="The Rudhram system." dark>
            Three layers move together. None works for long without the others.
          </SectionIntro>
        </Reveal>
        <SystemLayers />
      </div>
    </section>
  );
}

function Capabilities() {
  return (
    <section id="what-we-are-building" data-business-section data-section="4" className={`${section} bg-white`}>
      <div className={container}>
        <Reveal>
          <SectionIntro number="03 / Capabilities" title="What we are building.">
            Six interconnected capabilities that turn ideas into lasting ventures.
          </SectionIntro>
        </Reveal>

        <div className="mt-20 border-t border-ink/20 md:mt-28">
          {buildingBlocks.map(([title, text], index) => (
            <Reveal key={title} delay={(index % 2) * 0.06}>
              <article className="group grid gap-4 border-b border-ink/20 py-7 transition-colors duration-200 hover:border-coral md:grid-cols-12 md:items-baseline md:gap-8 md:py-9">
                <span className="font-mono text-[10px] font-semibold text-coral md:col-span-1">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="text-2xl font-semibold tracking-[-0.03em] md:col-span-5 md:text-3xl">{title}</h3>
                <p className="max-w-[52ch] text-sm leading-7 text-ink/60 md:col-span-5">{text}</p>
                <ArrowUpRightIcon className="hidden size-5 text-ink/25 transition-colors group-hover:text-coral md:block" aria-hidden="true" />
              </article>
            </Reveal>
          ))}
        </div>

        <div id="three-pillars" className="mt-24 grid gap-8 md:mt-36 md:grid-cols-12">
          <Reveal className="md:col-span-3">
            <h3 className="text-3xl font-semibold tracking-[-0.04em]">Three pillars.</h3>
          </Reveal>
          <div className="grid gap-10 md:col-span-9 md:grid-cols-3 md:gap-8">
            {pillars.map((pillar, index) => (
              <Reveal key={pillar.title} delay={index * 0.08}>
                <article className="border-t-2 border-coral pt-5">
                  <span className="font-mono text-[10px] font-semibold text-ink/40">0{index + 1}</span>
                  <h4 className="mt-10 text-xl font-semibold tracking-[-0.02em]">{pillar.title}</h4>
                  <p className="mt-4 text-sm leading-7 text-ink/60">{pillar.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Stewardship() {
  const pairs = [["Imagination", "Accountability"], ["Independence", "Stewardship"], ["Speed", "Patience"]];

  return (
    <section id="vision-mission" data-business-section data-section="5" className={`${section} bg-cloud`}>
      <div className={container}>
        <Reveal>
          <SectionIntro number="04 / Stewardship" title="Built to endure.">
            Original ideas gain value when imagination and accountability move together.
          </SectionIntro>
        </Reveal>

        <Reveal className="mt-20 md:mt-28">
          <p className="max-w-[17ch] font-display text-5xl leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-8xl">
            To build a house where original ideas gain the structure to <span className="italic text-coral">endure.</span>
          </p>
        </Reveal>

        <div className="mt-20 grid gap-14 border-t border-ink/20 pt-8 md:grid-cols-12 md:gap-8 lg:mt-28">
          <Reveal className="md:col-span-5">
            <h3 className="text-2xl font-semibold tracking-[-0.03em]">Balance is the operating principle.</h3>
            <dl className="mt-8">
              {pairs.map(([left, right]) => (
                <div key={left} className="grid grid-cols-[1fr_auto_1fr] gap-3 border-t border-ink/15 py-4 text-sm first:border-t-0">
                  <dt>{left}</dt><span className="text-coral">↔</span><dd className="text-right">{right}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal className="md:col-span-6 md:col-start-7" delay={0.1}>
            <h3 className="text-2xl font-semibold tracking-[-0.03em]">Our mission</h3>
            <ul className="mt-6 space-y-4 text-base leading-7 text-ink/70">
              <li>Give every serious idea a clear strategic and operating foundation.</li>
              <li>Build distinct brands without losing the advantage of shared knowledge.</li>
              <li>Create businesses, intellectual property, and cultural value that compound over time.</li>
            </ul>
          </Reveal>
        </div>

        <div id="leadership" className="mt-24 grid gap-12 border-t border-ink/20 pt-8 md:mt-36 md:grid-cols-12 md:gap-8">
          <Reveal className="md:col-span-3">
            <h3 className="text-3xl font-semibold tracking-[-0.04em]">Leadership.</h3>
          </Reveal>
          <Reveal className="md:col-span-9">
            {leaders.map(([name, role], index) => (
              <div key={name} className="grid gap-2 border-b border-ink/20 py-6 first:pt-0 sm:grid-cols-12 sm:items-baseline">
                <span className="font-mono text-[10px] text-coral sm:col-span-1">0{index + 1}</span>
                <h4 className="text-2xl font-semibold tracking-[-0.03em] sm:col-span-7">{name}</h4>
                <p className="text-sm text-ink/60 sm:col-span-4 sm:text-right">{role}</p>
              </div>
            ))}
          </Reveal>
        </div>

        <div id="brand-house" className="mt-24 grid gap-14 border-t border-ink/20 pt-8 md:mt-36 md:grid-cols-12 md:gap-8">
          <Reveal className="md:col-span-5">
            <h3 className="text-4xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-5xl">One house.<br />Distinct brands.</h3>
            <p className="mt-8 max-w-[46ch] text-base leading-8 text-ink/70">
              Rudhram is not a master brand stamped onto everything. It is the disciplined house behind brands with their own audience, language, and ambition.
            </p>
          </Reveal>
          <Reveal className="md:col-span-6 md:col-start-7" delay={0.1}>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-coral">House policy</p>
            <ul className="mt-7 border-t border-ink/20">
              {brandHousePolicies.map((policy) => (
                <li key={policy} className="flex gap-4 border-b border-ink/20 py-5 text-sm leading-7">
                  <CheckIcon className="mt-1 size-4 shrink-0 text-coral" aria-hidden="true" />
                  {policy}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function IdentityAndClose() {
  return (
    <section id="legal-identity" data-business-section data-section="6" className="bg-white">
      <div className={section}>
        <div className={container}>
          <Reveal>
            <SectionIntro number="05 / Identity" title="Built in India.">
              A private company with roots in Mumbai, an operating base in Surat, and its next chapter in Delhi.
            </SectionIntro>
          </Reveal>
          <Reveal className="mt-16 border-t border-ink/20 md:ml-[16.666%] md:mt-24">
            <dl>
              {legalIdentity.map(([term, value]) => (
                <div key={term} className="grid gap-2 border-b border-ink/15 py-5 text-sm leading-6 sm:grid-cols-12 sm:gap-8">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink/40 sm:col-span-4">{term}</dt>
                  <dd className="font-semibold sm:col-span-8">{value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>

      <div id="closing" className="bg-coral px-6 py-24 text-white sm:px-10 md:py-32 lg:px-16 lg:py-40">
        <Reveal className={`${container} grid gap-10 md:grid-cols-12 md:items-end`}>
          <p className="font-display text-5xl leading-[0.94] tracking-[-0.05em] sm:text-6xl md:col-span-9 lg:text-8xl">
            Build with belief.<br /><span className="italic">Operate with clarity.</span>
          </p>
          <a href="#business" className="group flex w-fit items-center gap-3 text-sm font-semibold md:col-span-3 md:justify-self-end">
            Back to top
            <span className="flex size-10 items-center justify-center rounded-full border border-white/50 transition-colors duration-200 group-hover:bg-white group-hover:text-coral">
              <ArrowUpRightIcon className="size-4" aria-hidden="true" />
            </span>
          </a>
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
        <Definition />
        <TheSystem />
        <Capabilities />
        <Stewardship />
        <IdentityAndClose />
      </main>
      <Footer />
    </div>
  );
}
