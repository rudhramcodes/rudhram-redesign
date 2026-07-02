import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { slides } from "./lib/slides";

export default function App() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
    localStorage.setItem("rudhram-theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => setCurrent((value) => (value + 1) % slides.length), 6000);
    return () => window.clearTimeout(timer);
  }, [current, playing]);

  return (
    <div className="min-h-screen bg-white font-sans text-ink dark:bg-black dark:text-cloud">
      <Navbar
        dark={dark}
        onToggleTheme={() => setDark((value) => !value)}
      />
      <Hero
        current={current}
        playing={playing}
        onSelect={setCurrent}
        onTogglePlaying={() => setPlaying((value) => !value)}
      />
    </div>
  );
}
