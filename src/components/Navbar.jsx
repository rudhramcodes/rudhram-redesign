import { useEffect, useRef, useState, Fragment } from "react";
import {
  Bars2Icon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { stagger, waapi } from "animejs";
import { Link } from "react-router-dom";
import SocialIcon from "./SocialIcon";

const navItems = [
  ["Business", "/business"],
  ["Our Story", "/#story"],
  ["Ventures", "/#ventures"],
  ["Visionaries", "/#visionaries"],
];

const aboutItems = [
  ["About Rudhram", "/business#what-is-rudhram"],
  ["We are Rudhram", "/business#what-we-are"],
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
  const mobileAboutRef = useRef(null);
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

    const targetHeight = menuOpen
      ? Math.min(62 + content.scrollHeight, window.innerHeight - 64)
      : 64;
    const panelAnimation = waapi.animate(panel, {
      height: [`${panel.getBoundingClientRect().height}px`, `${targetHeight}px`],
      borderRadius: menuOpen ? ["18px", "22px"] : ["22px", "18px"],
      delay: menuOpen ? 0 : 200,
      duration: menuOpen ? 720 : 560,
      ease: "inOut(4)",
    });
    panel.style.height = `${targetHeight}px`;
    panel.style.borderRadius = menuOpen ? "22px" : "18px";

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

  useEffect(() => {
    const submenu = mobileAboutRef.current;
    const targetHeight = aboutOpen ? submenu.scrollHeight : 0;
    const animation = waapi.animate(submenu, {
      height: [`${submenu.getBoundingClientRect().height}px`, `${targetHeight}px`],
      opacity: aboutOpen ? [0, 1] : [1, 0],
      transform: aboutOpen
        ? ["translateY(10px)", "translateY(0)"]
        : ["translateY(0)", "translateY(8px)"],
      duration: aboutOpen ? 360 : 220,
      ease: aboutOpen ? "out(4)" : "inOut(3)",
    });
    submenu.style.height = `${targetHeight}px`;
    submenu.style.opacity = aboutOpen ? "1" : "0";
    submenu.style.transform = aboutOpen ? "translateY(0)" : "translateY(8px)";
    return () => animation.cancel();
  }, [aboutOpen]);

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
        className={`mx-auto hidden h-[68px] items-center rounded-[20px] border border-muted/30 bg-cloud px-3 text-night md:flex ${desktopCollapsed ? "overflow-hidden" : "overflow-visible"}`}
      >
        <Link to="/" onClick={() => setDesktopMenuOpen(false)} onPointerDown={animateTap} data-nav-item className="flex h-12 w-32 shrink-0 items-center rounded-xl px-2 focus-visible:outline-3 focus-visible:outline-muted/30">
          <img src="/logo.png" alt="Rudhram" className="h-9 w-[116px] object-contain object-left" />
        </Link>

        <div ref={desktopLinksRef} inert={desktopCollapsed} aria-hidden={desktopCollapsed} style={{ opacity: 0, transform: "translateY(16px)" }} className={`ml-auto flex min-w-0 items-center justify-end gap-1 ${desktopCollapsed ? "w-0 overflow-hidden" : "w-full overflow-visible"}`}>
          {navItems.slice(0, 1).map(([label, href]) => (
            <Link key={href} to={href} onClick={() => setDesktopMenuOpen(false)} onPointerDown={animateTap} data-nav-item className="shrink-0 rounded-xl px-3 py-3 text-sm font-semibold hover:bg-muted/30 focus-visible:outline-3 focus-visible:outline-muted/30">
              {label}
            </Link>
          ))}

          <div className="group relative" data-nav-item>
            <Link to="/business#what-is-rudhram" aria-haspopup="true" onPointerDown={animateTap} className="flex shrink-0 items-center gap-1 rounded-xl px-3 py-3 text-sm font-semibold hover:bg-muted/30 focus-visible:outline-3 focus-visible:outline-muted/30">
              About Us
              <ChevronDownIcon className="size-3.5 group-hover:rotate-180 group-focus-within:rotate-180" aria-hidden="true" />
            </Link>
            <div className="pointer-events-none invisible absolute left-0 top-full w-52 translate-y-2 pt-2 group-hover:pointer-events-auto group-hover:visible group-hover:translate-y-0 group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:translate-y-0">
              <div className="overflow-hidden border border-muted/30 rounded-2xl bg-cloud text-night">
                {aboutItems.map(([label, href], index) => (
                  <Fragment key={href}>
                    <Link to={href} onClick={() => setDesktopMenuOpen(false)} onPointerDown={animateTap} className="block w-[95%] mx-auto px-4 py-3 text-sm font-semibold hover:bg-muted/30 focus-visible:outline-3 focus-visible:outline-muted/30">
                      {label}
                    </Link>
                    {index < aboutItems.length - 1 && (
                      <hr className="w-[95%] mx-auto border-t border-muted/30" />
                    )}
                  </Fragment>
                ))}
              </div>
            </div>
          </div>

          {navItems.slice(1).map(([label, href]) => (
            <Link key={href} to={href} onClick={() => setDesktopMenuOpen(false)} onPointerDown={animateTap} data-nav-item className="shrink-0 rounded-xl px-3 py-3 text-sm font-semibold hover:bg-muted/30 focus-visible:outline-3 focus-visible:outline-muted/30">
              {label}
            </Link>
          ))}
        </div>

        {scrolled && (
          <button
            type="button"
            onClick={() => setDesktopMenuOpen((value) => !value)}
            aria-label={desktopMenuOpen ? "Collapse navigation menu" : "Expand navigation menu"}
            aria-expanded={desktopMenuOpen}
            onPointerDown={animateTap}
            className="ml-2 flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-xl hover:bg-muted/30 focus-visible:outline-3 focus-visible:outline-muted/30"
          >
            {desktopMenuOpen ? <XMarkIcon className="size-6" aria-hidden="true" /> : <Bars2Icon className="size-6" aria-hidden="true" />}
          </button>
        )}
      </nav>

      <nav
        ref={mobileRef}
        aria-label="Mobile navigation"
        style={{ height: "64px", borderRadius: "18px" }}
        className="mx-auto flex w-[calc(100%_-_16px)] flex-col overflow-hidden border border-muted/30 bg-cloud text-night md:hidden"
      >
        <div className="flex h-[62px] shrink-0 items-center px-3">
          <Link to="/" onClick={closeMenu} onPointerDown={animateTap} className="flex h-11 items-center rounded-lg px-2 focus-visible:outline-3 focus-visible:outline-coral">
            <img src="/logo.png" alt="Rudhram" className="h-8 w-[108px] object-contain object-left" />
          </Link>
          <button
            type="button"
            onClick={() => (menuOpen ? closeMenu() : setMenuOpen(true))}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            onPointerDown={animateTap}
            className="ml-auto flex size-10 cursor-pointer items-center justify-center rounded-xl bg-muted/30 text-dark hover:bg-white focus-visible:outline-3 focus-visible:outline-coral"
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
          <div className="mobile-menu-links mt-5 flex flex-col items-start">
            {navItems.slice(0, 1).map(([label, href]) => (
              <Link key={href} to={href} onClick={closeMenu} onPointerDown={animateTap} data-mobile-item className="rounded-lg py-1.5 text-[32px] font-medium leading-[1.15] tracking-normal focus-visible:outline-3 focus-visible:outline-coral">
                {label}
              </Link>
            ))}

            <button type="button" onClick={() => setAboutOpen((value) => !value)} onPointerDown={animateTap} data-mobile-item aria-expanded={aboutOpen} className="flex cursor-pointer items-center gap-3 rounded-lg py-1.5 text-[32px] font-medium leading-[1.15] tracking-normal focus-visible:outline-3 focus-visible:outline-coral">
              About Us
              <ChevronDownIcon className={`size-5 ${aboutOpen ? "rotate-180" : ""}`} aria-hidden="true" />
            </button>
            <div
              ref={mobileAboutRef}
              inert={!aboutOpen}
              aria-hidden={!aboutOpen}
              style={{ height: 0, opacity: 0, transform: "translateY(8px)" }}
              className="w-full overflow-hidden"
            >
              <div className="my-2 border-y border-muted/30">
                {aboutItems.map(([label, href]) => (
                  <Link key={href} to={href} onClick={closeMenu} onPointerDown={animateTap} className="block border-b border-muted/30 px-1 py-3 text-base font-semibold text-ink last:border-b-0 hover:text-coral focus-visible:outline-3 focus-visible:outline-coral">
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            {navItems.slice(1).map(([label, href]) => (
              <Link key={href} to={href} onClick={closeMenu} onPointerDown={animateTap} data-mobile-item className="rounded-lg py-1.5 text-[32px] font-medium leading-[1.15] tracking-normal focus-visible:outline-3 focus-visible:outline-coral">
                {label}
              </Link>
            ))}
          </div>

          <div className="mobile-menu-footer mt-auto flex flex-col items-center pt-6" data-mobile-item>
            <p className="text-center text-sm leading-6 text-ink">Mumbai · Surat · Delhi</p>
            <div className="mt-4 flex items-center justify-center gap-3" aria-label="Rudhram social media">
              {socialItems.map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  title={label}
                  aria-label={`Visit Rudhram on ${label}`}
                  onPointerDown={animateTap}
                  className="flex size-10 items-center justify-center rounded-xl border border-muted/30 bg-cloud text-coral hover:bg-white focus-visible:outline-3 focus-visible:outline-coral"
                >
                  <SocialIcon platform={label} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
