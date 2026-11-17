"use client";

import { useEffect, useRef, useState, Fragment } from "react";
import {
  Bars2Icon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { stagger, waapi } from "animejs";
import Link from "next/link";
import SocialIcon from "./SocialIcon";

const EASE_OUT = "cubic-bezier(0.16, 1, 0.3, 1)";
const EASE_IN_OUT = "cubic-bezier(0.65, 0, 0.35, 1)";
const EASE_IN = "cubic-bezier(0.32, 0, 0.67, 0)";
const EASE_TAP = "cubic-bezier(0.25, 1, 0.5, 1)";

const navItems = [
  ["Home", "/"],
  ["Business", "/business"],
  ["Ventures", "/ventures"],
  ["Visionaries", "/visionaries"],
];

const aboutItems = [
  ["About Rudhram", "/about-rudhram"],
  ["We are Rudhram", "/we-are-rudhram"],
];

const socialItems = [
  ["Instagram", "https://www.instagram.com/rudhramenterprises"],
  ["LinkedIn", "https://www.linkedin.com/in/rudhram-enterprises-844216419/"],
  ["Facebook", "https://www.facebook.com/rudhramenterprises"],
];

export default function Navbar() {
  const mobileRef = useRef(null);
  const mobileContentRef = useRef(null);
  const mobileAboutRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  const aboutOpenRef = useRef(aboutOpen);

  useEffect(() => {
    aboutOpenRef.current = aboutOpen;
  }, [aboutOpen]);

  const getMobilePanelHeight = (isMenuOpen, isAboutOpen) => {
    if (!isMenuOpen) return 64;
    const content = mobileContentRef.current;
    if (!content) return 64;

    const viewportH = window.visualViewport
      ? window.visualViewport.height
      : window.innerHeight;
    const maxAllowedHeight = Math.max(200, viewportH - 36);

    const submenu = mobileAboutRef.current;
    const targetSubmenuH = isAboutOpen && submenu ? submenu.scrollHeight : 0;
    const currentSubmenuH = submenu
      ? submenu.getBoundingClientRect().height
      : 0;
    const diff = targetSubmenuH - currentSubmenuH;

    const expectedContentH = content.scrollHeight + diff;
    return Math.min(62 + expectedContentH, maxAllowedHeight);
  };

  useEffect(() => {
    const panel = mobileRef.current;
    const content = mobileContentRef.current;
    if (!panel || !content || window.innerWidth >= 768) return undefined;

    const targetHeight = getMobilePanelHeight(menuOpen, aboutOpenRef.current);
    const panelAnimation = waapi.animate(panel, {
      height: [
        `${panel.getBoundingClientRect().height}px`,
        `${targetHeight}px`,
      ],
      borderRadius: menuOpen ? ["18px", "22px"] : ["22px", "18px"],
      delay: menuOpen ? 0 : 140,
      duration: menuOpen ? 420 : 320,
      ease: EASE_OUT,
    });
    panel.style.height = `${targetHeight}px`;
    panel.style.borderRadius = menuOpen ? "22px" : "18px";

    const contentAnimation = waapi.animate(content, {
      opacity: menuOpen ? [0, 1] : [1, 0],
      transform: menuOpen
        ? ["translateY(12px)", "translateY(0)"]
        : ["translateY(0)", "translateY(8px)"],
      delay: menuOpen ? 100 : 0,
      duration: menuOpen ? 260 : 160,
      ease: menuOpen ? EASE_OUT : EASE_IN_OUT,
    });
    content.style.opacity = menuOpen ? "1" : "0";
    content.style.transform = menuOpen ? "translateY(0)" : "translateY(8px)";

    if (!menuOpen) {
      return () => {
        panelAnimation.cancel();
        contentAnimation.cancel();
      };
    }

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event) =>
      event.key === "Escape" && setMenuOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    const items = panel.querySelectorAll("[data-mobile-item]");
    const itemsAnimation = waapi.animate(items, {
      opacity: [0, 1],
      transform: ["translateY(12px)", "translateY(0)"],
      delay: stagger(30, { start: 120 }),
      duration: 280,
      ease: EASE_OUT,
    });

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
    if (!submenu || window.innerWidth >= 768) return;

    const targetHeight = aboutOpen ? submenu.scrollHeight : 0;
    const animation = waapi.animate(submenu, {
      height: [
        `${submenu.getBoundingClientRect().height}px`,
        `${targetHeight}px`,
      ],
      opacity: aboutOpen ? [0, 1] : [1, 0],
      transform: aboutOpen
        ? ["translateY(6px)", "translateY(0)"]
        : ["translateY(0)", "translateY(6px)"],
      duration: 280,
      ease: EASE_OUT,
    });
    submenu.style.height = `${targetHeight}px`;
    submenu.style.opacity = aboutOpen ? "1" : "0";
    submenu.style.transform = aboutOpen ? "translateY(0)" : "translateY(6px)";

    let panelAnimation;
    if (menuOpen && mobileRef.current) {
      const panel = mobileRef.current;
      const targetPanelHeight = getMobilePanelHeight(true, aboutOpen);
      panelAnimation = waapi.animate(panel, {
        height: [
          `${panel.getBoundingClientRect().height}px`,
          `${targetPanelHeight}px`,
        ],
        duration: 280,
        ease: EASE_OUT,
      });
      panel.style.height = `${targetPanelHeight}px`;
    }

    return () => {
      animation.cancel();
      if (panelAnimation) panelAnimation.cancel();
    };
  }, [aboutOpen, menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
        return;
      }
      const panel = mobileRef.current;
      if (!panel) return;
      const targetHeight = getMobilePanelHeight(true, aboutOpen);
      panel.style.height = `${targetHeight}px`;
    };
    window.addEventListener("resize", handleResize);
    window.visualViewport?.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.visualViewport?.removeEventListener("resize", handleResize);
    };
  }, [menuOpen, aboutOpen]);

  const animateTap = (event) => {
    const el = event.currentTarget;
    waapi.animate(el, {
      transform: ["scale(1)", "scale(0.93)", "scale(1)"],
      duration: 180,
      ease: EASE_TAP,
    });
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setAboutOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-6 pt-3 sm:px-10 lg:px-16 sm:pt-5 pt-[max(0.75rem,env(safe-area-inset-top))]">
      <nav
        aria-label="Primary navigation"
        className="mx-auto hidden w-full max-w-[1240px] flex-col rounded-[20px] border border-muted/30 bg-cloud text-night md:flex"
      >
        <div className="relative flex h-[68px] items-center px-4">
          {/* <Link  className="flex h-12 w-32 shrink-0 items-center rounded-xl px-2 focus-visible:outline-3 focus-visible:outline-muted/30">
            <img src="/logo.png" alt="Rudhram" className="h-9 w-[116px] object-contain object-left" />
          </Link> */}

          <Link href="/" onPointerDown={animateTap}>
            <div className="flex items-center gap-2.5 min-w-0">
              <img src="/logo.png" alt="Rudhram CRM" className="w-5 h-8" />
              <span className="font-display font-light text-[26px] tracking-tight text-[#895b2a] truncate">
                Rudhram
              </span>
            </div>
          </Link>

          <div className="ml-auto flex min-w-0 items-center justify-end gap-1">
            {navItems.slice(0, 1).map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onPointerDown={animateTap}
                className="shrink-0 rounded-xl px-3 py-3 text-sm font-semibold hover:bg-muted/30 focus-visible:outline-3 focus-visible:outline-muted/30"
              >
                {label}
              </Link>
            ))}

            <div className="group relative">
              <Link
                href="/about-rudhram"
                aria-haspopup="true"
                onPointerDown={animateTap}
                className="flex shrink-0 items-center gap-1 rounded-xl px-3 py-3 text-sm font-semibold hover:bg-muted/30 focus-visible:outline-3 focus-visible:outline-muted/30"
              >
                About Us
                <ChevronDownIcon
                  className="size-3.5 group-hover:rotate-180 group-focus-within:rotate-180 transition-transform duration-200"
                  aria-hidden="true"
                />
              </Link>
              <div className="pointer-events-none invisible absolute left-0 top-full w-52 translate-y-2 pt-2 group-hover:pointer-events-auto group-hover:visible group-hover:translate-y-0 group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:translate-y-0 transition-all duration-200">
                <div className="overflow-hidden border border-muted/30 rounded-2xl bg-cloud text-night shadow-lg">
                  {aboutItems.map(([label, href], index) => (
                    <Fragment key={href}>
                      <Link
                        href={href}
                        onPointerDown={animateTap}
                        className="block w-[95%] mx-auto px-4 py-3 text-sm font-semibold hover:bg-muted/30 focus-visible:outline-3 focus-visible:outline-muted/30"
                      >
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
              <Link
                key={href}
                href={href}
                onPointerDown={animateTap}
                className="shrink-0 rounded-xl px-3 py-3 text-sm font-semibold hover:bg-muted/30 focus-visible:outline-3 focus-visible:outline-muted/30"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <nav
        ref={mobileRef}
        aria-label="Mobile navigation"
        style={{ height: "64px", borderRadius: "18px" }}
        className="mx-auto flex w-full max-w-[1240px] flex-col overflow-hidden border border-muted/30 bg-cloud text-night shadow-lg md:hidden"
      >
        <div className="flex h-[62px] shrink-0 items-center px-3">
          <Link
            href="/"
            onClick={closeMenu}
            onPointerDown={animateTap}
            className="flex h-11 items-center rounded-lg px-2 focus-visible:outline-3 focus-visible:outline-coral"
          >
            <img
              src="/logo.png"
              alt="Rudhram"
              className="h-8 w-[108px] object-contain object-left"
            />
          </Link>
          <button
            type="button"
            onClick={() => (menuOpen ? closeMenu() : setMenuOpen(true))}
            aria-label={
              menuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={menuOpen}
            onPointerDown={animateTap}
            className="ml-auto flex size-10 cursor-pointer items-center justify-center rounded-xl bg-muted/30 text-dark hover:bg-white focus-visible:outline-3 focus-visible:outline-coral"
          >
            {menuOpen ? (
              <XMarkIcon className="size-7" aria-hidden="true" />
            ) : (
              <Bars2Icon className="size-6" aria-hidden="true" />
            )}
          </button>
        </div>

        <div
          inert={!menuOpen}
          aria-hidden={!menuOpen}
          ref={mobileContentRef}
          data-lenis-prevent
          style={{ opacity: 0, transform: "translateY(8px)" }}
          className={`flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-5 pb-6 touch-pan-y [-webkit-overflow-scrolling:touch] ${menuOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        >
          <div className="mobile-menu-links mt-4 flex flex-col items-start gap-0.5">
            {navItems.slice(0, 1).map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={closeMenu}
                onPointerDown={animateTap}
                data-mobile-item
                className="rounded-lg py-1.5 text-[28px] sm:text-[32px] font-medium leading-[1.15] tracking-normal focus-visible:outline-3 focus-visible:outline-coral"
              >
                {label}
              </Link>
            ))}

            <button
              type="button"
              onClick={() => setAboutOpen((value) => !value)}
              onPointerDown={animateTap}
              data-mobile-item
              aria-expanded={aboutOpen}
              className="flex cursor-pointer items-center gap-3 rounded-lg py-1.5 text-[28px] sm:text-[32px] font-medium leading-[1.15] tracking-normal focus-visible:outline-3 focus-visible:outline-coral"
            >
              About Us
              <ChevronDownIcon
                className={`size-5 transition-transform duration-200 ${aboutOpen ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>
            <div
              ref={mobileAboutRef}
              inert={!aboutOpen}
              aria-hidden={!aboutOpen}
              style={{ height: 0, opacity: 0, transform: "translateY(6px)" }}
              className="w-full overflow-hidden"
            >
              <div className="my-2 border-y border-muted/30">
                {aboutItems.map(([label, href]) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={closeMenu}
                    onPointerDown={animateTap}
                    className="block border-b border-muted/30 px-1 py-2.5 text-base font-semibold text-ink last:border-b-0 hover:text-coral focus-visible:outline-3 focus-visible:outline-coral"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            {navItems.slice(1).map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={closeMenu}
                onPointerDown={animateTap}
                data-mobile-item
                className="rounded-lg py-1.5 text-[28px] sm:text-[32px] font-medium leading-[1.15] tracking-normal focus-visible:outline-3 focus-visible:outline-coral"
              >
                {label}
              </Link>
            ))}
          </div>

          <div
            className="mobile-menu-footer mt-auto flex flex-col items-center pt-5 pb-[max(0.5rem,env(safe-area-inset-bottom))]"
            data-mobile-item
          >
            <p className="text-center text-sm leading-6 text-ink">
              Mumbai · Surat · Delhi
            </p>
            <div
              className="mt-3 flex items-center justify-center gap-3"
              aria-label="Rudhram social media"
            >
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
