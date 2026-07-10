import { useState } from "react";
import OfficeGlobe from "./OfficeGlobe";

const OFFICES = [
  { city: "Mumbai", label: "Registered Office", address: "1171, 1172 Solitaire Corporate Park, Andheri East, Chakala MIDC, Mumbai 400093" },
  { city: "Surat", label: "Operational & Signing Office", address: "SNS Platina, HG1, near University Road, Someshwara Enclave, Vesu, Surat 395007" },
  { city: "Delhi", label: "Delhi Office", address: "Address confirmation in progress." },
];

export default function OfficesSection() {
  const [focus, setFocus] = useState(0);

  return (
    <section id="offices" className="overflow-hidden bg-[#f7f6f2] px-5 py-14 text-ink sm:px-8 md:py-20 lg:px-14">
      <div className="mx-auto grid max-w-[1160px] items-center gap-9 md:grid-cols-[minmax(360px,1fr)_minmax(390px,0.9fr)] md:gap-12 lg:gap-16">
        <div className="relative mx-auto aspect-[8/7] w-full max-w-[560px]">
          <OfficeGlobe focus={focus} onSelect={setFocus} className="size-full" />
        </div>

        <div className="w-full">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-ink/45">
            Our Offices
          </p>
          <h2 className="mt-3 max-w-[11ch] text-[clamp(2.25rem,4.8vw,4.8rem)] font-medium leading-[0.96] tracking-[-0.04em] text-ink">
            Three cities, <span className="font-display text-coral">one purpose.</span>
          </h2>

          <div className="mt-7 grid gap-3">
            {OFFICES.map((o, i) => {
              const active = focus === i;
              return (
                <button
                  key={o.city}
                  type="button"
                  onClick={() => setFocus(i)}
                  aria-pressed={active}
                  className={`group flex w-full cursor-pointer items-start gap-4 rounded-[18px] px-4 py-4 text-left text-sm transition-[background-color,box-shadow,transform] duration-200 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-coral ${
                    active ? "bg-white shadow-[0_14px_38px_rgba(49,49,49,0.075)]" : "bg-white/42 hover:bg-white/75"
                  }`}
                >
                  <span className={`mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full font-mono text-[10px] font-semibold transition-colors duration-200 ${
                    active ? "bg-coral text-white" : "bg-white text-ink/35 group-hover:text-coral"
                  }`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                      <span className="text-lg font-semibold tracking-tight text-ink">{o.city}</span>
                      <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-coral/80">{o.label}</span>
                    </span>
                    <p className="mt-1 text-[13px] leading-6 text-ink/60 sm:text-sm">{o.address}</p>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
