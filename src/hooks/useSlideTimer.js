import { useState, useEffect, useCallback, useRef } from "react";

export function useSlideTimer({ total, interval = 6000 }) {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const frameRef = useRef(null);
  const startRef = useRef(null);
  const currentRef = useRef(0);
  const offsetRef = useRef(0);

  const goTo = useCallback((i) => {
    setCurrent(i);
    currentRef.current = i;
    setProgress(0);
    startRef.current = null;
    offsetRef.current = 0;
  }, []);

  const tick = useCallback(
    (ts) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current + offsetRef.current;
      const pct = Math.min((elapsed / interval) * 100, 100);
      setProgress(pct);

      if (pct >= 100) {
        const next = (currentRef.current + 1) % total;
        currentRef.current = next;
        setCurrent(next);
        startRef.current = ts;
        offsetRef.current = 0;
        setProgress(0);
      }

      frameRef.current = requestAnimationFrame(tick);
    },
    [total, interval],
  );

  useEffect(() => {
    if (playing) {
      startRef.current = null;
      frameRef.current = requestAnimationFrame(tick);
    } else {
      if (startRef.current) {
        offsetRef.current += performance.now() - startRef.current;
      }
      cancelAnimationFrame(frameRef.current);
    }
    return () => cancelAnimationFrame(frameRef.current);
  }, [playing, tick]);

  return { current, playing, progress, setPlaying, goTo, total };
}
