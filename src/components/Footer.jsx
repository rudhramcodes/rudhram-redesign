"use client";

import { useEffect, useRef, useState } from "react";
import { waapi, stagger } from "animejs";
import { useReducedMotion } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import SocialIcon from "./SocialIcon";

const pageLinks = [
  ["Business", "/business"],
  ["Our Story", "/#story"],
  ["Ventures", "/ventures"],
  ["Visionaries", "/visionaries"],
];

const aboutLinks = [
  ["About Rudhram", "/about-rudhram"],
  ["We are Rudhram", "/we-are-rudhram"],
];

const socials = [
  ["Instagram", "https://www.instagram.com/rudhramenterprises"],
  ["LinkedIn", "https://www.linkedin.com/in/rudhram-enterprises-844216419/"],
  ["Facebook", "https://www.facebook.com/rudhramenterprises"],
];

const legalLinks = [
  ["Privacy", "/privacy-policy"],
  ["Terms", "/terms-and-conditions"],
];

function FooterLink({ href, children }) {
  if (href.startsWith("/")) {
    return (
      <Link
        to={href}
        className="inline-flex w-fit items-center py-1 text-sm font-medium text-ink/70 transition-colors duration-200 ease-out hover:text-coral dark:text-cloud/60 dark:hover:text-coral"
      >
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className="inline-flex w-fit items-center py-1 text-sm font-medium text-ink/70 transition-colors duration-200 ease-out hover:text-coral dark:text-cloud/60 dark:hover:text-coral"
    >
      {children}
    </a>
  );
}

function SocialButton({ href, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={`Visit Rudhram on ${label}`}
      title={label}
      className="flex size-9 items-center justify-center rounded-full border border-muted/20 text-ink/70 transition-colors duration-200 ease-out hover:border-coral hover:text-coral dark:border-white/15 dark:text-cloud/50 dark:hover:border-coral dark:hover:text-coral"
    >
      <SocialIcon platform={label} />
    </a>
  );
}

function useScrollIn(ref) {
  useEffect(() => {
    const root = ref.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const anims = [];

    const animateEl = (el, from, to, opts = {}) => {
      const { delay = 0, duration = 700 } = opts;
      const a = waapi.animate(el, { ...from, ...to, duration, delay, ease: "out(4)" });
      Object.assign(el.style, Object.keys(to).reduce((acc, key) => {
        acc[key] = to[key];
        return acc;
      }, {}));
      anims.push(a);
    };

    const visibleSections = [];
    const hiddenSections = [];

    const sections = root.querySelectorAll("[data-animate]");
    sections.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight - 80 && rect.bottom > 0;
      if (isVisible) {
        visibleSections.push(el);
      } else {
        hiddenSections.push(el);
        el.style.opacity = "0";
        el.style.transform = "translateY(24px)";
      }
    });

    if (hiddenSections.length) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            animateEl(el, { opacity: 0, transform: "translateY(24px)" }, { opacity: 1, transform: "translateY(0)" }, { delay: parseInt(el.dataset.delay || "0") });
            observer.unobserve(el);
          });
        },
        { threshold: 0.15 },
      );
      hiddenSections.forEach((el) => observer.observe(el));
    }

    if (visibleSections.length) {
      requestAnimationFrame(() => {
        visibleSections.forEach((el) => {
          const delay = parseInt(el.dataset.delay || "0");
          el.style.opacity = "0";
          el.style.transform = "translateY(24px)";
          requestAnimationFrame(() => {
            animateEl(el, { opacity: 0, transform: "translateY(24px)" }, { opacity: 1, transform: "translateY(0)" }, { delay });
          });
        });
      });
    }

    // Staggered entrance for explore links
    const linkList = root.querySelector("[data-link-list]");
    if (linkList) {
      const links = linkList.children;
      if (links.length) {
        const doLinks = () => {
          const a = waapi.animate(links, {
            opacity: [0, 1],
            transform: ["translateY(12px)", "translateY(0)"],
            duration: 500,
            delay: stagger(45, { start: 300 }),
            ease: "out(4)",
          });
          Array.from(links).forEach((link) => {
            link.style.opacity = "1";
            link.style.transform = "translateY(0)";
          });
          anims.push(a);
        };

        const rect = linkList.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 80 && rect.bottom > 0;

        Array.from(links).forEach((link) => {
          link.style.opacity = "0";
          link.style.transform = "translateY(12px)";
        });

        if (isVisible) {
          requestAnimationFrame(() => doLinks());
        } else {
          const observer = new IntersectionObserver(
            ([entry]) => {
              if (!entry.isIntersecting) return;
              doLinks();
              observer.unobserve(linkList);
            },
            { threshold: 0.1 },
          );
          observer.observe(linkList);
        }
      }
    }

    return () => anims.forEach((a) => a.cancel());
  }, [ref]);
}

