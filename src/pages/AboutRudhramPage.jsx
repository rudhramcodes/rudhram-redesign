import { ArrowDownIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  PageMeta,
  Portrait,
  Reveal,
  SectionIntro,
  pageContainer,
  pageSection,
} from "../components/about/EditorialElements";
import {
  governancePrinciples,
  identityLayers,
  operatingFlow,
  operatingStandards,
  teamRoster,
} from "../lib/aboutContent";

function Hero() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="about-top" className="flex min-h-svh bg-white px-6 pb-10 pt-32 sm:px-10 md:pb-12 md:pt-40 lg:px-16">
      <div className={`${pageContainer} flex flex-col justify-between`}>
        <div className="grid flex-1 items-center py-12 md:grid-cols-12 md:py-16">
          <motion.h1
            className="max-w-[11ch] text-[clamp(3.6rem,8vw,8.4rem)] font-semibold leading-[0.88] tracking-[-0.07em] md:col-span-11"
            initial={reducedMotion ? false : { opacity: 0, y: 36 }}
            animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            Rudhram is the system behind what comes <span className="font-display font-normal italic text-coral">next.</span>
          </motion.h1>
        </div>
        <motion.div
          className="grid gap-6 border-t border-ink/20 pt-6 md:grid-cols-12 md:items-end"
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={reducedMotion ? undefined : { opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.45 }}
        >
          <p className="max-w-[54ch] text-sm leading-6 text-ink/65 md:col-span-6 md:text-base md:leading-7">
            Rudhram Enterprises Private Limited is the parent company built to create, own, govern and scale purpose-led ventures.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/40 md:col-span-3 md:col-start-9">Purpose · Structure · Impact</p>
          <a href="#identity" className="group flex w-fit items-center gap-3 text-sm font-semibold md:col-span-1 md:justify-self-end">
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

