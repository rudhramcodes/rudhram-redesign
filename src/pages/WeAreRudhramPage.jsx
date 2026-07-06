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
import { personalStories, storyTimeline } from "../lib/aboutContent";

function StoryHero() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="story-top" className="flex min-h-svh bg-white px-6 pb-10 pt-32 sm:px-10 md:pb-12 md:pt-40 lg:px-16">
      <div className={`${pageContainer} flex flex-col justify-between`}>
        <div className="grid flex-1 items-center py-12 md:grid-cols-12 md:py-16">
          <motion.h1
            className="max-w-[11ch] text-[clamp(3.7rem,8.2vw,8.6rem)] font-semibold leading-[0.88] tracking-[-0.07em] md:col-span-11"
            initial={reducedMotion ? false : { opacity: 0, y: 36 }}
            animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            We did not begin with <span className="font-display font-normal italic text-coral">certainty.</span>
          </motion.h1>
        </div>
        <motion.div
          className="grid gap-6 border-t border-ink/20 pt-6 md:grid-cols-12 md:items-end"
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={reducedMotion ? undefined : { opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.45 }}
        >
          <p className="max-w-[52ch] text-sm leading-6 text-ink/65 md:col-span-6 md:text-base md:leading-7">Rudhram began in the space between what was expected and what felt true—a story of people who chose belief before proof.</p>
          <a href="#beginning" className="group flex w-fit items-center gap-3 text-sm font-semibold md:col-span-2 md:col-start-11 md:justify-self-end">
            Begin the story
            <span className="flex size-9 items-center justify-center rounded-full border border-ink/25 transition-colors group-hover:border-coral group-hover:bg-coral group-hover:text-white"><ArrowDownIcon className="size-4" aria-hidden="true" /></span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function Beginning() {
  return (
    <section id="beginning" className={`${pageSection} bg-cloud`}>
      <div className={pageContainer}>
        <Reveal>
          <SectionIntro number="01 / The beginning" title="Nothing was clear. That became the reason.">
            The story moved through expectation, honesty, family, cinema and the uncomfortable question of what came next.
          </SectionIntro>
        </Reveal>
        <Reveal className="mt-20 md:mt-28">
          <blockquote className="max-w-[20ch] font-display text-4xl leading-[1.03] tracking-[-0.04em] sm:text-5xl lg:text-7xl">“Rudhram did not begin when everything was clear. It began when <span className="italic text-coral">nothing</span> was clear.”</blockquote>
        </Reveal>
        <div className="mt-20 grid grid-cols-2 gap-3 md:mt-28 md:grid-cols-12 md:gap-5">
          <Reveal className="col-span-2 md:col-span-6"><Portrait image="/viral.webp" name="Viral Gohil" className="aspect-[3/2] rounded-sm object-center" /></Reveal>
          <Reveal className="md:col-span-3" delay={0.08}><Portrait image="/shivang.webp" name="Shivang Vir" className="rounded-sm" /></Reveal>
          <Reveal className="md:col-span-3" delay={0.14}><Portrait image="/mukund.webp" name="Mukund Barrdoliwala" className="rounded-sm" /></Reveal>
        </div>
      </div>
    </section>
  );
}

