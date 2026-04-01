import NavBar from "../src/components/NavBar";
import SiteFooter from "../src/components/SiteFooter";
import { getPrograms } from "../src/lib/programData";
import { defaultMetadata } from "../src/lib/seo";
import "./globals.css";

export const metadata = defaultMetadata;
export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }) {
  const programs = await getPrograms();

  return (
    <html lang="fr">
      <body>
        <div className="page">
          <a href="#main-content" className="skip-link">
            Aller au contenu principal
          </a>
          <NavBar programs={programs} />
          {children}
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
