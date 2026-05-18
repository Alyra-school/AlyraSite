"use client";

import styles from "./BlogArticlePage.module.css";

export default function ArticleShareControls({ shareLinks, articleUrl }) {
  return (
    <div className={styles.shareRow}>
      {shareLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.shareButton}
          aria-label={`Partager sur ${link.label}`}
        >
          {link.label}
        </a>
      ))}
      <button
        type="button"
        className={styles.shareButton}
        onClick={() => navigator?.clipboard?.writeText(articleUrl)}
        aria-label="Copier le lien de l'article"
      >
        Copier le lien
      </button>
    </div>
  );
}

