import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CheckIcon, ChevronDownIcon, MagnifyingGlassIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { animate } from "animejs";
import axios from "axios";
import { socialLinks } from "../lib/visionariesContent";
import SocialIcon from "./SocialIcon";

const COUNTRIES = [
  { code: "IN", dial: "+91", name: "India" },
  { code: "AF", dial: "+93", name: "Afghanistan" },
  { code: "AL", dial: "+355", name: "Albania" },
  { code: "DZ", dial: "+213", name: "Algeria" },
  { code: "AD", dial: "+376", name: "Andorra" },
  { code: "AO", dial: "+244", name: "Angola" },
  { code: "AG", dial: "+1", name: "Antigua & Barbuda" },
  { code: "AR", dial: "+54", name: "Argentina" },
  { code: "AM", dial: "+374", name: "Armenia" },
  { code: "AU", dial: "+61", name: "Australia" },
  { code: "AT", dial: "+43", name: "Austria" },
  { code: "AZ", dial: "+994", name: "Azerbaijan" },
  { code: "BS", dial: "+1", name: "Bahamas" },
  { code: "BH", dial: "+973", name: "Bahrain" },
  { code: "BD", dial: "+880", name: "Bangladesh" },
  { code: "BB", dial: "+1", name: "Barbados" },
  { code: "BY", dial: "+375", name: "Belarus" },
  { code: "BE", dial: "+32", name: "Belgium" },
  { code: "BZ", dial: "+501", name: "Belize" },
  { code: "BJ", dial: "+229", name: "Benin" },
  { code: "BT", dial: "+975", name: "Bhutan" },
  { code: "BO", dial: "+591", name: "Bolivia" },
  { code: "BA", dial: "+387", name: "Bosnia & Herzegovina" },
  { code: "BW", dial: "+267", name: "Botswana" },
  { code: "BR", dial: "+55", name: "Brazil" },
  { code: "BN", dial: "+673", name: "Brunei" },
  { code: "BG", dial: "+359", name: "Bulgaria" },
  { code: "BF", dial: "+226", name: "Burkina Faso" },
  { code: "BI", dial: "+257", name: "Burundi" },
  { code: "KH", dial: "+855", name: "Cambodia" },
  { code: "CM", dial: "+237", name: "Cameroon" },
  { code: "CA", dial: "+1", name: "Canada" },
  { code: "CV", dial: "+238", name: "Cape Verde" },
  { code: "CF", dial: "+236", name: "Central African Republic" },
  { code: "TD", dial: "+235", name: "Chad" },
  { code: "CL", dial: "+56", name: "Chile" },
  { code: "CN", dial: "+86", name: "China" },
  { code: "CO", dial: "+57", name: "Colombia" },
  { code: "KM", dial: "+269", name: "Comoros" },
  { code: "CG", dial: "+242", name: "Congo" },
  { code: "CR", dial: "+506", name: "Costa Rica" },
  { code: "HR", dial: "+385", name: "Croatia" },
  { code: "CU", dial: "+53", name: "Cuba" },
  { code: "CY", dial: "+357", name: "Cyprus" },
  { code: "CZ", dial: "+420", name: "Czech Republic" },
  { code: "DK", dial: "+45", name: "Denmark" },
  { code: "DJ", dial: "+253", name: "Djibouti" },
  { code: "DM", dial: "+1", name: "Dominica" },
  { code: "DO", dial: "+1", name: "Dominican Republic" },
  { code: "EC", dial: "+593", name: "Ecuador" },
  { code: "EG", dial: "+20", name: "Egypt" },
  { code: "SV", dial: "+503", name: "El Salvador" },
  { code: "GQ", dial: "+240", name: "Equatorial Guinea" },
  { code: "ER", dial: "+291", name: "Eritrea" },
  { code: "EE", dial: "+372", name: "Estonia" },
  { code: "SZ", dial: "+268", name: "Eswatini" },
  { code: "ET", dial: "+251", name: "Ethiopia" },
  { code: "FJ", dial: "+679", name: "Fiji" },
  { code: "FI", dial: "+358", name: "Finland" },
  { code: "FR", dial: "+33", name: "France" },
  { code: "GA", dial: "+241", name: "Gabon" },
  { code: "GM", dial: "+220", name: "Gambia" },
  { code: "GE", dial: "+995", name: "Georgia" },
  { code: "DE", dial: "+49", name: "Germany" },
  { code: "GH", dial: "+233", name: "Ghana" },
  { code: "GR", dial: "+30", name: "Greece" },
  { code: "GD", dial: "+1", name: "Grenada" },
  { code: "GT", dial: "+502", name: "Guatemala" },
  { code: "GN", dial: "+224", name: "Guinea" },
  { code: "GW", dial: "+245", name: "Guinea-Bissau" },
  { code: "GY", dial: "+592", name: "Guyana" },
  { code: "HT", dial: "+509", name: "Haiti" },
  { code: "HN", dial: "+504", name: "Honduras" },
  { code: "HK", dial: "+852", name: "Hong Kong" },
  { code: "HU", dial: "+36", name: "Hungary" },
  { code: "IS", dial: "+354", name: "Iceland" },
  { code: "ID", dial: "+62", name: "Indonesia" },
  { code: "IR", dial: "+98", name: "Iran" },
  { code: "IQ", dial: "+964", name: "Iraq" },
  { code: "IE", dial: "+353", name: "Ireland" },
  { code: "IL", dial: "+972", name: "Israel" },
  { code: "IT", dial: "+39", name: "Italy" },
  { code: "JM", dial: "+1", name: "Jamaica" },
  { code: "JP", dial: "+81", name: "Japan" },
  { code: "JO", dial: "+962", name: "Jordan" },
  { code: "KZ", dial: "+7", name: "Kazakhstan" },
  { code: "KE", dial: "+254", name: "Kenya" },
  { code: "KI", dial: "+686", name: "Kiribati" },
  { code: "KW", dial: "+965", name: "Kuwait" },
  { code: "KG", dial: "+996", name: "Kyrgyzstan" },
  { code: "LA", dial: "+856", name: "Laos" },
  { code: "LV", dial: "+371", name: "Latvia" },
  { code: "LB", dial: "+961", name: "Lebanon" },
  { code: "LS", dial: "+266", name: "Lesotho" },
  { code: "LR", dial: "+231", name: "Liberia" },
  { code: "LY", dial: "+218", name: "Libya" },
  { code: "LI", dial: "+423", name: "Liechtenstein" },
  { code: "LT", dial: "+370", name: "Lithuania" },
  { code: "LU", dial: "+352", name: "Luxembourg" },
  { code: "MO", dial: "+853", name: "Macau" },
  { code: "MG", dial: "+261", name: "Madagascar" },
  { code: "MW", dial: "+265", name: "Malawi" },
  { code: "MY", dial: "+60", name: "Malaysia" },
  { code: "MV", dial: "+960", name: "Maldives" },
  { code: "ML", dial: "+223", name: "Mali" },
  { code: "MT", dial: "+356", name: "Malta" },
  { code: "MH", dial: "+692", name: "Marshall Islands" },
  { code: "MR", dial: "+222", name: "Mauritania" },
  { code: "MU", dial: "+230", name: "Mauritius" },
  { code: "MX", dial: "+52", name: "Mexico" },
  { code: "FM", dial: "+691", name: "Micronesia" },
  { code: "MD", dial: "+373", name: "Moldova" },
  { code: "MC", dial: "+377", name: "Monaco" },
  { code: "MN", dial: "+976", name: "Mongolia" },
  { code: "ME", dial: "+382", name: "Montenegro" },
  { code: "MA", dial: "+212", name: "Morocco" },
  { code: "MZ", dial: "+258", name: "Mozambique" },
  { code: "MM", dial: "+95", name: "Myanmar" },
  { code: "NA", dial: "+264", name: "Namibia" },
  { code: "NR", dial: "+674", name: "Nauru" },
  { code: "NP", dial: "+977", name: "Nepal" },
  { code: "NL", dial: "+31", name: "Netherlands" },
  { code: "NZ", dial: "+64", name: "New Zealand" },
  { code: "NI", dial: "+505", name: "Nicaragua" },
  { code: "NE", dial: "+227", name: "Niger" },
  { code: "NG", dial: "+234", name: "Nigeria" },
  { code: "KP", dial: "+850", name: "North Korea" },
  { code: "MK", dial: "+389", name: "North Macedonia" },
  { code: "NO", dial: "+47", name: "Norway" },
  { code: "OM", dial: "+968", name: "Oman" },
  { code: "PK", dial: "+92", name: "Pakistan" },
  { code: "PW", dial: "+680", name: "Palau" },
  { code: "PS", dial: "+970", name: "Palestine" },
  { code: "PA", dial: "+507", name: "Panama" },
  { code: "PG", dial: "+675", name: "Papua New Guinea" },
  { code: "PY", dial: "+595", name: "Paraguay" },
  { code: "PE", dial: "+51", name: "Peru" },
  { code: "PH", dial: "+63", name: "Philippines" },
  { code: "PL", dial: "+48", name: "Poland" },
  { code: "PT", dial: "+351", name: "Portugal" },
  { code: "QA", dial: "+974", name: "Qatar" },
  { code: "RO", dial: "+40", name: "Romania" },
  { code: "RU", dial: "+7", name: "Russia" },
  { code: "RW", dial: "+250", name: "Rwanda" },
  { code: "KN", dial: "+1", name: "Saint Kitts & Nevis" },
  { code: "LC", dial: "+1", name: "Saint Lucia" },
  { code: "WS", dial: "+685", name: "Samoa" },
  { code: "SM", dial: "+378", name: "San Marino" },
  { code: "ST", dial: "+239", name: "Sao Tome & Principe" },
  { code: "SA", dial: "+966", name: "Saudi Arabia" },
  { code: "SN", dial: "+221", name: "Senegal" },
  { code: "RS", dial: "+381", name: "Serbia" },
  { code: "SC", dial: "+248", name: "Seychelles" },
  { code: "SL", dial: "+232", name: "Sierra Leone" },
  { code: "SG", dial: "+65", name: "Singapore" },
  { code: "SK", dial: "+421", name: "Slovakia" },
  { code: "SI", dial: "+386", name: "Slovenia" },
  { code: "SB", dial: "+677", name: "Solomon Islands" },
  { code: "SO", dial: "+252", name: "Somalia" },
  { code: "ZA", dial: "+27", name: "South Africa" },
  { code: "KR", dial: "+82", name: "South Korea" },
  { code: "SS", dial: "+211", name: "South Sudan" },
  { code: "ES", dial: "+34", name: "Spain" },
  { code: "LK", dial: "+94", name: "Sri Lanka" },
  { code: "SD", dial: "+249", name: "Sudan" },
  { code: "SR", dial: "+597", name: "Suriname" },
  { code: "SE", dial: "+46", name: "Sweden" },
  { code: "CH", dial: "+41", name: "Switzerland" },
  { code: "SY", dial: "+963", name: "Syria" },
  { code: "TW", dial: "+886", name: "Taiwan" },
  { code: "TJ", dial: "+992", name: "Tajikistan" },
  { code: "TZ", dial: "+255", name: "Tanzania" },
  { code: "TH", dial: "+66", name: "Thailand" },
  { code: "TL", dial: "+670", name: "Timor-Leste" },
  { code: "TG", dial: "+228", name: "Togo" },
  { code: "TO", dial: "+676", name: "Tonga" },
  { code: "TT", dial: "+1", name: "Trinidad & Tobago" },
  { code: "TN", dial: "+216", name: "Tunisia" },
  { code: "TR", dial: "+90", name: "Turkey" },
  { code: "TM", dial: "+993", name: "Turkmenistan" },
  { code: "TV", dial: "+688", name: "Tuvalu" },
  { code: "UG", dial: "+256", name: "Uganda" },
  { code: "UA", dial: "+380", name: "Ukraine" },
  { code: "AE", dial: "+971", name: "United Arab Emirates" },
  { code: "GB", dial: "+44", name: "United Kingdom" },
  { code: "US", dial: "+1", name: "United States" },
  { code: "UY", dial: "+598", name: "Uruguay" },
  { code: "UZ", dial: "+998", name: "Uzbekistan" },
  { code: "VU", dial: "+678", name: "Vanuatu" },
  { code: "VA", dial: "+379", name: "Vatican City" },
  { code: "VE", dial: "+58", name: "Venezuela" },
  { code: "VN", dial: "+84", name: "Vietnam" },
  { code: "YE", dial: "+967", name: "Yemen" },
  { code: "ZM", dial: "+260", name: "Zambia" },
  { code: "ZW", dial: "+263", name: "Zimbabwe" },
];

