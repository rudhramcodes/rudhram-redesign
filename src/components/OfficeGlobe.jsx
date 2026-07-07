import { useEffect, useRef } from "react";
import createGlobe from "cobe";

const CITIES = [
  { name: "Mumbai", lat: 19.076, lng: 72.8777 },
  { name: "Surat", lat: 21.1702, lng: 72.8311 },
  { name: "Delhi", lat: 28.7041, lng: 77.1025 },
];

const coral = [0.83, 0.38, 0.16];
const softCoral = [0.95, 0.58, 0.38];
const toPhi = (lng) => (lng * Math.PI) / 180 + Math.PI / 2;
const shortestTurn = (target, current) =>
  Math.atan2(Math.sin(target - current), Math.cos(target - current));

export default function OfficeGlobe({ focus = 0, className = "" }) {
  const canvasRef = useRef(null);
  const focusRef = useRef(focus);
  const dragRef = useRef({ dragging: false, px: 0, py: 0 });

  useEffect(() => {
    focusRef.current = focus;
  }, [focus]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let size = parent?.clientWidth || 560;
    const pixelScale = window.innerWidth < 640 ? 1.35 : 1.6;
    let phi = toPhi(CITIES[focusRef.current]?.lng || CITIES[0].lng);
    let theta = 0.42;
    let running = true;
    const markers = CITIES.map((city) => ({
      location: [city.lat, city.lng],
      size: 0.055,
      color: softCoral,
    }));

    const updateMarkers = (active, pulse = 0) => {
      markers.forEach((marker, index) => {
        marker.size = index === active ? 0.115 + pulse : 0.05;
        marker.color = index === active ? coral : softCoral;
      });
    };
    updateMarkers(focusRef.current);

    const globe = createGlobe(canvas, {
      devicePixelRatio: 1,
      width: size * pixelScale,
      height: size * pixelScale,
      phi,
      theta,
      dark: 0,
      diffuse: 1.15,
      scale: 1.18,
      mapSamples: 16000,
      mapBrightness: 4.6,
      mapBaseBrightness: 0.08,
      baseColor: [0.96, 0.95, 0.92],
      markerColor: coral,
      glowColor: [1, 1, 1],
      markerElevation: 0.035,
      markers,
      arcs: [
        { from: [21.1702, 72.8311], to: [19.076, 72.8777] },
        { from: [19.076, 72.8777], to: [28.7041, 77.1025] },
        { from: [28.7041, 77.1025], to: [21.1702, 72.8311] },
      ],
      arcColor: softCoral,
      arcWidth: 0.28,
      arcHeight: 0.18,
    });

    const onDown = (e) => {
      const d = dragRef.current;
      d.dragging = true;
      d.px = e.clientX;
      d.py = e.clientY;
      canvas.setPointerCapture?.(e.pointerId);
      canvas.style.cursor = "grabbing";
    };

    const onMove = (e) => {
      const d = dragRef.current;
      if (!d.dragging) return;
      const dx = e.clientX - d.px;
      const dy = e.clientY - d.py;
      phi += dx * 0.006;
      theta = Math.max(0.18, Math.min(0.82, theta + dy * 0.006));
      d.px = e.clientX;
      d.py = e.clientY;
    };

    const onUp = () => {
      dragRef.current.dragging = false;
      canvas.style.cursor = "grab";
    };

    const resizeObserver = new ResizeObserver(([entry]) => {
      size = Math.max(320, entry.contentRect.width);
      globe.update({ width: size * pixelScale, height: size * pixelScale });
    });

    canvas.style.cursor = "grab";
    canvas.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    if (parent) resizeObserver.observe(parent);

    function frame() {
      if (!running) return;
      if (!dragRef.current.dragging) {
        const idx = focusRef.current;
        const target = CITIES[idx] || CITIES[0];
        phi += shortestTurn(toPhi(target.lng), phi) * (reducedMotion ? 0.08 : 0.035);
        theta += (0.42 - theta) * 0.035;
        if (!reducedMotion) phi += 0.0012;
      }
      const pulse = reducedMotion ? 0 : (Math.sin(performance.now() / 360) + 1) * 0.018;
      updateMarkers(focusRef.current, pulse);
      globe.update({
        phi,
        theta,
        markers,
      });
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);

    return () => {
      running = false;
      globe.destroy();
      resizeObserver.disconnect();
      canvas.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: "100%", height: "100%", touchAction: "none" }}
    />
  );
}
