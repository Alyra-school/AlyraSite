import AlumniHallSection from "../AlumniHallSection";
import styles from "./StaticPages.module.css";

export default function AlumniPage({ page }) {
  return (
    <main className={`main-content ${styles.main}`} id="main-content" tabIndex="-1">
      <section className={`section ${styles.section} alumni-standalone-start`}>
        {page.alumniHall ? <AlumniHallSection section={page.alumniHall} /> : null}
      </section>
    </main>
  );
}
