import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const storyMoments = [
  {
    marker: "01",
    title: "An honest pause",
    text: "Shivang had cleared the first step towards becoming a Chartered Accountant. Then he admitted something difficult: it was a good path, but it was not his path.",
  },
  {
    marker: "02",
    title: "A question on a drive",
    text: "His father, Viral Gohil, did not offer a lecture or demand an answer. He simply asked, ‘What do you really want to do?’ When Shivang had no answer, he gave him space to find one.",
  },
  {
    marker: "03",
    title: "Mumbai, 2021",
    text: "The camera led Shivang towards storytelling. He and Mukund Barrdoliwala arrived in Mumbai to learn cinema, carrying a dream of films and the courage to begin before everything was clear.",
  },
  {
    marker: "04",
    title: "A direction takes shape",
    text: "Cinema taught them vision, discipline and collaboration. Uncertainty taught them something larger: ideas need structure to survive. That realisation became Rudhram.",
  },
];

export default function OurStorySection() {
  return (
    <section
      id="story"
      aria-labelledby="story-heading"
      className="scroll-mt-20 bg-cloud px-5 py-16 text-night sm:px-10 md:flex md:min-h-dvh md:scroll-mt-24 md:items-center md:py-24 lg:px-14"
    >
      <div className="mx-auto w-full max-w-[1200px]">
        <header className="grid gap-7 md:grid-cols-12 md:items-end md:gap-8">
          <div className="md:col-span-6">
            <p className="mb-5 text-xs font-semibold uppercase text-coral">Our Story</p>
            <h2 id="story-heading" className="max-w-[12ch] text-[40px] font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              We did not start with a <span className="font-display font-normal italic text-coral">Perfect Plan.</span>
            </h2>
          </div>
          <p className="max-w-[58ch] tracking-tight text-lg leading-8 text-ink md:col-span-5 md:col-start-8">
            Rudhram began in the uncomfortable space between what was expected and what felt true. It is a story of choosing honesty over certainty, trusting people who stayed, and turning a creative dream into something built to last.
          </p>
        </header>

        <div className="mt-12 grid md:mt-16 md:grid-cols-12">
          <figure className="py-7 md:col-span-5  md:py-10 md:pr-10">
            <div className="grid grid-cols-2 gap-3">
              <img
                src="/viral.webp"
                alt="Viral Gohil"
                className="col-span-2 w-full rounded-lg object-cover object-center"
              />
              <img
                src="/shivang.webp"
                alt="Shivang Vir"
                className="w-full rounded-lg object-cover object-right"
              />
              <img
                src="/mukund.webp"
                alt="Mukund Barrdoliwala"
                className="w-full rounded-lg object-cover object-center"
              />
            </div>
            <figcaption className="mt-5 tracking-tight max-w-[42ch] text-sm leading-6 text-ink">
              Two friends came to Mumbai to learn how stories are made. Along the way, they discovered why ideas need a system behind them.
            </figcaption>
          </figure>

          <div className="py-4 md:col-span-7 md:py-6 md:pl-10">
            <ol>
              {storyMoments.map((moment) => (
                <li key={moment.marker} className="grid grid-cols-[40px_1fr] gap-3 border-b border-muted/30 py-5 last:border-b-0 sm:grid-cols-[56px_1fr] sm:gap-5">
                  <span className="font-mono text-xs tracking-tight font-semibold text-coral">{moment.marker}</span>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight leading-6">{moment.title}</h3>
                    <p className="mt-2 max-w-[62ch] tracking-tight text-sm leading-6 text-ink sm:text-base sm:leading-7">
                      {moment.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <blockquote className="mt-6 border-t border-muted/30 pt-7">
              <p className="max-w-[32ch] text-xl font-semibold leading-8 sm:text-2xl sm:leading-9">
                <span aria-hidden="true" className="font-serif text-coral">&ldquo;</span>
                Uncertainty did not become their weakness. It became the reason to build with direction.
              </p>
            </blockquote>
            <Link
              to="/we-are-rudhram"
              className="group mt-7 inline-flex items-center gap-3 text-sm font-semibold focus-visible:outline-3 focus-visible:outline-coral"
            >
              Read our full story
              <span className="flex size-9 items-center justify-center rounded-full border border-ink/25 transition-colors group-hover:border-coral group-hover:bg-coral group-hover:text-white">
                <ArrowRightIcon className="size-4" aria-hidden="true" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
