import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { systemLayers } from "../../lib/businessContent";

function LayerCard({ layer, className = "", style }) {
  return (
    <motion.article
      style={style}
      className={`h-[230px] rounded-2xl border border-ink/15 bg-white p-6 shadow-[0_18px_50px_rgb(49_49_49/0.08)] will-change-transform sm:p-8 ${className}`}
    >
      <div className="flex items-start justify-between gap-8">
        <h3 className="text-3xl font-semibold tracking-tight sm:text-4xl">{layer.title}</h3>
        <span className="font-mono text-xs font-semibold text-coral">{layer.number}</span>
      </div>
      <p className="mt-10 max-w-[38ch] text-sm leading-6 text-ink/70 sm:text-base sm:leading-7">
        {layer.text}
      </p>
    </motion.article>
  );
}

export default function SystemLayers() {
  const rootRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start start", "end end"],
  });
  const topY = useTransform(scrollYProgress, [0, 0.85], [12, -220]);
  const middleY = useTransform(scrollYProgress, [0, 0.85], [24, 0]);
  const bottomY = useTransform(scrollYProgress, [0, 0.85], [36, 220]);
  const topScale = useTransform(scrollYProgress, [0, 0.85], [0.94, 1]);
  const middleScale = useTransform(scrollYProgress, [0, 0.85], [0.97, 1]);

  if (reducedMotion) {
    return (
      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {systemLayers.map((layer) => <LayerCard key={layer.number} layer={layer} />)}
      </div>
    );
  }

  return (
    <div ref={rootRef} className="relative mt-8 h-[175vh] min-h-[1100px]">
      <div className="sticky top-0 flex h-screen min-h-[680px] items-center justify-center overflow-hidden">
        <div className="relative h-[230px] w-full max-w-[760px]">
          <LayerCard layer={systemLayers[0]} className="absolute inset-0 z-30" style={{ y: topY, scale: topScale }} />
          <LayerCard layer={systemLayers[1]} className="absolute inset-0 z-20" style={{ y: middleY, scale: middleScale }} />
          <LayerCard layer={systemLayers[2]} className="absolute inset-0 z-10" style={{ y: bottomY }} />
        </div>
      </div>
    </div>
  );
}