export default function Footer() {
  const rootRef = useRef(null);
  const aboutRef = useRef(null);
  const chevronRef = useRef(null);
  const [aboutOpen, setAboutOpen] = useState(false);
  const reducedMotion = useReducedMotion();

  useScrollIn(rootRef);

  useEffect(() => {
    const submenu = aboutRef.current;
    const chevron = chevronRef.current;
    if (!submenu || !chevron) return;

    const height = aboutOpen ? submenu.scrollHeight : 0;
    if (reducedMotion) {
      submenu.style.height = `${height}px`;
      submenu.style.opacity = aboutOpen ? "1" : "0";
      chevron.style.transform = `rotate(${aboutOpen ? 180 : 0}deg)`;
      return;
    }

    const submenuAnimation = waapi.animate(submenu, {
      height: [`${submenu.getBoundingClientRect().height}px`, `${height}px`],
      opacity: aboutOpen ? [0, 1] : [1, 0],
      transform: aboutOpen
        ? ["translateY(-4px)", "translateY(0)"]
        : ["translateY(0)", "translateY(-4px)"],
      duration: 240,
      ease: "out(3)",
    });
    const chevronAnimation = waapi.animate(chevron, {
      transform: aboutOpen
        ? ["rotate(0deg)", "rotate(180deg)"]
        : ["rotate(180deg)", "rotate(0deg)"],
      duration: 240,
      ease: "out(3)",
    });

    submenu.style.height = `${height}px`;
    submenu.style.opacity = aboutOpen ? "1" : "0";
    submenu.style.transform = aboutOpen ? "translateY(0)" : "translateY(-4px)";
    chevron.style.transform = `rotate(${aboutOpen ? 180 : 0}deg)`;

    return () => {
      submenuAnimation.cancel();
      chevronAnimation.cancel();
    };
  }, [aboutOpen, reducedMotion]);

  return (
    <footer
      ref={rootRef}
      className="overflow-hidden bg-cloud px-6 pb-7 pt-20 sm:px-10 sm:pb-9 md:pt-28 lg:px-16 dark:bg-night"
    >
      <div className="mx-auto max-w-[1240px]">
          <div className="grid grid-cols-1 gap-6 py-12 md:grid-cols-2 md:gap-16 md:py-14">
            <div className="flex flex-col order-1 md:order-2">
              <div data-animate data-delay="0">
                <h2 className="text-[7vw] font-semibold leading-[0.98] tracking-tight md:text-right sm:text-[32px] md:text-[36px] lg:text-[40px]">
                  From uncertainty,
                  <br />
                  <span className="text-coral">direction.</span>
                </h2>
              </div>
              <div data-animate data-delay="140" className="mt-12">
                <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.1em] text-muted">
                  Get in Touch
                </p>

                <div className="flex flex-col gap-y-0.5">
                  <FooterLink href="tel:+917285833101">
                    +91 72858 33101
                  </FooterLink>
                  <FooterLink href="tel:+917284980137">
                    +91 72849 80137
                  </FooterLink>
                </div>

                {/* Social */}
                <div
                  className="mt-8 flex items-center gap-2.5"
                  aria-label="Rudhram social media"
                >
                  {socials.map(([label, href]) => (
                    <SocialButton key={href} href={href} label={label} />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col order-2 md:order-1">
              <div data-animate data-delay="0">
                <img
                  src="/logo.png"
                  alt="Rudhram"
                  className="h-10 w-auto object-contain object-left"
                />
              </div>
              <div data-animate data-delay="80" className="mt-12">
                <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.1em] text-muted">
                  Explore
                </p>
                <nav
                  data-link-list
                  aria-label="Footer navigation"
                  className="flex flex-col gap-y-0.5"
                >
                  {pageLinks.slice(0, 1).map(([label, href]) => (
                    <FooterLink key={href} href={href}>
                      {label}
                    </FooterLink>
                  ))}
                  <div>
                    <button
                      type="button"
                      aria-controls="footer-about-links"
                      aria-expanded={aboutOpen}
                      onClick={() => setAboutOpen((value) => !value)}
                      className="flex cursor-pointer items-center gap-1.5 py-1 text-sm font-medium text-ink/70 transition-colors duration-200 ease-out hover:text-coral focus-visible:outline-2 focus-visible:outline-coral dark:text-cloud/60 dark:hover:text-coral"
                    >
                      About Us
                      <ChevronDownIcon ref={chevronRef} className="size-3.5" aria-hidden="true" />
                    </button>
                    <div
                      ref={aboutRef}
                      id="footer-about-links"
                      inert={!aboutOpen}
                      aria-hidden={!aboutOpen}
                      className="h-0 overflow-hidden opacity-0"
                    >
                      <div className="my-1 w-fit">
                        {aboutLinks.map(([label, href]) => (
                          <div key={href}>
                            <FooterLink href={href}>{label}</FooterLink>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  {pageLinks.slice(1).map(([label, href]) => (
                    <FooterLink key={href} href={href}>
                      {label}
                    </FooterLink>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            data-animate
            data-delay="200"
            className="flex flex-col gap-4 border-t border-muted/20 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between dark:border-white/10"
          >
            <p className="text-ink/60 dark:text-cloud/50">
              &copy; {new Date().getFullYear()} Rudhram Enterprises Private
              Limited.
            </p>
            <div className="flex gap-6">
              {legalLinks.map(([label, href]) => (
                <Link
                  key={href}
                  to={href}
                  className="text-ink/60 underline decoration-current/30 underline-offset-4 transition-colors duration-200 ease-out hover:text-coral dark:text-cloud/50 dark:hover:text-coral"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
      </div>
    </footer>
  );
}
