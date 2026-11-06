import { useEffect, useRef, useState } from "react";
import { facebookEmbed, facebookPost } from "../lib/visionariesContent";
import SocialIcon from "./SocialIcon";

export default function FacebookPostCard({ className = "" }) {
  const cardRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--facebook-scale", card.offsetWidth / 500);
    const observer = new ResizeObserver(([entry]) => {
      card.style.setProperty("--facebook-scale", entry.contentRect.width / 500);
    });
    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  return (
    <article ref={cardRef} className={`relative aspect-[500/534] overflow-hidden bg-white ${className}`}>
      <span className="pointer-events-none absolute inset-0 z-10 border border-[#d9d9d9] dark:border-white/20" aria-hidden="true" />

      {/* Fast, branded loading skeleton & fallback */}
      <div
        className={`absolute inset-0 z-0 flex flex-col justify-between p-6 bg-white transition-opacity duration-300 ${
          loaded ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div>
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-[#f2f2f2] border border-muted/30">
              <img src="/favicon.png" alt="Rudhram" className="size-5 object-contain" />
            </div>
            <div>
              <p className="text-sm font-semibold text-night">Rudhram Enterprises</p>
              <p className="text-xs text-ink/50">Facebook Official Post</p>
            </div>
            <div className="ml-auto text-coral">
              <SocialIcon platform="Facebook" />
            </div>
          </div>
          <div className="mt-8 space-y-3">
            <div className="h-4 w-5/6 animate-pulse rounded bg-muted/20" />
            <div className="h-4 w-4/6 animate-pulse rounded bg-muted/20" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-muted/20" />
          </div>
        </div>
        <div className="mt-auto pt-6 border-t border-muted/20 flex items-center justify-between">
          <span className="text-xs text-ink/50">Connecting to Facebook...</span>
          <a
            href={facebookPost}
            target="_blank"
            rel="noreferrer"
            className="text-xs font-semibold text-coral hover:underline"
          >
            Open on Facebook →
          </a>
        </div>
      </div>

      <iframe
        title="Latest Rudhram Enterprises Facebook post"
        src={facebookEmbed}
        width="500"
        height="534"
        scrolling="no"
        onLoad={() => setLoaded(true)}
        className={`facebook-post-frame absolute left-1/2 top-1/2 h-[534px] w-[500px] max-w-none border-0 bg-white transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        loading="eager"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
      />
    </article>
  );
}