const FLAG_MAP = {
  IN: "🇮🇳", AF: "🇦🇫", AL: "🇦🇱", DZ: "🇩🇿", AD: "🇦🇩", AO: "🇦🇴", AG: "🇦🇬", AR: "🇦🇷",
  AM: "🇦🇲", AU: "🇦🇺", AT: "🇦🇹", AZ: "🇦🇿", BS: "🇧🇸", BH: "🇧🇭", BD: "🇧🇩", BB: "🇧🇧",
  BY: "🇧🇾", BE: "🇧🇪", BZ: "🇧🇿", BJ: "🇧🇯", BT: "🇧🇹", BO: "🇧🇴", BA: "🇧🇦", BW: "🇧🇼",
  BR: "🇧🇷", BN: "🇧🇳", BG: "🇧🇬", BF: "🇧🇫", BI: "🇧🇮", KH: "🇰🇭", CM: "🇨🇲", CA: "🇨🇦",
  CV: "🇨🇻", CF: "🇨🇫", TD: "🇹🇩", CL: "🇨🇱", CN: "🇨🇳", CO: "🇨🇴", KM: "🇰🇲", CG: "🇨🇬",
  CR: "🇨🇷", HR: "🇭🇷", CU: "🇨🇺", CY: "🇨🇾", CZ: "🇨🇿", DK: "🇩🇰", DJ: "🇩🇯", DM: "🇩🇲",
  DO: "🇩🇴", EC: "🇪🇨", EG: "🇪🇬", SV: "🇸🇻", GQ: "🇬🇶", ER: "🇪🇷", EE: "🇪🇪", SZ: "🇸🇿",
  ET: "🇪🇹", FJ: "🇫🇯", FI: "🇫🇮", FR: "🇫🇷", GA: "🇬🇦", GM: "🇬🇲", GE: "🇬🇪", DE: "🇩🇪",
  GH: "🇬🇭", GR: "🇬🇷", GD: "🇬🇩", GT: "🇬🇹", GN: "🇬🇳", GW: "🇬🇼", GY: "🇬🇾", HT: "🇭🇹",
  HN: "🇭🇳", HK: "🇭🇰", HU: "🇭🇺", IS: "🇮🇸", ID: "🇮🇩", IR: "🇮🇷", IQ: "🇮🇶", IE: "🇮🇪",
  IL: "🇮🇱", IT: "🇮🇹", JM: "🇯🇲", JP: "🇯🇵", JO: "🇯🇴", KZ: "🇰🇿", KE: "🇰🇪", KI: "🇰🇮",
  KW: "🇰🇼", KG: "🇰🇬", LA: "🇱🇦", LV: "🇱🇻", LB: "🇱🇧", LS: "🇱🇸", LR: "🇱🇷", LY: "🇱🇾",
  LI: "🇱🇮", LT: "🇱🇹", LU: "🇱🇺", MO: "🇲🇴", MG: "🇲🇬", MW: "🇲🇼", MY: "🇲🇾", MV: "🇲🇻",
  ML: "🇲🇱", MT: "🇲🇹", MH: "🇲🇭", MR: "🇲🇷", MU: "🇲🇺", MX: "🇲🇽", FM: "🇫🇲", MD: "🇲🇩",
  MC: "🇲🇨", MN: "🇲🇳", ME: "🇲🇪", MA: "🇲🇦", MZ: "🇲🇿", MM: "🇲🇲", NA: "🇳🇦", NR: "🇳🇷",
  NP: "🇳🇵", NL: "🇳🇱", NZ: "🇳🇿", NI: "🇳🇮", NE: "🇳🇪", NG: "🇳🇬", KP: "🇰🇵", MK: "🇲🇰",
  NO: "🇳🇴", OM: "🇴🇲", PK: "🇵🇰", PW: "🇵🇼", PS: "🇵🇸", PA: "🇵🇦", PG: "🇵🇬", PY: "🇵🇾",
  PE: "🇵🇪", PH: "🇵🇭", PL: "🇵🇱", PT: "🇵🇹", QA: "🇶🇦", RO: "🇷🇴", RU: "🇷🇺", RW: "🇷🇼",
  KN: "🇰🇳", LC: "🇱🇨", WS: "🇼🇸", SM: "🇸🇲", ST: "🇸🇹", SA: "🇸🇦", SN: "🇸🇳", RS: "🇷🇸",
  SC: "🇸🇨", SL: "🇸🇱", SG: "🇸🇬", SK: "🇸🇰", SI: "🇸🇮", SB: "🇸🇧", SO: "🇸🇴", ZA: "🇿🇦",
  KR: "🇰🇷", SS: "🇸🇸", ES: "🇪🇸", LK: "🇱🇰", SD: "🇸🇩", SR: "🇸🇷", SE: "🇸🇪", CH: "🇨🇭",
  SY: "🇸🇾", TW: "🇹🇼", TJ: "🇹🇯", TZ: "🇹🇿", TH: "🇹🇭", TL: "🇹🇱", TG: "🇹🇬", TO: "🇹🇴",
  TT: "🇹🇹", TN: "🇹🇳", TR: "🇹🇷", TM: "🇹🇲", TV: "🇹🇻", UG: "🇺🇬", UA: "🇺🇦", AE: "🇦🇪",
  GB: "🇬🇧", US: "🇺🇸", UY: "🇺🇾", UZ: "🇺🇿", VU: "🇻🇺", VA: "🇻🇦", VE: "🇻🇪", VN: "🇻🇳",
  YE: "🇾🇪", ZM: "🇿🇲", ZW: "🇿🇼",
};

