"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Breadcrumbs from "../Breadcrumbs";

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
        <div className="blog-hero-head">
          <p>Depuis 2019</p>
          <h1>Blog d'Alyra</h1>
          <p>
            Les meilleures ressources factuelles concernant le marche de l'emploi dans la blockchain,
            et la recherche d'emploi dans ce secteur
          </p>
        </div>
        <div className="blog-filters" role="tablist" aria-label="Filtrer les articles par categorie">
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              role="tab"
              aria-selected={selectedTag === tag}
              className={selectedTag === tag ? "is-active" : ""}
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </header>

      <section className="section blog-listing-section">
        <div className="blog-listing-grid">
          {visibleArticles.map((article) => (
            <article key={article.slug} className="blog-listing-card">
              <Link href={`/blog/${article.slug}`} className="blog-listing-card-link" aria-label={`Lire l'article ${article.title}`}>
                <img src={article.imageUrl} alt={article.imageAlt} loading="lazy" decoding="async" />
                <div className="blog-listing-card-body">
                  <div className="blog-listing-meta">
                    <span>{article.tags[0] || "Ressource"}</span>
                    <small>{article.readingTimeLabel || "5 min de lecture"}</small>
                  </div>
                  <h2>{article.title}</h2>
                  <p className="blog-listing-date">{article.publishedDateLabel}</p>
                  <p>{article.excerpt}</p>
                  <span className="blog-listing-link">
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
