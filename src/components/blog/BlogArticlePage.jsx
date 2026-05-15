import Breadcrumbs from "../Breadcrumbs";
import Image from "next/image";
import styles from "./BlogArticlePage.module.css";

export default function BlogArticlePage({ article }) {
  const articleSummary = article.summary || article.excerpt || "";

  return (
    <main className="main-content" id="main-content" tabIndex="-1">
      <article className={styles.page}>
        <header className={styles.hero}>
          <Breadcrumbs
            items={[
              { label: "Accueil", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: article.title },
            ]}
          />

          <div className={styles.head}>
            <h1>{article.title}</h1>
            <div className={styles.dateAuthor}>
              {article.publishedDateLabel ? <span>{article.publishedDateLabel}</span> : null}
              <span>{article.author || "Equipe Alyra"}</span>
            </div>
            <div className={styles.meta}>
              <div className={styles.tags}>
                {article.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              {article.readingTimeLabel ? <span className={styles.reading}>{article.readingTimeLabel}</span> : null}
            </div>
          </div>

          {article.imageUrl ? (
            <Image
              className={styles.cover}
              src={article.imageUrl}
              alt={article.imageAlt || article.title}
              width={1200}
              height={720}
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1360px) 92vw, 1200px"
              unoptimized
            />
          ) : null}
        </header>

        <section className={styles.contentWrap}>
          <aside className={styles.aside}>
            <article className={styles.card}>
              <h2>Resume</h2>
              <p>{articleSummary}</p>
            </article>

            <article className={styles.card}>
              <h2>S'inscrire a la newsletter</h2>
              <p>Inscrivez-vous pour recevoir chaque semaine les derniers articles du blog.</p>
              <form className={styles.form} action="#" method="post">
                <input type="email" name="email" placeholder="Entrer votre email" aria-label="Adresse e-mail" required />
                <button type="submit">S'inscrire</button>
              </form>
            </article>
          </aside>

          <div className={styles.content} dangerouslySetInnerHTML={{ __html: article.contentHtml }} />
        </section>
      </article>
    </main>
  );
}
