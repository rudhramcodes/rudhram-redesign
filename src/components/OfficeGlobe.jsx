const CITIES = [
  { name: "Mumbai", x: 25, y: 61, label: "top-5 -translate-x-1/2" },
  { name: "Surat", x: 25, y: 50, label: "bottom-5 -translate-x-1/2" },
  { name: "Delhi", x: 41, y: 26, label: "top-5 -translate-x-1/2" },
];

export default function OfficeGlobe({ focus = 0, onSelect, className = "" }) {
  return (
    <div className={`relative overflow-hidden rounded-[28px] bg-white shadow-[0_22px_70px_rgba(49,49,49,0.1)] ${className}`}>
      <img
        src="/offices-india-map.webp"
        alt="Map of India"
        loading="lazy"
        decoding="async"
        className="size-full scale-[1.34] object-cover object-[35%_35%]"
      />

      {CITIES.map((city, index) => {
        const active = focus === index;
        return (
          <button
            key={city.name}
            type="button"
            onClick={() => onSelect?.(index)}
            aria-label={`Show ${city.name} office`}
            aria-pressed={active}
            className="group absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral"
            style={{ left: `${city.x}%`, top: `${city.y}%` }}
          >
            <span className={`block rounded-full shadow-md transition-transform duration-200 group-hover:scale-110 ${active ? "size-5 bg-coral ring-4 ring-white" : "size-3.5 bg-coral/85 ring-2 ring-white"}`} />
            <span className={`absolute left-1/2 rounded-sm px-2 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] shadow-sm transition-colors duration-200 ${city.label} ${active ? "bg-coral text-white" : "bg-white text-coral"}`}>
              {city.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}