function Identity() {
  return (
    <section id="identity" className={`${pageSection} bg-cloud`}>
      <div className={pageContainer}>
        <Reveal>
          <SectionIntro number="01 / Identity" title="From belief to structure.">
            Rudhram separates the people who shaped the philosophy, the company that governs it and the brands that take it to market.
          </SectionIntro>
        </Reveal>
        <div className="mt-20 border-t border-ink/20 md:ml-[16.666%] md:mt-28">
          {identityLayers.map((layer, index) => (
            <Reveal key={layer.number} delay={index * 0.07}>
              <article className="grid gap-5 border-b border-ink/20 py-8 md:grid-cols-10 md:items-baseline md:gap-8 md:py-10">
                <span className="font-mono text-[10px] font-semibold text-coral md:col-span-1">{layer.number}</span>
                <h3 className="text-3xl font-semibold tracking-[-0.04em] md:col-span-4 md:text-4xl">{layer.title}</h3>
                <p className="max-w-[48ch] text-sm leading-7 text-ink/65 md:col-span-5 md:text-base">{layer.text}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-24 grid gap-14 border-t border-ink/20 pt-8 md:mt-36 md:grid-cols-12 md:gap-8">
          <Reveal className="md:col-span-5">
            <img src="/logo.png" alt="Rudhram" className="h-24 w-auto object-contain object-left" />
            <h3 className="mt-10 text-3xl font-semibold tracking-[-0.04em]">Fearless vision. Rooted strength.</h3>
          </Reveal>
          <Reveal className="space-y-8 md:col-span-6 md:col-start-7" delay={0.1}>
            <p className="text-lg leading-8 text-ink/70">The name Rudhram reflects transformation: the courage to move through uncertainty, stay connected to values and build meaning beyond ordinary business.</p>
            <p className="text-lg leading-8 text-ink/70">The Trishul-inspired mark represents creation, preservation and transformation not only as symbols, but as operating principles.</p>
            <blockquote className="border-t border-coral pt-6 font-display text-4xl leading-none tracking-[-0.035em] sm:text-5xl">Leading, <span className="italic text-coral">“What’s Next.”</span></blockquote>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Direction() {
  return (
    <section className={`${pageSection} bg-white`}>
      <div className={pageContainer}>
        <Reveal>
          <SectionIntro number="02 / Direction" title="Purpose. Direction. Discipline.">
            The ambition is future-facing; the method remains grounded in real needs, responsible growth and dependable execution.
          </SectionIntro>
        </Reveal>
        <div className="mt-20 grid gap-12 md:mt-28 md:grid-cols-12 md:gap-8">
          <Reveal className="md:col-span-5 md:col-start-3">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-coral">Vision</p>
            <p className="mt-6 text-3xl font-semibold leading-tight tracking-[-0.04em] sm:text-4xl">To pioneer the future through innovation, empower communities and redefine excellence with lasting impact.</p>
          </Reveal>
          <Reveal className="md:col-span-4 md:col-start-9" delay={0.1}>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-coral">Mission</p>
            <p className="mt-6 text-lg leading-8 text-ink/70">To inspire ideas, innovate with purpose and deliver excellence by building ventures that create impact and lasting value.</p>
          </Reveal>
        </div>
        <div className="mt-24 grid gap-10 md:mt-36 md:grid-cols-3 md:gap-8">
          {operatingStandards.map((standard, index) => (
            <Reveal key={standard.title} delay={index * 0.08}>
              <article className="border-t-2 border-coral pt-5">
                <span className="font-mono text-[10px] text-ink/40">0{index + 1}</span>
                <h3 className="mt-10 text-2xl font-semibold tracking-[-0.03em]">{standard.title}</h3>
                <p className="mt-3 font-display text-xl italic text-coral">{standard.meaning}</p>
                <p className="mt-5 text-sm leading-7 text-ink/60">{standard.standard}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function OperatingSystem() {
  return (
    <section className={`${pageSection} bg-night text-white`}>
      <div className={pageContainer}>
        <Reveal>
          <SectionIntro number="03 / Governance" title="How the system moves." dark>
            Clear responsibility prevents leadership overload, informal approvals and execution chaos.
          </SectionIntro>
        </Reveal>
        <div className="mt-20 border-t border-white/20 md:ml-[16.666%] md:mt-28">
          {operatingFlow.map(([title, text], index) => (
            <Reveal key={title} delay={index * 0.06}>
              <article className="grid gap-4 border-b border-white/20 py-7 md:grid-cols-10 md:items-baseline md:gap-8 md:py-9">
                <span className="font-mono text-[10px] font-semibold text-coral md:col-span-1">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="text-2xl font-semibold tracking-[-0.03em] md:col-span-4 md:text-3xl">{title}</h3>
                <p className="max-w-[50ch] text-sm leading-7 text-white/60 md:col-span-5">{text}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <div className="mt-24 grid gap-12 border-t border-white/20 pt-8 md:mt-36 md:grid-cols-12 md:gap-8">
          <Reveal className="md:col-span-4">
            <h3 className="text-3xl font-semibold tracking-[-0.04em]">Governance principles.</h3>
          </Reveal>
          <div className="md:col-span-7 md:col-start-6">
            <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
              {governancePrinciples.map((principle, index) => (
                <Reveal key={principle} delay={index * 0.06}>
                  <article className="rounded-sm bg-white/5 p-4">
                    <p className="text-sm leading-6 text-white/80">{principle}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Team() {
  return (
    <section id="team" className={`${pageSection} bg-white`}>
      <div className={pageContainer}>
        <Reveal>
          <SectionIntro number="04 / Organisation" title="The people and roles behind Rudhram.">
            Vision, execution, experience, responsibility and technology working inside one accountable structure.
          </SectionIntro>
        </Reveal>
        <div className="mt-20 grid gap-x-6 gap-y-16 sm:grid-cols-2 md:mt-28 lg:grid-cols-3">
          {teamRoster.map((person, index) => (
            <Reveal key={`${person.role}-${person.name}`} delay={(index % 3) * 0.06}>
              <article>
                <Portrait image={person.image} name={person.name} open={person.open} className="rounded-sm" />
                <div className="border-t border-ink/20 pt-5">
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-coral">{person.role}</p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em]">{person.name}</h3>
                  <p className="mt-4 text-sm leading-7 text-ink/60">{person.responsibility}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Purpose() {
  return (
    <section className="bg-coral px-6 py-24 text-white sm:px-10 md:py-32 lg:px-16 lg:py-40">
      <Reveal className={`${pageContainer} grid gap-12 md:grid-cols-12 md:items-end`}>
        <div className="md:col-span-8">
          <p className="font-display text-5xl leading-[0.95] tracking-[-0.05em] sm:text-6xl lg:text-8xl">Growth must lift more than the <span className="italic">company.</span></p>
          <p className="mt-8 max-w-[54ch] text-base leading-8 text-white/80">Through Vrunda Gohil, Vir Trust and Vrundavan Trust, social responsibility remains part of Rudhram’s definition of progress.</p>
        </div>
        <Link to="/we-are-rudhram" className="group flex w-fit items-center gap-3 text-sm font-semibold md:col-span-4 md:justify-self-end">
          Meet the people behind the system
          <span className="flex size-10 items-center justify-center rounded-full border border-white/50 transition-colors group-hover:bg-white group-hover:text-coral"><ArrowRightIcon className="size-4" aria-hidden="true" /></span>
        </Link>
      </Reveal>
    </section>
  );
}

export default function AboutRudhramPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-ink">
      <PageMeta title="About Rudhram | Rudhram Enterprises" description="Meet Rudhram Enterprises: the purpose-led parent company, operating system and team behind the ventures." />
      <Navbar />
      <main>
        <Hero />
        <Identity />
        <Direction />
        <OperatingSystem />
        <Team />
        <Purpose />
      </main>
      <Footer />
    </div>
  );
}
