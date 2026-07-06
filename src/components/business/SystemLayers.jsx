import { motion, useReducedMotion } from "framer-motion";
import { systemLayers } from "../../lib/businessContent";

export default function SystemLayers() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="mt-20 border-t border-white/20 md:ml-[16.666%] md:mt-28">
      {systemLayers.map((layer, index) => (
        <motion.article
          key={layer.number}
          className="group grid gap-5 border-b border-white/20 py-8 md:grid-cols-10 md:items-baseline md:gap-8 md:py-12"
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.65, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="font-mono text-[10px] font-semibold text-coral md:col-span-1">{layer.number}</span>
          <h3 className="text-4xl font-semibold tracking-[-0.045em] transition-colors duration-200 group-hover:text-coral sm:text-5xl md:col-span-4">
            {layer.title}
          </h3>
          <p className="max-w-[46ch] text-sm leading-7 text-white/60 md:col-span-5 md:text-base">
            {layer.text}
          </p>
        </motion.article>
      ))}
    </div>
  );
}
