import { useEffect, useRef, useState } from "react";
import {
  Bars2Icon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { stagger, waapi } from "animejs";

const navItems = [
  ["Business", "#business"],
  ["Ventures", "#ventures"],
  ["Our Story", "#story"],
  ["Visionaries", "#visionaries"],
  ["Our Roots", "#roots"],
];

const aboutItems = [
  ["About Rudhram", "#about"],
  ["We are Rudhram", "#we-are-rudhram"],
];

const socialItems = [
  ["Instagram", "https://www.instagram.com/rudhramenterprises"],
  ["LinkedIn", "https://www.linkedin.com/in/rudhram-enterprises-844216419/"],
  ["Facebook", "https://www.facebook.com/rudhramenterprises"],
];

export default function Navbar() {
  const desktopRef = useRef(null);
  const desktopLinksRef = useRef(null);
  const mobileRef = useRef(null);
  const mobileContentRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [desktopMenuOpen, setDesktopMenuOpen] = useState(false);
  const desktopCollapsed = scrolled && !desktopMenuOpen;

  useEffect(() => {
    const update = () => {
      const next = window.scrollY > 100;
      setScrolled(next);
      if (!next) setDesktopMenuOpen(false);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    const nav = desktopRef.current;
    const links = desktopLinksRef.current;
    if (window.innerWidth < 768) return undefined;

    const targetWidth = desktopCollapsed
      ? 220
      : Math.min(900, window.innerWidth - 48);
    const widthAnimation = waapi.animate(nav, {
      width: [`${nav.getBoundingClientRect().width}px`, `${targetWidth}px`],
      delay: desktopCollapsed ? 220 : 0,
      duration: desktopCollapsed ? 560 : 680,
      ease: "inOut(4)",
    });
    nav.style.width = `${targetWidth}px`;

    const linksAnimation = waapi.animate(links, {
      opacity: desktopCollapsed ? [1, 0] : [0, 1],
      transform: desktopCollapsed
        ? ["translateY(0)", "translateY(10px)"]
        : ["translateY(16px)", "translateY(0)"],
      delay: desktopCollapsed ? 0 : 700,
      duration: desktopCollapsed ? 200 : 420,
      ease: desktopCollapsed ? "inOut(3)" : "out(4)",
    });
    links.style.opacity = desktopCollapsed ? "0" : "1";
    links.style.transform = desktopCollapsed ? "translateY(10px)" : "translateY(0)";

    return () => {
      widthAnimation.cancel();
      linksAnimation.cancel();
    };
  }, [desktopCollapsed]);

  useEffect(() => {
    const panel = mobileRef.current;
    const content = mobileContentRef.current;
    if (window.innerWidth >= 768) return undefined;

    const targetHeight = menuOpen ? window.innerHeight - 24 : 68;
    const panelAnimation = waapi.animate(panel, {
      height: [`${panel.getBoundingClientRect().height}px`, `${targetHeight}px`],
      borderRadius: menuOpen ? ["20px", "24px"] : ["24px", "20px"],
      delay: menuOpen ? 0 : 200,
      duration: menuOpen ? 720 : 560,
      ease: "inOut(4)",
    });
    panel.style.height = `${targetHeight}px`;
    panel.style.borderRadius = menuOpen ? "24px" : "20px";

    const contentAnimation = waapi.animate(content, {
      opacity: menuOpen ? [0, 1] : [1, 0],
      transform: menuOpen
        ? ["translateY(18px)", "translateY(0)"]
        : ["translateY(0)", "translateY(12px)"],
      delay: menuOpen ? 740 : 0,
      duration: menuOpen ? 440 : 180,
      ease: menuOpen ? "out(4)" : "inOut(3)",
    });
    content.style.opacity = menuOpen ? "1" : "0";
    content.style.transform = menuOpen ? "translateY(0)" : "translateY(12px)";

    if (!menuOpen) {
      return () => {
        panelAnimation.cancel();
        contentAnimation.cancel();
      };
    }

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event) => event.key === "Escape" && setMenuOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    const itemsAnimation = waapi.animate(
      mobileRef.current.querySelectorAll("[data-mobile-item]"),
      {
        opacity: [0, 1],
        transform: ["translateY(16px)", "translateY(0)"],
        delay: stagger(42, { start: 760 }),
        duration: 420,
        ease: "out(4)",
      },
    );

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
      panelAnimation.cancel();
      contentAnimation.cancel();
      itemsAnimation.cancel();
    };
  }, [menuOpen]);

  const animateTap = (event) => {
    waapi.animate(event.currentTarget, {
      transform: ["scale(1)", "scale(.92)", "scale(1)"],
      duration: 260,
      ease: "out(4)",
    });
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setAboutOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-5">
      <nav
        ref={desktopRef}
        aria-label="Primary navigation"
        style={{ width: "min(900px, calc(100vw - 48px))" }}
        className={`mx-auto hidden h-[68px] items-center rounded-[20px] border border-black/10 bg-cloud/95 px-3 text-night shadow-[0_12px_36px_rgba(0,0,0,.12)] backdrop-blur-xl md:flex ${desktopCollapsed ? "overflow-hidden" : "overflow-visible"}`}
      >
        <a href="#business" onClick={() => setDesktopMenuOpen(false)} onPointerDown={animateTap} data-nav-item className="flex h-12 w-32 shrink-0 items-center rounded-xl px-2 focus-visible:outline-3 focus-visible:outline-coral">
          <img src="/logo.png" alt="Rudhram" className="h-9 w-[116px] object-contain object-left" />
        </a>

        <div ref={desktopLinksRef} inert={desktopCollapsed} aria-hidden={desktopCollapsed} style={{ opacity: 0, transform: "translateY(16px)" }} className={`ml-auto flex min-w-0 items-center justify-end gap-1 ${desktopCollapsed ? "w-0 overflow-hidden" : "w-full overflow-visible"}`}>
          {navItems.slice(0, 2).map(([label, href]) => (
            <a key={href} href={href} onClick={() => setDesktopMenuOpen(false)} onPointerDown={animateTap} data-nav-item className="shrink-0 rounded-xl px-3 py-3 text-sm font-semibold hover:bg-black/5 focus-visible:outline-3 focus-visible:outline-coral">
              {label}
            </a>
          ))}

          <div className="group relative" data-nav-item>
            <a href="#about" aria-haspopup="true" onPointerDown={animateTap} className="flex shrink-0 items-center gap-1 rounded-xl px-3 py-3 text-sm font-semibold hover:bg-black/5 focus-visible:outline-3 focus-visible:outline-coral">
              About Us
              <ChevronDownIcon className="size-3.5 group-hover:rotate-180 group-focus-within:rotate-180" aria-hidden="true" />
            </a>
            <div className="pointer-events-none absolute left-0 top-full w-52 translate-y-2 pt-2 opacity-0 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100">
              <div className="rounded-[16px] border border-black/10 bg-cloud/95 p-2 shadow-[0_16px_40px_rgba(0,0,0,.14)] backdrop-blur-xl">
                {aboutItems.map(([label, href]) => (
                  <a key={href} href={href} onClick={() => setDesktopMenuOpen(false)} onPointerDown={animateTap} className="block rounded-xl px-4 py-3 text-sm font-semibold hover:bg-black/5 focus-visible:outline-3 focus-visible:outline-coral">
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {navItems.slice(2).map(([label, href]) => (
            <a key={href} href={href} onClick={() => setDesktopMenuOpen(false)} onPointerDown={animateTap} data-nav-item className="shrink-0 rounded-xl px-3 py-3 text-sm font-semibold hover:bg-black/5 focus-visible:outline-3 focus-visible:outline-coral">
              {label}
            </a>
          ))}
        </div>

        {scrolled && (
          <button
            type="button"
            onClick={() => setDesktopMenuOpen((value) => !value)}
            aria-label={desktopMenuOpen ? "Collapse navigation menu" : "Expand navigation menu"}
            aria-expanded={desktopMenuOpen}
            onPointerDown={animateTap}
            className="ml-2 flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-xl hover:bg-black/5 focus-visible:outline-3 focus-visible:outline-coral"
          >
            {desktopMenuOpen ? <XMarkIcon className="size-6" aria-hidden="true" /> : <Bars2Icon className="size-6" aria-hidden="true" />}
          </button>
        )}
      </nav>

      <nav
        ref={mobileRef}
        aria-label="Mobile navigation"
        style={{ height: "68px", borderRadius: "20px" }}
        className="mx-auto flex flex-col overflow-hidden border border-black/10 bg-cloud/95 text-night shadow-[0_12px_36px_rgba(0,0,0,.12)] backdrop-blur-xl md:hidden"
      >
        <div className="flex h-[66px] shrink-0 items-center px-3">
          <a href="#business" onClick={closeMenu} onPointerDown={animateTap} className="flex h-12 items-center rounded-xl px-2 focus-visible:outline-3 focus-visible:outline-coral">
            <img src="/logo.png" alt="Rudhram" className="h-9 w-[116px] object-contain object-left" />
          </a>
          <button
            type="button"
            onClick={() => (menuOpen ? closeMenu() : setMenuOpen(true))}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            onPointerDown={animateTap}
            className="ml-auto flex size-11 cursor-pointer items-center justify-center rounded-xl hover:bg-black/5 focus-visible:outline-3 focus-visible:outline-coral"
          >
            {menuOpen ? <XMarkIcon className="size-8" aria-hidden="true" /> : <Bars2Icon className="size-6" aria-hidden="true" />}
          </button>
        </div>

        <div
          inert={!menuOpen}
          aria-hidden={!menuOpen}
          ref={mobileContentRef}
          style={{ opacity: 0, transform: "translateY(12px)" }}
          className={`flex min-h-0 flex-1 flex-col overflow-y-auto px-5 pb-5 ${menuOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        >
          <div className="mobile-menu-links mt-7 flex flex-col items-start">
            {navItems.slice(0, 2).map(([label, href]) => (
              <a key={href} href={href} onClick={closeMenu} onPointerDown={animateTap} data-mobile-item className="rounded-lg py-2 text-[34px] font-medium leading-[1.15] tracking-normal focus-visible:outline-3 focus-visible:outline-coral">
                {label}
              </a>
            ))}

            <button type="button" onClick={() => setAboutOpen((value) => !value)} onPointerDown={animateTap} data-mobile-item aria-expanded={aboutOpen} className="flex cursor-pointer items-center gap-3 rounded-lg py-2 text-[34px] font-medium leading-[1.15] tracking-normal focus-visible:outline-3 focus-visible:outline-coral">
              About Us
              <ChevronDownIcon className={`size-5 ${aboutOpen ? "rotate-180" : ""}`} aria-hidden="true" />
            </button>
            {aboutOpen && (
              <div className="mb-2 flex flex-col border-l border-coral pl-4">
                {aboutItems.map(([label, href]) => (
                  <a key={href} href={href} onClick={closeMenu} onPointerDown={animateTap} className="rounded-lg py-1.5 text-lg font-medium text-black/60 focus-visible:outline-3 focus-visible:outline-coral">
                    {label}
                  </a>
                ))}
              </div>
            )}

            {navItems.slice(2).map(([label, href]) => (
              <a key={href} href={href} onClick={closeMenu} onPointerDown={animateTap} data-mobile-item className="rounded-lg py-2 text-[34px] font-medium leading-[1.15] tracking-normal focus-visible:outline-3 focus-visible:outline-coral">
                {label}
              </a>
            ))}
          </div>

          <div className="mobile-menu-footer mt-auto pt-8" data-mobile-item>
            <p className="text-sm leading-6 text-black/50">Mumbai · Surat · Delhi</p>
            <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
              {socialItems.map(([label, href]) => (
                <a key={href} href={href} target="_blank" rel="noreferrer" onPointerDown={animateTap} className="text-sm font-medium underline decoration-black/20 underline-offset-4 focus-visible:outline-3 focus-visible:outline-coral">
                  {label}
                </a>
              ))}
            </div>
            <div className="mobile-menu-images mt-7 flex gap-3" aria-hidden="true">
              <img src="/shivang.webp" alt="" className="h-20 w-28 rounded-lg object-cover object-top" />
              <img src="/mukund.webp" alt="" className="h-20 w-28 rounded-lg object-cover object-top" />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
