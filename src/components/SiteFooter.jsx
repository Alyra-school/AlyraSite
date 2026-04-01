import Link from "next/link";
import { footerCertifications, footerColumns, footerSocials } from "../data/homeData";

export default function SiteFooter() {
  return (
    <footer className="footer footer-alyra">
      <div className="footer-main">
        <div className="footer-brand-col">
          <div className="logo">
            <img className="logo-mark" src="/logo_bleu.svg" alt="Alyra logo" />
            <span>Alyra, l'ecole Blockchain et IA</span>
          </div>
          <p>Ecole blockchain fondee par des builders, pour des builders.</p>
          <div className="footer-socials">
            {footerSocials.map((social) => (
              <a key={social.name} href={social.href} target="_blank" rel="noreferrer" aria-label={social.name}>
                <img src={social.icon} alt="" />
              </a>
            ))}
          </div>
        </div>
        {footerColumns.map((column) => (
          <div key={column.title} className="footer-links">
            <strong>{column.title}</strong>
            {column.links.map((item) => (
              <Link key={item.label} href={item.href} className="nav-link">
                {item.label}
              </Link>
            ))}
          </div>
        ))}
      </div>

      <div className="footer-qualiopi">
        <a
          href="https://cdn.prod.website-files.com/638473041a643140c382a182/676139e944857c6ae61b2aa1_certificat-B02397-2024-11-15T23_00_00Z.pdf"
          target="_blank"
          rel="noreferrer"
          className="primary"
        >
          Telecharger le certificat Qualiopi
        </a>
        <div className="newsletter footer-newsletter-inline">
          <span className="newsletter-kicker">Newsletter Alyra</span>
          <div className="newsletter-controls">
            <label className="sr-only" htmlFor="newsletter-email-footer">
              Votre email
            </label>
            <input
              id="newsletter-email-footer"
              placeholder="Votre email"
              type="email"
              autoComplete="email"
            />
            <button type="button" className="ghost">
              S'inscrire
            </button>
          </div>
        </div>
      </div>

      <div className="footer-certs footer-certs-row">
        {footerCertifications.map((cert) => (
          <article key={cert.name} className="footer-cert-item">
            <img src={cert.logo} alt={`Certification ${cert.name}`} loading="lazy" decoding="async" />
          </article>
        ))}
      </div>

      <p className="footer-legal">Tous droits reserves a Alyra, fait par Cyril Castagnet.</p>
    </footer>
  );
}