const offices = [
  ["Mumbai", "Registered Office", "1171, 1172 Solitaire Corporate Park, Andheri East, Chakala MIDC, Mumbai 400093"],
  ["Surat", "Operational & Signing Office", "SNS Platina, HG1, near University Road, Someshwara Enclave, Vesu, Surat 395007"],
  ["Delhi", "Delhi Office", "Address confirmation in progress."],
];

function CountryCodeSelect({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef(null);

  const filtered = COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.dial.includes(search) ||
      c.code.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handler = (e) => { if (!ref.current?.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selected = COUNTRIES.find((c) => c.dial === value) || COUNTRIES[0];

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="flex h-12 cursor-pointer items-center gap-1.5 rounded-2xl border border-ink/10 bg-[#f7f6f2] px-3 text-sm font-medium transition-colors duration-200 hover:border-ink/25 focus-visible:outline-2 focus-visible:outline-coral"
      >
        <span className="text-base leading-none">{FLAG_MAP[selected.code] || "🌐"}</span>
        <span className="text-ink/80">{selected.dial}</span>
        <ChevronDownIcon className={`size-3.5 text-ink/40 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute left-0 top-14 z-50 w-[min(82vw,320px)] overflow-hidden rounded-2xl border border-ink/10 bg-white p-2 shadow-[0_20px_60px_rgba(49,49,49,0.16)]">
          <div className="flex items-center gap-2 rounded-xl bg-[#f7f6f2] px-3 py-2.5">
            <MagnifyingGlassIcon className="size-4 shrink-0 text-ink/40" />
            <input
              autoFocus
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search country..."
              className="w-full border-0 bg-transparent text-sm outline-none placeholder:text-ink/30"
            />
          </div>
          <div data-lenis-prevent className="mt-2 max-h-[min(50vh,18rem)] overflow-y-auto overscroll-contain py-1 touch-pan-y [-webkit-overflow-scrolling:touch]">
            {filtered.map((c) => (
              <button
                key={c.code}
                type="button"
                onClick={() => { onChange(c.dial); setOpen(false); setSearch(""); }}
                className={`flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition-colors hover:bg-ink/5 ${
                  value === c.dial ? "bg-coral/5 font-medium" : ""
                }`}
              >
                <span className="text-base leading-none">{FLAG_MAP[c.code] || "🌐"}</span>
                <span className="text-ink/80">{c.dial}</span>
                <span className="text-ink/50">{c.name}</span>
                {value === c.dial && <CheckIcon className="ml-auto size-3.5 text-coral" />}
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="px-3 py-4 text-center text-sm text-ink/40">No countries found</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function Reveal({ children, className = "", delay = 0 }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: 28 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

const section = "px-6 py-24 sm:px-10 md:py-32 lg:px-16 lg:py-40";
const container = "mx-auto w-full max-w-[1240px]";

function validateForm(data) {
  const errs = [];
  if (!data.name || data.name.trim().length < 2) errs.push("Please enter your name");
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errs.push("Please enter a valid email");
  if (!data.phone || !/^\d{10}$/.test(data.phone.replace(/\D/g, ""))) errs.push("Enter a valid 10-digit number");
  return errs;
}

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", countryCode: "+91", message: "" });
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let val = value;
    if (name === "phone") val = value.replace(/\D/g, "").slice(0, 10);
    if (name === "email") val = value.toLowerCase();
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors([]);
    const errs = validateForm(formData);
    if (errs.length) { setErrors(errs); setLoading(false); return; }
    try {
      const res = await axios.post("/api/contact", {
        ...formData,
        botcheck: undefined,
      });
      if (res.data.ok) setSubmitted(true);
    } catch (err) {
      const msg = err.response?.data?.errors
        ? err.response.data.errors.join(", ")
        : err.response?.data?.error || "Something went wrong, please try again.";
      setErrors([msg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" data-section="contact" className={`${section} bg-[#f7f6f2]`}>
      <div className={container}>
        <Reveal>
          <div className="grid gap-5 md:grid-cols-12 md:items-end md:gap-8">
            <div className="md:col-span-7">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-coral">
                Contact
              </p>
              <h2 className="mt-4 text-4xl font-medium leading-[0.96] tracking-[-0.04em] sm:max-w-[9ch] sm:text-5xl lg:text-7xl">
                Let&rsquo;s build with <span className="font-display text-coral">belief.</span>
              </h2>
            </div>
            <p className="max-w-[36ch] text-sm leading-6 text-ink/60 md:col-span-4 md:col-start-9 md:text-right md:text-base md:leading-7">
              Tell us about your idea. We&rsquo;ll bring the structure.
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-10 md:mt-16" delay={0.05}>
          <div className="rounded-[32px] bg-white p-4 shadow-[0_24px_80px_rgba(49,49,49,0.09)] md:grid md:grid-cols-12 md:gap-6 md:p-5 lg:p-6">
            <aside className="rounded-[26px] bg-ink p-5 text-white sm:p-7 md:col-span-5 md:flex md:min-h-[620px] md:flex-col">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-coral">
                Reach out
              </p>

              <div className="mt-7 space-y-5">
                <div>
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-white/45">
                    Phone
                  </p>
                  <a href="tel:+917285833101" className="mt-1 block text-base font-semibold transition-colors hover:text-coral">
                    +91 72858 33101
                  </a>
                  <a href="tel:+917284980137" className="block text-base font-semibold transition-colors hover:text-coral">
                    +91 72849 80137
                  </a>
                </div>
                <div>
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-white/45">
                    Email
                  </p>
                  <a href="mailto:hello@rudhramenterprises.com" className="mt-1 block break-words text-base font-semibold transition-colors hover:text-coral">
                    hello@rudhramenterprises.com
                  </a>
                </div>
              </div>

              <div className="mt-8 flex gap-2" aria-label="Rudhram social media">
                {socialLinks.map(([platform, href]) => (
                  <a
                    key={platform}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={platform}
                    className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-coral focus-visible:outline-2 focus-visible:outline-coral [&_svg]:stroke-current [&_svg]:[stroke-width:1.5]"
                  >
                    <SocialIcon platform={platform} />
                  </a>
                ))}
              </div>

              <div className="mt-8">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-white/45">
                  Offices
                </p>
                <div className="mt-4 space-y-4">
                  {offices.map(([city, label, address]) => (
                    <div key={city}>
                      <p className="text-sm font-semibold">{city}</p>
                      <p className="mt-1 text-xs font-medium text-white/45">{label}</p>
                      <p className="mt-1 max-w-[34ch] text-sm leading-6 text-white/68">{address}</p>
                    </div>
                  ))}
                </div>
              </div>
            </aside>

            <div className="p-3 pt-7 sm:p-7 md:col-span-7 md:p-6 lg:p-8">
              {submitted ? (
                <div className="flex min-h-[360px] flex-col justify-center">
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-coral">
                    Sent
                  </p>
                  <p className="mt-4 max-w-[18ch] text-3xl font-semibold leading-tight tracking-[-0.03em]">
                    Thank you. We&rsquo;ll be in touch.
                  </p>
                  <p className="mt-3 max-w-[36ch] text-sm leading-7 text-ink/60">
                    Every message deserves a real response. Expect to hear from us within two working days.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  {/* Honeypot — hidden from users, catches bots */}
                  <input name="botcheck" className="absolute -left-[9999px]" tabIndex={-1} autoComplete="off" />

                  {errors.length > 0 && (
                    <div className="mb-5 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">
                      {errors.map((e, i) => <p key={i}>{e}</p>)}
                    </div>
                  )}

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-name" className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-ink/40">
                        Name <span className="text-coral">*</span>
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        autoCapitalize="words"
                        className="mt-2 block h-12 w-full rounded-2xl border border-ink/10 bg-[#f7f6f2] px-4 text-base outline-none transition-colors focus:border-coral placeholder:text-ink/25"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-ink/40">
                        Email <span className="text-coral">*</span>
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        autoCapitalize="none"
                        autoCorrect="off"
                        className="mt-2 block h-12 w-full rounded-2xl border border-ink/10 bg-[#f7f6f2] px-4 text-base outline-none transition-colors focus:border-coral placeholder:text-ink/25"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="contact-phone" className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-ink/40">
                        Phone <span className="text-coral">*</span>
                      </label>
                      <div className="mt-2 flex gap-2">
                        <CountryCodeSelect
                          value={formData.countryCode}
                          onChange={(dial) => setFormData((prev) => ({ ...prev, countryCode: dial }))}
                        />
                        <input
                          id="contact-phone"
                          name="phone"
                          type="tel"
                          inputMode="numeric"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="10-digit number"
                          maxLength={10}
                          autoComplete="tel-national"
                          className="block h-12 w-full min-w-0 rounded-2xl border border-ink/10 bg-[#f7f6f2] px-4 text-base outline-none transition-colors focus:border-coral placeholder:text-ink/25"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="contact-message" className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-ink/40">
                        Message
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your idea..."
                        autoCapitalize="sentences"
                        className="mt-2 block w-full resize-none rounded-2xl border border-ink/10 bg-[#f7f6f2] px-4 py-3 text-base outline-none transition-colors focus:border-coral placeholder:text-ink/25"
                      />
                    </div>
                  </div>
                  <div className="group mt-6 flex items-center gap-2">
                    <button
                      type="submit"
                      disabled={loading}
                      onClick={(e) => {
                        animate(e.currentTarget, { scale: [1, 0.94, 1], duration: 300, easing: "easeOutCubic" });
                      }}
                      className="cursor-pointer rounded-full border border-ink/10 bg-[#f7f6f2] px-5 py-3 text-sm font-semibold transition-colors duration-200 hover:border-coral hover:bg-coral hover:text-white focus-visible:outline-2 focus-visible:outline-coral disabled:opacity-50"
                    >
                      {loading ? "Sending..." : "Send message"}
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-ink/10 bg-[#f7f6f2] transition-colors duration-200 group-hover:border-coral group-hover:bg-coral group-hover:text-white focus-visible:outline-2 focus-visible:outline-coral disabled:opacity-50"
                      aria-label="Send message"
                    >
                      <PaperAirplaneIcon className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:rotate-[-45deg]" aria-hidden="true" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
