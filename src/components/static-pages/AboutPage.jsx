import Link from "next/link";
import Image from "next/image";
import Breadcrumbs from "../Breadcrumbs";
import PageHeroShell from "../page-sections/PageHeroShell";
import PageIntro from "../page-sections/PageIntro";
import CtaRow from "../page-sections/CtaRow";
import TeamShowcaseSection from "../TeamShowcaseSection";
import layoutStyles from "./StaticPages.module.css";
import styles from "./AboutPage.module.css";

export default function AboutPage({ page }) {
  return (
    <main className={`main-content ${layoutStyles.main}`} id="main-content" tabIndex="-1">
      <PageHeroShell className="hero programs-hero">
        <Breadcrumbs items={[{ label: "Accueil", href: "/" }, { label: page.title }]} />
        <PageIntro title={page.title} subtitle={page.subtitle} />
      </PageHeroShell>

      <section className={`section ${layoutStyles.section}`}>
        {page.aboutSchool ? (
          <article id="notre-ecole-blockchain-ia" className={`${styles.aboutSchoolBlock} anchor-section`}>
            <p className={styles.aboutSchoolOverline}>{page.aboutSchool.overline}</p>
            <h2 className={styles.aboutSchoolTitle}>{page.aboutSchool.title}</h2>
            <p className={styles.aboutSchoolLead}>{page.aboutSchool.lead}</p>
            {page.aboutSchool.paragraphs.map((paragraph) => (
              <p key={paragraph} className={styles.aboutSchoolParagraph}>
                {paragraph}
              </p>
            ))}
            <div className={styles.aboutSchoolCta}>
              <Link href={page.aboutSchool.ctaHref} className="primary">
                {page.aboutSchool.ctaLabel}
              </Link>
            </div>
            <p className={styles.aboutSchoolBridge}>{page.aboutSchool.bridge}</p>
            <h3 className={styles.aboutSchoolNextTitle}>{page.aboutSchool.nextTitle}</h3>
            <p className={styles.aboutSchoolNextSubtitle}>{page.aboutSchool.nextSubtitle}</p>
          </article>
        ) : null}

        {page.aboutHighlights ? (
          <article className={styles.aboutHighlightsBlock} aria-label="Points forts de l'ecole">
            <div className={styles.aboutHighlightsCopy}>
              {page.aboutHighlights.items.map((item) => (
                <section key={item.title} className={styles.aboutHighlightsItem}>
                  <h3 className={styles.aboutHighlightsHeading}>{item.title}</h3>
                  <p className={styles.aboutHighlightsText}>{item.text}</p>
                </section>
              ))}
            </div>
            <figure className={styles.aboutHighlightsVisual} aria-hidden="true">
              {page.aboutHighlights.imageUrl ? (
                <Image
                  className={styles.aboutHighlightsImage}
                  src={page.aboutHighlights.imageUrl}
                  alt={page.aboutHighlights.imageAlt}
                  width={560}
                  height={560}
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  unoptimized
                />
              ) : null}
            </figure>
          </article>
        ) : null}

        {page.schoolKpis ? (
          <article id="les-chiffres-de-lecole" className={`${styles.aboutKpisBlock} anchor-section`}>
            <p className={styles.aboutKpisEyebrow}>{page.schoolKpis.eyebrow}</p>
            <h2 className={styles.aboutKpisTitle}>{page.schoolKpis.title}</h2>
            <p className={styles.aboutKpisSubtitle}>{page.schoolKpis.subtitle}</p>

            <div className={styles.aboutKpisTopGrid}>
              {page.schoolKpis.topCards.map((card) => (
                <section key={`${card.value}-${card.label}`} className={styles.aboutKpiCard}>
                  <h3 className={styles.aboutKpiValue}>{card.value}</h3>
                  <h4 className={styles.aboutKpiLabel}>{card.label}</h4>
                  <p className={`${styles.aboutKpiText} ${card.isItalic ? styles.isItalic : ""}`}>{card.text}</p>
                </section>
              ))}
            </div>

            <section className={`${styles.aboutKpiCard} ${styles.aboutKpiCardWide}`}>
              <h3 className={styles.aboutKpiValue}>{page.schoolKpis.middleCard.value}</h3>
              <h4 className={styles.aboutKpiLabel}>{page.schoolKpis.middleCard.label}</h4>
            </section>

            <div className={styles.aboutKpisBottomGrid}>
              <section className={styles.aboutKpiCard}>
                <p className={styles.aboutKpiTrustpilot}>{page.schoolKpis.bottomCards[0].trustpilot}</p>
              </section>
              <section className={styles.aboutKpiCard}>
                <h3 className={styles.aboutKpiValue}>{page.schoolKpis.bottomCards[1].value}</h3>
                <h4 className={styles.aboutKpiLabel}>{page.schoolKpis.bottomCards[1].label}</h4>
              </section>
            </div>

            <CtaRow actions={page.schoolKpis.actions} />
          </article>
        ) : null}

        {page.teamShowcase ? <TeamShowcaseSection section={page.teamShowcase} /> : null}
        {page.expertsShowcase ? <TeamShowcaseSection section={page.expertsShowcase} /> : null}
      </section>
    </main>
  );
}
