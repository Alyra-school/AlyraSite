"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Breadcrumbs from "../Breadcrumbs";
import styles from "./BlogIndexPage.module.css";

export default function BlogIndexPage({ articles, tags }) {
  const [selectedTag, setSelectedTag] = useState("Tout");

  const visibleArticles = useMemo(() => {
    if (selectedTag === "Tout") return articles;
    return articles.filter((article) => article.tags.includes(selectedTag));
  }, [articles, selectedTag]);

  return (
    <main className="main-content" id="main-content" tabIndex="-1">
      <header className="hero blog-hero">
        <Breadcrumbs items={[{ label: "Accueil", href: "/" }, { label: "Blog" }]} />
        <div className={styles.heroHead}>
          <p>Depuis 2019</p>
          <h1>Blog d'Alyra</h1>
          <p>
            Les meilleures ressources factuelles concernant le marche de l'emploi dans la blockchain,
            et la recherche d'emploi dans ce secteur
          </p>
        </div>
        <div className={styles.filters} role="group" aria-label="Filtrer les articles par categorie">
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              aria-pressed={selectedTag === tag}
              className={selectedTag === tag ? styles.active : ""}
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </header>

      <section className={`section ${styles.listingSection}`}>
        <div className={styles.grid}>
          {visibleArticles.map((article) => (
            <article key={article.slug} className={styles.card}>
              <Link href={`/blog/${article.slug}`} className={styles.cardLink} aria-label={`Lire l'article ${article.title}`}>
                {article.imageUrl ? (
                  <Image
                    className={styles.cover}
                    src={article.imageUrl}
                    alt={article.imageAlt}
                    width={560}
                    height={560}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    unoptimized
                  />
                ) : null}
                <div className={styles.body}>
                  <div className={styles.meta}>
                    <span className={styles.tag}>{article.tags[0] || "Ressource"}</span>
                    <small className={styles.reading}>{article.readingTimeLabel || "5 min de lecture"}</small>
                  </div>
                  <h2>{article.title}</h2>
                  <p className={styles.date}>{article.publishedDateLabel}</p>
                  <p className={styles.excerpt}>{article.excerpt}</p>
                  <span className={styles.link}>
                    Lire l'article <span aria-hidden="true">›</span>
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
