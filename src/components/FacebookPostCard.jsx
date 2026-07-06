import { useEffect, useRef } from "react";
import { facebookEmbed } from "../lib/visionariesContent";

export default function FacebookPostCard({ className = "" }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const observer = new ResizeObserver(([entry]) => {
      card.style.setProperty("--facebook-scale", entry.contentRect.width / 500);
    });
    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  return (
    <article ref={cardRef} className={`relative aspect-[500/534] overflow-hidden bg-white ${className}`}>
      <span className="pointer-events-none absolute inset-0 z-10 border border-[#d9d9d9]" aria-hidden="true" />
      <iframe
        title="Latest Rudhram Enterprises Facebook post"
        src={facebookEmbed}
        width="500"
        height="534"
        scrolling="no"
        className="facebook-post-frame absolute left-1/2 top-1/2 h-[534px] w-[500px] max-w-none border-0 bg-white"
        loading="lazy"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
      />
    </article>
  );
}
