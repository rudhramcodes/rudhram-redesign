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

const glassAnimations = new WeakMap();

const runGlassAnimation = (target, options) => {
  glassAnimations.get(target)?.cancel();
  const animation = waapi.animate(target, options);
  glassAnimations.set(target, animation);
};

const pressGlass = (event) => {
  event.currentTarget.setPointerCapture(event.pointerId);
  runGlassAnimation(event.currentTarget, {
    transform: "scale(.96)",
    duration: duration(80),
    ease: "out(3)",
  });
};

const releaseGlass = (event) => {
  if (event.currentTarget.hasPointerCapture(event.pointerId)) {
    event.currentTarget.releasePointerCapture(event.pointerId);
  }
  runGlassAnimation(event.currentTarget, {
    transform: "scale(1)",
    duration: duration(240),
    ease: "outElastic(.7, .6)",
  });
};

const keyboardClick = (event) => {
  if (event.detail !== 0) return;
  runGlassAnimation(event.currentTarget, {
    transform: ["scale(.96)", "scale(1)"],
    duration: duration(280),
    ease: "outElastic(.7, .6)",
  });
};

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
      transform: active
        ? ["translateY(-10px) scale(.97)", "translateY(0) scale(1)"]
        : ["translateY(0) scale(1)", "translateY(-10px) scale(.97)"],
      duration: duration(active ? 280 : 160),
      ease: "out(4)",
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
    }, 320);
  };

  return (
    <nav className="fixed top-0 inset-x-0 z-50 flex justify-center pt-5 pointer-events-none">
      <div
        ref={navRef}
        className="
          liquid-glass relative flex items-center gap-1 sm:gap-2 md:gap-6
          px-3 sm:px-4 md:px-6 py-2
          pointer-events-auto
          rounded-full
        "
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
                    glass-control relative flex items-center gap-0.5 md:gap-1
                    px-2 md:px-3 py-1.5 md:py-2
                    text-xs sm:text-sm font-medium
                    text-rice-paper/60 hover:text-rice-paper
                    rounded-full
                    focus-visible:outline-none
                    transition-[color,background-color,border-color,box-shadow] duration-300
                    cursor-pointer select-none
                  "
                  onPointerDown={pressGlass}
                  onPointerUp={releaseGlass}
                  onPointerCancel={releaseGlass}
                  onClick={keyboardClick}
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
                      liquid-glass absolute top-full left-0 mt-3
                      w-56 p-2
                      origin-top rounded-2xl will-change-transform
                      ${active === item.label
                        ? "pointer-events-auto"
                        : "pointer-events-none"
                      }
                    `}
                    style={{
                      opacity: active === item.label ? 1 : 0,
                      transform: "translateY(-10px) scale(.97)",
                    }}
                  >
                    {item.submenu.map((sub) => (
                      <a
                        key={sub.label}
                        href={sub.href}
                        className="
                          glass-control block px-4 py-2.5
                          text-sm text-rice-paper/60
                          rounded-2xl hover:text-rice-paper
                          focus-visible:outline-none
                          transition-[color,background-color,border-color,box-shadow] duration-300
                        "
                        onPointerDown={pressGlass}
                        onPointerUp={releaseGlass}
                        onPointerCancel={releaseGlass}
                        onClick={keyboardClick}
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
