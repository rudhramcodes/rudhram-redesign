import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { stagger, waapi } from "animejs";

const navItems = [
  ["Our Story", "#story"],
  ["Visionaries", "#visionaries"],
  ["Our Roots", "#roots"],
];

const aboutItems = [
  ["About Rudhram", "#about"],
  ["We are Rudhram", "#we-are-rudhram"],
];

function ThemeIcon({ dark }) {
  return dark ? (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M19.07 4.93l-1.42 1.42M6.35 17.65l-1.42 1.42" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path d="M20 15.2A8.5 8.5 0 0 1 8.8 4 8.5 8.5 0 1 0 20 15.2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

export default function Navbar({ dark, onToggleTheme }) {
  const navRef = useRef(null);
  const linksRef = useRef(null);
  const [compact, setCompact] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const collapsed = compact && !expanded;

  useEffect(() => {
    const animation = waapi.animate(navRef.current.querySelectorAll("[data-nav-item]"), {
      opacity: [0, 1],
      transform: ["translateY(-10px)", "translateY(0)"],
      delay: stagger(45),
      duration: 480,
      ease: "out(4)",
    });
    return () => animation.cancel();
  }, []);

  useEffect(() => {
    const update = () => {
      const next = window.innerWidth >= 768 && window.scrollY > 120;
      setCompact(next);
      if (!next) setExpanded(false);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    const nav = navRef.current;
    const links = linksRef.current;
    const sideGutter = window.innerWidth >= 1024 ? 112 : window.innerWidth >= 640 ? 80 : 48;
    const targetWidth = collapsed ? 232 : Math.min(1040, window.innerWidth - sideGutter);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const navDuration = reducedMotion ? 0 : collapsed ? 520 : 620;
    const linkDuration = reducedMotion ? 0 : collapsed ? 180 : 280;
    let navAnimation;
    let linksAnimation;
    let navTimer;
    let linksTimer;
    let resetWidth;

    const animateNav = () => {
      navAnimation = waapi.animate(nav, {
        width: [`${nav.getBoundingClientRect().width}px`, `${targetWidth}px`],
        duration: navDuration,
        ease: "inOut(4)",
      });
      nav.style.width = `${targetWidth}px`;
      if (!collapsed) {
        resetWidth = window.setTimeout(() => {
          nav.style.width = "";
        }, navDuration);
      }
    };

    if (collapsed) {
      links.inert = true;
      links.style.pointerEvents = "none";
      links.style.overflow = "hidden";
      linksAnimation = waapi.animate(links, {
        opacity: [Number.parseFloat(getComputedStyle(links).opacity), 0],
        transform: [links.style.transform || "translateY(0)", "translateY(8px)"],
        duration: linkDuration,
        ease: "inOut(3)",
      });
      links.style.opacity = "0";
      links.style.transform = "translateY(8px)";
      navTimer = window.setTimeout(animateNav, linkDuration);
    } else {
      links.inert = true;
      links.style.pointerEvents = "none";
      links.style.overflow = "hidden";
      links.style.opacity = "0";
      links.style.transform = "translateY(8px)";
      animateNav();
      linksTimer = window.setTimeout(() => {
        links.inert = false;
        links.style.pointerEvents = "auto";
        links.style.overflow = "visible";
        linksAnimation = waapi.animate(links, {
          opacity: [0, 1],
          transform: ["translateY(8px)", "translateY(0)"],
          duration: linkDuration,
          ease: "out(4)",
        });
        links.style.opacity = "1";
        links.style.transform = "translateY(0)";
      }, navDuration);
    }

    return () => {
      window.clearTimeout(navTimer);
      window.clearTimeout(linksTimer);
      window.clearTimeout(resetWidth);
      navAnimation?.cancel();
      linksAnimation?.cancel();
    };
  }, [collapsed]);

  const toggleTheme = (event) => {
    waapi.animate(event.currentTarget, {
      transform: ["scale(1)", "scale(.9)", "scale(1)"],
      duration: 260,
      ease: "out(4)",
    });
    onToggleTheme();
  };

  return (
    <nav
      ref={navRef}
      aria-label="Primary navigation"
      onPointerEnter={() => compact && setExpanded(true)}
      onPointerLeave={() => setExpanded(false)}
      onFocus={() => compact && setExpanded(true)}
      onBlur={(event) => !event.currentTarget.contains(event.relatedTarget) && setExpanded(false)}
      className={`fixed left-1/2 top-4 z-50 flex h-[72px] w-[calc(100%_-_3rem)] max-w-[1040px] -translate-x-1/2 items-center gap-3 rounded-[28px] border px-3 backdrop-blur-xl will-change-[width] sm:w-[calc(100%_-_5rem)] sm:px-4 lg:w-[calc(100%_-_7rem)] ${dark ? "border-muted/30 bg-night/90 text-cloud" : "border-white/25 bg-black/35 text-white"}`}
    >
      <a href="#business" data-nav-item className="flex h-14 w-24 shrink-0 items-center justify-center rounded-2xl px-2 transition-colors hover:bg-white/10 focus-visible:outline-3 focus-visible:outline-white sm:w-32">
        <img src="/logo.png" alt="Rudhram" className="navbar-logo h-11 w-full object-contain" />
      </a>

      <div ref={linksRef} data-nav-links className="hidden min-w-0 flex-1 items-center justify-center gap-1 md:flex">
        <a
          href="#business"
          data-nav-item
          className="rounded-2xl px-4 py-3 text-sm font-semibold transition-colors hover:bg-white/10 focus-visible:outline-3 focus-visible:outline-white"
        >
          Business
        </a>

        <div className="group relative" data-nav-item>
          <a
            href="#about"
            aria-haspopup="true"
            className="flex items-center gap-1 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors hover:bg-white/10 focus-visible:outline-3 focus-visible:outline-white"
          >
            About Us
            <ChevronDownIcon className="size-3.5 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" aria-hidden="true" />
          </a>
          <div className="pointer-events-none absolute left-0 top-full w-48 translate-y-1 pt-2 opacity-0 transition-[opacity,transform] group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100">
            <div className={`rounded-2xl border p-2 backdrop-blur-xl ${dark ? "border-muted/30 bg-night/95 text-cloud" : "border-white/25 bg-black/50 text-white"}`}>
              {aboutItems.map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  className="block rounded-2xl px-4 py-3 text-sm font-semibold transition-colors hover:bg-white/10 focus-visible:outline-3 focus-visible:outline-white"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {navItems.map(([label, href]) => (
          <a
            key={href}
            href={href}
            data-nav-item
            className="rounded-2xl px-4 py-3 text-sm font-semibold transition-colors hover:bg-white/10 focus-visible:outline-3 focus-visible:outline-white"
          >
            {label}
          </a>
        ))}
      </div>

      <button
        type="button"
        onClick={toggleTheme}
        data-nav-item
        aria-label={`Switch to ${dark ? "light" : "dark"} mode`}
        aria-pressed={dark}
        className={`ml-auto flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-full border transition-colors hover:bg-white/10 focus-visible:outline-3 focus-visible:outline-white md:ml-0 ${dark ? "border-muted/30" : "border-white/20"}`}
      >
        <ThemeIcon dark={dark} />
      </button>
    </nav>
  );
}
