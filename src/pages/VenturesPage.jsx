import { ArrowDownIcon, ArrowRightIcon, ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { PageMeta, Reveal, SectionIntro, pageContainer, pageSection } from "../components/about/EditorialElements";
import { ventureCriteria, venturePath, ventures } from "../lib/venturesContent";

const [liveVenture, ...pipeline] = ventures;

function Hero() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="ventures-top" className="flex min-h-svh bg-white px-6 pb-10 pt-32 sm:px-10 md:pb-12 md:pt-40 lg:px-16">
      <div className={`${pageContainer} flex flex-col justify-between`}>
        <div className="grid flex-1 items-center py-12 md:grid-cols-12 md:py-16">
          <motion.h1
            className="max-w-[10ch] text-[clamp(3.8rem,8.4vw,8.8rem)] font-semibold leading-[0.88] tracking-[-0.07em] md:col-span-11"
            initial={reducedMotion ? false : { opacity: 0, y: 36 }}
            animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            Building what comes <span className="font-display font-normal italic text-coral">next.</span>
          </motion.h1>
        </div>
        <motion.div
          className="grid gap-6 border-t border-ink/20 pt-6 md:grid-cols-12 md:items-end"
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={reducedMotion ? undefined : { opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.45 }}
        >
          <p className="max-w-[56ch] text-sm leading-6 text-ink/65 md:col-span-6 md:text-base md:leading-7">Rudhram observes real needs, gives selected ideas a clear reason to exist, and builds them into distinct, purpose-led ventures.</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/40 md:col-span-3 md:col-start-9">One live · Six in development</p>
          <a href="#live-venture" className="group flex w-fit items-center gap-3 text-sm font-semibold md:col-span-1 md:justify-self-end">
            Explore
            <span className="flex size-9 items-center justify-center rounded-full border border-ink/25 transition-colors group-hover:border-coral group-hover:bg-coral group-hover:text-white"><ArrowDownIcon className="size-4" aria-hidden="true" /></span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function LiveVenture() {
  return (
    <section id="live-venture" className={`${pageSection} bg-night text-white`}>
      <div className={pageContainer}>
        <Reveal>
          <SectionIntro number="01 / Live venture" title="Purpose, in market." dark>
            The first venture in the portfolio is live, distinct, and connected to Rudhram through long-term stewardship.
          </SectionIntro>
        </Reveal>
        <div className="mt-20 grid gap-10 md:mt-28 md:grid-cols-12 md:items-center md:gap-8">
          <Reveal className="overflow-hidden bg-white/5 md:col-span-7">
            <img src={liveVenture.image} alt="" className="aspect-[4/3] w-full object-cover" />
          </Reveal>
          <Reveal className="md:col-span-4 md:col-start-9" delay={0.1}>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-coral">{liveVenture.status}</p>
            <h2 className="mt-5 text-5xl font-semibold tracking-[-0.05em] sm:text-6xl">{liveVenture.name}</h2>
            <p className="mt-6 text-base leading-8 text-white/65">{liveVenture.description}</p>
            <a href={liveVenture.url} target="_blank" rel="noreferrer" className="group mt-9 inline-flex items-center gap-3 text-sm font-semibold">
              Visit Panigrahna
              <span className="flex size-10 items-center justify-center rounded-full border border-white/40 transition-colors group-hover:bg-white group-hover:text-night"><ArrowUpRightIcon className="size-4" aria-hidden="true" /></span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Pipeline() {
  return (
    <section className={`${pageSection} bg-cloud`}>
      <div className={pageContainer}>
        <Reveal>
          <SectionIntro number="02 / Pipeline" title="Ideas taking shape.">
            Six named ventures are being developed without invented launch dates or premature promises.
          </SectionIntro>
        </Reveal>
        <div className="mt-20 grid gap-x-8 gap-y-16 md:mt-28 md:grid-cols-2 md:gap-y-24">
          {pipeline.map((venture, index) => (
            <Reveal key={venture.name} delay={(index % 2) * 0.07}>
              <article>
                <div className="overflow-hidden bg-white">
                  <img src={venture.image} alt="" loading="lazy" className="aspect-[16/10] w-full object-cover transition-transform duration-700 hover:scale-[1.02]" />
                </div>
                <div className="grid gap-4 border-t border-ink/20 pt-5 sm:grid-cols-[1fr_auto]">
                  <div>
                    <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-coral">{venture.status}</p>
                    <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">{venture.name}</h3>
                  </div>
                  <span className="font-mono text-[10px] text-ink/35">{String(index + 2).padStart(2, "0")}</span>
                </div>
                <p className="mt-4 max-w-[54ch] text-sm leading-7 text-ink/60">{venture.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function SelectionSystem() {
  return (
    <section className={`${pageSection} bg-white`}>
      <div className={pageContainer}>
        <Reveal>
          <SectionIntro number="03 / Selection" title="What earns a place.">
            Opportunity alone is not enough. A venture must be meaningful, practical, and aligned for the long term.
          </SectionIntro>
        </Reveal>
        <div className="mt-20 border-t border-ink/20 md:ml-[16.666%] md:mt-28">
          {ventureCriteria.map(([title, text], index) => (
            <Reveal key={title} delay={index * 0.05}>
              <article className="grid gap-4 border-b border-ink/20 py-7 md:grid-cols-10 md:items-baseline md:gap-8 md:py-9">
                <span className="font-mono text-[10px] font-semibold text-coral md:col-span-1">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="text-2xl font-semibold tracking-[-0.03em] md:col-span-4 md:text-3xl">{title}</h3>
                <p className="max-w-[50ch] text-sm leading-7 text-ink/60 md:col-span-5">{text}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-24 md:mt-36">
          <Reveal>
            <h2 className="max-w-[12ch] text-4xl font-semibold leading-none tracking-[-0.05em] sm:text-5xl lg:text-7xl">From observation to a living venture.</h2>
          </Reveal>
          <div className="mt-16 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {venturePath.map(([title, text], index) => (
              <Reveal key={title} delay={(index % 3) * 0.06}>
                <article className="border-t-2 border-coral pt-5">
                  <span className="font-mono text-[10px] text-ink/40">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="mt-9 text-2xl font-semibold tracking-[-0.03em]">{title}</h3>
                  <p className="mt-4 text-sm leading-7 text-ink/60">{text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Closing() {
  return (
    <section className="bg-coral px-6 py-24 text-white sm:px-10 md:py-32 lg:px-16 lg:py-40">
      <Reveal className={`${pageContainer} grid gap-12 md:grid-cols-12 md:items-end`}>
        <p className="font-display text-5xl leading-[0.95] tracking-[-0.05em] sm:text-6xl md:col-span-8 lg:text-8xl">Distinct ventures. One disciplined <span className="italic">foundation.</span></p>
        <div className="flex flex-col items-start gap-4 md:col-span-4 md:items-end">
          <Link to="/business" className="group flex items-center gap-3 text-sm font-semibold">Explore the business <span className="flex size-10 items-center justify-center rounded-full border border-white/50 transition-colors group-hover:bg-white group-hover:text-coral"><ArrowRightIcon className="size-4" aria-hidden="true" /></span></Link>
          <Link to="/about-rudhram" className="text-sm text-white/70 underline decoration-white/40 underline-offset-4 hover:text-white">About Rudhram</Link>
        </div>
      </Reveal>
    </section>
  );
}

export default function VenturesPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-ink">
      <PageMeta title="Ventures | Rudhram Enterprises" description="Explore Rudhram’s live venture and the purpose-led ideas currently taking shape." />
      <Navbar />
      <main>
        <Hero />
        <LiveVenture />
        <Pipeline />
        <SelectionSystem />
        <Closing />
      </main>
      <Footer />
    </div>
  );
}
