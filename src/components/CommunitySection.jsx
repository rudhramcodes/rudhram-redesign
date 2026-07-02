import { useEffect, useState } from "react";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";

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
    className: "md:col-span-7 bg-coral text-white",
  },
];

// ponytail: replace this permalink when a new post is published; automatic lookup needs the Meta Graph API.
const facebookPost = "https://www.facebook.com/rudhramenterprises/posts/122129715980896181:1557147608983885";
const facebookEmbed = `https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(facebookPost)}&show_text=true&width=500`;

export default function CommunitySection() {
  const [active, setActive] = useState(0);
  const leader = leaders[active];

  useEffect(() => {
    const timer = window.setInterval(() => setActive((value) => (value + 1) % leaders.length), 6000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section id="visionaries" className="bg-[#f4f4f4] px-6 py-16 text-ink dark:bg-black dark:text-cloud sm:px-10 md:flex md:h-dvh md:min-h-[720px] md:items-center md:pb-6 md:pt-24 lg:px-14">
      <div className="mx-auto w-full max-w-[1040px] md:flex md:h-full md:max-h-[700px] md:flex-col">
        <h2 className="text-[32px] font-semibold leading-10">Inside Rudhram</h2>

        <div className="mt-6 grid gap-4 md:min-h-0 md:flex-1 md:grid-cols-12 md:grid-rows-2">
          <article className="overflow-hidden rounded-[28px] border border-black/10 bg-white dark:border-white/20 dark:bg-[#111] md:col-span-7">
            <div className="grid min-h-[480px] md:h-full md:min-h-0 md:grid-cols-2">
              <img
                key={leader.image}
                src={leader.image}
                alt={leader.name}
                className="h-56 w-full object-cover object-center md:h-full md:min-h-0"
              />
              <div className="flex min-h-64 flex-col p-6 md:min-h-0">
                <p className="font-mono text-xs uppercase text-coral">Visionaries</p>
                <blockquote className="my-auto border-l border-coral pl-4 text-xl font-semibold leading-7">
                  {leader.quote}
                </blockquote>
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="font-semibold">{leader.name}</p>
                    <p className="mt-1 text-sm text-ink/60 dark:text-cloud/60">{leader.role}</p>
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
            className={`flex min-h-[320px] flex-col rounded-[28px] p-6 transition-transform hover:-translate-y-1 focus-visible:outline-3 focus-visible:outline-coral md:min-h-0 ${socialCards[0].className}`}
          >
            <div className="flex items-center justify-between">
              <p className="font-mono text-xs uppercase">{socialCards[0].platform}</p>
              <ArrowUpRightIcon className="size-5" aria-hidden="true" />
            </div>
            <p className="my-auto max-w-sm text-xl font-semibold leading-7">{socialCards[0].message}</p>
            <p className="text-sm opacity-60">Visit profile</p>
          </a>

          <article className="relative flex min-h-[380px] overflow-hidden rounded-[28px] border border-black/10 bg-white dark:border-white/20 md:col-span-5 md:min-h-0">
            <iframe
              title="Latest Rudhram Enterprises Facebook post"
              src={facebookEmbed}
              width="500"
              height="534"
              scrolling="no"
              className="facebook-post-frame absolute left-1/2 top-1/2 h-[534px] w-[500px] max-w-none border-0 bg-white"
              loading="lazy"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            />
          </article>

          <a
            href={socialCards[1].href}
            target="_blank"
            rel="noreferrer"
            className={`flex min-h-[320px] flex-col rounded-[28px] p-6 transition-transform hover:-translate-y-1 focus-visible:outline-3 focus-visible:outline-white md:min-h-0 ${socialCards[1].className}`}
          >
            <div className="flex items-center justify-between">
              <p className="font-mono text-xs uppercase">{socialCards[1].platform}</p>
              <ArrowUpRightIcon className="size-5" aria-hidden="true" />
            </div>
            <p className="my-auto max-w-lg text-xl font-semibold leading-7">{socialCards[1].message}</p>
            <p className="text-sm text-white/70">Visit profile</p>
          </a>
        </div>
      </div>
    </section>
  );
}
