import "./globals.css";
import LenisProvider from "./LenisProvider";

export const metadata = {
  metadataBase: new URL("https://www.rudhramenterprises.com"),
  title: {
    default: "Rudhram Enterprises | Purpose-led Brands, Ventures & Systems",
    template: "%s | Rudhram Enterprises",
  },
  description:
    "Rudhram Enterprises is a purpose-led brand house and parent company that builds, governs, and scales enduring ventures across cultural experiences, original media, and digital platforms.",
  keywords: [
    "Rudhram Enterprises",
    "Shivang Vir",
    "Mukund Barrdoliwala",
    "Viral Gohil",
    "Panigrahna",
    "Brand House",
    "Venture Building",
    "Mumbai",
    "Surat",
    "Delhi",
  ],
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    type: "website",
    url: "https://www.rudhramenterprises.com/",
    siteName: "Rudhram Enterprises",
    title: "Rudhram Enterprises | Purpose-led Brands, Ventures & Systems",
    description:
      "Rudhram Enterprises builds purpose-led brands, ventures, and scalable operating systems across media, cultural experiences, and technology.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Rudhram Enterprises",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rudhram Enterprises | Purpose-led Brands, Ventures & Systems",
    description:
      "Rudhram Enterprises builds purpose-led brands, ventures, and scalable operating systems across media, cultural experiences, and technology.",
    images: ["/logo.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Corporation",
  name: "Rudhram Enterprises",
  legalName: "Rudhram Enterprises Private Limited",
  url: "https://www.rudhramenterprises.com",
  logo: "https://www.rudhramenterprises.com/logo.png",
  description:
    "Rudhram Enterprises is a venture-building parent company and brand house that builds, owns, governs, and scales purpose-led brands across media, cultural experiences, and digital platforms.",
  foundingDate: "2021",
  foundingLocation: {
    "@type": "Place",
    name: "Mumbai, Maharashtra, India",
  },
  founders: [
    {
      "@type": "Person",
      name: "Shivang Vir",
      jobTitle: "Founder & CEO",
    },
    {
      "@type": "Person",
      name: "Mukund Barrdoliwala",
      jobTitle: "Co-Founder & COO",
    },
    {
      "@type": "Person",
      name: "Viral Gohil",
      jobTitle: "Chairman",
    },
    {
      "@type": "Person",
      name: "Vrunda Gohil",
      jobTitle: "Social Impact Lead",
    },
  ],
  address: [
    {
      "@type": "PostalAddress",
      addressLocality: "Mumbai",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    {
      "@type": "PostalAddress",
      addressLocality: "Surat",
      addressRegion: "Gujarat",
      addressCountry: "IN",
    },
    {
      "@type": "PostalAddress",
      addressLocality: "Delhi",
      addressCountry: "IN",
    },
  ],
  sameAs: [
    "https://www.instagram.com/rudhramenterprises",
    "https://www.linkedin.com/in/rudhram-enterprises-844216419/",
    "https://www.facebook.com/rudhramenterprises",
  ],
  knowsAbout: [
    "Venture Building",
    "Brand Incubation",
    "Cultural Experiences",
    "Original Media & IP",
    "Digital Platforms",
    "Operating Systems & Governance",
  ],
  subOrganization: [
    {
      "@type": "Organization",
      name: "Panigrahna",
      url: "https://panigrahna.com",
      description:
        "A considered venture shaped around meaningful unions, enduring rituals, and thoughtfully created experiences.",
    },
    {
      "@type": "Organization",
      name: "Aghhori",
      description:
        "An uncompromising exploration of transformation, inner strength, and ideas that challenge convention.",
    },
    {
      "@type": "Organization",
      name: "House Of Joogi",
      description:
        "A creative house for culture-led expression, original thinking, and stories with a distinct point of view.",
    },
    {
      "@type": "Organization",
      name: "Damrru",
      description:
        "Rhythm, movement, and sonic identity brought together through a bold contemporary lens.",
    },
    {
      "@type": "Organization",
      name: "Tandavs",
      description:
        "A platform inspired by energy in motion, disciplined expression, and the force of performance.",
    },
    {
      "@type": "Organization",
      name: "Kapaalik",
      description:
        "A distinctive venture grounded in fearless identity, transformation, and purposeful creation.",
    },
    {
      "@type": "Organization",
      name: "Kalyannam",
      description:
        "A thoughtful interpretation of celebration, connection, and experiences designed to endure.",
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://www.facebook.com" />
        <link rel="dns-prefetch" href="https://www.facebook.com" />
        <link rel="stylesheet" href="https://use.typekit.net/ptx6yhc.css" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
