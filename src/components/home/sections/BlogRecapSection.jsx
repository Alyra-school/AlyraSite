import Link from "next/link";
import styles from "./BlogRecapSection.module.css";
import SectionShell from "../shared/SectionShell";
import { blogRecapData } from "../../../data/home";

export default function BlogRecapSection() {
  return (
    <SectionShell className={`${styles.root} blog-recap-section`} variant="full">
      <div className="blog-recap-head">
        <p className="blog-recap-kicker">{blogRecapData.kicker}</p>
        <h2>{blogRecapData.title}</h2>
        <p>{blogRecapData.subtitle}</p>
      </div>
      <div className="blog-recap-grid">
        {blogRecapData.posts.map((post) => (
          <article key={post.slug} className="blog-recap-card">
            <img src={post.image} alt={post.imageAlt} width="1000" height="1000" loading="lazy" decoding="async" />
            <div className="blog-recap-meta">
              <span>{post.tag}</span>
              <small>{post.readTime}</small>
            </div>
            <h3>{post.title}</h3>
            <p>{post.text}</p>
            <Link href={post.href} className="blog-recap-link">
              Lire l'article <span aria-hidden="true">›</span>
            </Link>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
