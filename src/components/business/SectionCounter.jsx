import { useEffect, useState } from "react";

export default function SectionCounter() {
  const [active, setActive] = useState(1);

  useEffect(() => {
    const sections = document.querySelectorAll("[data-business-section]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(Number(entry.target.dataset.section));
        });
      },
      { rootMargin: "-42% 0px -52%", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      aria-label={`Business page section ${active} of 6`}
      className="fixed bottom-6 left-6 z-40 hidden rounded-full border border-ink/15 bg-white/90 px-3 py-2 font-mono text-[10px] font-semibold tracking-[0.08em] text-ink backdrop-blur lg:block"
    >
      <span className="text-coral">{String(active).padStart(2, "0")}</span>
      <span className="mx-1 text-muted">/</span>
      <span>06</span>
    </div>
  );
}
