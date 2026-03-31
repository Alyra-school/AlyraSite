export const siteUrl = "https://www.alyra.fr";
export const siteName = "Alyra, l'ecole Blockchain et IA";
export const defaultDescription =
  "Formations professionnelles en blockchain et intelligence artificielle: catalogue, financement, rendez-vous et accompagnement carriere.";

export const defaultMetadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Alyra",
  title: {
    default: siteName,
    template: "%s | Alyra",
  },
  description: defaultDescription,
  keywords: [
    "ecole blockchain",
    "formation blockchain",
    "formation intelligence artificielle",
    "web3",
    "alyra",
  ],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName,
    title: siteName,
    description: defaultDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: defaultDescription,
  },
};

export function pageMetadata({ title, description, path }) {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: `${title} | Alyra`,
      description,
      url: `${siteUrl}${path}`,
    },
    twitter: {
      title: `${title} | Alyra`,
      description,
    },
  };
}