function Timeline() {
  return (
    <section className={`${pageSection} bg-white`}>
      <div className={pageContainer}>
        <Reveal>
          <SectionIntro number="02 / From uncertainty" title="A direction takes shape.">
            Each turn removed one assumption and revealed the next honest step.
          </SectionIntro>
        </Reveal>
        <ol className="mt-20 border-t border-ink/20 md:ml-[16.666%] md:mt-28">
          {storyTimeline.map((moment, index) => (
            <Reveal key={moment.number} delay={index * 0.06}>
              <li className="grid gap-5 border-b border-ink/20 py-8 md:grid-cols-10 md:gap-8 md:py-12">
                <span className="font-mono text-[10px] font-semibold text-coral md:col-span-1">{moment.number}</span>
                <h3 className="text-3xl font-semibold leading-tight tracking-[-0.04em] md:col-span-4 md:text-4xl">{moment.title}</h3>
                <p className="max-w-[52ch] text-base leading-8 text-ink/65 md:col-span-5">{moment.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

function PeopleStories() {
  return (
    <section className={`${pageSection} bg-cloud`}>
      <div className={pageContainer}>
        <Reveal>
          <SectionIntro number="03 / The people" title="Belief was never carried alone.">
            Rudhram’s human foundation is made from vision, brotherhood, lived example and social conscience.
          </SectionIntro>
        </Reveal>
        <div className="mt-24 space-y-28 md:mt-36 md:space-y-40">
          {personalStories.map((person, index) => (
            <article key={person.name} className="grid gap-10 md:grid-cols-12 md:items-center md:gap-8">
              <Reveal className={`md:col-span-5 ${index % 2 ? "md:col-start-8" : ""}`}>
                <Portrait image={person.image} name={person.name} className="rounded-sm" />
              </Reveal>
              <Reveal className={`md:col-span-5 ${index % 2 ? "md:col-start-2 md:row-start-1" : "md:col-start-7"}`} delay={0.1}>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-coral">{person.role}</p>
                <h3 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">{person.name}</h3>
                <div className="mt-8 space-y-5 text-base leading-8 text-ink/70">
                  {person.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
              </Reveal>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SoulToSystem() {
  return (
    <section className={`${pageSection} bg-night text-white`}>
      <div className={pageContainer}>
        <Reveal>
          <SectionIntro number="04 / The bridge" title="From people to an operating system." dark>
            Emotion gave Rudhram its reason. Structure gave that reason a future.
          </SectionIntro>
        </Reveal>
        <div className="mt-20 grid gap-14 md:mt-28 md:grid-cols-12 md:gap-8">
          <Reveal className="md:col-span-5 md:col-start-2">
            <p className="font-display text-4xl leading-[1.03] tracking-[-0.04em] sm:text-5xl">Rudhram Group is the <span className="italic text-coral">soul.</span></p>
            <p className="mt-6 max-w-[42ch] text-base leading-8 text-white/60">The people, bond, ethics, experience and founding spirit that made the vision possible.</p>
          </Reveal>
          <Reveal className="md:col-span-5 md:col-start-8" delay={0.1}>
            <p className="font-display text-4xl leading-[1.03] tracking-[-0.04em] sm:text-5xl">Rudhram Enterprises is the <span className="italic text-coral">structure.</span></p>
            <p className="mt-6 max-w-[42ch] text-base leading-8 text-white/60">The company that protects the vision, governs decisions, preserves intellectual property and helps future brands endure.</p>
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
        <p className="font-display text-5xl leading-[0.95] tracking-[-0.05em] sm:text-6xl md:col-span-8 lg:text-8xl">Built to become a <span className="italic">masterpiece.</span></p>
        <div className="flex flex-col items-start gap-4 md:col-span-4 md:items-end">
          <Link to="/about-rudhram" className="group flex items-center gap-3 text-sm font-semibold">Understand the system <span className="flex size-10 items-center justify-center rounded-full border border-white/50 transition-colors group-hover:bg-white group-hover:text-coral"><ArrowRightIcon className="size-4" aria-hidden="true" /></span></Link>
          <Link to="/business" className="text-sm text-white/70 underline decoration-white/40 underline-offset-4 hover:text-white">Explore the business</Link>
        </div>
      </Reveal>
    </section>
  );
}

export default function WeAreRudhramPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-ink">
      <PageMeta title="We Are Rudhram | Our Story" description="The personal story of the people, belief and uncertainty that became Rudhram." />
      <Navbar />
      <main>
        <StoryHero />
        <Beginning />
        <Timeline />
        <PeopleStories />
        <SoulToSystem />
        <Closing />
      </main>
      <Footer />
    </div>
  );
}
