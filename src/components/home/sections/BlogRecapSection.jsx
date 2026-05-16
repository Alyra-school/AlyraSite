import Link from "next/link";
import Image from "next/image";
import styles from "./BlogRecapSection.module.css";
import SectionShell from "../shared/SectionShell";
import { blogRecapData } from "../../../data/home";

export default function BlogRecapSection({ posts = [] }) {
  const recapPosts = posts.length > 0 ? posts : blogRecapData.posts;

  return (
    <SectionShell className={`${styles.root} blog-recap-section`} variant="full">
      <div className={styles.head}>
        <p className={styles.kicker}>{blogRecapData.kicker}</p>
        <h2>{blogRecapData.title}</h2>
        <p className={styles.subtitle}>{blogRecapData.subtitle}</p>
      </div>
      <div className={styles.grid}>
        {recapPosts.map((post) => (
          <article key={post.slug} className={styles.card}>
            <Link href={post.href || `/blog/${post.slug}`} className={styles.cardMediaLink} aria-label={`Lire l'article ${post.title}`}>
              <div className={styles.imageWrap}>
                <Image
                  src={post.image}
                  alt={post.imageAlt || post.title}
                  width={720}
                  height={720}
                  className={styles.image}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </Link>
            <div className={styles.meta}>
              <span className={styles.tag}>{post.tag}</span>
              <small>{post.readTime}</small>
            </div>
            <h3 className={styles.title}>
              <Link href={post.href || `/blog/${post.slug}`}>{post.title}</Link>
            </h3>
            <p className={styles.text}>{post.text}</p>
            <Link href={post.href || `/blog/${post.slug}`} className={styles.readLink}>
              Lire l'article <span aria-hidden="true">›</span>
            </Link>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
