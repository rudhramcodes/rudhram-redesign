import { useEffect, useRef, useState } from "react";
import { waapi } from "animejs";

const navItems = [
  { label: "Business", href: "#business" },
  {
    label: "About Us",
    href: "#about",
    submenu: [
      { label: "About Rudhram Enterprise", href: "#about-enterprise" },
      { label: "We Are Rudhram", href: "#we-are-rudhram" },
    ],
  },
  { label: "Our Story", href: "#story" },
  { label: "Visionaries", href: "#visionaries" },
  { label: "Careers", href: "#careers" },
];

const duration = (ms) =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : ms;

const animateGlass = (target, scale) =>
  waapi.animate(target, {
    transform: `scale(${scale})`,
    duration: duration(160),
    ease: "out(3)",
  });

function Chevron({ open }) {
  return (
    <svg
      className={`w-3 h-3 transition-transform duration-300 ease-out ${
        open ? "rotate-180" : ""
      }`}
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 5L6 8L9 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Navbar() {
  const [active, setActive] = useState(null);
  const navRef = useRef(null);
  const dropdownRef = useRef(null);
  const dropdownMounted = useRef(false);
  const hideTimeout = useRef(null);

  useEffect(() => {
    const animation = waapi.animate(navRef.current, {
      opacity: [0, 1],
      transform: ["translateY(-12px) scale(.96)", "translateY(0) scale(1)"],
      duration: duration(500),
      ease: "out(3)",
    });

    return () => animation.cancel();
  }, []);

  useEffect(() => {
    if (!dropdownRef.current) return;
    if (!dropdownMounted.current) {
      dropdownMounted.current = true;
      return;
    }

    const animation = waapi.animate(dropdownRef.current, {
      opacity: active ? [0, 1] : [1, 0],
      transform: active
        ? ["translateY(-6px) scale(.96)", "translateY(0) scale(1)"]
        : ["translateY(0) scale(1)", "translateY(-6px) scale(.96)"],
      duration: duration(active ? 240 : 160),
      ease: "out(3)",
    });

    return () => animation.cancel();
  }, [active]);

  const show = (label) => {
    if (hideTimeout.current) clearTimeout(hideTimeout.current);
    setActive(label);
  };

  const hide = () => {
    hideTimeout.current = setTimeout(() => {
      setActive(null);
    }, 200);
  };

  return (
    <nav className="fixed top-0 inset-x-0 z-50 flex justify-center pt-5 pointer-events-none">
      <div
        ref={navRef}
        className="
          flex items-center gap-1 sm:gap-2 md:gap-6
          px-3 sm:px-4 md:px-6 py-2
          pointer-events-auto
        "
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.22), rgba(255,255,255,0.07))",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          border: "1px solid rgba(255,255,255,0.28)",
          borderRadius: "9999px",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.32), 0 12px 36px rgba(8,15,24,0.24)",
        }}
      >
          <a href="#" className="mr-1 md:mr-4 flex-shrink-0">
            <img
              src="/logo.png"
              alt="Rudhram"
              className="h-6 md:h-7 w-auto"
            />
          </a>

          <span className="hidden sm:block w-px h-5 bg-white/20 mr-1 md:mr-2" />

          <div className="flex items-center gap-0.5 md:gap-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.submenu && show(item.label)}
                onMouseLeave={hide}
              >
                <a
                  href={item.href}
                  className="
                    relative flex items-center gap-0.5 md:gap-1
                    px-2 md:px-3 py-1.5 md:py-2
                    text-xs sm:text-sm font-medium
                    text-rice-paper/60 hover:text-rice-paper
                    rounded-full border border-transparent
                    hover:border-white/25 hover:bg-white/10
                    hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_6px_20px_rgba(8,15,24,0.18)]
                    focus-visible:outline-none focus-visible:border-white/35 focus-visible:bg-white/10
                    transition-[color,background-color,border-color,box-shadow] duration-300
                    cursor-pointer select-none
                  "
                  onPointerEnter={(event) => animateGlass(event.currentTarget, 1.04)}
                  onPointerLeave={(event) => animateGlass(event.currentTarget, 1)}
                  onPointerDown={(event) => animateGlass(event.currentTarget, 0.96)}
                  onPointerUp={(event) => animateGlass(event.currentTarget, 1.04)}
                  onFocus={(event) => animateGlass(event.currentTarget, 1.04)}
                  onBlur={(event) => animateGlass(event.currentTarget, 1)}
                >
                  {item.label}
                  {item.submenu && <Chevron open={active === item.label} />}
                </a>

                {item.submenu && (
                  <div
                    ref={dropdownRef}
                    onMouseEnter={() => show(item.label)}
                    onMouseLeave={hide}
                    className={`
                      absolute top-full left-0 mt-2
                      w-56 p-2
                      origin-top
                      ${active === item.label
                        ? "pointer-events-auto"
                        : "pointer-events-none"
                      }
                    `}
                    style={{
                      opacity: 0,
                      transform: "translateY(-6px) scale(.96)",
                      background: "linear-gradient(135deg, rgba(255,255,255,0.22), rgba(255,255,255,0.07))",
                      backdropFilter: "blur(24px) saturate(180%)",
                      WebkitBackdropFilter: "blur(24px) saturate(180%)",
                      border: "1px solid rgba(255,255,255,0.28)",
                      borderRadius: "16px",
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.32), 0 12px 36px rgba(8,15,24,0.24)",
                    }}
                  >
                    {item.submenu.map((sub) => (
                      <a
                        key={sub.label}
                        href={sub.href}
                        className="
                          block px-4 py-2.5
                          text-sm text-rice-paper/60
                          border border-transparent rounded-full
                          hover:text-rice-paper hover:border-white/25 hover:bg-white/10
                          hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_6px_20px_rgba(8,15,24,0.18)]
                          focus-visible:outline-none focus-visible:border-white/35 focus-visible:bg-white/10
                          transition-[color,background-color,border-color,box-shadow] duration-300
                        "
                        onPointerEnter={(event) => animateGlass(event.currentTarget, 1.03)}
                        onPointerLeave={(event) => animateGlass(event.currentTarget, 1)}
                        onPointerDown={(event) => animateGlass(event.currentTarget, 0.97)}
                        onPointerUp={(event) => animateGlass(event.currentTarget, 1.03)}
                        onFocus={(event) => animateGlass(event.currentTarget, 1.03)}
                        onBlur={(event) => animateGlass(event.currentTarget, 1)}
                      >
                        {sub.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
      </div>
    </nav>
  );
}
