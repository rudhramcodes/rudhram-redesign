import { ArrowDownIcon, ArrowRightIcon, ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FacebookPostCard from "../components/FacebookPostCard";
import { PageMeta, Portrait, Reveal, SectionIntro, pageContainer, pageSection } from "../components/about/EditorialElements";
import { socialLinks, visionaries } from "../lib/visionariesContent";

function Hero() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="visionaries-top" className="flex min-h-svh bg-white px-6 pb-10 pt-32 sm:px-10 md:pb-12 md:pt-40 lg:px-16">
      <div className={`${pageContainer} flex flex-col justify-between`}>
        <div className="grid flex-1 items-center py-12 md:grid-cols-12 md:py-16">
          <motion.h1
            className="max-w-[11ch] text-[clamp(3.6rem,8vw,8.4rem)] font-semibold leading-[0.88] tracking-[-0.07em] md:col-span-11"
            initial={reducedMotion ? false : { opacity: 0, y: 36 }}
            animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            Vision is not certainty. It is <span className="font-display font-normal italic text-coral">responsibility.</span>
          </motion.h1>
        </div>
        <motion.div
          className="grid gap-6 border-t border-ink/20 pt-6 md:grid-cols-12 md:items-end"
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={reducedMotion ? undefined : { opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.45 }}
        >
          <p className="max-w-[56ch] text-sm leading-6 text-ink/65 md:col-span-6 md:text-base md:leading-7">Four people give Rudhram its point of view: purpose, imagination, lived experience, and responsibility beyond the company.</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/40 md:col-span-3 md:col-start-9">Four people · Four convictions</p>
          <a href="#viewpoints" className="group flex w-fit items-center gap-3 text-sm font-semibold md:col-span-1 md:justify-self-end">
            Explore
            <span className="flex size-9 items-center justify-center rounded-full border border-ink/25 transition-colors group-hover:border-coral group-hover:bg-coral group-hover:text-white"><ArrowDownIcon className="size-4" aria-hidden="true" /></span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function Profiles() {
  return (
    <section id="viewpoints" className={`${pageSection} bg-cloud`}>
      <div className={pageContainer}>
        <Reveal>
          <SectionIntro number="01 / Viewpoints" title="The people behind the point of view.">
            These are convictions, not another organisational directory or a repetition of personal biographies.
          </SectionIntro>
        </Reveal>
        <div className="mt-24 space-y-28 md:mt-36 md:space-y-40">
          {visionaries.map((person, index) => (
            <article key={person.name} className="grid gap-10 md:grid-cols-12 md:items-center md:gap-8">
              <Reveal className={`md:col-span-5 ${index % 2 ? "md:col-start-8" : ""}`}>
                <Portrait image={person.image} name={person.name} className="rounded-sm" />
              </Reveal>
              <Reveal className={`md:col-span-5 ${index % 2 ? "md:col-start-2 md:row-start-1" : "md:col-start-7"}`} delay={0.1}>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-coral">{person.lens}</p>
                <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">{person.name}</h2>
                <p className="mt-8 border-t border-coral pt-6 text-base leading-8 text-ink/70">{person.viewpoint}</p>
              </Reveal>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Principles() {
  return (
    <section className={`${pageSection} bg-night text-white`}>
      <div className={pageContainer}>
        <Reveal>
          <SectionIntro number="02 / Principles" title="Four convictions, held in public." dark>
            Each perspective contributes something different to the way Rudhram chooses, builds, and takes responsibility.
          </SectionIntro>
        </Reveal>
        <div className="mt-20 grid gap-x-10 gap-y-16 md:mt-28 md:grid-cols-2">
          {visionaries.map((person, index) => (
            <Reveal key={person.name} delay={(index % 2) * 0.08}>
              <blockquote className="border-t border-white/20 pt-6">
                <span className="font-mono text-[10px] font-semibold text-coral">{String(index + 1).padStart(2, "0")}</span>
                <p className="mt-10 max-w-[18ch] font-display text-4xl leading-[1.04] tracking-[-0.04em] sm:text-5xl">“{person.quote}”</p>
                <footer className="mt-7 text-sm text-white/55">{person.name}</footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function PublicPerspective() {
  return (
    <section className={`${pageSection} bg-white`}>
      <div className={pageContainer}>
        <Reveal>
          <SectionIntro number="03 / Public perspective" title="What Rudhram is sharing.">
            Real posts and direct profile links—without fabricated articles, engagement metrics, or placeholder headlines.
          </SectionIntro>
        </Reveal>
        <div className="mt-20 grid gap-12 md:mt-28 md:grid-cols-12 md:items-start md:gap-8">
          <Reveal className="md:col-span-5">
            <FacebookPostCard className="rounded-sm" />
          </Reveal>
          <Reveal className="md:col-span-6 md:col-start-7" delay={0.1}>
            <p className="max-w-[40ch] text-lg leading-8 text-ink/70">Follow the public conversation across the channels where Rudhram publishes updates, observations, and work in progress.</p>
            <div className="mt-10 border-t border-ink/20">
              {socialLinks.map(([platform, href]) => (
                <a key={platform} href={href} target="_blank" rel="noreferrer" className="group flex items-center justify-between border-b border-ink/20 py-6 text-xl font-semibold tracking-[-0.02em] hover:text-coral">
                  {platform}
                  <ArrowUpRightIcon className="size-5 text-ink/35 transition-colors group-hover:text-coral" aria-hidden="true" />
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Closing() {
  return (
    <section className="bg-coral px-6 py-24 text-white sm:px-10 md:py-32 lg:px-16 lg:py-40">
      <Reveal className={`${pageContainer} grid gap-12 md:grid-cols-12 md:items-end`}>
        <p className="font-display text-5xl leading-[0.95] tracking-[-0.05em] sm:text-6xl md:col-span-8 lg:text-8xl">Meet the story behind the <span className="italic">people.</span></p>
        <Link to="/we-are-rudhram" className="group flex w-fit items-center gap-3 text-sm font-semibold md:col-span-4 md:justify-self-end">
          Read We Are Rudhram
          <span className="flex size-10 items-center justify-center rounded-full border border-white/50 transition-colors group-hover:bg-white group-hover:text-coral"><ArrowRightIcon className="size-4" aria-hidden="true" /></span>
        </Link>
      </Reveal>
    </section>
  );
}

export default function VisionariesPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-ink">
      <PageMeta title="Visionaries | Rudhram Enterprises" description="Meet the four people and convictions that shape Rudhram’s point of view." />
      <Navbar />
      <main>
        <Hero />
        <Profiles />
        <Principles />
        <PublicPerspective />
        <Closing />
      </main>
      <Footer />
    </div>
  );
}
