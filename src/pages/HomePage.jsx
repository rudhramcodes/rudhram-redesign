import { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import VenturesSection from "../components/VenturesSection";
import CommunitySection from "../components/CommunitySection";
import OurStorySection from "../components/OurStorySection";
import OfficesSection from "../components/OfficesSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import { slides } from "../lib/slides";

export default function HomePage() {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(true);

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
      <OfficesSection />
      <VenturesSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
