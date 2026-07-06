import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BusinessPage from "./pages/BusinessPage";
import AboutRudhramPage from "./pages/AboutRudhramPage";
import WeAreRudhramPage from "./pages/WeAreRudhramPage";
import VenturesPage from "./pages/VenturesPage";
import VisionariesPage from "./pages/VisionariesPage";
import LegalPage from "./components/LegalPage";

function ScrollToLocation() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (hash) {
        document.getElementById(hash.slice(1))?.scrollIntoView();
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <>
      <ScrollToLocation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/business" element={<BusinessPage />} />
        <Route path="/about-rudhram" element={<AboutRudhramPage />} />
        <Route path="/we-are-rudhram" element={<WeAreRudhramPage />} />
        <Route path="/ventures" element={<VenturesPage />} />
        <Route path="/visionaries" element={<VisionariesPage />} />
        <Route path="/privacy-policy" element={<LegalPage type="privacy" />} />
        <Route path="/terms-and-conditions" element={<LegalPage type="terms" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
