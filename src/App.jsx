import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import VenturesSection from "./components/VenturesSection";
import CommunitySection from "./components/CommunitySection";
import OurStorySection from "./components/OurStorySection";
import CareersSection from "./components/CareersSection";
import Footer from "./components/Footer";
import LegalPage from "./components/LegalPage";
import { slides } from "./lib/slides";

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(true);

  if (path === "/privacy-policy") return <LegalPage type="privacy" />;
  if (path === "/terms-and-conditions") return <LegalPage type="terms" />;

  return (
    <div className="min-h-screen bg-white font-sans text-ink">
      <Navbar />
      <Hero
        current={current}
        playing={playing}
        onSelect={setCurrent}
        onNext={() => setCurrent((value) => (value + 1) % slides.length)}
        onTogglePlaying={() => setPlaying((value) => !value)}
      />
      <CommunitySection />
      <OurStorySection />
      <CareersSection />
      <div className="relative isolate overflow-hidden">
        <VenturesSection />
        <Footer connected />
      </div>
    </div>
  );
}
