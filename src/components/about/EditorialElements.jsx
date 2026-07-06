import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

export const pageContainer = "mx-auto w-full max-w-[1240px]";
export const pageSection = "px-6 py-24 sm:px-10 md:py-32 lg:px-16 lg:py-40";

export function PageMeta({ title, description }) {
  useEffect(() => {
    const previousTitle = document.title;
    const meta = document.querySelector('meta[name="description"]');
    const previousDescription = meta?.getAttribute("content") ?? "";
    document.title = title;
    meta?.setAttribute("content", description);
    return () => {
      document.title = previousTitle;
      meta?.setAttribute("content", previousDescription);
    };
  }, [title, description]);

  return null;
}

export function Reveal({ children, className = "", delay = 0 }) {
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

export function SectionIntro({ number, title, children, dark = false }) {
  return (
    <div className="grid gap-8 border-t border-current/20 pt-6 md:grid-cols-12 md:gap-8">
      <p className={`font-mono text-[11px] font-semibold tracking-[0.12em] ${dark ? "text-coral" : "text-ink/45"}`}>{number}</p>
      <h2 className="max-w-[11ch] text-4xl font-semibold leading-[0.96] tracking-[-0.05em] sm:text-5xl md:col-span-7 md:col-start-3 lg:text-7xl">{title}</h2>
      {children ? <div className={`max-w-[38ch] text-base leading-7 md:col-span-3 md:self-end ${dark ? "text-white/60" : "text-ink/65"}`}>{children}</div> : null}
    </div>
  );
}

export function Portrait({ image, name, open = false, className = "" }) {
  if (image) {
    return <img src={image} alt={name} loading="lazy" className={`aspect-[4/5] w-full bg-cloud object-cover object-center ${className}`} />;
  }

  return (
    <div className={`flex aspect-[4/5] w-full items-end bg-cloud p-6 ${className}`} role="img" aria-label={open ? `${name}, role currently open` : `${name}, portrait pending`}>
      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/40">
        {open ? "Appointment in progress" : "Portrait pending"}
      </p>
    </div>
  );
}
