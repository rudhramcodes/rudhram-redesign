import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const legalPages = {
  privacy: {
    label: "Privacy Policy",
    introduction:
      "Trust is not a line in a document; it is how information is handled when nobody is watching. This policy explains what may be collected when you visit Rudhram’s website, why it may be used, and the choices available to you.",
    sections: [
      {
        title: "Information we may receive",
        content:
          "This website currently has no user accounts or contact forms. If you contact Rudhram by phone or through a social platform, we may receive the details you choose to share. Our hosting provider may also process basic technical information such as IP address, browser type, device information, and access logs needed to deliver and secure the website.",
      },
      {
        title: "Social media and external services",
        content:
          "The website includes links and embedded content from Facebook, Instagram, LinkedIn, and other external services. Those providers may collect information or use cookies according to their own policies. Rudhram does not control their systems, so you should review their privacy terms before interacting with embedded content.",
      },
      {
        title: "How information is used",
        content:
          "Information is used only to respond to genuine enquiries, maintain website security, understand technical performance, meet legal obligations, and protect Rudhram’s rights. We do not sell personal information.",
      },
      {
        title: "Retention and sharing",
        content:
          "Information is kept only for as long as it is reasonably needed for the purpose for which it was received, or where the law requires a longer period. It may be shared with service providers or authorities only when necessary to operate the website, protect people and systems, or comply with applicable law.",
      },
      {
        title: "Your choices",
        content:
          "You may ask about personal information you have directly shared with Rudhram, or request correction or deletion where applicable. Contact us using the phone numbers or registered office listed below. We may need to verify your identity before acting on a request.",
      },
    ],
  },
  terms: {
    label: "Terms & Conditions",
    introduction:
      "Rudhram was built on the belief that ideas need structure. These terms provide that structure for using this website, while keeping the experience simple, respectful, and clear.",
    sections: [
      {
        title: "Using this website",
        content:
          "You may use this website for lawful, personal, and informational purposes. You must not attempt to disrupt the website, access restricted systems, introduce harmful code, misuse its content, or use it in a way that infringes the rights of Rudhram or another person.",
      },
      {
        title: "Content and intellectual property",
        content:
          "Unless stated otherwise, the Rudhram name, logo, written content, visual identity, photographs, designs, and other original materials belong to Rudhram Enterprises Private Limited or are used with permission. They may not be copied, republished, sold, or adapted for commercial use without written permission.",
      },
      {
        title: "Information, not a promise",
        content:
          "The website describes Rudhram’s story, values, offices, ventures, and direction. Information may change as the company grows. Nothing on this website creates a partnership, employment relationship, investment offer, professional engagement, or binding commitment unless it is confirmed in a separate written agreement.",
      },
      {
        title: "External links",
        content:
          "Links to social platforms and third-party websites are provided for convenience. Rudhram is not responsible for their availability, content, security, or policies. Visiting an external service is your choice and is governed by that provider’s terms.",
      },
      {
        title: "Liability and applicable law",
        content:
          "We take reasonable care to keep the website useful and secure, but cannot promise uninterrupted access or error-free content. To the extent permitted by law, Rudhram is not responsible for indirect loss arising solely from use of this website. These terms are governed by the applicable laws of India.",
      },
    ],
  },
};

export default function LegalPage({ type }) {
  const page = legalPages[type];

  return (
    <div className="min-h-screen bg-white font-sans text-night">
      <header className="border-b border-muted/30 bg-cloud px-5 py-5 sm:px-10 lg:px-14">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-6">
          <Link to="/" aria-label="Rudhram home" className="focus-visible:outline-3 focus-visible:outline-coral">
            <img src="/logo.png" alt="Rudhram" className="h-10 w-32 object-contain object-left" />
          </Link>
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold hover:text-coral focus-visible:outline-3 focus-visible:outline-coral">
            <ArrowLeftIcon className="size-4" aria-hidden="true" />
            Back to home
          </Link>
        </div>
      </header>

      <main className="px-5 py-16 sm:px-10 md:py-24 lg:px-14">
        <article className="mx-auto max-w-[880px]">
          <p className="text-xs font-semibold uppercase text-coral">Legal</p>
          <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-normal sm:text-6xl">{page.label}</h1>
          <p className="mt-6 text-sm font-semibold text-ink">Last updated: 3 July 2026</p>
          <p className="mt-10 max-w-[64ch] text-lg leading-8 text-ink">{page.introduction}</p>

          <div className="mt-14 border-t border-muted/30">
            {page.sections.map((section, index) => (
              <section key={section.title} className="grid gap-4 border-b border-muted/30 py-8 md:grid-cols-[48px_1fr] md:gap-8">
                <span className="font-mono text-xs font-semibold text-coral">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h2 className="text-xl font-semibold">{section.title}</h2>
                  <p className="mt-3 max-w-[68ch] leading-7 text-ink">{section.content}</p>
                </div>
              </section>
            ))}
          </div>

          <p className="mt-10 max-w-[68ch] text-sm leading-6 text-ink">
            These pages are practical website terms and should be reviewed by qualified legal counsel whenever Rudhram introduces forms, analytics, user accounts, payments, or new data-processing activities.
          </p>
        </article>
      </main>

      <Footer />
    </div>
  );
}
