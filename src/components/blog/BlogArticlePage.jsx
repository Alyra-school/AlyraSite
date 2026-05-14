import Breadcrumbs from "../Breadcrumbs";

export default function BlogArticlePage({ article }) {
  const articleSummary = article.summary || article.excerpt || "";

  return (
    <main className="main-content" id="main-content" tabIndex="-1">
      <article className="blog-article-page">
        <header className="hero blog-article-hero">
          <Breadcrumbs
            items={[
              { label: "Accueil", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: article.title },
            ]}
          />

          <div className="blog-article-head">
            <h1>{article.title}</h1>
            <div className="blog-article-date-author">
              {article.publishedDateLabel ? <span>{article.publishedDateLabel}</span> : null}
              <span>{article.author || "Equipe Alyra"}</span>
            </div>
            <div className="blog-article-meta">
              <div className="blog-article-tags">
                {article.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              {article.readingTimeLabel ? <span>{article.readingTimeLabel}</span> : null}
            </div>
          </div>

          {article.imageUrl ? (
            <img
              className="blog-article-cover"
              src={article.imageUrl}
              alt={article.imageAlt || article.title}
              loading="eager"
              decoding="async"
            />
          ) : null}
        </header>

        <section className="section blog-article-content-wrap">
          <aside className="blog-article-aside">
            <article className="blog-article-summary-card">
              <h2>Resume</h2>
              <p>{articleSummary}</p>
            </article>

            <article className="blog-article-newsletter-card">
              <h2>S'inscrire a la newsletter</h2>
              <p>Inscrivez-vous pour recevoir chaque semaine les derniers articles du blog.</p>
              <form className="blog-article-newsletter-form" action="#" method="post">
                <input type="email" name="email" placeholder="Entrer votre email" aria-label="Adresse e-mail" required />
                <button type="submit">S'inscrire</button>
              </form>
            </article>
          </aside>

          <div className="blog-article-content" dangerouslySetInnerHTML={{ __html: article.contentHtml }} />
        </section>
      </article>
    </main>
  );
}
