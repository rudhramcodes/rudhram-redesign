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
      aria-label={`Business page section ${active} of 11`}
      className="fixed left-2 top-1/2 z-40 -translate-y-1/2 font-mono text-[10px] font-semibold tracking-[0.08em] text-ink sm:left-4 md:left-6"
    >
      <span className="text-coral">{String(active).padStart(2, "0")}</span>
      <span className="mx-1 text-muted">/</span>
      <span>11</span>
    </div>
  );
}
