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
    <section id="offices" className="bg-cloud px-5 py-16 md:py-24 dark:bg-night">
      <div className="mx-auto flex max-w-[960px] flex-col items-center gap-8 md:flex-row md:items-start md:gap-14">
        <div className="w-full max-w-[340px] shrink-0">
          <OfficeGlobe focus={focus} className="aspect-square cursor-grab active:cursor-grabbing" />
        </div>

        <div className="w-full">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-coral">Our Offices</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">Three Cities, <span className="font-display font-normal text-coral">One Purpose.</span></h2>

          <div className="mt-6 flex flex-col gap-2">
            {OFFICES.map((o, i) => (
              <button
                key={o.city}
                type="button"
                onClick={() => setFocus(i)}
                className={`flex w-full cursor-pointer items-start gap-3 rounded-xl px-4 py-3 text-left text-sm transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-coral ${
                  focus === i ? "bg-white shadow-sm" : "hover:bg-white/70"
                }`}
              >
                <span className={`mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold ${
                  focus === i ? "bg-coral text-white" : "bg-white text-ink/50"
                }`}>{i + 1}</span>
                <span className="min-w-0 leading-tight">
                  <span className="font-semibold text-ink">{o.city}</span>
                  <span className="ml-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-coral/80">{o.label}</span>
                  <p className="mt-0.5 text-[13px] leading-5 text-ink/60">{o.address}</p>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
