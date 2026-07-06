import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

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

const section = "px-6 py-24 sm:px-10 md:py-32 lg:px-16 lg:py-40";
const container = "mx-auto w-full max-w-[1240px]";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // ponytail: client-side only; wire to a backend when one exists
    setSubmitted(true);
  };

  return (
    <section id="contact" data-section="contact" className={`${section} bg-white`}>
      <div className={container}>
        <Reveal>
          <div className="grid gap-8 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-7">
              <p className="font-mono text-[11px] font-semibold tracking-[0.12em] text-ink/45">
                Contact
              </p>
              <h2 className="mt-4 text-4xl font-semibold leading-[0.96] tracking-[-0.05em] sm:text-5xl lg:text-7xl">
                Let&rsquo;s build with <span className="font-display font-normal italic text-coral">belief.</span>
              </h2>
            </div>
            <p className="max-w-[36ch] text-right text-base leading-7 text-ink/65 md:col-span-3 md:col-start-8 md:self-end">
              Tell us about your idea. We&rsquo;ll bring the structure.
            </p>
          </div>
        </Reveal>

        <div className="mt-20 grid gap-14 md:mt-28 md:grid-cols-12 md:gap-8">
          <Reveal className="md:col-span-5" delay={0.05}>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-coral">
              Reach out
            </p>
            <div className="mt-6 space-y-6 text-sm leading-7 text-ink/70">
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-ink/40">
                  Phone
                </p>
                <a href="tel:+917285833101" className="mt-1 block transition-colors hover:text-coral">
                  +91 72858 33101
                </a>
                <a href="tel:+917284980137" className="block transition-colors hover:text-coral">
                  +91 72849 80137
                </a>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-ink/40">
                  Email
                </p>
                <a href="mailto:hello@rudhram.com" className="mt-1 block transition-colors hover:text-coral">
                  hello@rudhram.com
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal className="md:col-span-6 md:col-start-7" delay={0.1}>
            {submitted ? (
              <div className="border-t-2 border-coral pt-8">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-coral">
                  Sent
                </p>
                <p className="mt-4 text-xl font-semibold leading-snug tracking-[-0.02em]">
                  Thank you. We&rsquo;ll be in touch.
                </p>
                <p className="mt-2 text-sm leading-7 text-ink/60">
                  Every message deserves a real response — expect to hear from us within two working days.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div>
                  <label htmlFor="contact-name" className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-ink/40">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="mt-2 block w-full border-b border-ink/20 pb-3 text-base outline-none transition-colors focus:border-coral placeholder:text-ink/25"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-ink/40">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="mt-2 block w-full border-b border-ink/20 pb-3 text-base outline-none transition-colors focus:border-coral placeholder:text-ink/25"
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-ink/40">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your idea…"
                    className="mt-2 block w-full resize-none border-b border-ink/20 pb-3 text-base outline-none transition-colors focus:border-coral placeholder:text-ink/25"
                  />
                </div>
                <button
                  type="submit"
                  className="group inline-flex items-center gap-3 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-coral"
                >
                  Send message
                  <span className="flex size-9 items-center justify-center rounded-full border border-ink/25 transition-colors duration-200 group-hover:border-coral group-hover:bg-coral group-hover:text-white">
                    <PaperAirplaneIcon className="size-4" aria-hidden="true" />
                  </span>
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
